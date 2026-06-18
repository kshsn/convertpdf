import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const pages = formData.get("pages") as string;

    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const buffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(buffer);
    const total = pdf.getPageCount();

    let indices: number[] = [];
    if (pages) {
      for (const part of pages.split(",")) {
        const [start, end] = part
          .trim()
          .split("-")
          .map((n) => parseInt(n) - 1);
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= Math.min(end, total - 1); i++)
            indices.push(i);
        } else if (!isNaN(start)) {
          indices.push(start);
        }
      }
    } else {
      indices = Array.from({ length: total }, (_, i) => i);
    }

    const out = await PDFDocument.create();
    const copied = await out.copyPages(pdf, indices);
    copied.forEach((p) => out.addPage(p));

    const bytes = await out.save();
    return new NextResponse(Buffer.from(bytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="split.pdf"',
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to split PDF" }, { status: 500 });
  }
}
