import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getConfigFile, updateConfigFile } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const file = req.nextUrl.searchParams.get("file") || "config.json";
    const config = await getConfigFile(file);
    return NextResponse.json(config);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  return handleUpdate(req);
}

export async function POST(req: NextRequest) {
  return handleUpdate(req);
}

async function handleUpdate(req: NextRequest) {
  const sb = await createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const file = req.nextUrl.searchParams.get("file") || "config.json";
    const body = await req.json();
    
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    await updateConfigFile(file, body);
    
    return NextResponse.json(
      { message: "Configuration updated successfully", file: file },
      { status: 200 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
