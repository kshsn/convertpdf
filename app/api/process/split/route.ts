import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import { PassThrough } from "stream";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const archiver = require("archiver") as (
  format: string,
) => import("archiver").Archiver;

function parseRange(pages: string, total: number): number[] {
  const indices: number[] = [];
  for (const part of pages.split(",")) {
    const [start, end] = part
      .trim()
      .split("-")
      .map((n) => parseInt(n, 10) - 1);
    if (!isNaN(start) && !isNaN(end)) {
      for (let i = start; i <= Math.min(end, total - 1); i++) {
        if (i >= 0) indices.push(i);
      }
    } else if (!isNaN(start) && start >= 0 && start < total) {
      indices.push(start);
    }
  }
  // de-duplicate while keeping order
  return [...new Set(indices)];
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const pages = formData.get("pages") as string | null;

    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const buffer = await file.arrayBuffer();
    const source = await PDFDocument.load(buffer);
    const total = source.getPageCount();

    const indices = pages
      ? parseRange(pages, total)
      : Array.from({ length: total }, (_, i) => i);

    if (indices.length === 0) {
      return NextResponse.json(
        { error: "No valid pages selected" },
        { status: 400 },
      );
    }

    // Build one single-page PDF per selected page and bundle into a ZIP.
    const archive = archiver("zip");
    const pass = new PassThrough();
    const chunks: Buffer[] = [];
    pass.on("data", (c: Buffer) => chunks.push(c));
    const done = new Promise<Buffer>((resolve, reject) => {
      pass.on("end", () => resolve(Buffer.concat(chunks)));
      archive.on("error", reject);
    });
    archive.pipe(pass);

    for (const idx of indices) {
      const out = await PDFDocument.create();
      const [copied] = await out.copyPages(source, [idx]);
      out.addPage(copied);
      const bytes = await out.save();
      archive.append(Buffer.from(bytes), { name: `page-${idx + 1}.pdf` });
    }
    await archive.finalize();

    const zipBuffer = await done;
    return new NextResponse(new Uint8Array(zipBuffer), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="split-pages.zip"',
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to split PDF" }, { status: 500 });
  }
}
