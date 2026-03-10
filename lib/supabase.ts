import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export type Article = {
  id?: string;
  slug: string;
  title: string;
  content: string;
  cover: string | null;
  posted?: boolean;
  created_at: string;
  updated_at?: string;
};

async function getSupabase() {
  return createClient();
}

/** Récupère tous les articles publiés, triés par date de publication */
export async function getPublishedArticles(): Promise<Article[]> {
  const sb = await getSupabase();
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
  const sb = await getSupabase();
  const { data, error } = await sb
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}
