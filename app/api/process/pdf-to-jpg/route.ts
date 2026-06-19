import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import { writeFile, readdir, readFile, unlink, rmdir } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { randomUUID } from "crypto";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const archiver = require("archiver") as (
  format: string,
) => import("archiver").Archiver;
import { createWriteStream } from "fs";

const execAsync = promisify(exec);

async function createZip(
  dir: string,
  files: string[],
  zipPath: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(zipPath);
    const archive = archiver("zip");
    output.on("close", resolve);
    archive.on("error", reject);
    archive.pipe(output);
    for (const f of files) archive.file(join(dir, f), { name: f });
    archive.finalize();
  });
}

export async function POST(req: NextRequest) {
  const id = randomUUID();
  const inputPath = join(tmpdir(), `${id}-input.pdf`);
  const outDir = join(tmpdir(), `${id}-pages`);
  const zipPath = join(tmpdir(), `${id}-pages.zip`);

  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file)
      return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    await writeFile(inputPath, Buffer.from(bytes));
    await execAsync(`mkdir -p "${outDir}"`);

    await execAsync(
      `gs -dNOPAUSE -dBATCH -dSAFER -sDEVICE=jpeg -r150 -dJPEGQ=90 -sOutputFile="${outDir}/page-%03d.jpg" "${inputPath}"`,
    );

    const files = (await readdir(outDir))
      .filter((f) => f.endsWith(".jpg"))
      .sort();
    if (files.length === 0) throw new Error("No pages generated");

    await createZip(outDir, files, zipPath);
    const zipBytes = await readFile(zipPath);

    return new NextResponse(zipBytes, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="pages.zip"',
      },
    });
  } catch (e) {
    const detail = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { error: `Conversion failed: ${detail}` },
      { status: 500 },
    );
  } finally {
    await unlink(inputPath).catch(() => {});
    await unlink(zipPath).catch(() => {});
    await execAsync(`rm -rf "${outDir}"`).catch(() => {});
  }
}
