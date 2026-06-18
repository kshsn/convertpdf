"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function RotatePDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState("90");
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

  async function handleRotate() {
    if (!file) return;
    setStatus("processing");
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("angle", angle);
      const res = await fetch("/api/process/rotate", {
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
    setStatus("idle");
    setDownloadUrl(null);
    setError(null);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Rotate PDF
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Rotate all pages in your PDF to the correct orientation.
        </p>

        {status === "idle" && (
          <>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${isDragActive ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-red-400 hover:bg-gray-50"}`}
            >
              <input {...getInputProps()} />
              <p className="text-4xl mb-3">📂</p>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rotation angle
                  </label>
                  <div className="flex gap-3">
                    {["90", "180", "270"].map((a) => (
                      <button
                        key={a}
                        onClick={() => setAngle(a)}
                        className={`flex-1 py-2 rounded-xl border text-sm font-medium transition-colors ${angle === a ? "border-red-500 bg-red-50 text-red-600" : "border-gray-300 hover:border-red-400"}`}
                      >
                        {a}° {a === "90" ? "↻" : a === "180" ? "↕" : "↺"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <button
                    onClick={handleRotate}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition-colors"
                  >
                    Rotate PDF
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {status === "processing" && (
          <div className="text-center py-16">
            <div className="inline-block w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Rotating your PDF...</p>
            <div className="mt-8 bg-gray-200 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm">
              Advertisement
            </div>
          </div>
        )}

        {status === "done" && downloadUrl && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Your PDF is ready!
            </h2>
            <a
              href={downloadUrl}
              download="rotated.pdf"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition-colors inline-block"
            >
              Download rotated.pdf
            </a>
            <div className="mt-8 bg-gray-200 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm">
              Advertisement
            </div>
            <button
              onClick={reset}
              className="mt-6 text-sm text-red-600 hover:underline block mx-auto"
            >
              Rotate another file
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
            How to Rotate PDF Pages Online
          </h2>
          <p>
            Upload your PDF, choose 90°, 180°, or 270° rotation, and download
            the corrected file instantly. All pages are rotated together.
          </p>
          <div className="mt-4 space-y-3">
            {[
              {
                q: "Can I rotate just one page?",
                a: "Currently all pages are rotated together. Per-page rotation is available on the Pro plan.",
              },
              {
                q: "Will rotating affect the PDF quality?",
                a: "No. Rotation is a metadata change — the content quality is not affected.",
              },
              {
                q: "Is it free to rotate PDF files?",
                a: "Yes, completely free with no limits.",
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
