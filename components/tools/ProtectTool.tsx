"use client";

import { useState } from "react";
import Dropzone from "./Dropzone";
import StatusPanel from "./StatusPanel";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface ProtectToolProps {
  buttonLabel: string;
  common: Dictionary["common"];
}

type Status = "idle" | "processing" | "done" | "error";

/** Add a password to a PDF. */
export default function ProtectTool({ buttonLabel, common }: ProtectToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [pwd, setPwd] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      setError(e instanceof Error ? e.message : common.errorGeneric);
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

  if (status !== "idle") {
    return (
      <StatusPanel
        status={status}
        common={common}
        downloadUrl={downloadUrl}
        downloadName="protected.pdf"
        error={error}
        onReset={reset}
        doneEmoji="🔐"
      />
    );
  }

  return (
    <>
      <Dropzone
        accept={{ "application/pdf": [".pdf"] }}
        common={common}
        onFiles={(f) => setFile(f[0])}
        icon="🔒"
      />
      {file && (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-gray-600">
            {common.selected}: <span className="font-medium">{file.name}</span>
          </p>
          <div>
            <label
              htmlFor="pdf-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {common.passwordLabel}
            </label>
            <input
              id="pdf-password"
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder={common.passwordPlaceholder}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div className="text-center">
            <button
              onClick={handleProtect}
              disabled={!pwd}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white font-bold py-3 px-10 rounded-full transition-colors"
            >
              {buttonLabel}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
