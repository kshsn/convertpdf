import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, degrees } from "pdf-lib";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const angle = parseInt((formData.get("angle") as string) ?? "90");

    if (!file)
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const buffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(buffer);

    pdf.getPages().forEach((page) => {
      page.setRotation(degrees((page.getRotation().angle + angle) % 360));
    });

    const bytes = await pdf.save();
    return new NextResponse(Buffer.from(bytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="rotated.pdf"',
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to rotate PDF" },
      { status: 500 },
    );
  }
}
