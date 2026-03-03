import { notFound } from "next/navigation";
import { getArticleBySlug, getPublishedArticles } from "@/lib/supabase";
import { baseUrl } from "@/app/sitemap";
import Image from "next/image";

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
    article.cover || `${baseUrl}/og?title=${encodeURIComponent(article.titre)}`;

  return {
    title: article.titre,
    description: article.titre,
    openGraph: {
      title: article.titre,
      type: "article",
      publishedTime: article.publie_le,
      url: `${baseUrl}/blog/${article.slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.titre,
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

  if (!article || !article.publie) {
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
            headline: article.titre,
            datePublished: article.publie_le,
            dateModified: article.updated,
            url: `${baseUrl}/blog/${article.slug}`,
            author: {
              "@type": "Person",
              name: "Kokou",
            },
          }),
        }}
      />

      {article.cover && (
        <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.cover}
            alt={article.titre}
            fill
            className="object-cover"
          />
        </div>
      )}

      <h1 className="title font-semibold text-2xl tracking-tighter">
        {article.titre}
      </h1>

      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600">
          {formatDate(article.publie_le)}
        </p>
      </div>

      <article
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: article.contenu }}
      />
    </section>
  );
}
