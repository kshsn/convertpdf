import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, readFile, unlink } from "fs/promises";
import { tmpdir } from "os";
import { join, basename, extname } from "path";
import { randomUUID } from "crypto";

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  const id = randomUUID();
  const profileDir = join(tmpdir(), `${id}-loprofile`);
  let inputPath = "";
  let outputPath = "";

  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file)
      return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const ext = extname(file.name) || ".docx";
    inputPath = join(tmpdir(), `${id}-input${ext}`);
    const stem = basename(inputPath, ext);
    outputPath = join(tmpdir(), `${stem}.pdf`);

    const bytes = await file.arrayBuffer();
    await writeFile(inputPath, Buffer.from(bytes));

    await execAsync(
      `libreoffice -env:UserInstallation=file://${profileDir} --headless --convert-to pdf "${inputPath}" --outdir "${tmpdir()}"`,
    );

    const result = await readFile(outputPath);
    return new NextResponse(result, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="converted.pdf"',
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
    if (inputPath) await unlink(inputPath).catch(() => {});
    if (outputPath) await unlink(outputPath).catch(() => {});
    await execAsync(`rm -rf "${profileDir}"`).catch(() => {});
  }
}
