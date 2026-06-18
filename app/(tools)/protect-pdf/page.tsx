"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ProtectPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pwd, setPwd] = useState("");
  const [status, setStatus] = useState<
    "idle" | "processing" | "done" | "error"
  >("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    onDrop: (accepted) => {
      if (accepted[0]) setFile(accepted[0]);
    },
  });

  async function handleProtect() {
    if (!file || !pwd) return;
    setStatus("processing");
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("password", pwd);
      const res = await fetch("/api/process/protect", {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setDownloadUrl(URL.createObjectURL(await res.blob()));
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setStatus("error");
    }
  }

  function reset() {
    setFile(null);
    setPwd("");
    setStatus("idle");
    setDownloadUrl(null);
    setError(null);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Protect PDF
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Add a password to your PDF to prevent unauthorized access.
        </p>

        {status === "idle" && (
          <>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${isDragActive ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-red-400 hover:bg-gray-50"}`}
            >
              <input {...getInputProps()} />
              <p className="text-4xl mb-3">🔒</p>
              <p className="font-semibold text-gray-700">
                {isDragActive ? "Drop PDF here" : "Drag & drop your PDF here"}
              </p>
              <p className="text-sm text-gray-400 mt-1">or click to browse</p>
            </div>
            {file && (
              <div className="mt-6 space-y-4">
                <p className="text-sm text-gray-600">
                  Selected: <span className="font-medium">{file.name}</span>
                </p>
                <div>
                  <label
                    htmlFor="pdf-password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Set a password
                  </label>
                  <input
                    id="pdf-password"
                    type="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    placeholder="Enter password"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={handleProtect}
                    disabled={!pwd}
                    className="bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-bold py-3 px-10 rounded-full transition-colors"
                  >
                    Protect PDF
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {status === "processing" && (
          <div className="text-center py-16">
            <div className="inline-block w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-medium">
              Adding password protection...
            </p>
            <div className="mt-8 bg-gray-200 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm">
              Advertisement
            </div>
          </div>
        )}

        {status === "done" && downloadUrl && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔐</div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Your protected PDF is ready!
            </h2>
            <a
              href={downloadUrl}
              download="protected.pdf"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition-colors inline-block"
            >
              Download protected.pdf
            </a>
            <div className="mt-8 bg-gray-200 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm">
              Advertisement
            </div>
            <button
              onClick={reset}
              className="mt-6 text-sm text-red-600 hover:underline block mx-auto"
            >
              Protect another file
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❌</div>
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <button
              onClick={reset}
              className="text-sm text-red-600 hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        <section className="mt-16 text-gray-600">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            How to Password Protect a PDF
          </h2>
          <p>
            Upload your PDF, enter a password, and download the encrypted file.
            Only people with the password can open it.
          </p>
          <div className="mt-4 space-y-3">
            {[
              {
                q: "What encryption is used?",
                a: "128-bit RC4 encryption — compatible with all PDF readers including Adobe Acrobat.",
              },
              {
                q: "Can I remove the password later?",
                a: "Yes — use a PDF unlock tool or our upcoming Unlock PDF feature.",
              },
              {
                q: "Is my file secure during upload?",
                a: "Files are processed in memory and deleted immediately after download.",
              },
            ].map(({ q, a }) => (
              <details key={q} className="border rounded-lg p-3">
                <summary className="font-medium cursor-pointer">{q}</summary>
                <p className="mt-2 text-sm">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
