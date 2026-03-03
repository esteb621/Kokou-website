import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  // Uses SERVICE_ROLE_KEY for write operations (bypasses RLS)
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

function checkAuth(req: NextRequest): boolean {
  const password = req.headers.get("x-edit-password");
  return password === process.env.EDIT_PASSWORD;
}

// GET /api/articles — list all articles (published or not)
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sb = getServiceClient();
    const { data, error } = await sb
      .from("articles")
      .select("*")

    if (error) throw new Error(error.message);
    return NextResponse.json(data);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST /api/articles — create an article
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sb = getServiceClient();
    const body = await req.json();

    // Supabase handles `created`/`updated` automatically if configured,
    // otherwise we add them manually
    const now = new Date().toISOString();
    const payload = { ...body, created: now, updated: now };

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
