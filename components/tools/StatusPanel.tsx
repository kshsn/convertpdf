"use client";

import type { Dictionary } from "@/lib/i18n/dictionaries";

type Status = "processing" | "done" | "error";

interface StatusPanelProps {
  status: Status;
  common: Dictionary["common"];
  downloadUrl?: string | null;
  downloadName?: string;
  error?: string | null;
  onReset: () => void;
  doneEmoji?: string;
  /** Optional extra node rendered above the download button (e.g. compression badge). */
  extra?: React.ReactNode;
}

/**
 * Shared processing / done / error states with the ad slots that appear during
 * and after a tool run. Localized via the `common` dictionary.
 */
export default function StatusPanel({
  status,
  common,
  downloadUrl,
  downloadName = "download",
  error,
  onReset,
  doneEmoji = "✅",
  extra,
}: StatusPanelProps) {
  if (status === "processing") {
    return (
      <div className="text-center py-16">
        <div className="inline-block w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-600 font-medium">{common.processing}</p>
        <div className="mt-8 bg-gray-200 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm">
          {common.advertisement}
        </div>
      </div>
    );
  }

  if (status === "done" && downloadUrl) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">{doneEmoji}</div>
        {extra}
        <h2 className="text-xl font-bold text-gray-800 mb-6">{common.done}</h2>
        <a
          href={downloadUrl}
          download={downloadName}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition-colors inline-block"
        >
          {common.download}
        </a>
        <div className="mt-8 bg-gray-200 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm">
          {common.advertisement}
        </div>
        <button
          onClick={onReset}
          className="mt-6 text-sm text-red-600 hover:underline block mx-auto"
        >
          {common.another}
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <p className="text-red-600 font-medium mb-4">
          {error ?? common.errorGeneric}
        </p>
        <button
          onClick={onReset}
          className="text-sm text-red-600 hover:underline"
        >
          {common.another}
        </button>
      </div>
    );
  }

  return null;
}
