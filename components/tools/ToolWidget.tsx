"use client";

import MergeTool from "./MergeTool";
import SplitTool from "./SplitTool";
import RotateTool from "./RotateTool";
import ProtectTool from "./ProtectTool";
import SimpleTool from "./SimpleTool";
import type { Dictionary, ToolContent } from "@/lib/i18n/dictionaries";

interface ToolWidgetProps {
  slug: string;
  content: ToolContent;
  common: Dictionary["common"];
}

const PDF_ONLY = { "application/pdf": [".pdf"] };
const WORD = {
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "application/msword": [".doc"],
};

/**
 * Renders the correct interactive widget for a tool slug. Single client entry
 * point so both English-at-root and /[locale] pages share the same logic.
 */
export default function ToolWidget({ slug, content, common }: ToolWidgetProps) {
  const label = content.title;

  switch (slug) {
    case "merge-pdf":
      return <MergeTool buttonLabel={label} common={common} />;
    case "split-pdf":
      return <SplitTool buttonLabel={label} common={common} />;
    case "rotate-pdf":
      return <RotateTool buttonLabel={label} common={common} />;
    case "protect-pdf":
      return <ProtectTool buttonLabel={label} common={common} />;
    case "compress-pdf":
      return (
        <SimpleTool
          endpoint="/api/process/compress"
          accept={PDF_ONLY}
          downloadName="compressed.pdf"
          buttonLabel={label}
          common={common}
          reportSavings
        />
      );
    case "pdf-to-word":
      return (
        <SimpleTool
          endpoint="/api/process/pdf-to-word"
          accept={PDF_ONLY}
          downloadName="converted.docx"
          buttonLabel={label}
          common={common}
        />
      );
    case "word-to-pdf":
      return (
        <SimpleTool
          endpoint="/api/process/word-to-pdf"
          accept={WORD}
          downloadName="converted.pdf"
          buttonLabel={label}
          common={common}
        />
      );
    case "pdf-to-jpg":
      return (
        <SimpleTool
          endpoint="/api/process/pdf-to-jpg"
          accept={PDF_ONLY}
          downloadName="pages.zip"
          buttonLabel={label}
          common={common}
        />
      );
    default:
      return null;
  }
}
