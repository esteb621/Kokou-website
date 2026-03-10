import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

async function getServiceClient() {
  return createClient();
}

// GET /api/articles — list all articles (published or not)
export async function GET(req: NextRequest) {
  const sb = await getServiceClient();
  const {
    data: { user },
  } = await sb.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { data, error } = await sb.from("articles").select("*");

    if (error) throw new Error(error.message);
    return NextResponse.json(data);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST /api/articles — create an article
export async function POST(req: NextRequest) {
  const sb = await getServiceClient();
  const {
    data: { user },
  } = await sb.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const now = new Date().toISOString();
    const payload = { ...body, created_at: now, updated_at: now };

    const { data, error } = await sb
      .from("articles")
      .insert(payload)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return NextResponse.json(data, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
