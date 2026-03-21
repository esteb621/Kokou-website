import { createClient } from "@/utils/supabase/server";
import { createClient as createStaticClient } from "@supabase/supabase-js";
import { Article } from "./types";

async function getSupabase() {
  return createClient();
}

function getStaticSupabase() {
  return createStaticClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "",
    {
      global: {
        fetch: (url, options) => {
          return fetch(url, { ...options, cache: "no-store", next: { revalidate: 0 } });
        },
      },
    }
  );
}

export async function getConfigFile<T = unknown>(fileName: string): Promise<T> {
  const sb = getStaticSupabase();
  const { data, error } = await sb.storage
    .from("website_json")
    .download(fileName);
  if (error) throw new Error(error.message);
  const json = await data.text();
  return JSON.parse(json) as T;
}

export async function updateConfigFile(fileName: string, content: unknown): Promise<void> {
  const sb = await getSupabase();
  const { error } = await sb.storage
    .from("website_json")
    .upload(fileName, JSON.stringify(content), {
      contentType: "application/json",
      cacheControl: "0",
      upsert: true,
    });
  if (error) throw new Error(error.message);
}

/** Récupère tous les articles publiés, triés par date de publication */
export async function getPublishedArticles(): Promise<Article[]> {
  const sb = getStaticSupabase();
  const { data, error } = await sb
    .from("articles")
    .select("*")
    .eq("posted", true)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

/** Récupère un article par son slug */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const sb = getStaticSupabase();
  const { data, error } = await sb
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function deleteArticleImages(slug: string, coverUrl?: string | null): Promise<void> {
  const sb = await getSupabase();

  // 1. Delete all images in the article's folder /[slug]/*
  const { data: files, error: listError } = await sb.storage.from("images").list(slug);
  if (!listError && files && files.length > 0) {
    const filePaths = files.map((f) => `${slug}/${f.name}`);
    const { error } = await sb.storage.from("images").remove(filePaths);
    if (error) console.error("Error deleting folder images:", error);
  }

  // 2. Delete the cover image from URL
  if (coverUrl) {
    const baseUrl = "/storage/v1/object/public/images/";
    const index = coverUrl.indexOf(baseUrl);
    if (index !== -1) {
      const path = coverUrl.substring(index + baseUrl.length);
      const { error } = await sb.storage.from("images").remove([path]);
      if (error) console.error("Error deleting cover image:", error);
    }
  }
}



