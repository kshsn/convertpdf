import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import { buildMetadata, absoluteUrl } from "@/lib/seo";

// English-only page: canonical only, no hreflang alternates.
export const metadata: Metadata = {
  ...buildMetadata({
    title: "PDF Guides and Tutorials",
    description:
      "Step-by-step guides for merging, splitting, compressing, converting and protecting PDF files.",
    path: "blog",
  }),
  alternates: { canonical: absoluteUrl("blog") },
};

export default function BlogIndex() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          PDF Guides and Tutorials
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Practical, step-by-step help for everyday PDF tasks: combining files,
          shrinking them, converting formats and keeping documents private.
        </p>
        <ul className="space-y-8">
          {BLOG_POSTS.map((p) => (
            <li key={p.slug} className="border-b border-gray-100 pb-8">
              <p className="text-sm text-gray-400 mb-1">
                {new Date(p.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                <Link href={`/blog/${p.slug}`} className="hover:text-red-600">
                  {p.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-3">{p.description}</p>
              <Link
                href={`/blog/${p.slug}`}
                className="text-red-600 font-medium hover:underline"
              >
                Read the guide →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
