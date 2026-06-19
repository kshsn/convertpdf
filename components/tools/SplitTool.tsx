"use client";

import { useState } from "react";
import Dropzone from "./Dropzone";
import StatusPanel from "./StatusPanel";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface SplitToolProps {
  buttonLabel: string;
  common: Dictionary["common"];
}

type Status = "idle" | "processing" | "done" | "error";

/** Split a PDF by page range. */
export default function SplitTool({ buttonLabel, common }: SplitToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      setError(e instanceof Error ? e.message : common.errorGeneric);
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

  if (status !== "idle") {
    return (
      <StatusPanel
        status={status}
        common={common}
        downloadUrl={downloadUrl}
        downloadName="split-pages.zip"
        error={error}
        onReset={reset}
      />
    );
  }

  return (
    <>
      <Dropzone
        accept={{ "application/pdf": [".pdf"] }}
        common={common}
        onFiles={(f) => setFile(f[0])}
      />
      {file && (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-gray-600">
            {common.selected}: <span className="font-medium">{file.name}</span>
          </p>
          <div>
            <label
              htmlFor="split-pages"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {common.pagesLabel}
            </label>
            <input
              id="split-pages"
              type="text"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder={common.pagesPlaceholder}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-red-400"
            />
          </div>
          <div className="text-center">
            <button
              onClick={handleSplit}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition-colors"
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
