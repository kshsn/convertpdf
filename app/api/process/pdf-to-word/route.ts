import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, readFile, unlink } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { randomUUID } from "crypto";

const execAsync = promisify(exec);

// pdf2docx is used instead of LibreOffice because LibreOffice imports PDFs as
// Draw documents, which have no DOCX export filter. pdf2docx produces a genuinely
// editable Word document with text and tables preserved.
const SCRIPT = join(process.cwd(), "scripts", "pdf2docx_convert.py");

export async function POST(req: NextRequest) {
  const id = randomUUID();
  const inputPath = join(tmpdir(), `${id}-input.pdf`);
  const outputPath = join(tmpdir(), `${id}-output.docx`);

  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file)
      return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    await writeFile(inputPath, Buffer.from(bytes));

    await execAsync(`python3 "${SCRIPT}" "${inputPath}" "${outputPath}"`, {
      timeout: 120000,
    });

    const result = await readFile(outputPath);
    return new NextResponse(result, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": 'attachment; filename="converted.docx"',
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Conversion failed. Please try a different PDF." },
      { status: 500 },
    );
  } finally {
    await unlink(inputPath).catch(() => {});
    await unlink(outputPath).catch(() => {});
  }
}
