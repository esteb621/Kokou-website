import { NextRequest, NextResponse } from "next/server";
import { getStaticSupabase } from "@/lib/supabase";

// GET /api/articles/[slug] — fetch a single article
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const sb = getStaticSupabase();
    const { slug } = await params;

    const { data, error } = await sb
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw new Error(error.message);
    return NextResponse.json(data);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
