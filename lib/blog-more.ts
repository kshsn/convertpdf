// Additional long-form guides. Merged into BLOG_POSTS in lib/blog.ts.
import type { BlogPost } from "./blog";

export const MORE_POSTS: BlogPost[] = [
  {
    slug: "what-is-a-pdf-file",
    title: "What Is a PDF File? A Plain-English Guide to the Format",
    description:
      "What PDF stands for, why it was created, what is inside a PDF file, and why it is still the standard for sharing finished documents.",
    date: "2026-11-10",
    tool: "merge-pdf",
    toolLabel: "Merge PDF",
    sections: [
      {
        heading: "PDF in one sentence",
        paragraphs: [
          "PDF stands for Portable Document Format. It is a file type designed so that a document looks the same no matter which device, operating system or program opens it. A contract you create on a Windows laptop will show the same fonts, the same line breaks and the same page layout on a phone, a Mac or a printer.",
          "That promise is the whole reason PDF exists. Before it, sending a document to someone often meant their computer substituted missing fonts, shifted tables and broke page layouts. PDF fixed that by describing each page as a fixed picture of text, images and shapes rather than as flowing text that can reflow.",
        ],
      },
      {
        heading: "What is actually inside a PDF",
        paragraphs: [
          "A PDF is a container. Inside it are pages, and each page has instructions for drawing text, images and vector shapes at exact positions. Fonts used in the document are usually embedded so the viewer does not need them installed. The file also stores metadata such as the title, author and creation date, and it can hold extras such as links, bookmarks, form fields, comments and attachments.",
          "Because pages are drawn at fixed positions, a PDF is great for reading and printing but awkward for editing. There is no concept of a paragraph that wraps when you add a word, which is why editing a PDF directly is harder than editing a word-processor file.",
        ],
      },
      {
        heading: "Text PDFs and scanned PDFs",
        paragraphs: [
          "Not every PDF is the same inside. A PDF exported from a word processor contains real text, so you can select it, search it and copy it. A scanned PDF is different: each page is just a photograph of paper. It looks like a document, but the computer sees only a picture, so you cannot search or select words unless the file has been processed with OCR.",
          "You can tell which kind you have by trying to select a sentence with your mouse. If the words highlight, it contains text. If the whole page highlights as one block, it is an image.",
        ],
      },
      {
        heading: "Why PDF is still everywhere",
        paragraphs: [
          "PDF has stayed popular for decades because it solves a practical problem well. Final documents such as invoices, resumes, contracts, manuals and forms need to look identical for every reader and should not change by accident. PDF viewers are built into every major browser and phone, so the recipient does not need to buy or install anything.",
        ],
        bullets: [
          "Consistent appearance on every device.",
          "Reliable printing with predictable page breaks.",
          "Widely accepted by employers, banks, schools and government portals.",
          "Supports passwords to control who can open the file.",
        ],
      },
      {
        heading: "Everyday things you can do with a PDF",
        paragraphs: [
          "Most people only need a handful of operations: combine several files into one, pull out a few pages, shrink a large file, convert to or from Word, turn pages into images, rotate a sideways scan, or add a password. Each of these is a small, well-defined task, and each has its own tool and guide on this site.",
          "If you are new to PDFs, start with the task you actually have. Need one file instead of five? Merge. Need one chapter? Split. Email bouncing because the file is too big? Compress. Everything else follows from those basics.",
        ],
      },
    ],
  },
  {
    slug: "combine-scanned-documents-into-one-pdf",
    title: "How to Combine Scanned Documents Into One Clean PDF",
    description:
      "A step-by-step workflow for turning a pile of scanned pages and phone photos into one tidy, correctly ordered, reasonably sized PDF.",
    date: "2026-11-10",
    tool: "merge-pdf",
    toolLabel: "Merge PDF",
    sections: [
      {
        heading: "The typical problem",
        paragraphs: [
          "You scanned a stack of paper and ended up with a dozen files: some sideways, some upside-down, in the wrong order, and some much larger than others. Sending them like that is messy. The goal is a single PDF that opens the right way up, follows the right page order and is small enough to email.",
          "The fix is a short workflow: fix orientation, merge in order, then compress. Doing the steps in that order gives the best result.",
        ],
      },
      {
        heading: "Step 1: Check each scan",
        paragraphs: [
          "Open the files and look for problems before you combine anything. Pages that are sideways or upside-down are the most common issue, because scanners and phone cameras record orientation differently from how you held the paper.",
          "If a whole file is the wrong way round, fix it with the Rotate PDF tool. Choose 90 degrees for a quarter turn clockwise, 180 for upside-down, or 270 for a quarter turn the other way. Rotation applies to every page in the file, so if only some pages are wrong, split them out first.",
        ],
      },
      {
        heading: "Step 2: Put the files in order",
        paragraphs: [
          "Rename the files with numbers at the start so they sort correctly: 01-application.pdf, 02-id-copy.pdf, 03-proof-of-address.pdf. When you add them to the Merge PDF tool you can also drag them into the final order on screen. The merged file follows exactly that order.",
        ],
        bullets: [
          "Use two digits (01, 02 ... 10) so ten sorts after nine.",
          "Keep names short and descriptive.",
          "Avoid special characters in file names.",
        ],
      },
      {
        heading: "Step 3: Merge",
        paragraphs: [
          "Upload the files, confirm the order, and click Merge. Pages keep their original size and orientation, so a mix of paper sizes will simply sit in sequence. Scroll through the result once to confirm nothing is missing and every page reads the right way up.",
        ],
      },
      {
        heading: "Step 4: Reduce the size if needed",
        paragraphs: [
          "Scans are usually image-heavy, which means they compress well. After merging, run the file through Compress PDF. Compressing the merged file once is better than shrinking each scan separately. Check the final size against whatever limit applies, for example an email provider or an online application form.",
        ],
      },
      {
        heading: "Tips for better scans in the first place",
        paragraphs: [
          "Scan at a moderate resolution, enough to read small print but not so high that each page is several megabytes. Use a flat surface and even lighting for phone scans. Keep the paper straight in the frame, because a skewed page is harder to read and may need cropping later.",
          "If you will need to search or copy the text later, remember that a scan is only an image. You would need OCR to make the text selectable.",
        ],
      },
    ],
  },
  {
    slug: "pdf-quality-vs-file-size",
    title: "PDF Quality vs File Size: What You Trade When You Compress",
    description:
      "Understand what makes PDFs large, what lossless and lossy compression mean, and how to choose the right balance for email, web and print.",
    date: "2026-11-10",
    tool: "compress-pdf",
    toolLabel: "Compress PDF",
    sections: [
      {
        heading: "Size and quality pull in opposite directions",
        paragraphs: [
          "Every file size reduction comes from removing something: redundant data, unnecessary detail, or precision you can barely see. The art of compression is removing the parts nobody will notice. The more aggressively you compress, the more likely it is that something noticeable goes with it.",
          "For PDFs, the good news is that the biggest savings usually come from places that do not affect readability.",
        ],
      },
      {
        heading: "Where the bytes go",
        paragraphs: [
          "Text and vector graphics are compact. A page of text may take only a few kilobytes. Images are different. A single full-color photo at high resolution can be several megabytes, and a scanned page is exactly that: a full-page image. So when a PDF is large, the cause is almost always its images.",
        ],
        bullets: [
          "Scanned documents: every page is an image.",
          "Brochures and catalogs: many high-resolution photos.",
          "Slide decks exported to PDF: screenshots and backgrounds.",
          "Text reports: usually small to begin with.",
        ],
      },
      {
        heading: "Lossless versus lossy",
        paragraphs: [
          "Lossless compression shrinks data without discarding any information. It is like packing a suitcase more carefully. Lossy compression, such as JPG for photos, throws away fine detail that is hard for the eye to see. Used gently, lossy methods can make images much smaller with no visible change. Used aggressively, they cause blur and blocky artifacts.",
          "A good PDF compressor focuses on what is safe: it optimizes embedded images and removes redundant internal data, while leaving text, fonts and layout alone.",
        ],
      },
      {
        heading: "Choose by purpose",
        paragraphs: [
          "Ask what the file is for before deciding how small it needs to be.",
        ],
        bullets: [
          "Email or upload forms: smaller is better, readability is enough.",
          "On-screen reading: moderate compression is fine.",
          "Professional printing: keep the original high-resolution file.",
          "Archiving: keep the original, and compress only copies you share.",
        ],
      },
      {
        heading: "A safe workflow",
        paragraphs: [
          "Always compress a copy. Keep the original untouched in case you need full quality later. After compressing, open the result and zoom in on small text, charts and photos to confirm they still look right. If a page looks wrong, you still have the source.",
          "If the file is still too big, consider splitting it into two parts or removing pages that are not needed, rather than compressing harder.",
        ],
      },
    ],
  },
  {
    slug: "how-to-edit-a-pdf-for-free",
    title: "How to Edit a PDF for Free: Four Practical Methods",
    description:
      "Need to change text, remove pages or reorganize a PDF? Here are the practical ways to edit a PDF without buying expensive software.",
    date: "2026-11-10",
    tool: "pdf-to-word",
    toolLabel: "PDF to Word",
    sections: [
      {
        heading: "First, decide what kind of edit you need",
        paragraphs: [
          "People say 'edit a PDF' to mean very different things. Changing a sentence of text is a different problem from deleting a page, and both are different from rearranging chapters. Choosing the right method for the job saves a lot of frustration.",
        ],
      },
      {
        heading: "Method 1: Convert to Word, edit, convert back",
        paragraphs: [
          "For changing text, the most reliable free method is to convert the PDF to a Word document, edit it there, and convert it back to PDF. Use the PDF to Word tool to get an editable .docx file, make your changes in Word, Google Docs or LibreOffice, then export the result to PDF with the Word to PDF tool.",
          "This works best for documents that came from a word processor. Complex layouts with multiple columns or nested tables may need some tidying after conversion, so review the result before you send it.",
        ],
      },
      {
        heading: "Method 2: Remove or extract pages",
        paragraphs: [
          "If you only want to delete pages, you do not need to edit anything. Use the Split PDF tool and enter the pages you want to keep, for example 1-4, 6-10. The new file contains only those pages, and the original is untouched.",
        ],
      },
      {
        heading: "Method 3: Rearrange or combine documents",
        paragraphs: [
          "To change the order of chapters or to add pages from another file, split out the sections you need and then use Merge PDF to put them back together in your preferred order. Merging follows the order of the files you arrange on screen.",
        ],
      },
      {
        heading: "Method 4: Fix orientation",
        paragraphs: [
          "If pages are sideways or upside-down, rotate the file with the Rotate PDF tool. The rotation applies to every page, so for mixed orientation split the document first.",
        ],
      },
      {
        heading: "What about scanned PDFs?",
        paragraphs: [
          "A scanned PDF is made of images, so there is no text to change. To edit the words you need OCR, which reads the images and produces real text. Without OCR, the realistic options are to retype the document or to add new content separately.",
        ],
        bullets: [
          "Text edits: convert to Word first.",
          "Page removal: Split with the pages to keep.",
          "Reordering: Split, then Merge.",
          "Wrong orientation: Rotate.",
        ],
      },
      {
        heading: "Protect your original",
        paragraphs: [
          "Whichever method you use, save the result under a new name. Keep the original PDF safe until you have checked the edited version carefully, especially for legal or financial documents.",
        ],
      },
    ],
  },
  {
    slug: "convert-word-to-pdf-without-losing-formatting",
    title: "How to Convert Word to PDF Without Losing Formatting",
    description:
      "Why Word documents sometimes shift when converted to PDF, and a checklist to keep fonts, tables, images and page breaks exactly as intended.",
    date: "2026-11-10",
    tool: "word-to-pdf",
    toolLabel: "Word to PDF",
    sections: [
      {
        heading: "Why layouts sometimes change",
        paragraphs: [
          "A Word document is flexible. Text reflows depending on fonts, printer settings and software version. A PDF is fixed. When you convert, the converter has to decide where every line and image goes, and if the document relied on something that is not available, such as a font, the layout can shift.",
          "Most formatting problems come from a small number of causes, and each is easy to prevent before you convert.",
        ],
      },
      {
        heading: "Checklist before converting",
        paragraphs: [
          "Spend two minutes on these checks in Word and the conversion will almost always look right.",
        ],
        bullets: [
          "Use common fonts, or embed fonts in the document.",
          "Switch to Print Layout view and scroll through the pages. The PDF follows what you see there.",
          "Check page breaks, especially before headings and around tables.",
          "Make sure images are placed inline or anchored properly, not floating loosely.",
          "Accept or reject tracked changes and delete comments you do not want visible.",
        ],
      },
      {
        heading: "Fonts are the number one cause",
        paragraphs: [
          "If your document uses an unusual font that the converter does not have, it substitutes a similar one. Different fonts have different widths, so lines wrap in different places and the whole document can shift by a line or two per page. Stick to widely available fonts for documents you plan to convert, or use a font that is embedded in the file.",
        ],
      },
      {
        heading: "Convert and check",
        paragraphs: [
          "Upload your .doc or .docx file to the Word to PDF tool and download the PDF. Open it and flip through the pages. Look at the first and last page of each section, any tables, and any page that has an image. Check that headers and footers appear where you expect them.",
        ],
      },
      {
        heading: "Hyperlinks, tables and images",
        paragraphs: [
          "Web links in a Word document normally remain clickable in the PDF. Tables carry over as they appear on screen, so check column widths. Images are embedded as they appear in the document. If a large image makes the PDF too heavy to send, use Compress PDF afterwards.",
        ],
      },
      {
        heading: "Keep the Word file",
        paragraphs: [
          "Treat the Word document as your editable master and the PDF as the final copy. If you need to make a change later, edit the Word file and convert again. Going the other way, from PDF back to Word, is possible but less precise.",
        ],
      },
    ],
  },
  {
    slug: "send-sensitive-documents-securely",
    title: "How to Send Sensitive Documents Securely by Email",
    description:
      "Practical steps for sharing IDs, contracts and financial documents safely: password-protect the PDF, share the password separately, and send only what is needed.",
    date: "2026-11-10",
    tool: "protect-pdf",
    toolLabel: "Protect PDF",
    sections: [
      {
        heading: "Email is not a locked envelope",
        paragraphs: [
          "A normal email behaves more like a postcard than a sealed letter. It can sit in several mailboxes, be forwarded to the wrong person, or be exposed if one account is compromised. For documents like ID copies, contracts, tax forms and bank statements, that is worth planning around.",
          "You do not need special software. A few habits dramatically reduce the risk.",
        ],
      },
      {
        heading: "Step 1: Send only what is needed",
        paragraphs: [
          "The safest data is the data you do not send. If the recipient needs page 3 of a 20-page document, send page 3 only. Use Split PDF to extract the pages you want, and leave out everything else. Fewer pages means less exposure and a smaller file.",
        ],
      },
      {
        heading: "Step 2: Add a password",
        paragraphs: [
          "Use the Protect PDF tool to add a password. Anyone opening the file will be asked for it, so a message that lands in the wrong inbox is not enough to read the document.",
          "Pick a strong password. A passphrase of several random words is easy to remember and hard to guess. Avoid birthdays, names and simple patterns.",
        ],
        bullets: [
          "At least 12 characters.",
          "Not reused from another account.",
          "Not something the recipient could guess from the email itself.",
        ],
      },
      {
        heading: "Step 3: Share the password separately",
        paragraphs: [
          "Never put the password in the same email as the file. Send it by text message, a phone call or a different messaging app. If someone intercepts one channel, they still do not have both pieces.",
        ],
      },
      {
        heading: "Step 4: Reduce what stays behind",
        paragraphs: [
          "After the recipient confirms they have the file, consider deleting the sent message and any downloaded copies you no longer need. For recurring documents, agree on a routine so it does not depend on remembering each time.",
        ],
      },
      {
        heading: "Remember the limits",
        paragraphs: [
          "A password protects the file from casual access, but it is only as strong as the password and how you share it. For very high-risk material, such as legal discovery or medical records, follow the rules of your organization or use a dedicated secure sharing system. And keep a copy of the unprotected original somewhere safe, because a protected file cannot be opened without its password.",
        ],
      },
    ],
  },
  {
    slug: "what-is-ocr-and-when-do-you-need-it",
    title: "What Is OCR and When Do You Need It for a PDF?",
    description:
      "OCR turns images of text into real, searchable text. Learn how to tell whether a PDF needs it and how it affects converting to Word.",
    date: "2026-11-10",
    tool: "pdf-to-word",
    toolLabel: "PDF to Word",
    sections: [
      {
        heading: "OCR in plain terms",
        paragraphs: [
          "OCR stands for optical character recognition. It is software that looks at a picture of text and works out which letters and words are in it. The result is real text that a computer can search, select, copy and edit.",
          "Without OCR, a scan is just a photograph of a page. It looks readable to you, but to a computer it is only a grid of pixels.",
        ],
      },
      {
        heading: "How to tell if your PDF needs OCR",
        paragraphs: [
          "Open the PDF and try to select a sentence with your mouse, or press Ctrl+F and search for a word you can see on the page. If the text highlights and the search finds it, the file already has a text layer. If the page selects as one big image or searching finds nothing, the file is a scan and has no text layer.",
        ],
        bullets: [
          "Selectable text and working search: no OCR needed.",
          "Page selects as a single block: it is an image.",
          "Created from a phone camera or scanner: very likely an image.",
          "Exported from Word or Google Docs: almost always has text.",
        ],
      },
      {
        heading: "Why it matters for PDF to Word",
        paragraphs: [
          "A PDF to Word converter works by reading the text that is already inside the PDF and rebuilding paragraphs and tables around it. If the PDF is only images, there is no text to read. That is why a converted scan can come out as an empty document or a page full of pictures.",
          "The practical rule is simple: converting a PDF to Word works best when the PDF was created digitally. For scans, run OCR first so the file gains a text layer, then convert.",
        ],
      },
      {
        heading: "Getting good OCR results",
        paragraphs: [
          "OCR accuracy depends mostly on the quality of the scan. Clean, straight, well-lit pages with printed text give the best results. Handwriting, faded print, skewed pages and low resolution reduce accuracy.",
        ],
        bullets: [
          "Scan at a resolution high enough to read small print.",
          "Keep pages straight and evenly lit.",
          "Fix sideways pages first with the Rotate PDF tool.",
          "Proofread the recognized text, especially numbers and names.",
        ],
      },
      {
        heading: "Do you always need it?",
        paragraphs: [
          "No. If you only want to read a scan, print it or send it, OCR is not required. It becomes useful when you need to search inside the document, copy parts of it, or edit it in Word. Decide by what you want to do with the file afterwards.",
        ],
      },
    ],
  },
  {
    slug: "organize-and-name-pdf-files",
    title: "How to Organize and Name PDF Files So You Can Always Find Them",
    description:
      "A simple naming and folder system for PDFs, plus how merging and splitting keep documents tidy and easy to share.",
    date: "2026-11-10",
    tool: "merge-pdf",
    toolLabel: "Merge PDF",
    sections: [
      {
        heading: "The cost of messy files",
        paragraphs: [
          "Most people have a folder full of files called scan001.pdf, document (3).pdf and final-final-v2.pdf. Finding the right one means opening several of them. A little structure up front saves a lot of searching later, and makes documents easier to share too.",
        ],
      },
      {
        heading: "A naming pattern that works",
        paragraphs: [
          "Good file names tell you what the document is without opening it. A consistent pattern is more important than the exact pattern you choose. A reliable format is date first, then who or what, then a short description.",
        ],
        bullets: [
          "2026-11-10_invoice_acme_1042.pdf",
          "2026-09_bank-statement_savings.pdf",
          "2026-contract_lease_apartment-12b.pdf",
        ],
      },
      {
        heading: "Why dates go first",
        paragraphs: [
          "Starting with year-month-day makes files sort chronologically in any file browser. That is far more useful than names starting with words, because the newest or oldest document is always at the end of the list. Use the same order every time, with a hyphen between parts of the date.",
        ],
      },
      {
        heading: "Keep the folder structure shallow",
        paragraphs: [
          "Deep folder trees are slow to browse. Two or three levels is usually enough, for example by year, then by type: Finance, Home, Work, Health. Search and naming do the rest.",
        ],
      },
      {
        heading: "Merge related documents",
        paragraphs: [
          "If several files always travel together, such as an application form, ID copy and proof of address, merge them into one PDF with the Merge PDF tool. One file is simpler to store, send and keep in order. Keep the originals in an archive folder in case you need to rebuild the bundle.",
        ],
      },
      {
        heading: "Split what is too big",
        paragraphs: [
          "A single 300-page file is hard to use. If it contains separate documents, such as a year of statements scanned in one go, use Split PDF to cut it into smaller files named by month. Each piece is easier to find and share.",
        ],
      },
      {
        heading: "Review once a year",
        paragraphs: [
          "Set a yearly reminder to tidy up. Delete duplicates, compress large archives you rarely open, and make sure important documents are backed up in a second location. Protect sensitive files with a password before you store them in the cloud.",
        ],
      },
    ],
  },
];
