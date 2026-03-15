import ConfigManagerClient from "./ConfigManagerClient";
import { getConfigFile } from "@/lib/supabase";
import { Colors, Config } from "@/lib/types";

export default async function ConfigPage() {
  const config: Config = await getConfigFile("config.json");
  const colors: Colors = await getConfigFile("colors.json");
  
  return <ConfigManagerClient initialConfig={config} initialColors={colors} />;
}
