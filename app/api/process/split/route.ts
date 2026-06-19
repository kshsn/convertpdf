import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import { writeFile, readFile, unlink, mkdir } from "fs/promises";
import { createWriteStream } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { randomUUID } from "crypto";
import { exec } from "child_process";
import { promisify } from "util";
import type { Archiver } from "archiver";

const execAsync = promisify(exec);

// eslint-disable-next-line @typescript-eslint/no-require-imports
const archiverModule = require("archiver");
const archiverFn = (archiverModule.default ?? archiverModule) as (
  format: string,
) => Archiver;

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
  return [...new Set(indices)];
}

function zipDir(
  files: { path: string; name: string }[],
  zipPath: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(zipPath);
    const archive = archiverFn("zip");
    output.on("close", () => resolve());
    archive.on("error", reject);
    archive.pipe(output);
    for (const f of files) archive.file(f.path, { name: f.name });
    archive.finalize();
  });
}

export async function POST(req: NextRequest) {
  const id = randomUUID();
  const workDir = join(tmpdir(), `${id}-split`);
  const zipPath = join(tmpdir(), `${id}-split.zip`);
  const created: string[] = [];

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

    await mkdir(workDir, { recursive: true });

    const files: { path: string; name: string }[] = [];
    for (const idx of indices) {
      const out = await PDFDocument.create();
      const [copied] = await out.copyPages(source, [idx]);
      out.addPage(copied);
      const bytes = await out.save();
      const name = `page-${idx + 1}.pdf`;
      const path = join(workDir, name);
      await writeFile(path, Buffer.from(bytes));
      created.push(path);
      files.push({ path, name });
    }

    await zipDir(files, zipPath);
    const zipBuffer = await readFile(zipPath);

    return new NextResponse(new Uint8Array(zipBuffer), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="split-pages.zip"',
      },
    });
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { error: `Failed to split PDF: ${detail}` },
      { status: 500 },
    );
  } finally {
    for (const p of created) await unlink(p).catch(() => {});
    await unlink(zipPath).catch(() => {});
    await execAsync(`rm -rf "${workDir}"`).catch(() => {});
  }
}
