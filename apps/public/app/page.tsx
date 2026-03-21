import { Config } from "@/lib/types";
import { getConfigFile } from "@/lib/supabase";
import LandingContent from "./components/LandingContent";

export const revalidate = 30; // Revalider le cache toutes les 60 secondes

export default async function Page() {
  let config: Config;
  try {
    config = await getConfigFile("config.json");
  } catch (error) {
    console.error("Error loading config:", error);
    return <div>Error loading config.json. Is it present in your bucket?</div>;
  }

  return <LandingContent config={config} />;
}
