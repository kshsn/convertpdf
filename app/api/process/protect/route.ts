import { NextRequest, NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"
import { writeFile, readFile, unlink } from "fs/promises"
import { tmpdir } from "os"
import { join } from "path"
import { randomUUID } from "crypto"

const execAsync = promisify(exec)

function makeAdminPwd(userPwd: string): string {
  return Buffer.from(userPwd).toString("base64") + "-mgr"
}

export async function POST(req: NextRequest) {
  const id = randomUUID()
  const inputPath = join(tmpdir(), `${id}-input.pdf`)
  const outputPath = join(tmpdir(), `${id}-output.pdf`)

  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const userPwd = formData.get("password") as string | null

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    if (!userPwd) return NextResponse.json({ error: "Password is required" }, { status: 400 })

    const adminPwd = makeAdminPwd(userPwd)

    const bytes = await file.arrayBuffer()
    await writeFile(inputPath, Buffer.from(bytes))

    await execAsync(
      `gs -dBATCH -dNOPAUSE -sDEVICE=pdfwrite -dEncryptionR=3 -dKeyLength=128 -sOwnerPassword="${adminPwd}" -sUserPassword="${userPwd}" -sOutputFile="${outputPath}" "${inputPath}"`
    )

    const result = await readFile(outputPath)
    return new NextResponse(result, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="protected.pdf"',
      },
    })
  } catch {
    return NextResponse.json({ error: "Failed to protect PDF. Ghostscript may not be installed." }, { status: 500 })
  } finally {
    await unlink(inputPath).catch(() => {})
    await unlink(outputPath).catch(() => {})
  }
}
