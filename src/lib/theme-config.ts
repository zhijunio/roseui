// ---------------------------------------------------------------------------
// Theme customizer config — presets + helpers shared by the customizer panel.
// ---------------------------------------------------------------------------

export type SidebarVariant = "inset" | "sidebar" | "floating";
export type SidebarCollapsible = "icon" | "offcanvas" | "none";
export type ContentLayout = "centered" | "full";
export const THEME_CONFIG_STORAGE_KEY = "roseui-theme-config";

export type ThemeConfig = {
  accent: string;
  radius: number;
  font: string;
  sidebarVariant: SidebarVariant;
  sidebarCollapsible: SidebarCollapsible;
  contentLayout: ContentLayout;
};

export const defaultConfig: ThemeConfig = {
  accent: "neutral",
  radius: 0.65,
  font: "geist",
  sidebarVariant: "floating",
  sidebarCollapsible: "icon",
  contentLayout: "full",
};

export type Accent = {
  key: string;
  label: string;
  swatch: string;
  primary: string | null; // null = use the theme default (mode-aware neutral)
  fg: string;
};

export const accents: Accent[] = [
  { key: "neutral", label: "Neutral", swatch: "oklch(0.45 0 0)", primary: null, fg: "oklch(0.985 0 0)" },
  { key: "blue", label: "Blue", swatch: "oklch(0.6 0.2 264)", primary: "oklch(0.58 0.22 264)", fg: "oklch(0.985 0 0)" },
  { key: "violet", label: "Violet", swatch: "oklch(0.61 0.22 292)", primary: "oklch(0.61 0.22 292)", fg: "oklch(0.985 0 0)" },
  { key: "green", label: "Green", swatch: "oklch(0.62 0.17 152)", primary: "oklch(0.58 0.16 152)", fg: "oklch(0.12 0.02 260)" },
  { key: "teal", label: "Teal", swatch: "oklch(0.64 0.12 195)", primary: "oklch(0.58 0.11 195)", fg: "oklch(0.12 0.02 260)" },
  { key: "amber", label: "Amber", swatch: "oklch(0.77 0.16 70)", primary: "oklch(0.77 0.15 70)", fg: "oklch(0.12 0.02 260)" },
  { key: "orange", label: "Orange", swatch: "oklch(0.67 0.2 42)", primary: "oklch(0.64 0.2 42)", fg: "oklch(0.985 0 0)" },
  { key: "rose", label: "Rose", swatch: "oklch(0.64 0.24 16)", primary: "oklch(0.62 0.24 16)", fg: "oklch(0.985 0 0)" },
];

export const radii = [
  { label: "0", value: 0 },
  { label: "0.3", value: 0.3 },
  { label: "0.5", value: 0.5 },
  { label: "0.65", value: 0.65 },
  { label: "0.75", value: 0.75 },
  { label: "1.0", value: 1 },
];

export type FontOption = { key: string; label: string; stack: string | null };

export const fonts: FontOption[] = [
  { key: "geist", label: "Geist", stack: null },
  {
    key: "system",
    label: "System",
    stack:
      "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  {
    key: "serif",
    label: "Serif",
    stack: "ui-serif, Georgia, Cambria, 'Times New Roman', serif",
  },
  {
    key: "mono",
    label: "Mono",
    stack:
      "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
  },
];

export const sidebarVariants: { key: SidebarVariant; label: string }[] = [
  { key: "inset", label: "Inset" },
  { key: "sidebar", label: "Sidebar" },
  { key: "floating", label: "Floating" },
];

export const collapsibleModes: { key: SidebarCollapsible; label: string }[] = [
  { key: "icon", label: "Icon" },
  { key: "offcanvas", label: "Off-canvas" },
  { key: "none", label: "Fixed" },
];

export const contentLayouts: { key: ContentLayout; label: string }[] = [
  { key: "full", label: "Full width" },
  { key: "centered", label: "Centered" },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isKnownValue<T extends string>(value: unknown, options: readonly T[]): value is T {
  return options.some((option) => option === value);
}

export function parseThemeConfig(value: unknown): ThemeConfig {
  if (!isRecord(value)) return defaultConfig;

  const accent = isKnownValue(value.accent, accents.map((item) => item.key))
    ? value.accent
    : defaultConfig.accent;
  const radius = typeof value.radius === "number" && Number.isFinite(value.radius) && value.radius >= 0 && value.radius <= 1
    ? value.radius
    : defaultConfig.radius;
  const font = isKnownValue(value.font, fonts.map((item) => item.key)) ? value.font : defaultConfig.font;
  const sidebarVariant = isKnownValue(value.sidebarVariant, sidebarVariants.map((item) => item.key))
    ? value.sidebarVariant
    : defaultConfig.sidebarVariant;
  const sidebarCollapsible = isKnownValue(value.sidebarCollapsible, collapsibleModes.map((item) => item.key))
    ? value.sidebarCollapsible
    : defaultConfig.sidebarCollapsible;
  const contentLayout = isKnownValue(value.contentLayout, contentLayouts.map((item) => item.key))
    ? value.contentLayout
    : defaultConfig.contentLayout;

  return { accent, radius, font, sidebarVariant, sidebarCollapsible, contentLayout };
}

/** Build a copy-pasteable CSS + notes snippet for the current config. */
export function buildThemeCss(config: ThemeConfig): string {
  const accent = accents.find((a) => a.key === config.accent);
  const font = fonts.find((f) => f.key === config.font);
  const lines: string[] = [];
  lines.push("/* RoseUI theme — generated by the customizer. */");
  lines.push(":root {");
  lines.push(`  --radius: ${config.radius}rem;`);
  if (accent?.primary) {
    lines.push(`  --primary: ${accent.primary};`);
    lines.push(`  --primary-foreground: ${accent.fg};`);
    lines.push(`  --sidebar-primary: ${accent.primary};`);
    lines.push(`  --sidebar-primary-foreground: ${accent.fg};`);
  }
  if (font?.stack) {
    lines.push(`  --font-sans: ${font.stack};`);
  }
  lines.push("}");
  lines.push("");
  lines.push(
    `/* <Sidebar variant="${config.sidebarVariant}" collapsible="${config.sidebarCollapsible}" /> */`
  );
  lines.push(`/* content layout: ${config.contentLayout} */`);
  return lines.join("\n");
}
