import { createClient } from "@/utils/supabase/server";

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

export type Config = {
  colors: {
    primary: string;
    secondary: string;
    background_primary: string;
    background_secondary: string;
    background_accent: string;
    text_primary: string;
    text_secondary: string;
  };
  hero: {
    section: string;
    title: string;
    description: string;
  };
  socials: {
    tiktok: string;
    gumroad: string;
    instagram: string;
    twitter: string;
    bluesky: string;
  };
  skills: {
    "3d": string[];
    "2d": string[];
    other: string[];
  };
  products: {
    avatars: {
      name: string;
      description: string;
      image: string;
      link: string;
    }[];
    assets: {
      name: string;
      description: string;
      image: string;
      link: string;
    }[];
  };
};

async function getSupabase() {
  return createClient();
}

export async function getConfig(): Promise<Config> {
  const sb = await getSupabase();
  const { data, error } = await sb.from("website_json").select("*").single();

  if (error) throw new Error(error.message);
  return data;
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
