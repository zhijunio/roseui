type ThemeOption<Value extends string> = {
  readonly label: string;
  readonly value: Value;
};

type ThemePresetOption = ThemeOption<string> & {
  readonly primary: {
    readonly light: string;
    readonly dark: string;
  };
};

export type ThemeTokenSet = {
  readonly "--background": string;
  readonly "--foreground": string;
  readonly "--card": string;
  readonly "--card-foreground": string;
  readonly "--popover": string;
  readonly "--popover-foreground": string;
  readonly "--primary": string;
  readonly "--primary-foreground": string;
  readonly "--secondary": string;
  readonly "--secondary-foreground": string;
  readonly "--muted": string;
  readonly "--muted-foreground": string;
  readonly "--accent": string;
  readonly "--accent-foreground": string;
  readonly "--destructive": string;
  readonly "--destructive-foreground": string;
  readonly "--border": string;
  readonly "--input": string;
  readonly "--ring": string;
  readonly "--chart-1": string;
  readonly "--chart-2": string;
  readonly "--chart-3": string;
  readonly "--chart-4": string;
  readonly "--chart-5": string;
  readonly "--sidebar": string;
  readonly "--sidebar-foreground": string;
  readonly "--sidebar-primary": string;
  readonly "--sidebar-primary-foreground": string;
  readonly "--sidebar-accent": string;
  readonly "--sidebar-accent-foreground": string;
  readonly "--sidebar-border": string;
  readonly "--sidebar-ring": string;
  readonly "--success": string;
  readonly "--success-foreground": string;
  readonly "--info": string;
  readonly "--info-foreground": string;
  readonly "--warning": string;
  readonly "--warning-foreground": string;
};

type ThemeColorOption = ThemeOption<string> & {
  readonly swatch: string;
  readonly light: ThemeTokenSet;
  readonly dark: ThemeTokenSet;
};

type ThemeTokenOverrides = Partial<ThemeTokenSet>;

type ThemeOptions = readonly ThemeOption<string>[];
type ThemePresetOptions = readonly ThemePresetOption[];
type ThemeColorOptions = readonly ThemeColorOption[];

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

export const THEME_PRESET_OPTIONS = [
  {
    label: "Default",
    value: "default",
    primary: {
      light: "#0385ff",
      dark: "#3d9aff",
    },
  },
  {
    label: "VTRON",
    value: "vtron",
    primary: {
      light: "#2e67ff",
      dark: "#2b65ff",
    },
  },
  {
    label: "Clean Slate",
    value: "clean-slate",
    primary: {
      light: "#6366f1",
      dark: "#818cf8",
    },
  },
  {
    label: "Twitter",
    value: "twitter",
    primary: {
      light: "#1e9df1",
      dark: "#1c9cf0",
    },
  },
  {
    label: "RoseUI",
    value: "roseui",
    primary: {
      light: "#0385ff",
      dark: "#3d9aff",
    },
  },
] as const satisfies ThemePresetOptions;

const ROSEUI_LIGHT_TOKENS = {
  "--background": "#fafafb",
  "--foreground": "#1f2124",
  "--card": "#ffffff",
  "--card-foreground": "#1f2124",
  "--popover": "#fafafb",
  "--popover-foreground": "#1f2124",
  "--primary": "#0385ff",
  "--primary-foreground": "#08121f",
  "--secondary": "#f7f8f9",
  "--secondary-foreground": "#1f2124",
  "--muted": "#f1f2f3",
  "--muted-foreground": "#62656b",
  "--accent": "#f6f7f8",
  "--accent-foreground": "#1f2124",
  "--destructive": "#e3474c",
  "--destructive-foreground": "#08121f",
  "--border": "#ecedef",
  "--input": "#f2f2f3",
  "--ring": "#ecedef",
  "--chart-1": "#0385ff",
  "--chart-2": "#0aa852",
  "--chart-3": "#db9900",
  "--chart-4": "#f14445",
  "--chart-5": "#ac67ef",
  "--sidebar": "#ffffff",
  "--sidebar-foreground": "#1f2124",
  "--sidebar-primary": "#0385ff",
  "--sidebar-primary-foreground": "#08121f",
  "--sidebar-accent": "#f6f7f8",
  "--sidebar-accent-foreground": "#1f2124",
  "--sidebar-border": "#ecedef",
  "--sidebar-ring": "#ecedef",
  "--success": "var(--chart-2)",
  "--success-foreground": "#03270f",
  "--info": "var(--chart-1)",
  "--info-foreground": "#03060d",
  "--warning": "var(--chart-3)",
  "--warning-foreground": "#45240f",
} satisfies ThemeTokenSet;

