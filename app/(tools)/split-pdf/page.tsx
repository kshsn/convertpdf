"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function SplitPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState("");
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

  async function handleSplit() {
    if (!file) return;
    setStatus("processing");
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      if (pages) form.append("pages", pages);
      const res = await fetch("/api/process/split", {
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
    setPages("");
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Split PDF
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Extract specific pages or split a PDF into parts.
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pages to split (optional)
                  </label>
                  <input
                    type="text"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    placeholder="e.g. 1-3, 5, 7-9 — each page becomes its own PDF (empty = all)"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-red-400"
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={handleSplit}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition-colors"
                  >
                    Split PDF
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {status === "processing" && (
          <div className="text-center py-16">
            <div className="inline-block w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Splitting your PDF...</p>
            <div className="mt-8 bg-gray-200 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm">
              Advertisement
            </div>
          </div>
        )}

        {status === "done" && downloadUrl && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Your split files are ready!
            </h2>
            <a
              href={downloadUrl}
              download="split-pages.zip"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition-colors inline-block"
            >
              Download ZIP
            </a>
            <div className="mt-8 bg-gray-200 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm">
              Advertisement
            </div>
            <button
              onClick={reset}
              className="mt-6 text-sm text-red-600 hover:underline block mx-auto"
            >
              Split another file
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
            How to Split PDF Files Online for Free
          </h2>
          <p>
            Upload your PDF and click Split. Each page is saved as its own PDF
            file and bundled into a ZIP for download — no software installation
            needed.
          </p>
          <div className="mt-4 space-y-3">
            {[
              {
                q: "How do I split a PDF into individual pages?",
                a: "Leave the pages field empty and click Split — every page becomes its own PDF, delivered as a ZIP.",
              },
              {
                q: "Can I split only specific pages?",
                a: "Yes. Enter a range like 1-3, 5, 7-9 and only those pages will be split into separate files.",
              },
              {
                q: "Is there a file size limit?",
                a: "Free users can split PDFs up to 10MB. Pro users get up to 100MB.",
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
