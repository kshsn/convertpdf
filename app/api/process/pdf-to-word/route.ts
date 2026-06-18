import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, readFile, unlink } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { randomUUID } from "crypto";

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  const id = randomUUID();
  const inputPath = join(tmpdir(), `${id}-input.pdf`);
  const outputPath = join(tmpdir(), `${id}-input.docx`);

  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file)
      return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    await writeFile(inputPath, Buffer.from(bytes));

    await execAsync(
      `libreoffice --headless --convert-to docx "${inputPath}" --outdir "${tmpdir()}"`,
    );

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
      {
        error:
          "Conversion failed. LibreOffice may not be installed on this server.",
      },
      { status: 500 },
    );
  } finally {
    await unlink(inputPath).catch(() => {});
    await unlink(outputPath).catch(() => {});
  }
}
