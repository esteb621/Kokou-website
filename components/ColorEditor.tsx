"use client";
import { Colors } from "@/lib/types";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./tiptap-ui-primitive/button";
import {
  ArrowBigLeftDashIcon,
  Trash2,
  Undo2,
  Undo2Icon,
  UndoIcon,
} from "lucide-react";

export default function ColorEditor({
  colors,
  baseColors,
  setColors,
}: {
  colors: Colors;
  baseColors: Colors;
  setColors: (colors: Colors) => void;
}) {
  return (
    <div>
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.keys(colors).map((color) => (
          <Field key={color} className="flex items-center gap-2">
            <FieldLabel className="flex items-center">
              {color[0].toUpperCase() + color.slice(1).replace("_", " ")}
              {baseColors[color] !== colors[color] && (
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() =>
                    setColors({ ...colors, [color]: baseColors[color] })
                  }
                >
                  <Undo2Icon size={18} />
                </Button>
              )}
            </FieldLabel>

            <Input
              type="color"
              className="border-0 h-12 p-0"
              value={colors[color as keyof Colors]}
              onChange={(e) => {
                console.log("color", color, e.target.value);
                setColors({ ...colors, [color]: e.target.value });
              }}
            />
          </Field>
        ))}
      </form>
    </div>
  );
}
