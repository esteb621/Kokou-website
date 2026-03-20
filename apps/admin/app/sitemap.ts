import { getPublishedArticles } from "@/lib/supabase";

export const baseUrl = "https://portfolio-blog-starter.vercel.app";

export default async function sitemap() {
  const blogs = (await getPublishedArticles()).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.created_at,
  }));

  const routes = ["", "/blog"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
