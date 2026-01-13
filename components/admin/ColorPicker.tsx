"use client";

import * as React from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
}

function normalizeHex(v?: string) {
  if (!v) return "#000000";
  return v.startsWith("#") ? v : `#${v}`;
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  const color = normalizeHex(value);

  return (
    <div className="flex items-center gap-3">
      {/* Swatch + Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="h-10 w-12 p-0 rounded-md"
          >
            <span
              className="h-8 w-10 rounded-md border"
              style={{ backgroundColor: color }}
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-3" align="start">
          <HexColorPicker color={color} onChange={(c) => onChange?.(c)} />
        </PopoverContent>
      </Popover>

      {/* Hex input */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">#</span>
        <HexColorInput
          color={color.replace("#", "")}
          onChange={(v) => onChange?.(normalizeHex(v))}
          className="hex-input"
          prefixed={false}
        />
      </div>
    </div>
  );
}
