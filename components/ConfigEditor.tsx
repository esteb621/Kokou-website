"use client";
import { Config } from "@/lib/types";
import { useState } from "react";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

const CategoryFields: React.FC<{
  category: string;
  config: Config;
  setConfig: (config: Config) => void;
}> = ({
  category,
  config,
  setConfig,
}: {
  category: string;
  config: Config;
  setConfig: (config: Config) => void;
}) => {
  return (
    <div>
      <h2>
        {category.charAt(0).toUpperCase() + category.slice(1).replace("_", " ")}
      </h2>
      {Object.keys(config[category]).map((item) => (
        <Field>
          <FieldLabel>{item}</FieldLabel>
          <Input
            type="text"
            value={config[category][item]}
            onChange={(e) =>
              setConfig({
                ...config,
                [category]: { ...config[category], [item]: e.target.value },
              })
            }
          />
        </Field>
      ))}
    </div>
  );
};
export default function ConfigEditor({
  initialConfig,
}: {
  initialConfig: Config;
}) {
  const [config, setConfig] = useState(initialConfig);
  console.log(config);
  for (const category of Object.keys(config)) {
    return (
      <div>
        <h2>
          {category.charAt(0).toUpperCase() +
            category.slice(1).replace("_", " ")}
        </h2>
        <CategoryFields
          category={category}
          config={config}
          setConfig={setConfig}
        />
      </div>
    );
  }
}
