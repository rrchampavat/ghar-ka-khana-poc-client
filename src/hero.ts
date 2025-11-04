// hero.ts
import { heroui } from "@heroui/react";

export default heroui({
  themes: {
    light: {
      colors: {
        // Modern light: soft neutrals, vibrant accents, balanced contrast
        background: "#f7f8fb",
        foreground: "#0f172a",
        // surfaces for cards, tables, etc.
        content1: "#ffffff",
        content2: "#f4f6fa",
        content3: "#e9eef5",
        content4: "#dfe7f0",
        divider: "#e5e9f0",
        focus: "#8b5cf6",
        overlay: "#0f172a80",
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          DEFAULT: "#6366f1",
          foreground: "#ffffff"
        },
        secondary: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
          DEFAULT: "#06b6d4",
          foreground: "#05202a"
        },
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
          DEFAULT: "#ef4444",
          foreground: "#ffffff"
        },
        success: "#10b981"
      }
    },
    dark: {
      colors: {
        // Modern dark: deep navy surfaces, readable foreground, vibrant accents
        background: "#0b1220",
        foreground: "#e2e8f0",
        // surfaces for cards, tables, etc.
        content1: "#0f172a",
        content2: "#111827",
        content3: "#141c2f",
        content4: "#18223a",
        divider: "#1f2a44",
        focus: "#a78bfa",
        overlay: "#00000080",
        primary: {
          50: "#1e1b4b",
          100: "#2e26a3",
          200: "#3730a3",
          300: "#4338ca",
          400: "#4f46e5",
          500: "#6366f1",
          600: "#818cf8",
          700: "#a5b4fc",
          800: "#c7d2fe",
          900: "#e0e7ff",
          DEFAULT: "#6366f1",
          foreground: "#0b1020"
        },
        secondary: {
          50: "#083344",
          100: "#0e7490",
          200: "#0891b2",
          300: "#06b6d4",
          400: "#22d3ee",
          500: "#67e8f9",
          600: "#a5f3fc",
          700: "#cffafe",
          800: "#ecfeff",
          900: "#f0feff",
          DEFAULT: "#06b6d4",
          foreground: "#061017"
        },
        danger: {
          50: "#431317",
          100: "#7f1d1d",
          200: "#991b1b",
          300: "#b91c1c",
          400: "#dc2626",
          500: "#ef4444",
          600: "#f87171",
          700: "#fca5a5",
          800: "#fecaca",
          900: "#fee2e2",
          DEFAULT: "#ef4444",
          foreground: "#20090a"
        },
        success: "#34d399"
      }
    }
  }
});