const ROSEUI_DARK_TOKENS = {
  "--background": "#17181a",
  "--foreground": "#f2f3f4",
  "--card": "#232427",
  "--card-foreground": "#f2f3f4",
  "--popover": "#17181a",
  "--popover-foreground": "#f2f3f4",
  "--primary": "#3d9aff",
  "--primary-foreground": "#08121f",
  "--secondary": "#1f2022",
  "--secondary-foreground": "#f2f3f4",
  "--muted": "#1c1d1f",
  "--muted-foreground": "#a5a8ad",
  "--accent": "#2a2b2e",
  "--accent-foreground": "#f2f3f4",
  "--destructive": "#ee5c61",
  "--destructive-foreground": "#08121f",
  "--border": "#2e3033",
  "--input": "#2b2c2f",
  "--ring": "#2e3033",
  "--chart-1": "#3d9aff",
  "--chart-2": "#46c779",
  "--chart-3": "#f5af20",
  "--chart-4": "#ff7871",
  "--chart-5": "#c896ff",
  "--sidebar": "#1c1d1f",
  "--sidebar-foreground": "#f2f3f4",
  "--sidebar-primary": "#3d9aff",
  "--sidebar-primary-foreground": "#08121f",
  "--sidebar-accent": "#2a2b2e",
  "--sidebar-accent-foreground": "#f2f3f4",
  "--sidebar-border": "#2e3033",
  "--sidebar-ring": "#2e3033",
  "--success": "var(--chart-2)",
  "--success-foreground": "#a9e1b8",
  "--info": "var(--chart-1)",
  "--info-foreground": "#08121f",
  "--warning": "var(--chart-3)",
  "--warning-foreground": "#ffd4a6",
} satisfies ThemeTokenSet;

function createThemeColor<const Value extends string>({
  label,
  value,
  swatch,
  light = {},
  dark = {},
}: {
  label: string;
  value: Value;
  swatch: string;
  light?: ThemeTokenOverrides;
  dark?: ThemeTokenOverrides;
}): ThemeColorOption & { readonly value: Value } {
  return {
    label,
    value,
    swatch,
    light: { ...ROSEUI_LIGHT_TOKENS, ...light },
    dark: { ...ROSEUI_DARK_TOKENS, ...dark },
  };
}

