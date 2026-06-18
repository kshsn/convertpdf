import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length < 2) {
      return NextResponse.json(
        { error: "Please upload at least 2 PDF files" },
        { status: 400 },
      );
    }

    const merged = await PDFDocument.create();

    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      const pages = await merged.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((p) => merged.addPage(p));
    }

    const bytes = await merged.save();
    return new NextResponse(Buffer.from(bytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="merged.pdf"',
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to merge PDFs" },
      { status: 500 },
    );
  }
}
