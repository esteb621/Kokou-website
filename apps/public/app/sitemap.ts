import { getPublishedArticles } from "@/lib/supabase";

export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kokou.gay"; // Set this in your environment variables!

export default async function sitemap() {
  const articles = await getPublishedArticles();

  let blogs = articles.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.created_at,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  let routes = ["", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route === "" ? "daily" as const : "weekly" as const,
    priority: route === "" ? 1.0 : 0.9,
  }));

  return [...routes, ...blogs];
}
