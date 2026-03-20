import { NextRequest, NextResponse } from "next/server";
import { getStaticSupabase } from "@/lib/supabase";

// GET /api/articles — list all articles (published or not)
export async function GET(req: NextRequest) {
  try {
    const sb = getStaticSupabase();
    const { data, error } = await sb.from("articles").select("*");

    if (error) throw new Error(error.message);
    return NextResponse.json(data);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