export const THEME_COLOR_OPTIONS = [
  createThemeColor({
    label: "Neutral",
    value: "neutral",
    swatch: "#737373",
    light: {
      "--background": "#ffffff",
      "--foreground": "#0a0a0a",
      "--card": "#ffffff",
      "--card-foreground": "#0a0a0a",
      "--popover": "#ffffff",
      "--popover-foreground": "#0a0a0a",
      "--primary": "#171717",
      "--primary-foreground": "#fafafa",
      "--secondary": "#f5f5f5",
      "--secondary-foreground": "#171717",
      "--muted": "#f5f5f5",
      "--muted-foreground": "#737373",
      "--accent": "#f5f5f5",
      "--accent-foreground": "#171717",
      "--destructive": "#e7000b",
      "--destructive-foreground": "#ffffff",
      "--border": "#e5e5e5",
      "--input": "#e5e5e5",
      "--ring": "#a1a1a1",
      "--chart-1": "#91c5ff",
      "--chart-2": "#3a81f6",
      "--chart-3": "#2563ef",
      "--chart-4": "#1a4eda",
      "--chart-5": "#1f3fad",
      "--sidebar": "#fafafa",
      "--sidebar-foreground": "#0a0a0a",
      "--sidebar-primary": "#171717",
      "--sidebar-primary-foreground": "#fafafa",
      "--sidebar-accent": "#f5f5f5",
      "--sidebar-accent-foreground": "#171717",
      "--sidebar-border": "#e5e5e5",
      "--sidebar-ring": "#a1a1a1",
      "--success-foreground": "var(--foreground)",
      "--info-foreground": "var(--primary-foreground)",
      "--warning-foreground": "var(--foreground)",
    },
    dark: {
      "--background": "#0a0a0a",
      "--foreground": "#fafafa",
      "--card": "#171717",
      "--card-foreground": "#fafafa",
      "--popover": "#262626",
      "--popover-foreground": "#fafafa",
      "--primary": "#e5e5e5",
      "--primary-foreground": "#171717",
      "--secondary": "#262626",
      "--secondary-foreground": "#fafafa",
      "--muted": "#262626",
      "--muted-foreground": "#a1a1a1",
      "--accent": "#404040",
      "--accent-foreground": "#fafafa",
      "--destructive": "#ff6467",
      "--destructive-foreground": "#fafafa",
      "--border": "#282828",
      "--input": "#343434",
      "--ring": "#737373",
      "--chart-1": "#91c5ff",
      "--chart-2": "#3a81f6",
      "--chart-3": "#2563ef",
      "--chart-4": "#1a4eda",
      "--chart-5": "#1f3fad",
      "--sidebar": "#171717",
      "--sidebar-foreground": "#fafafa",
      "--sidebar-primary": "#1447e6",
      "--sidebar-primary-foreground": "#fafafa",
      "--sidebar-accent": "#262626",
      "--sidebar-accent-foreground": "#fafafa",
      "--sidebar-border": "#282828",
      "--sidebar-ring": "#525252",
      "--success-foreground": "var(--foreground)",
      "--info-foreground": "var(--primary-foreground)",
      "--warning-foreground": "var(--foreground)",
    },
  }),
  createThemeColor({
    label: "Blue",
    value: "blue",
    swatch: "#0385ff",
  }),
  createThemeColor({
    label: "Violet",
    value: "violet",
    swatch: "#7c3aed",
    light: {
      "--background": "#f8fafc",
      "--foreground": "#1e293b",
      "--card": "#ffffff",
      "--card-foreground": "#1e293b",
      "--popover": "#ffffff",
      "--popover-foreground": "#1e293b",
      "--primary": "#6366f1",
      "--primary-foreground": "#ffffff",
      "--secondary": "#e5e7eb",
      "--secondary-foreground": "#374151",
      "--muted": "#f3f4f6",
      "--muted-foreground": "#6b7280",
      "--accent": "#e0e7ff",
      "--accent-foreground": "#374151",
      "--destructive": "#ef4444",
      "--destructive-foreground": "#ffffff",
      "--border": "#d1d5db",
      "--input": "#d1d5db",
      "--ring": "#6366f1",
      "--chart-1": "#6366f1",
      "--chart-2": "#4f46e5",
      "--chart-3": "#4338ca",
      "--chart-4": "#3730a3",
      "--chart-5": "#312e81",
      "--sidebar": "#f3f4f6",
      "--sidebar-foreground": "#1e293b",
      "--sidebar-primary": "#6366f1",
      "--sidebar-primary-foreground": "#ffffff",
      "--sidebar-accent": "#e0e7ff",
      "--sidebar-accent-foreground": "#374151",
      "--sidebar-border": "#d1d5db",
      "--sidebar-ring": "#6366f1",
    },
    dark: {
      "--background": "#0f172a",
      "--foreground": "#e2e8f0",
      "--card": "#1e293b",
      "--card-foreground": "#e2e8f0",
      "--popover": "#1e293b",
      "--popover-foreground": "#e2e8f0",
      "--primary": "#818cf8",
      "--primary-foreground": "#0f172a",
      "--secondary": "#2d3748",
      "--secondary-foreground": "#d1d5db",
      "--muted": "#152032",
      "--muted-foreground": "#9ca3af",
      "--accent": "#374151",
      "--accent-foreground": "#d1d5db",
      "--destructive": "#ef4444",
      "--destructive-foreground": "#0f172a",
      "--border": "#4b5563",
      "--input": "#4b5563",
      "--ring": "#818cf8",
      "--chart-1": "#818cf8",
      "--chart-2": "#6366f1",
      "--chart-3": "#4f46e5",
      "--chart-4": "#4338ca",
      "--chart-5": "#3730a3",
      "--sidebar": "#1e293b",
      "--sidebar-foreground": "#e2e8f0",
      "--sidebar-primary": "#818cf8",
      "--sidebar-primary-foreground": "#0f172a",
      "--sidebar-accent": "#374151",
      "--sidebar-accent-foreground": "#d1d5db",
      "--sidebar-border": "#4b5563",
      "--sidebar-ring": "#818cf8",
    },
  }),
  createThemeColor({
    label: "Green",
    value: "green",
    swatch: "#16a34a",
    light: {
      "--background": "#f7fbf8",
      "--foreground": "#17231b",
      "--card": "#ffffff",
      "--card-foreground": "#17231b",
      "--popover": "#f7fbf8",
      "--popover-foreground": "#17231b",
      "--primary": "#16a34a",
      "--primary-foreground": "#ffffff",
      "--secondary": "#eef7f0",
      "--secondary-foreground": "#17231b",
      "--muted": "#edf7ef",
      "--muted-foreground": "#557060",
      "--accent": "#ddf3e2",
      "--accent-foreground": "#166534",
      "--border": "#dcebe0",
      "--input": "#e6f0e8",
      "--ring": "#68b57b",
      "--chart-1": "#16a34a",
      "--chart-2": "#0aa852",
      "--chart-3": "#15803d",
      "--chart-4": "#166534",
      "--chart-5": "#14532d",
      "--sidebar": "#f4fbf5",
      "--sidebar-foreground": "#17231b",
      "--sidebar-primary": "#16a34a",
      "--sidebar-primary-foreground": "#ffffff",
      "--sidebar-accent": "#e3f4e7",
      "--sidebar-accent-foreground": "#166534",
      "--sidebar-border": "#dcebe0",
      "--sidebar-ring": "#68b57b",
      "--success-foreground": "#ffffff",
      "--info-foreground": "#ffffff",
      "--warning-foreground": "#ffffff",
    },
    dark: {
      "--background": "#101812",
      "--foreground": "#e7f5ea",
      "--card": "#1b2a20",
      "--card-foreground": "#e7f5ea",
      "--popover": "#101812",
      "--popover-foreground": "#e7f5ea",
      "--primary": "#4ade80",
      "--primary-foreground": "#052e16",
      "--secondary": "#203225",
      "--secondary-foreground": "#e7f5ea",
      "--muted": "#1b2a20",
      "--muted-foreground": "#a5c4ad",
      "--accent": "#28412e",
      "--accent-foreground": "#bbf7d0",
      "--border": "#2c4533",
      "--input": "#29402f",
      "--ring": "#4ade80",
      "--chart-1": "#4ade80",
      "--chart-2": "#34d399",
      "--chart-3": "#22c55e",
      "--chart-4": "#16a34a",
      "--chart-5": "#15803d",
      "--sidebar": "#17251b",
      "--sidebar-foreground": "#e7f5ea",
      "--sidebar-primary": "#4ade80",
      "--sidebar-primary-foreground": "#052e16",
      "--sidebar-accent": "#28412e",
      "--sidebar-accent-foreground": "#bbf7d0",
      "--sidebar-border": "#2c4533",
      "--sidebar-ring": "#4ade80",
      "--success-foreground": "#052e16",
      "--info-foreground": "#052e16",
      "--warning-foreground": "#052e16",
    },
  }),
  createThemeColor({
    label: "Teal",
    value: "teal",
    swatch: "#0f766e",
    light: {
      "--background": "#f7fbfb",
      "--foreground": "#142525",
      "--card": "#ffffff",
      "--card-foreground": "#142525",
      "--popover": "#f7fbfb",
      "--popover-foreground": "#142525",
      "--primary": "#0f766e",
      "--primary-foreground": "#ffffff",
      "--secondary": "#edf7f6",
      "--secondary-foreground": "#143d3a",
      "--muted": "#eaf5f4",
      "--muted-foreground": "#54716f",
      "--accent": "#d9f2ef",
      "--accent-foreground": "#115e59",
      "--border": "#d9eae8",
      "--input": "#e4f0ef",
      "--ring": "#58a9a2",
      "--chart-1": "#0f766e",
      "--chart-2": "#0d9488",
      "--chart-3": "#14b8a6",
      "--chart-4": "#0f9f94",
      "--chart-5": "#115e59",
      "--sidebar": "#f2fbfa",
      "--sidebar-foreground": "#142525",
      "--sidebar-primary": "#0f766e",
      "--sidebar-primary-foreground": "#ffffff",
      "--sidebar-accent": "#dff4f1",
      "--sidebar-accent-foreground": "#115e59",
      "--sidebar-border": "#d9eae8",
      "--sidebar-ring": "#58a9a2",
      "--success-foreground": "#ffffff",
      "--info-foreground": "#ffffff",
      "--warning-foreground": "#ffffff",
    },
    dark: {
      "--background": "#0f1a1a",
      "--foreground": "#e5f5f3",
      "--card": "#192828",
      "--card-foreground": "#e5f5f3",
      "--popover": "#0f1a1a",
      "--popover-foreground": "#e5f5f3",
      "--primary": "#2dd4bf",
      "--primary-foreground": "#042f2e",
      "--secondary": "#1d3433",
      "--secondary-foreground": "#e5f5f3",
      "--muted": "#182b2b",
      "--muted-foreground": "#9dc3bf",
      "--accent": "#254441",
      "--accent-foreground": "#99f6e4",
      "--border": "#2c4745",
      "--input": "#294543",
      "--ring": "#2dd4bf",
      "--chart-1": "#2dd4bf",
      "--chart-2": "#14b8a6",
      "--chart-3": "#0d9488",
      "--chart-4": "#0f766e",
      "--chart-5": "#115e59",
      "--sidebar": "#162525",
      "--sidebar-foreground": "#e5f5f3",
      "--sidebar-primary": "#2dd4bf",
      "--sidebar-primary-foreground": "#042f2e",
      "--sidebar-accent": "#254441",
      "--sidebar-accent-foreground": "#99f6e4",
      "--sidebar-border": "#2c4745",
      "--sidebar-ring": "#2dd4bf",
      "--success-foreground": "#042f2e",
      "--info-foreground": "#042f2e",
      "--warning-foreground": "#042f2e",
    },
  }),
  createThemeColor({
    label: "Amber",
    value: "amber",
    swatch: "#d97706",
    light: {
      "--background": "#fffbf5",
      "--foreground": "#2b2114",
      "--card": "#ffffff",
      "--card-foreground": "#2b2114",
      "--popover": "#fffbf5",
      "--popover-foreground": "#2b2114",
      "--primary": "#d97706",
      "--primary-foreground": "#ffffff",
      "--secondary": "#fff6e6",
      "--secondary-foreground": "#5b3a0a",
      "--muted": "#fff3d9",
      "--muted-foreground": "#806a45",
      "--accent": "#ffedbd",
      "--accent-foreground": "#713f12",
      "--border": "#f0dfbf",
      "--input": "#f5e7cd",
      "--ring": "#e4a43d",
      "--chart-1": "#d97706",
      "--chart-2": "#b7791f",
      "--chart-3": "#f59e0b",
      "--chart-4": "#ca8a04",
      "--chart-5": "#92400e",
      "--sidebar": "#fffaf0",
      "--sidebar-foreground": "#2b2114",
      "--sidebar-primary": "#d97706",
      "--sidebar-primary-foreground": "#ffffff",
      "--sidebar-accent": "#ffefc8",
      "--sidebar-accent-foreground": "#713f12",
      "--sidebar-border": "#f0dfbf",
      "--sidebar-ring": "#e4a43d",
      "--success-foreground": "#ffffff",
      "--info-foreground": "#ffffff",
      "--warning-foreground": "#ffffff",
    },
    dark: {
      "--background": "#1c160c",
      "--foreground": "#fff4dc",
      "--card": "#2b2111",
      "--card-foreground": "#fff4dc",
      "--popover": "#1c160c",
      "--popover-foreground": "#fff4dc",
      "--primary": "#f5af20",
      "--primary-foreground": "#451a03",
      "--secondary": "#3a2a13",
      "--secondary-foreground": "#fff4dc",
      "--muted": "#30230f",
      "--muted-foreground": "#cbb78d",
      "--accent": "#4a3512",
      "--accent-foreground": "#fde68a",
      "--border": "#57421d",
      "--input": "#4a3718",
      "--ring": "#f5af20",
      "--chart-1": "#f5af20",
      "--chart-2": "#f59e0b",
      "--chart-3": "#d97706",
      "--chart-4": "#b45309",
      "--chart-5": "#92400e",
      "--sidebar": "#261d0e",
      "--sidebar-foreground": "#fff4dc",
      "--sidebar-primary": "#f5af20",
      "--sidebar-primary-foreground": "#451a03",
      "--sidebar-accent": "#4a3512",
      "--sidebar-accent-foreground": "#fde68a",
      "--sidebar-border": "#57421d",
      "--sidebar-ring": "#f5af20",
      "--success-foreground": "#451a03",
      "--info-foreground": "#451a03",
      "--warning-foreground": "#451a03",
    },
  }),
  createThemeColor({
    label: "Orange",
    value: "orange",
    swatch: "#ea580c",
    light: {
      "--background": "#fffaf7",
      "--foreground": "#2b1710",
      "--card": "#ffffff",
      "--card-foreground": "#2b1710",
      "--popover": "#fffaf7",
      "--popover-foreground": "#2b1710",
      "--primary": "#ea580c",
      "--primary-foreground": "#ffffff",
      "--secondary": "#fff0e8",
      "--secondary-foreground": "#61220c",
      "--muted": "#fff1eb",
      "--muted-foreground": "#875d4d",
      "--accent": "#ffe1d3",
      "--accent-foreground": "#9a3412",
      "--border": "#f2ddd2",
      "--input": "#f7e5dc",
      "--ring": "#ee8a5c",
      "--chart-1": "#ea580c",
      "--chart-2": "#f97316",
      "--chart-3": "#fb923c",
      "--chart-4": "#c2410c",
      "--chart-5": "#9a3412",
      "--sidebar": "#fff8f4",
      "--sidebar-foreground": "#2b1710",
      "--sidebar-primary": "#ea580c",
      "--sidebar-primary-foreground": "#ffffff",
      "--sidebar-accent": "#ffe6d9",
      "--sidebar-accent-foreground": "#9a3412",
      "--sidebar-border": "#f2ddd2",
      "--sidebar-ring": "#ee8a5c",
      "--success-foreground": "#ffffff",
      "--info-foreground": "#ffffff",
      "--warning-foreground": "#ffffff",
    },
    dark: {
      "--background": "#1c100b",
      "--foreground": "#fff1e9",
      "--card": "#2d1a10",
      "--card-foreground": "#fff1e9",
      "--popover": "#1c100b",
      "--popover-foreground": "#fff1e9",
      "--primary": "#fb923c",
      "--primary-foreground": "#431407",
      "--secondary": "#3b2114",
      "--secondary-foreground": "#fff1e9",
      "--muted": "#322016",
      "--muted-foreground": "#d0a18b",
      "--accent": "#4b2818",
      "--accent-foreground": "#fed7aa",
      "--border": "#5a3321",
      "--input": "#4a2b1b",
      "--ring": "#fb923c",
      "--chart-1": "#fb923c",
      "--chart-2": "#f97316",
      "--chart-3": "#ea580c",
      "--chart-4": "#c2410c",
      "--chart-5": "#9a3412",
      "--sidebar": "#26170e",
      "--sidebar-foreground": "#fff1e9",
      "--sidebar-primary": "#fb923c",
      "--sidebar-primary-foreground": "#431407",
      "--sidebar-accent": "#4b2818",
      "--sidebar-accent-foreground": "#fed7aa",
      "--sidebar-border": "#5a3321",
      "--sidebar-ring": "#fb923c",
      "--success-foreground": "#431407",
      "--info-foreground": "#431407",
      "--warning-foreground": "#431407",
    },
  }),
  createThemeColor({
    label: "Rose",
    value: "rose",
    swatch: "#e11d48",
    light: {
      "--background": "#fff8f9",
      "--foreground": "#2b141b",
      "--card": "#ffffff",
      "--card-foreground": "#2b141b",
      "--popover": "#fff8f9",
      "--popover-foreground": "#2b141b",
      "--primary": "#e11d48",
      "--primary-foreground": "#ffffff",
      "--secondary": "#fff0f2",
      "--secondary-foreground": "#681b2f",
      "--muted": "#fff0f2",
      "--muted-foreground": "#875767",
      "--accent": "#ffe0e6",
      "--accent-foreground": "#9f1239",
      "--border": "#f1dce1",
      "--input": "#f7e5e8",
      "--ring": "#ed6b8a",
      "--chart-1": "#e11d48",
      "--chart-2": "#db2777",
      "--chart-3": "#f43f5e",
      "--chart-4": "#be123c",
      "--chart-5": "#9f1239",
      "--sidebar": "#fff6f7",
      "--sidebar-foreground": "#2b141b",
      "--sidebar-primary": "#e11d48",
      "--sidebar-primary-foreground": "#ffffff",
      "--sidebar-accent": "#ffe4e8",
      "--sidebar-accent-foreground": "#9f1239",
      "--sidebar-border": "#f1dce1",
      "--sidebar-ring": "#ed6b8a",
      "--success-foreground": "#ffffff",
      "--info-foreground": "#ffffff",
      "--warning-foreground": "#ffffff",
    },
    dark: {
      "--background": "#1c0d12",
      "--foreground": "#fff0f3",
      "--card": "#2b151d",
      "--card-foreground": "#fff0f3",
      "--popover": "#1c0d12",
      "--popover-foreground": "#fff0f3",
      "--primary": "#fb7185",
      "--primary-foreground": "#4c0519",
      "--secondary": "#3b1d27",
      "--secondary-foreground": "#fff0f3",
      "--muted": "#321923",
      "--muted-foreground": "#d4a0ad",
      "--accent": "#4b2330",
      "--accent-foreground": "#fecdd3",
      "--border": "#5c2e3b",
      "--input": "#4a2732",
      "--ring": "#fb7185",
      "--chart-1": "#fb7185",
      "--chart-2": "#f472b6",
      "--chart-3": "#f43f5e",
      "--chart-4": "#e11d48",
      "--chart-5": "#be123c",
      "--sidebar": "#27131b",
      "--sidebar-foreground": "#fff0f3",
      "--sidebar-primary": "#fb7185",
      "--sidebar-primary-foreground": "#4c0519",
      "--sidebar-accent": "#4b2330",
      "--sidebar-accent-foreground": "#fecdd3",
      "--sidebar-border": "#5c2e3b",
      "--sidebar-ring": "#fb7185",
      "--success-foreground": "#4c0519",
      "--info-foreground": "#4c0519",
      "--warning-foreground": "#4c0519",
    },
  }),
] as const satisfies ThemeColorOptions;

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
  { label: "Sidebar", value: "sidebar" },
  { label: "Inset", value: "inset" },
  { label: "Floating", value: "floating" },
] as const satisfies ThemeOptions;

