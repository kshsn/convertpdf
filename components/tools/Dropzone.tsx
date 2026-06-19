"use client";

import { useDropzone } from "react-dropzone";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface DropzoneProps {
  accept: Record<string, string[]>;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  common: Dictionary["common"];
  icon?: string;
}

/** Localized drag-and-drop area shared by every tool widget. */
export default function Dropzone({
  accept,
  multiple = false,
  onFiles,
  common,
  icon = "📂",
}: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple,
    onDrop: (accepted) => {
      if (accepted.length) onFiles(accepted);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${
        isDragActive
          ? "border-red-500 bg-red-50"
          : "border-gray-300 hover:border-red-400 hover:bg-gray-50"
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-4xl mb-3">{icon}</p>
      <p className="font-semibold text-gray-700">
        {isDragActive ? common.drop : common.dragHere}
      </p>
      <p className="text-sm text-gray-400 mt-1">{common.browse}</p>
    </div>
  );
}
