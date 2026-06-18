"use client";

import { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";

interface UploadZoneProps {
  accept: Record<string, string[]>;
  maxSize?: number;
  onFile: (file: File) => void;
  label?: string;
}

export default function UploadZone({
  accept,
  maxSize = 10 * 1024 * 1024,
  onFile,
  label,
}: UploadZoneProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      setError(null);
      if (rejected.length > 0) {
        const msg = rejected[0].errors[0].message;
        setError(msg);
        return;
      }
      if (accepted[0]) onFile(accepted[0]);
    },
    [onFile],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors
        ${isDragActive ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-red-400 hover:bg-gray-50"}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        <div className="text-5xl">📂</div>
        <div>
          <p className="text-lg font-semibold text-gray-700">
            {isDragActive
              ? "Drop your file here"
              : (label ?? "Drag & drop your file here")}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            or click to browse — max {Math.round(maxSize / 1024 / 1024)}MB
          </p>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
