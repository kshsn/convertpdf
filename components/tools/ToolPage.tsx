import Link from "next/link";
import ToolWidget from "./ToolWidget";
import type { Dictionary, ToolContent } from "@/lib/i18n/dictionaries";
import { TOOL_GUIDES } from "@/lib/tool-guides";
import { getPost } from "@/lib/blog";

interface ToolPageProps {
  slug: string;
  content: ToolContent;
  common: Dictionary["common"];
  /** Show the English how-to guide below the tool (English pages only). */
  showGuide?: boolean;
}

/**
 * Server-rendered shell shared by English-at-root and /[locale] tool pages.
 * Title, tagline, intro and FAQ come from the dictionary (good for SEO); the
 * interactive part is the client ToolWidget.
 */
export default function ToolPage({
  slug,
  content,
  common,
  showGuide = false,
}: ToolPageProps) {
  const guide = showGuide ? TOOL_GUIDES[slug] : undefined;
  // FAQPage structured data — lets Google AI Overviews and LLM/AI engines
  // extract the questions and answers directly. Content is from our dictionary.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          {content.title}
        </h1>
        <p className="text-gray-500 text-center mb-8">{content.tagline}</p>

        <ToolWidget slug={slug} content={content} common={common} />

        <section className="mt-16 text-gray-600">
          <p className="text-base leading-relaxed">{content.intro}</p>
          {guide && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">
                {guide.stepsTitle}
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-base leading-relaxed">
                {guide.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">
                {guide.tipsTitle}
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed">
                {guide.tips.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">
                {guide.useCasesTitle}
              </h2>
              <div className="space-y-3">
                {guide.useCases.map((u) => (
                  <p key={u.title} className="text-base leading-relaxed">
                    <span className="font-semibold text-gray-800">
                      {u.title}.
                    </span>{" "}
                    {u.text}
                  </p>
                ))}
              </div>
              <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">
                Related guides
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                {guide.relatedBlog.map((b) => {
                  const post = getPost(b);
                  if (!post) return null;
                  return (
                    <li key={b}>
                      <Link
                        href={`/blog/${b}`}
                        className="text-red-600 hover:underline"
                      >
                        {post.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-3">
            {common.faqTitle}
          </h2>
          <div className="space-y-3">
            {content.faq.map(({ q, a }) => (
              <details key={q} className="border rounded-lg p-3">
                <summary className="font-medium cursor-pointer">{q}</summary>
                <p className="mt-2 text-sm">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
