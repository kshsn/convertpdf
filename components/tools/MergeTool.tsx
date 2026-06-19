"use client";

import { useState } from "react";
import Dropzone from "./Dropzone";
import StatusPanel from "./StatusPanel";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface MergeToolProps {
  buttonLabel: string;
  common: Dictionary["common"];
}

type Status = "idle" | "processing" | "done" | "error";

/** Multi-file merge widget with reorder controls. */
export default function MergeTool({ buttonLabel, common }: MergeToolProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function addFiles(accepted: File[]) {
    setFiles((prev) => [...prev, ...accepted]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function move(index: number, delta: number) {
    const target = index + delta;
    setFiles((prev) => {
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
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
        throw new Error(data.error ?? common.errorGeneric);
      }
      setDownloadUrl(URL.createObjectURL(await res.blob()));
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : common.errorGeneric);
      setStatus("error");
    }
  }

  function reset() {
    setFiles([]);
    setStatus("idle");
    setDownloadUrl(null);
    setError(null);
  }

  if (status !== "idle") {
    return (
      <StatusPanel
        status={status}
        common={common}
        downloadUrl={downloadUrl}
        downloadName="merged.pdf"
        error={error}
        onReset={reset}
      />
    );
  }

  return (
    <>
      <Dropzone
        accept={{ "application/pdf": [".pdf"] }}
        multiple
        common={common}
        onFiles={addFiles}
      />
      {files.length > 0 && (
        <div className="mt-6 space-y-2">
          <p className="text-sm font-medium text-gray-600">
            {common.reorderHint.replace("{count}", String(files.length))}
          </p>
          {files.map((f, i) => (
            <div
              key={`${f.name}-${i}`}
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
                onClick={() => move(i, -1)}
                aria-label="Move up"
                className="text-gray-400 hover:text-gray-600 text-xs"
              >
                ↑
              </button>
              <button
                onClick={() => move(i, 1)}
                aria-label="Move down"
                className="text-gray-400 hover:text-gray-600 text-xs"
              >
                ↓
              </button>
              <button
                onClick={() => removeFile(i)}
                aria-label="Remove"
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
              {buttonLabel}
            </button>
            {files.length < 2 && (
              <p className="text-xs text-gray-400 mt-2">{common.mergeHint}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
