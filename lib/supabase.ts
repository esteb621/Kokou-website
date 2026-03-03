import { createClient } from "@supabase/supabase-js";

export type Article = {
  id: string;
  slug: string;
  title: string;
  content: string;
  cover: File | null;
  posted: boolean;
  created_at: string;
  updated_at?: string;
};

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key)
    throw new Error("Variables Supabase manquantes dans .env.local");
  return createClient(url, key);
}

export const supabase = getSupabase();

/** Récupère tous les articles publiés, triés par date de publication */
export async function getPublishedArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("publie", true)
    .order("publie_le", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

/** Récupère un article par son slug */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}
