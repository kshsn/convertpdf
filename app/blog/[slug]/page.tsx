import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPost } from "@/lib/blog";
import { buildMetadata, absoluteUrl, SITE_NAME } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const meta = buildMetadata({
    title: post.title,
    description: post.description,
    path: `blog/${post.slug}`,
  });
  // Articles are not translated, so don't claim hreflang alternates.
  return {
    ...meta,
    title: { absolute: `${post.title} | ${SITE_NAME}` },
    alternates: { canonical: absoluteUrl(`blog/${post.slug}`) },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: absoluteUrl(`blog/${post.slug}`),
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };

  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto">
        <p className="text-sm text-gray-400 mb-2">
          <Link href="/blog" className="hover:underline">
            Guides
          </Link>{" "}
          ·{" "}
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <p className="text-lg text-gray-600 mb-8">{post.description}</p>

        {post.sections.map((s) => (
          <section key={s.heading} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {s.heading}
            </h2>
            {s.paragraphs.map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-3">
                {para}
              </p>
            ))}
            {s.bullets && (
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 my-10">
          <p className="font-semibold text-gray-900 mb-2">
            Try it now: {post.toolLabel}
          </p>
          <p className="text-gray-600 mb-3">
            Free, no signup. Your files are deleted after you download the
            result.
          </p>
          <Link
            href={`/${post.tool}`}
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full"
          >
            Open {post.toolLabel}
          </Link>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-3">More guides</h2>
        <ul className="space-y-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/blog/${o.slug}`}
                className="text-red-600 hover:underline"
              >
                {o.title}
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
}
