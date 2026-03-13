import ColorEditor from "@/components/ColorEditor";
import ConfigEditor from "@/components/ConfigEditor";
import { getConfigFile } from "@/lib/supabase";
import { Colors, Config } from "@/lib/types";

export default async function ConfigPage() {
  const config: Config = await getConfigFile("config.json");
  const colors: Colors = await getConfigFile("colors.json");
  return (
    <div>
      <h1 className="text-2xl text-center font-bold">Edit website config</h1>
      <h2 className="text-xl font-bold">Config</h2>
      <ConfigEditor initialConfig={config} />
      <h2 className="text-xl font-bold">Colors palette</h2>
      <ColorEditor initialColors={colors} />
    </div>
  );
}
