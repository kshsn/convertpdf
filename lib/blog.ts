// Blog / guide articles. Original how-to content that supports the tools.
// Each section is a heading plus paragraphs (and optional bullet list).

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  tool: string; // related tool slug
  toolLabel: string;
  sections: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-merge-pdf-files",
    title: "How to Merge PDF Files Into One Document (Free, No Software)",
    description:
      "A practical guide to combining several PDF files into one: when to do it, how to keep the right order, and how to avoid oversized results.",
    date: "2026-11-10",
    tool: "merge-pdf",
    toolLabel: "Merge PDF",
    sections: [
      {
        heading: "Why merge PDFs at all?",
        paragraphs: [
          "Sending five separate attachments is easy to get wrong. Someone misses a file, opens them in the wrong order, or an email gateway drops one. A single merged PDF removes those problems: one file, one order, one thing to download.",
          "Common examples are a cover letter plus resume plus certificates for a job application, a month of receipts for an expense report, or chapters of a study pack that were scanned separately.",
        ],
      },
      {
        heading: "Step by step",
        paragraphs: [
          "Open the Merge PDF tool, then select all the files you want to combine. Once they are listed, drag them into the final order. The merged document follows exactly the order you see on screen.",
          "Click Merge, wait a few seconds, and download the result. Open it and scroll through once to confirm the order and that no page is missing.",
        ],
      },
      {
        heading: "Keep the order right from the start",
        paragraphs: [
          "If you merge the same kind of files regularly, name them with numbers: 01-cover.pdf, 02-summary.pdf, 03-appendix.pdf. Your file browser will list them in the correct order, which saves reordering later.",
        ],
      },
      {
        heading: "What about file size?",
        paragraphs: [
          "Merging adds the sizes of the files together. If the result is too large for an email or an upload form, run it through Compress PDF afterwards. Compressing one combined file is usually more effective than shrinking each source separately.",
        ],
        bullets: [
          "Merge first, compress second.",
          "Check the page order before you send.",
          "Keep your original files in case you need to rebuild the document.",
        ],
      },
      {
        heading: "Mixed page sizes and scans",
        paragraphs: [
          "Merging does not resize or crop pages. A scanned A4 page and a US Letter page will sit side by side with their own sizes. That is normal and does not affect how the file prints or displays.",
          "If a page is sideways, fix it with the Rotate PDF tool before or after merging.",
        ],
      },
    ],
  },
  {
    slug: "how-to-split-a-pdf",
    title: "How to Split a PDF: Extract Pages or Break It Into Single Pages",
    description:
      "Learn how to pull specific pages out of a PDF, use page ranges like 1-3, 5, 7-9, and split a long document into one file per page.",
    date: "2026-11-10",
    tool: "split-pdf",
    toolLabel: "Split PDF",
    sections: [
      {
        heading: "When splitting is the right move",
        paragraphs: [
          "A 200-page report is rarely useful to someone who only needs chapter four. Splitting lets you share just the part that matters, keeps private pages out of the file, and brings large documents under upload limits.",
        ],
      },
      {
        heading: "Two ways to split",
        paragraphs: [
          "The first way is to extract a range. Enter pages such as 1-3, 5, 7-9 and the tool builds a new PDF with only those pages, in order.",
          "The second way is to split everything. Leave the page field empty and every page becomes its own PDF, delivered together as a ZIP file. This is handy for a scanned batch where each page is a separate letter or form.",
        ],
      },
      {
        heading: "Getting page numbers right",
        paragraphs: [
          "Use the position of the page in the file, not the number printed on it. If the book starts with a cover and a table of contents, the printed page 1 might be file page 3. Open the PDF in your viewer and read the page counter to be sure.",
        ],
        bullets: [
          "Separate pages with commas: 2, 4, 6.",
          "Use a dash for a range: 10-15.",
          "Combine both: 1-3, 8, 12-14.",
        ],
      },
      {
        heading: "Quality stays the same",
        paragraphs: [
          "Splitting extracts pages as they are. It does not re-render or recompress anything, so text stays sharp and images keep their original resolution.",
        ],
      },
      {
        heading: "After you split",
        paragraphs: [
          "If you need the pieces back in one file in a different order, use Merge PDF. If a page came out sideways, use Rotate PDF.",
        ],
      },
    ],
  },
  {
    slug: "how-to-reduce-pdf-file-size",
    title: "How to Reduce PDF File Size Without Ruining the Document",
    description:
      "Why PDFs get so big, how compression works, and what to expect from a compressor for scans, slide decks and text documents.",
    date: "2026-11-10",
    tool: "compress-pdf",
    toolLabel: "Compress PDF",
    sections: [
      {
        heading: "Why PDFs get large",
        paragraphs: [
          "Text is tiny. A page of text takes a few kilobytes. What makes a PDF heavy is almost always images: photos, scanned pages, screenshots and slides exported from presentation software. A 30-page scan can easily reach tens of megabytes because every page is a full-size picture.",
        ],
      },
      {
        heading: "What a compressor does",
        paragraphs: [
          "A PDF compressor re-encodes the embedded images at a more efficient size and removes redundant internal data such as duplicate resources. Text, vector graphics and layout are left alone, so the document looks and reads the same.",
        ],
      },
      {
        heading: "What results to expect",
        paragraphs: [
          "Image-heavy files usually shrink the most, often by a third to well over half. A document that is mostly text has little to compress, so the reduction is small. That is not a failure. The file was already efficient.",
        ],
        bullets: [
          "Scanned documents: large savings.",
          "Slide decks exported to PDF: large savings.",
          "Text reports: small savings.",
        ],
      },
      {
        heading: "Tips for hitting a size limit",
        paragraphs: [
          "Compress a copy, not the original, so you still have a full-quality file for printing. If the result is still too big, split the document into two parts and send them separately.",
          "Merge first and compress after, because compressing once at the end tends to work better than compressing many small files and joining them.",
        ],
      },
    ],
  },
  {
    slug: "how-to-convert-pdf-to-word",
    title: "How to Convert a PDF to an Editable Word Document",
    description:
      "What to expect when you convert PDF to Word: which files convert cleanly, why scans need OCR, and how to fix layout issues.",
    date: "2026-11-10",
    tool: "pdf-to-word",
    toolLabel: "PDF to Word",
    sections: [
      {
        heading: "Why PDFs are hard to edit",
        paragraphs: [
          "A PDF is built to look the same everywhere, not to be edited. Text is placed on the page piece by piece, which is why you cannot simply click in and rewrite a paragraph. Converting to Word rebuilds paragraphs, headings and tables so you can edit them normally.",
        ],
      },
      {
        heading: "How to convert",
        paragraphs: [
          "Upload the PDF to the PDF to Word tool and click Convert. When the .docx file is ready, download it and open it in Word, Google Docs or LibreOffice Writer.",
        ],
      },
      {
        heading: "What converts well",
        paragraphs: [
          "Files that were exported from a word processor convert best, because the text structure is still inside the PDF. Headings, paragraphs and simple tables come through as editable content.",
        ],
      },
      {
        heading: "Scanned PDFs need OCR",
        paragraphs: [
          "A scan is only a picture of text. There is no text to extract, so a converter has nothing to turn into words. You need OCR (optical character recognition) first, which reads the image and produces text. If your PDF lets you select and copy a sentence, it has a text layer. If you cannot, it is probably a scan.",
        ],
      },
      {
        heading: "Cleaning up after conversion",
        paragraphs: [
          "Always review the result. Multi-column pages, nested tables and unusual fonts can shift slightly.",
        ],
        bullets: [
          "Check headings and numbering first.",
          "Look at tables for merged or split cells.",
          "Replace missing fonts with a similar one.",
          "Save the file under a new name so the PDF stays untouched.",
        ],
      },
    ],
  },
  {
    slug: "pdf-vs-word-which-to-use",
    title: "PDF vs Word: Which Format Should You Send?",
    description:
      "When to send a PDF, when to send a Word file, and how to switch between the two without losing formatting.",
    date: "2026-11-10",
    tool: "word-to-pdf",
    toolLabel: "Word to PDF",
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "Send a PDF when the document is finished and should look the same for everyone. Send Word when the other person needs to edit it.",
        ],
      },
      {
        heading: "Why PDF is the default for final documents",
        paragraphs: [
          "A PDF keeps fonts, images and page breaks fixed, so a resume that looks right on your laptop looks right on a phone and in print. It also discourages accidental edits, which matters for contracts, invoices and applications.",
        ],
      },
      {
        heading: "When Word is better",
        paragraphs: [
          "If you are collaborating, a PDF gets in the way. Drafts, shared reports and anything with tracked changes belong in an editable format like .docx.",
        ],
        bullets: [
          "Drafts and revisions: Word.",
          "Final copies, forms, invoices: PDF.",
          "Anything you will print: PDF.",
        ],
      },
      {
        heading: "Converting between them",
        paragraphs: [
          "Word to PDF is lossless in practice: layout, images and tables carry over. Going back from PDF to Word is harder, because the structure must be rebuilt, so keep your original Word file whenever you can.",
          "For a quick check, open the converted PDF and look at page breaks, headers and footers before you send it.",
        ],
      },
    ],
  },
  {
    slug: "how-to-rotate-pdf-pages",
    title: "How to Rotate a PDF That Opens Sideways or Upside-Down",
    description:
      "Fix a PDF with the wrong orientation by rotating it 90, 180 or 270 degrees, and learn why scans end up sideways.",
    date: "2026-11-10",
    tool: "rotate-pdf",
    toolLabel: "Rotate PDF",
    sections: [
      {
        heading: "Why PDFs end up sideways",
        paragraphs: [
          "Scanners and phone cameras record pages in whichever direction the paper was fed or the phone was held. The file then opens sideways or upside-down, even if the paper looked fine.",
        ],
      },
      {
        heading: "Which angle to choose",
        paragraphs: [
          "Think in clockwise turns. If the top of the page points to the left, rotate 90 degrees. If it is upside-down, use 180. If the top points to the right, use 270.",
        ],
      },
      {
        heading: "How to rotate",
        paragraphs: [
          "Upload the file to the Rotate PDF tool, choose the angle, click Rotate and download the result. The rotation applies to every page of the file, so it works best when the whole document has the same problem.",
        ],
      },
      {
        heading: "Mixed orientation",
        paragraphs: [
          "If only some pages are wrong, split the document first with Split PDF, rotate the pages that need it, and merge everything back together with Merge PDF.",
        ],
      },
      {
        heading: "Does rotating reduce quality?",
        paragraphs: [
          "No. Rotating changes how the page is displayed, not what is on it, so text and images keep their quality.",
        ],
      },
    ],
  },
  {
    slug: "how-to-convert-pdf-to-jpg",
    title: "How to Convert PDF Pages to JPG Images",
    description:
      "Turn PDF pages into JPG images for slides, social posts and websites, and learn when an image is the wrong choice.",
    date: "2026-11-10",
    tool: "pdf-to-jpg",
    toolLabel: "PDF to JPG",
    sections: [
      {
        heading: "When an image beats a PDF",
        paragraphs: [
          "Chat apps, social networks and many website builders accept images but not PDF files. If you want to show a page of a brochure, a poster or a certificate, an image is the easiest way to share it.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "Upload your PDF to the PDF to JPG tool and click Convert. Each page is rendered as a JPG image and the images are delivered together in a ZIP file, ready to download and unpack.",
        ],
      },
      {
        heading: "Quality and size",
        paragraphs: [
          "Pages are rendered at a resolution that suits screens and presentations. Pages with photos look great as JPG. Pages with small, sharp text may look slightly softer than the vector text in the PDF, so zoom in to check before you publish.",
        ],
      },
      {
        heading: "Only need one page?",
        paragraphs: [
          "Split the PDF first so you convert only the page you need. That saves time and avoids a ZIP full of images you will not use.",
        ],
      },
      {
        heading: "When not to convert",
        paragraphs: [
          "If someone needs to select text, search the document or edit it, keep it as a PDF or convert to Word instead. A JPG is just a picture.",
        ],
      },
    ],
  },
  {
    slug: "how-to-password-protect-a-pdf",
    title: "How to Password-Protect a PDF Before You Share It",
    description:
      "Add a password to a PDF so only the right people can open it, and learn how to choose and share the password safely.",
    date: "2026-11-10",
    tool: "protect-pdf",
    toolLabel: "Protect PDF",
    sections: [
      {
        heading: "When you should protect a PDF",
        paragraphs: [
          "Email is not private by default. If you are sending a tax form, a contract, a payslip or an ID scan, a password adds a second barrier. Even if the message reaches the wrong inbox, the file cannot be opened without it.",
        ],
      },
      {
        heading: "How to add a password",
        paragraphs: [
          "Upload the file to the Protect PDF tool, type the password people will need to open it, click Protect and download the new file. The protected PDF asks for the password every time someone opens it.",
        ],
      },
      {
        heading: "Choose a strong password",
        paragraphs: [
          "Short words and birthdays are easy to guess. A passphrase of several random words is easier to remember and much harder to crack.",
        ],
        bullets: [
          "Aim for at least 12 characters.",
          "Avoid names, dates and common words on their own.",
          "Do not reuse the password from an important account.",
        ],
      },
      {
        heading: "Share the password separately",
        paragraphs: [
          "Never put the password in the same email as the file. Send it in a text message, a phone call or a different chat app. That way a single intercepted message is not enough.",
        ],
      },
      {
        heading: "Do not lose it",
        paragraphs: [
          "A protected PDF cannot be opened without its password, and we cannot recover it. Keep the password in a password manager and keep an unprotected copy of the original in a safe place.",
        ],
      },
    ],
  },
  {
    slug: "pdf-file-size-limits-email",
    title: "PDF Too Big to Email? Practical Ways to Get Under the Limit",
    description:
      "Email services cap attachment size. Here is how to shrink, split or restructure a PDF so it goes through the first time.",
    date: "2026-11-10",
    tool: "compress-pdf",
    toolLabel: "Compress PDF",
    sections: [
      {
        heading: "Why the email bounces",
        paragraphs: [
          "Most email providers limit attachments to roughly 20-25 MB, and the encoding that email uses makes a file about a third bigger in transit. A PDF that looks like 18 MB on disk can be rejected for that reason, so aim to be comfortably below the limit, not right at it.",
        ],
      },
      {
        heading: "Option 1: compress the file",
        paragraphs: [
          "Image-heavy PDFs, such as scans and exported slides, usually shrink a lot. Use the Compress PDF tool and check the new size before you attach it.",
        ],
      },
      {
        heading: "Option 2: split it into parts",
        paragraphs: [
          "If compression is not enough, split the document with Split PDF, for example the first half and the second half, and send two emails. The recipient can merge them again if needed.",
        ],
      },
      {
        heading: "Option 3: send only what is needed",
        paragraphs: [
          "Does the recipient need all 120 pages? Extract the relevant pages and send those. Smaller files are faster to open and easier to review.",
        ],
      },
      {
        heading: "Option 4: share a link",
        paragraphs: [
          "For very large files, upload to a cloud drive and share a link instead. If the file is sensitive, protect it with a password and send that password separately.",
        ],
        bullets: [
          "Compress, then check the size.",
          "Split if still too large.",
          "Protect sensitive files before sending.",
        ],
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
