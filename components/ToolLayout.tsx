"use client";

import { useState } from "react";
import UploadZone from "./UploadZone";

interface ToolLayoutProps {
  title: string;
  description: string;
  accept: Record<string, string[]>;
  processLabel?: string;
  onProcess: (file: File) => Promise<{ downloadUrl: string; filename: string }>;
}

export default function ToolLayout({
  title,
  description,
  accept,
  processLabel = "Process",
  onProcess,
}: ToolLayoutProps) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "idle" | "processing" | "done" | "error"
  >("idle");
  const [result, setResult] = useState<{
    downloadUrl: string;
    filename: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleProcess() {
    if (!file) return;
    setStatus("processing");
    setError(null);
    try {
      const res = await onProcess(file);
      setResult(res);
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setStatus("error");
    }
  }

  function handleReset() {
    setFile(null);
    setStatus("idle");
    setResult(null);
    setError(null);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          {title}
        </h1>
        <p className="text-gray-500 text-center mb-8">{description}</p>

        {status === "idle" && (
          <>
            <UploadZone accept={accept} onFile={setFile} />
            {file && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Selected: <span className="font-medium">{file.name}</span> (
                  {(file.size / 1024).toFixed(1)} KB)
                </p>
                <button
                  onClick={handleProcess}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition-colors"
                >
                  {processLabel}
                </button>
              </div>
            )}
          </>
        )}

        {status === "processing" && (
          <div className="text-center py-16">
            <div className="inline-block w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Processing your file...</p>
            {/* Ad slot during wait */}
            <div className="mt-8 bg-gray-200 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm">
              Advertisement
            </div>
          </div>
        )}

        {status === "done" && result && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Your file is ready!
            </h2>
            <a
              href={result.downloadUrl}
              download={result.filename}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition-colors inline-block"
            >
              Download {result.filename}
            </a>
            {/* Ad slot below download */}
            <div className="mt-8 bg-gray-200 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm">
              Advertisement
            </div>
            <button
              onClick={handleReset}
              className="mt-6 text-sm text-red-600 hover:underline block mx-auto"
            >
              Process another file
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❌</div>
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <button
              onClick={handleReset}
              className="text-sm text-red-600 hover:underline"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
