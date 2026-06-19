"use client";

import { useState } from "react";
import Dropzone from "./Dropzone";
import StatusPanel from "./StatusPanel";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface RotateToolProps {
  buttonLabel: string;
  common: Dictionary["common"];
}

type Status = "idle" | "processing" | "done" | "error";

const ANGLES = ["90", "180", "270"] as const;
const ANGLE_ICON: Record<string, string> = {
  "90": "↻",
  "180": "↕",
  "270": "↺",
};

/** Rotate all pages of a PDF by a chosen angle. */
export default function RotateTool({ buttonLabel, common }: RotateToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [angle, setAngle] = useState("90");
  const [status, setStatus] = useState<Status>("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      setError(e instanceof Error ? e.message : common.errorGeneric);
      setStatus("error");
    }
  }

  function reset() {
    setFile(null);
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
        downloadName="rotated.pdf"
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
            <p className="block text-sm font-medium text-gray-700 mb-2">
              {common.angleLabel}
            </p>
            <div className="flex gap-3">
              {ANGLES.map((a) => (
                <button
                  key={a}
                  onClick={() => setAngle(a)}
                  className={`flex-1 py-2 rounded-xl border text-sm font-medium transition-colors ${
                    angle === a
                      ? "border-red-500 bg-red-50 text-red-600"
                      : "border-gray-300 hover:border-red-400"
                  }`}
                >
                  {a}° {ANGLE_ICON[a]}
                </button>
              ))}
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={handleRotate}
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