export const SIDEBAR_COLLAPSIBLE_OPTIONS = [
  { label: "Icon", value: "icon" },
  { label: "Offcanvas", value: "offcanvas" },
] as const satisfies ThemeOptions;

export type ThemePreset = (typeof THEME_PRESET_OPTIONS)[number]["value"];
export type ThemeColor = (typeof THEME_COLOR_OPTIONS)[number]["value"];
export type ThemeMode = (typeof THEME_MODE_OPTIONS)[number]["value"];
export type ContentLayout = (typeof CONTENT_LAYOUT_OPTIONS)[number]["value"];
export type NavbarStyle = (typeof NAVBAR_STYLE_OPTIONS)[number]["value"];
export type SidebarVariant = (typeof SIDEBAR_VARIANT_OPTIONS)[number]["value"];
export type SidebarCollapsible = (typeof SIDEBAR_COLLAPSIBLE_OPTIONS)[number]["value"];

export const DEFAULT_THEME_MODE: ThemeMode = "system";

export type ThemePreferences = {
  themePreset: ThemePreset;
  themeColor: ThemeColor;
  contentLayout: ContentLayout;
  navbarStyle: NavbarStyle;
  sidebarVariant: SidebarVariant;
  sidebarCollapsible: SidebarCollapsible;
};

