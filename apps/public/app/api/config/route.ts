import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Get the absolute path to config.json
const getConfigPath = () => path.join(process.cwd(), "public", "config.json");

// GET /api/config — read configuration file
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
