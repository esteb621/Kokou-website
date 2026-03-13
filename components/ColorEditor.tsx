"use client";
import { Colors } from "@/lib/types";
import { useState } from "react";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

export default function ColorEditor({
  initialColors,
}: {
  initialColors: Colors;
}) {
  const [colors, setColors] = useState(initialColors);
  return (
    <div>
      <form>
        {Object.keys(colors).map((color) => (
          <Field key={color}>
            <FieldLabel>{color[0].toUpperCase() + color.slice(1).replace("_", " ")}</FieldLabel>
            <Input
              type="color"
              value={colors[color]}
              onChange={(e) => setColors({ ...colors, [color]: e.target.value })}
            />
          </Field>
        ))}
      </form>
    </div>
  );
}