export const DEFAULT_THEME_PREFERENCES = {
  themePreset: "default",
  themeColor: "blue",
  contentLayout: "centered",
  navbarStyle: "sticky",
  sidebarVariant: "sidebar",
  sidebarCollapsible: "icon",
} satisfies ThemePreferences;

export function isThemePreset(value: string | undefined): value is ThemePreset {
  return isOptionValue(THEME_PRESET_OPTIONS, value);
}

export function isThemeColor(value: string | undefined): value is ThemeColor {
  return isOptionValue(THEME_COLOR_OPTIONS, value);
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

export function parseThemePreset(value: string | undefined): ThemePreset {
  return parseOptionValue(THEME_PRESET_OPTIONS, value, DEFAULT_THEME_PREFERENCES.themePreset);
}

export function parseThemeColor(value: string | undefined): ThemeColor {
  return parseOptionValue(THEME_COLOR_OPTIONS, value, DEFAULT_THEME_PREFERENCES.themeColor);
}

export function getThemeColorOption(value: ThemeColor): ThemeColorOption {
  return THEME_COLOR_OPTIONS.find((option) => option.value === value) ?? THEME_COLOR_OPTIONS[0];
}

export function parseContentLayout(value: string | undefined): ContentLayout {
  return parseOptionValue(CONTENT_LAYOUT_OPTIONS, value, DEFAULT_THEME_PREFERENCES.contentLayout);
}

export function parseNavbarStyle(value: string | undefined): NavbarStyle {
  return parseOptionValue(NAVBAR_STYLE_OPTIONS, value, DEFAULT_THEME_PREFERENCES.navbarStyle);
}

export function parseSidebarVariant(value: string | undefined): SidebarVariant {
  return parseOptionValue(SIDEBAR_VARIANT_OPTIONS, value, DEFAULT_THEME_PREFERENCES.sidebarVariant);
}

export function parseSidebarCollapsible(value: string | undefined): SidebarCollapsible {
  return parseOptionValue(SIDEBAR_COLLAPSIBLE_OPTIONS, value, DEFAULT_THEME_PREFERENCES.sidebarCollapsible);
}
