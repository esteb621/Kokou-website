"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import ColorEditor from "@/components/ColorEditor";
import ConfigEditor from "@/components/ConfigEditor";
import { Colors, Config } from "@/lib/types";
import LandingContent from "@/app/components/LandingContent";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { SaveIcon } from "lucide-react";

export default function ConfigManagerClient({
  initialConfig,
  initialColors,
}: {
  initialConfig: Config;
  initialColors: Colors;
}) {
  const [config, setConfig] = useState<Config>(initialConfig);
  const [colors, setColors] = useState<Colors>(initialColors);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const getCleanConfig = () => {
    const clean = JSON.parse(JSON.stringify(config));

    if (clean.socials) {
      for (const key in clean.socials) {
        if (clean.socials[key]._deleted) {
          delete clean.socials[key];
        } else {
          delete clean.socials[key]._deleted;
        }
      }
    }

    if (clean.skills) {
      clean.skills = clean.skills
        .filter((s: Record<string, unknown> & { _deleted?: boolean }) => !s._deleted)
        .map((s: Record<string, unknown> & { _deleted?: boolean }) => {
          const copy = { ...s };
          delete copy._deleted;
          return copy;
        });
    }
    if (clean.products?.avatars) {
      clean.products.avatars = clean.products.avatars
        .filter((p: Record<string, unknown> & { _deleted?: boolean }) => !p._deleted)
        .map((p: Record<string, unknown> & { _deleted?: boolean }) => {
          const copy = { ...p };
          delete copy._deleted;
          return copy;
        });
    }
    if (clean.products?.assets) {
      clean.products.assets = clean.products.assets
        .filter((p: Record<string, unknown> & { _deleted?: boolean }) => !p._deleted)
        .map((p: Record<string, unknown> & { _deleted?: boolean }) => {
          const copy = { ...p };
          delete copy._deleted;
          return copy;
        });
    }
    return clean;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Configuration save
      const resConfig = await fetch("/api/config?file=config.json", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getCleanConfig()),
      });

      if (!resConfig.ok) {
        throw new Error("Failed to save configuration");
      }

      // Colors save
      const resColors = await fetch("/api/config?file=colors.json", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(colors),
      });

      if (!resColors.ok) {
        throw new Error("Failed to save colors palette");
      }

      toast.success("Configuration saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving: " + error);
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="pb-20 max-w-5xl mx-auto mt-10">
      <div className="flex items-center justify-between mb-8">
        <BackButton path="/" />
        <h1 className="text-3xl font-bold">Edit website config</h1>
        <div className="flex gap-4">
          <Button
            className="bg-pink-100 hover:bg-pink-500 hover:border-0 hover:text-pink-50 transition-all duration-200"
            variant="outline"
            size="lg"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? "Edit Mode" : "See a preview"}
          </Button>
          <Button
            className="bg-pink-700 text-pink-50 hover:bg-pink-600 hover:text-pink-50 transition-all duration-200"
            onClick={handleSave}
            disabled={isSaving}
            size="lg"
          >
            <SaveIcon size={20} />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {showPreview ? (
        <div
          className="border-4 p-8 rounded-2xl bg-background mt-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
          style={
            {
              "--primary": colors.primary,
              "--secondary": colors.secondary,
              "--accent": colors.accent,
              "--background": colors.background,
              "--text-primary": colors.text_primary,
              "--text-secondary": colors.text_secondary,
            } as React.CSSProperties
          }
        >
          <div className="absolute z-50 top-2 left-2 px-3 py-1 bg-black/50 text-white rounded text-xs font-bold">
            Live Preview
          </div>
          <LandingContent config={getCleanConfig()} />
        </div>
      ) : (
        <div className="flex flex-col gap-12 mt-8">
          <section className="bg-secondary p-6 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">
              Configuration ⚙️
            </h2>
            <ConfigEditor config={config} setConfig={setConfig} />
          </section>
          <section className="bg-secondary p-6 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">
              Colors Palette 🎨
            </h2>
            <ColorEditor
              colors={colors}
              setColors={setColors}
              baseColors={initialColors}
            />
          </section>
        </div>
      )}
    </div>
  );
}
