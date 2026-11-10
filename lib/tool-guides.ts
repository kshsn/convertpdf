// English-only "how to / tips / when to use it" copy shown below each tool.
// It is original explanatory content that sits next to the tool widget so
// every tool page has substantial text, not just an upload box.

export interface ToolGuide {
  stepsTitle: string;
  steps: string[];
  tipsTitle: string;
  tips: string[];
  useCasesTitle: string;
  useCases: { title: string; text: string }[];
  relatedBlog: string[]; // blog slugs
}

export const TOOL_GUIDES: Record<string, ToolGuide> = {
  "merge-pdf": {
    stepsTitle: "How to merge PDF files",
    steps: [
      "Click the upload area, or drag your PDF files onto it. You can select several files at once.",
      "Drag the file cards up or down until they are in the order you want the final document to follow.",
      "Click Merge. The combined file is built in a few seconds.",
      "Download the merged PDF. Your uploads are removed from our servers after the download finishes.",
    ],
    tipsTitle: "Tips for cleaner merged documents",
    tips: [
      "Name your files with numbers (01-cover.pdf, 02-report.pdf) so they already sit in the right order when you select them.",
      "Merge before you compress. Compressing one combined file is usually smaller than compressing each file separately and then joining them.",
      "If one of your files has a different page size, that is fine: every page keeps its own size and orientation.",
      "Need only part of a file? Use Split PDF first to pull out the pages you want, then merge them.",
    ],
    useCasesTitle: "When people merge PDFs",
    useCases: [
      {
        title: "Job applications",
        text: "Combine a cover letter, resume and certificates into one file, which is what many application portals ask for.",
      },
      {
        title: "Invoices and receipts",
        text: "Join a month of receipts into one document for an expense report or for your accountant.",
      },
      {
        title: "Study material",
        text: "Put lecture notes, handouts and past exams into a single file that is easy to search and annotate.",
      },
    ],
    relatedBlog: ["how-to-merge-pdf-files", "pdf-file-size-limits-email"],
  },
  "split-pdf": {
    stepsTitle: "How to split a PDF",
    steps: [
      "Upload the PDF you want to split.",
      "Type the pages you need, for example 1-3, 5, 7-9. Leave the field empty to turn every page into its own file.",
      "Click Split and wait a few seconds.",
      "Download the result: one PDF for a page range, or a ZIP with one PDF per page.",
    ],
    tipsTitle: "Getting the page range right",
    tips: [
      "Page numbers refer to the position in the file, not the number printed on the page. A cover page counts as page 1.",
      "Use commas to separate pages and a dash for ranges. Spaces are ignored, so 1-3,5 and 1-3, 5 mean the same thing.",
      "If you only want to remove a few pages, list every page you want to keep rather than the ones to drop.",
      "Splitting does not re-render pages, so text, fonts and images stay exactly as they were.",
    ],
    useCasesTitle: "When people split PDFs",
    useCases: [
      {
        title: "Sharing one chapter",
        text: "Send a single chapter or section of a long report instead of the whole document.",
      },
      {
        title: "Separating scanned batches",
        text: "A scanner often produces one long PDF. Split it so each letter, invoice or form is its own file.",
      },
      {
        title: "Staying under size limits",
        text: "Break a large document into smaller parts that fit an email or upload limit.",
      },
    ],
    relatedBlog: ["how-to-split-a-pdf", "pdf-file-size-limits-email"],
  },
  "compress-pdf": {
    stepsTitle: "How to compress a PDF",
    steps: [
      "Upload the PDF you want to make smaller.",
      "Click Compress. The tool re-encodes embedded images and removes redundant internal data.",
      "Download it and check the new file size in your file manager against the original.",
      "Use the smaller file. Text and page layout are unchanged.",
    ],
    tipsTitle: "Why some PDFs shrink more than others",
    tips: [
      "Image-heavy PDFs, such as scans, brochures and slide decks, usually shrink the most because images make up most of their size.",
      "A PDF that is mostly text is already compact, so expect a smaller reduction.",
      "If you still need a smaller file, try splitting the document into parts and sending them separately.",
      "Keep your original. Compress a copy so you always have the full-quality version for printing.",
    ],
    useCasesTitle: "When people compress PDFs",
    useCases: [
      {
        title: "Email attachments",
        text: "Most email services limit attachments to roughly 20-25 MB. Compression often gets a file under that line.",
      },
      {
        title: "Online forms and portals",
        text: "Government, school and job portals frequently set a maximum upload size.",
      },
      {
        title: "Saving storage",
        text: "Archives of scanned documents take much less space once the images are optimized.",
      },
    ],
    relatedBlog: ["how-to-reduce-pdf-file-size", "pdf-file-size-limits-email"],
  },
  "pdf-to-word": {
    stepsTitle: "How to convert a PDF to Word",
    steps: [
      "Upload your PDF.",
      "Click Convert. The tool extracts the text, headings, tables and basic formatting.",
      "Download the .docx file.",
      "Open it in Word, Google Docs or LibreOffice and review the layout before you edit.",
    ],
    tipsTitle: "Getting the best conversion",
    tips: [
      "PDFs exported from Word or Google Docs convert best because their text structure is still inside the file.",
      "A scanned PDF is really a set of pictures. With no text layer there is nothing to extract, so run OCR first.",
      "Complex layouts such as multi-column magazines or nested tables may need small manual fixes after conversion.",
      "Check fonts. If the original font is not installed on your computer, Word will substitute a similar one.",
    ],
    useCasesTitle: "When people convert PDF to Word",
    useCases: [
      {
        title: "Editing a contract or form",
        text: "Update names, dates or clauses without retyping the whole document.",
      },
      {
        title: "Reusing report content",
        text: "Pull text and tables from a PDF report into a new document or presentation.",
      },
      {
        title: "Updating an old resume",
        text: "If you only have the PDF of your resume, convert it to Word to make changes.",
      },
    ],
    relatedBlog: ["how-to-convert-pdf-to-word", "pdf-vs-word-which-to-use"],
  },
  "word-to-pdf": {
    stepsTitle: "How to convert Word to PDF",
    steps: [
      "Upload a .doc or .docx file.",
      "Click Convert. The document is rendered with its fonts, images, headers and footers.",
      "Download the PDF.",
      "Open it and check the page breaks before you send it.",
    ],
    tipsTitle: "Before you convert",
    tips: [
      "Use common fonts, or embed fonts in Word, so the PDF looks the same as your screen.",
      "Check page breaks and tables in Word's Print Layout view. The PDF follows that layout.",
      "Remove tracked changes and comments if you do not want them to be visible in the PDF.",
      "Keep the Word file as your editable master and send the PDF as the final copy.",
    ],
    useCasesTitle: "When people convert Word to PDF",
    useCases: [
      {
        title: "Resumes and applications",
        text: "A PDF looks identical on every device and cannot be changed by accident.",
      },
      {
        title: "Contracts and invoices",
        text: "Send a fixed, final version that the recipient can read but not casually edit.",
      },
      {
        title: "Printing",
        text: "A PDF prints the same on any printer, with no layout shifts.",
      },
    ],
    relatedBlog: ["pdf-vs-word-which-to-use", "how-to-convert-pdf-to-word"],
  },
  "rotate-pdf": {
    stepsTitle: "How to rotate PDF pages",
    steps: [
      "Upload your PDF.",
      "Choose the rotation angle: 90, 180 or 270 degrees clockwise.",
      "Click Rotate. The angle is applied to every page of the document.",
      "Download the corrected PDF.",
    ],
    tipsTitle: "Rotation tips",
    tips: [
      "Because the rotation applies to the whole file, it works best when all pages share the same problem. For mixed orientation, split the file first and rotate the parts separately.",
      "Scanned documents often come out sideways or upside-down. Rotating fixes how they open, not just how they print.",
      "Rotate by 90 degrees to turn a landscape page to portrait, and by 180 to flip an upside-down page.",
      "Rotation does not change the content, so quality stays the same.",
      "Check the result on screen before you send it on.",
    ],
    useCasesTitle: "When people rotate PDFs",
    useCases: [
      {
        title: "Fixing scans",
        text: "Correct pages that were fed into the scanner the wrong way.",
      },
      {
        title: "Phone photos saved as PDF",
        text: "Camera apps sometimes save pages in the wrong orientation.",
      },
      {
        title: "Presentation handouts",
        text: "Turn landscape slides so they display properly on screen.",
      },
    ],
    relatedBlog: ["how-to-rotate-pdf-pages", "how-to-split-a-pdf"],
  },
  "pdf-to-jpg": {
    stepsTitle: "How to convert PDF to JPG",
    steps: [
      "Upload your PDF.",
      "Click Convert. Each page is turned into a separate JPG image.",
      "Download the ZIP file. It contains one JPG per page, numbered in order.",
      "Use the images in a presentation, website or chat.",
    ],
    tipsTitle: "Working with PDF page images",
    tips: [
      "JPG is best for pages with photos. Pages with sharp text can look slightly softer than the PDF.",
      "If you only need one page, use Split PDF first so you convert just that page.",
      "Images are larger than the text-based PDF in most cases, so plan for more storage.",
      "For a document that must stay editable, convert to Word instead of JPG.",
    ],
    useCasesTitle: "When people convert PDF to JPG",
    useCases: [
      {
        title: "Posting a page online",
        text: "Many websites and chat apps accept images but not PDF files.",
      },
      {
        title: "Slides and design work",
        text: "Drop a PDF page into a presentation or design tool as an image.",
      },
      {
        title: "Previews",
        text: "Create a quick thumbnail of the first page of a document.",
      },
    ],
    relatedBlog: ["how-to-convert-pdf-to-jpg", "how-to-split-a-pdf"],
  },
  "protect-pdf": {
    stepsTitle: "How to password-protect a PDF",
    steps: [
      "Upload your PDF.",
      "Enter the password you want people to use to open the file.",
      "Click Protect.",
      "Download the protected PDF and share the password through a different channel.",
    ],
    tipsTitle: "Choosing and sharing a password",
    tips: [
      "Use a long password or passphrase, at least 12 characters, rather than a short word or a date.",
      "Never send the password in the same message as the file. Use a call, a text or another app.",
      "Store the password somewhere safe. A protected PDF cannot be opened without it, and we cannot recover it for you.",
      "Keep an unprotected copy of the original in a secure place so you can make changes later.",
    ],
    useCasesTitle: "When people protect PDFs",
    useCases: [
      {
        title: "Financial documents",
        text: "Add a password before emailing statements, tax forms or invoices.",
      },
      {
        title: "Contracts and HR files",
        text: "Keep sensitive agreements private when they are shared with a limited group.",
      },
      {
        title: "Personal records",
        text: "Protect scans of IDs, medical records or legal papers stored in the cloud.",
      },
    ],
    relatedBlog: ["how-to-password-protect-a-pdf", "pdf-file-size-limits-email"],
  },
};
