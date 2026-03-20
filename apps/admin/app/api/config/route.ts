import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import fs from "fs/promises";
import path from "path";

// Helper function to get the Supabase service client
async function getServiceClient() {
  return createClient();
}

// Get the absolute path to config.json
const getConfigPath = () => path.join(process.cwd(), "public", "config.json");

// GET /api/config — read configuration file (public access, or we can secure it if needed, but typically GET config is public)
export async function GET(req: NextRequest) {
  try {
    const configPath = getConfigPath();
    const fileContents = await fs.readFile(configPath, "utf-8");
    const config = JSON.parse(fileContents);
    return NextResponse.json(config);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// PUT /api/config — update configuration file
export async function PUT(req: NextRequest) {
  return handleUpdate(req);
}

// POST /api/config — update configuration file (alias for PUT)
export async function POST(req: NextRequest) {
  return handleUpdate(req);
}

// Internal handler for both PUT and POST
async function handleUpdate(req: NextRequest) {
  const sb = await getServiceClient();
  const {
    data: { user },
  } = await sb.auth.getUser();

  // Authentication required for update
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    
    // Validate we actually received an object
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid configuration payload" }, { status: 400 });
    }

    const configPath = getConfigPath();
    
    // Format JSON with 2 spaces for readability
    await fs.writeFile(configPath, JSON.stringify(body, null, 2), "utf-8");
    
    return NextResponse.json(
      { message: "Configuration updated successfully", config: body },
      { status: 200 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
