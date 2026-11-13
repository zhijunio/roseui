import { THEME_COLOR_OPTIONS, type ThemeColor } from "./theme-tokens";

export type { ThemeColor } from "./theme-tokens";

type ThemeOption<Value extends string> = {
  readonly label: string;
  readonly value: Value;
};

type ThemeOptions = readonly ThemeOption<string>[];

function isOptionValue<const Options extends ThemeOptions>(
  options: Options,
  value: string | undefined,
): value is Options[number]["value"] {
  return value !== undefined && options.some((option) => option.value === value);
}

function parseOptionValue<const Options extends ThemeOptions>(
  options: Options,
  value: string | undefined,
  fallback: Options[number]["value"],
): Options[number]["value"] {
  return isOptionValue(options, value) ? value : fallback;
}

export const THEME_MODE_OPTIONS = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
] as const satisfies ThemeOptions;

export const CONTENT_LAYOUT_OPTIONS = [
  { label: "Centered", value: "centered" },
  { label: "Full Width", value: "full-width" },
] as const satisfies ThemeOptions;

export const NAVBAR_STYLE_OPTIONS = [
  { label: "Sticky", value: "sticky" },
  { label: "Scroll", value: "scroll" },
] as const satisfies ThemeOptions;

export const SIDEBAR_VARIANT_OPTIONS = [
  { label: "Default", value: "default" },
  { label: "Floating", value: "float" },
  { label: "Inset", value: "inset" },
] as const satisfies ThemeOptions;

export const SIDEBAR_COLLAPSIBLE_OPTIONS = [
  { label: "Hidden", value: "hidden" },
  { label: "Dock", value: "dock" },
] as const satisfies ThemeOptions;

export type FontOption = ThemeOption<string> & {
  readonly stack: string;
};

export const FONT_OPTIONS = [
  {
    label: "Inter",
    value: "inter",
    stack: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  },
  {
    label: "Geist",
    value: "geist",
    stack: "var(--font-geist), ui-sans-serif, system-ui, sans-serif",
  },
  {
    label: "Serif",
    value: "serif",
    stack: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
  },
  {
    label: "Mono",
    value: "mono",
    stack: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, monospace",
  },
  {
    label: "Chinese Sans",
    value: "chinese-sans",
    stack:
      "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans CJK SC', 'Source Han Sans SC', ui-sans-serif, system-ui, sans-serif",
  },
  {
    label: "Chinese Serif",
    value: "chinese-serif",
    stack: "'Songti SC', STSong, SimSun, 'Noto Serif CJK SC', 'Source Han Serif SC', ui-serif, Georgia, serif",
  },
] as const satisfies readonly FontOption[];

export type ThemeMode = (typeof THEME_MODE_OPTIONS)[number]["value"];
export type ContentLayout = (typeof CONTENT_LAYOUT_OPTIONS)[number]["value"];
export type NavbarStyle = (typeof NAVBAR_STYLE_OPTIONS)[number]["value"];
export type SidebarVariant = (typeof SIDEBAR_VARIANT_OPTIONS)[number]["value"];
export type SidebarCollapsible = (typeof SIDEBAR_COLLAPSIBLE_OPTIONS)[number]["value"];
export type Font = (typeof FONT_OPTIONS)[number]["value"];

export const DEFAULT_THEME_MODE: ThemeMode = "system";

export type ThemePreferences = {
  themeColor: ThemeColor;
  font: Font;
  contentLayout: ContentLayout;
  navbarStyle: NavbarStyle;
  sidebarVariant: SidebarVariant;
  sidebarCollapsible: SidebarCollapsible;
};

export const DEFAULT_THEME_PREFERENCES = {
  themeColor: "blue",
  font: "inter",
  contentLayout: "centered",
  navbarStyle: "sticky",
  sidebarVariant: "default",
  sidebarCollapsible: "hidden",
} satisfies ThemePreferences;

export function isThemeColor(value: string | undefined): value is ThemeColor {
  return isOptionValue(THEME_COLOR_OPTIONS, value);
}

export function isFont(value: string | undefined): value is Font {
  return isOptionValue(FONT_OPTIONS, value);
}

export function isThemeMode(value: string | undefined): value is ThemeMode {
  return isOptionValue(THEME_MODE_OPTIONS, value);
}

export function isContentLayout(value: string | undefined): value is ContentLayout {
  return isOptionValue(CONTENT_LAYOUT_OPTIONS, value);
}

export function isNavbarStyle(value: string | undefined): value is NavbarStyle {
  return isOptionValue(NAVBAR_STYLE_OPTIONS, value);
}

export function isSidebarVariant(value: string | undefined): value is SidebarVariant {
  return isOptionValue(SIDEBAR_VARIANT_OPTIONS, value);
}

export function isSidebarCollapsible(value: string | undefined): value is SidebarCollapsible {
  return isOptionValue(SIDEBAR_COLLAPSIBLE_OPTIONS, value);
}

export function parseThemeColor(value: string | undefined): ThemeColor {
  return parseOptionValue(THEME_COLOR_OPTIONS, value, DEFAULT_THEME_PREFERENCES.themeColor);
}

export function parseFont(value: string | undefined): Font {
  return parseOptionValue(FONT_OPTIONS, value, DEFAULT_THEME_PREFERENCES.font);
}

export function getFontOption(value: Font): FontOption {
  return FONT_OPTIONS.find((option) => option.value === value) ?? FONT_OPTIONS[0];
}

export function parseContentLayout(value: string | undefined): ContentLayout {
  return parseOptionValue(CONTENT_LAYOUT_OPTIONS, value, DEFAULT_THEME_PREFERENCES.contentLayout);
}

export function parseNavbarStyle(value: string | undefined): NavbarStyle {
  return parseOptionValue(NAVBAR_STYLE_OPTIONS, value, DEFAULT_THEME_PREFERENCES.navbarStyle);
}

export function parseSidebarVariant(value: string | undefined): SidebarVariant {
  const migratedValue = value === "sidebar" ? "default" : value === "floating" ? "float" : value;
  return parseOptionValue(SIDEBAR_VARIANT_OPTIONS, migratedValue, DEFAULT_THEME_PREFERENCES.sidebarVariant);
}

export function parseSidebarCollapsible(value: string | undefined): SidebarCollapsible {
  const migratedValue = value === "icon" ? "dock" : value === "offcanvas" ? "hidden" : value;
  return parseOptionValue(SIDEBAR_COLLAPSIBLE_OPTIONS, migratedValue, DEFAULT_THEME_PREFERENCES.sidebarCollapsible);
}
