import { notFound } from "next/navigation";
import { getArticleBySlug, getPublishedArticles } from "@/lib/supabase";
import { baseUrl } from "@/app/sitemap";
import { BackButton } from "@/components/BackButton";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const articles = await getPublishedArticles();
    return articles.map((a) => ({ slug: a.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  const ogImage =
    article.cover || `${baseUrl}/og?title=${encodeURIComponent(article.title)}`;

  return {
    title: article.title,
    description: article.title,
    openGraph: {
      title: article.title,
      type: "article",
      publishedTime: article.created_at,
      url: `${baseUrl}/blog/${article.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      images: [ogImage],
    },
  };
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || !article.posted) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: article.title,
            datePublished: article.created_at,
            dateModified: article.updated_at,
            url: `${baseUrl}/blog/${article.slug}`,
            author: {
              "@type": "Person",
              name: "Kokou",
            },
          }),
        }}
      />

      <BackButton path="/blog" />
      <h1 className="title font-bold text-center text-3xl tracking-tighter">
        {article.title}
      </h1>

      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-text-secondary">
          Published on {formatDate(article.created_at)}
        </p>
      </div>

      <article
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </section>
  );
}
