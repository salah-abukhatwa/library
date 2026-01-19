import type React from "react";

const hexToRgb = (hex: string) => {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return null;
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};

export const tintedBg = (coverColor: string) => {
  const rgb = hexToRgb(coverColor) ?? { r: 120, g: 120, b: 120 };

  return {
    background: `radial-gradient(120% 120% at 50% 0%,
      rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.28) 100%,
      rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.10) 100%,
      rgba(18, 20, 29, 0.95) 100%
    )`,
    border: "0 px ",
  } as React.CSSProperties;
};
