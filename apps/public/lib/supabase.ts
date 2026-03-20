import fs from "fs";
import path from "path";
import { createClient as createStaticClient } from "@supabase/supabase-js";
import { Article } from "./types";

export function getStaticSupabase() {
  return createStaticClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );
}

export async function getConfigFile(fileName: string): Promise<any> {
  const sb = getStaticSupabase();
  const { data, error } = await sb.storage
    .from("website_json")
    .download(fileName);
  if (error) throw new Error(error.message);
  const json = await data.text();
  return JSON.parse(json);
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

