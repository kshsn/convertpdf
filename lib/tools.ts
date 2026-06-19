export const TOOLS = [
  {
    slug: "merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDF files into one",
    icon: "🔗",
    keyword: "merge pdf free",
    searches: 450000,
  },
  {
    slug: "split-pdf",
    title: "Split PDF",
    description: "Extract pages or split PDF by range",
    icon: "✂️",
    keyword: "split pdf online",
    searches: 200000,
  },
  {
    slug: "compress-pdf",
    title: "Compress PDF",
    description: "Reduce PDF file size without losing quality",
    icon: "🗜️",
    keyword: "compress pdf free",
    searches: 300000,
  },
  {
    slug: "pdf-to-word",
    title: "PDF to Word",
    description: "Convert PDF to editable Word document",
    icon: "📝",
    keyword: "pdf to word converter",
    searches: 500000,
  },
  {
    slug: "word-to-pdf",
    title: "Word to PDF",
    description: "Convert Word document to PDF",
    icon: "📄",
    keyword: "word to pdf online",
    searches: 350000,
  },
  {
    slug: "rotate-pdf",
    title: "Rotate PDF",
    description: "Rotate PDF pages to the correct orientation",
    icon: "🔄",
    keyword: "rotate pdf pages",
    searches: 100000,
  },
  {
    slug: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Convert PDF pages to JPG images",
    icon: "🖼️",
    keyword: "pdf to jpg converter",
    searches: 150000,
  },
] as const;

export type ToolSlug = (typeof TOOLS)[number]["slug"];

// Every tool that has a page, including protect-pdf (which is not in the home
// grid). Used to generate localized routes and validate /[locale]/[tool].
export const ALL_TOOL_SLUGS = [
  "merge-pdf",
  "split-pdf",
  "compress-pdf",
  "pdf-to-word",
  "word-to-pdf",
  "rotate-pdf",
  "pdf-to-jpg",
  "protect-pdf",
] as const;
