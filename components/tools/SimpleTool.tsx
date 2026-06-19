"use client";

import { useState } from "react";
import Dropzone from "./Dropzone";
import StatusPanel from "./StatusPanel";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface SimpleToolProps {
  endpoint: string;
  accept: Record<string, string[]>;
  downloadName: string;
  buttonLabel: string;
  common: Dictionary["common"];
  icon?: string;
  /** Show a "−X%" badge computed from the size delta (used by Compress). */
  reportSavings?: boolean;
}

type Status = "idle" | "processing" | "done" | "error";

/**
 * Single-file upload → POST → download widget shared by the tools that need no
 * extra controls (compress, pdf-to-word, word-to-pdf, pdf-to-jpg).
 */
export default function SimpleTool({
  endpoint,
  accept,
  downloadName,
  buttonLabel,
  common,
  icon,
  reportSavings = false,
}: SimpleToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savings, setSavings] = useState<number | null>(null);

  async function handleProcess() {
    if (!file) return;
    setStatus("processing");
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(endpoint, { method: "POST", body: form });
      if (!res.ok) throw new Error((await res.json()).error);
      const blob = await res.blob();
      if (reportSavings) {
        setSavings(Math.round((1 - blob.size / file.size) * 100));
      }
      setDownloadUrl(URL.createObjectURL(blob));
      setStatus("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : common.errorGeneric);
      setStatus("error");
    }
  }

  function reset() {
    setFile(null);
    setStatus("idle");
    setDownloadUrl(null);
    setError(null);
    setSavings(null);
  }

  if (status !== "idle") {
    return (
      <StatusPanel
        status={status}
        common={common}
        downloadUrl={downloadUrl}
        downloadName={downloadName}
        error={error}
        onReset={reset}
        extra={
          reportSavings && savings !== null && savings > 0 ? (
            <p className="text-green-600 font-bold text-lg mb-2">−{savings}%</p>
          ) : null
        }
      />
    );
  }

  return (
    <>
      <Dropzone
        accept={accept}
        common={common}
        onFiles={(f) => setFile(f[0])}
        icon={icon}
      />
      {file && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-4">
            {common.selected}: <span className="font-medium">{file.name}</span>{" "}
            ({(file.size / 1024).toFixed(0)} KB)
          </p>
          <button
            onClick={handleProcess}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition-colors"
          >
            {buttonLabel}
          </button>
        </div>
      )}
    </>
  );
}
