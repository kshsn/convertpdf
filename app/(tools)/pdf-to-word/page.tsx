"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function PDFToWordPage() {
  const [file, setFile] = useState<File | null>(null);
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

  async function handleConvert() {
    if (!file) return;
    setStatus("processing");
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/process/pdf-to-word", {
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
          PDF to Word
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Convert PDF to an editable Word document (.docx) for free.
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
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Selected: <span className="font-medium">{file.name}</span>
                </p>
                <button
                  onClick={handleConvert}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition-colors"
                >
                  Convert to Word
                </button>
              </div>
            )}
          </>
        )}

        {status === "processing" && (
          <div className="text-center py-16">
            <div className="inline-block w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Converting to Word...</p>
            <p className="text-sm text-gray-400 mt-1">
              This may take up to 30 seconds
            </p>
            <div className="mt-8 bg-gray-200 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm">
              Advertisement
            </div>
          </div>
        )}

        {status === "done" && downloadUrl && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Your Word document is ready!
            </h2>
            <a
              href={downloadUrl}
              download="converted.docx"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition-colors inline-block"
            >
              Download converted.docx
            </a>
            <div className="mt-8 bg-gray-200 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm">
              Advertisement
            </div>
            <button
              onClick={reset}
              className="mt-6 text-sm text-red-600 hover:underline block mx-auto"
            >
              Convert another file
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
            How to Convert PDF to Word for Free
          </h2>
          <p>
            Upload your PDF and we convert it to an editable .docx file using
            LibreOffice. Text, tables, and basic formatting are preserved.
          </p>
          <div className="mt-4 space-y-3">
            {[
              {
                q: "Will the formatting be preserved?",
                a: "Basic formatting like headings, paragraphs, and tables are preserved. Complex layouts may need minor adjustments.",
              },
              {
                q: "Can I edit the Word document after conversion?",
                a: "Yes — the output is a fully editable .docx file compatible with Microsoft Word and Google Docs.",
              },
              {
                q: "Is there a file size limit?",
                a: "Free users can convert PDFs up to 10MB. Pro users get up to 100MB.",
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
