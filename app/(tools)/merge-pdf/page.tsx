"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function MergePDFPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<
    "idle" | "processing" | "done" | "error"
  >("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    setFiles((prev) => [...prev, ...accepted]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
  });

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function moveUp(index: number) {
    if (index === 0) return;
    setFiles((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }

  function moveDown(index: number) {
    if (index === files.length - 1) return;
    setFiles((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  }

  async function handleMerge() {
    if (files.length < 2) return;
    setStatus("processing");
    setError(null);

    try {
      const form = new FormData();
      files.forEach((f) => form.append("files", f));

      const res = await fetch("/api/process/merge", {
        method: "POST",
        body: form,
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Merge failed");
      }

      const blob = await res.blob();
      setDownloadUrl(URL.createObjectURL(blob));
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setStatus("error");
    }
  }

  function reset() {
    setFiles([]);
    setStatus("idle");
    setDownloadUrl(null);
    setError(null);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Merge PDF
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Combine multiple PDF files into one. Drag to reorder pages before
          merging.
        </p>

        {status === "idle" && (
          <>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors
                ${isDragActive ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-red-400 hover:bg-gray-50"}`}
            >
              <input {...getInputProps()} />
              <p className="text-4xl mb-3">📂</p>
              <p className="font-semibold text-gray-700">
                {isDragActive ? "Drop PDFs here" : "Drag & drop PDF files here"}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                or click to browse — select multiple files
              </p>
            </div>

            {files.length > 0 && (
              <div className="mt-6 space-y-2">
                <p className="text-sm font-medium text-gray-600">
                  {files.length} file(s) selected — drag to reorder:
                </p>
                {files.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white border rounded-xl px-4 py-3 shadow-sm"
                  >
                    <span className="text-gray-400 text-sm w-5">{i + 1}</span>
                    <span className="flex-1 text-sm text-gray-700 truncate">
                      {f.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {(f.size / 1024).toFixed(0)} KB
                    </span>
                    <button
                      onClick={() => moveUp(i)}
                      className="text-gray-400 hover:text-gray-600 text-xs"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveDown(i)}
                      className="text-gray-400 hover:text-gray-600 text-xs"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeFile(i)}
                      className="text-red-400 hover:text-red-600 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                <div className="text-center pt-4">
                  <button
                    onClick={handleMerge}
                    disabled={files.length < 2}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white font-bold py-3 px-10 rounded-full transition-colors"
                  >
                    Merge {files.length} PDFs
                  </button>
                  {files.length < 2 && (
                    <p className="text-xs text-gray-400 mt-2">
                      Add at least 2 files to merge
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {status === "processing" && (
          <div className="text-center py-16">
            <div className="inline-block w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Merging your PDFs...</p>
            <div className="mt-8 bg-gray-200 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm">
              Advertisement
            </div>
          </div>
        )}

        {status === "done" && downloadUrl && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Your merged PDF is ready!
            </h2>
            <a
              href={downloadUrl}
              download="merged.pdf"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition-colors inline-block"
            >
              Download merged.pdf
            </a>
            <div className="mt-8 bg-gray-200 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm">
              Advertisement
            </div>
            <button
              onClick={reset}
              className="mt-6 text-sm text-red-600 hover:underline block mx-auto"
            >
              Merge more files
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

        {/* SEO Content */}
        <section className="mt-16 prose prose-sm max-w-none text-gray-600">
          <h2 className="text-xl font-bold text-gray-800">
            How to Merge PDF Files Online for Free
          </h2>
          <p>
            ConvertPDF makes it easy to merge PDF files online without
            installing any software. Simply upload your PDF files, arrange them
            in the order you want, and click Merge. Your combined PDF will be
            ready to download in seconds.
          </p>
          <h3 className="font-semibold text-gray-700 mt-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {[
              {
                q: "Is it free to merge PDF files?",
                a: "Yes, merging PDFs on ConvertPDF is completely free with no limits on number of uses.",
              },
              {
                q: "Are my files safe?",
                a: "All uploaded files are automatically deleted from our servers after 1 hour.",
              },
              {
                q: "How many PDFs can I merge at once?",
                a: "Free users can merge up to 2 files at a time. Pro users can merge unlimited files.",
              },
              {
                q: "Does the merged PDF lose quality?",
                a: "No. We merge PDFs without re-encoding, so the original quality is preserved.",
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
