"use client";

import * as React from "react";

import { useTheme } from "next-themes";

import {
  type ContentLayout,
  DEFAULT_THEME_MODE,
  DEFAULT_THEME_PREFERENCES,
  getThemeColorOption,
  type NavbarStyle,
  type SidebarCollapsible,
  type SidebarVariant,
  type ThemePreferences,
  type ThemePreset,
  type ThemeTokenSet,
} from "@/data/theme";

type ThemePreferenceKey = keyof ThemePreferences;
type ThemePreferenceValueMap = {
  [Key in ThemePreferenceKey]: ThemePreferences[Key];
};

type ThemePreferencesContextValue = {
  preferences: ThemePreferences;
  setPreference: <Key extends ThemePreferenceKey>(key: Key, value: ThemePreferenceValueMap[Key]) => void;
  resetPreferences: () => void;
};

const PREFERENCE_COOKIES = {
  themePreset: "theme_preset",
  themeColor: "theme_color",
  contentLayout: "content_layout",
  navbarStyle: "navbar_style",
  sidebarVariant: "sidebar_variant",
  sidebarCollapsible: "sidebar_collapsible",
} satisfies Record<ThemePreferenceKey, string>;

const PREFERENCE_KEYS = [
  "themePreset",
  "themeColor",
  "contentLayout",
  "navbarStyle",
  "sidebarVariant",
  "sidebarCollapsible",
] as const satisfies readonly ThemePreferenceKey[];

const ThemePreferencesContext = React.createContext<ThemePreferencesContextValue | null>(null);

function persistPreference(key: ThemePreferenceKey, value: string) {
  // Keep layout preferences available to the server on the next render.
  // biome-ignore lint/suspicious/noDocumentCookie: the browser cookie is the SSR persistence channel for layout preferences.
  document.cookie = `${PREFERENCE_COOKIES[key]}=${encodeURIComponent(value)}; Max-Age=31536000; Path=/; SameSite=Lax`;
}

function applyThemeTokens(root: HTMLElement, tokens: ThemeTokenSet) {
  for (const [property, value] of Object.entries(tokens)) {
    root.style.setProperty(property, value);
  }
}

function applyPreferences(preferences: ThemePreferences, resolvedTheme: string | undefined) {
  const root = document.documentElement;
  const themeColor = getThemeColorOption(preferences.themeColor);
  const tokens = resolvedTheme === "dark" ? themeColor.dark : themeColor.light;

  applyThemeTokens(root, tokens);
  root.dataset.themePreset = preferences.themePreset;
  root.dataset.themeColor = preferences.themeColor;
  root.dataset.contentLayout = preferences.contentLayout;
  root.dataset.navbarStyle = preferences.navbarStyle;
  root.dataset.sidebarVariant = preferences.sidebarVariant;
  root.dataset.sidebarCollapsible = preferences.sidebarCollapsible;
}

export function ThemePreferencesProvider({
  children,
  initialPreferences,
}: {
  children: React.ReactNode;
  initialPreferences: ThemePreferences;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [preferences, setPreferences] = React.useState(initialPreferences);

  React.useEffect(() => {
    applyPreferences(preferences, resolvedTheme);
  }, [preferences, resolvedTheme]);

  const setPreference = React.useCallback(
    <Key extends ThemePreferenceKey>(key: Key, value: ThemePreferenceValueMap[Key]) => {
      setPreferences((current) => ({ ...current, [key]: value }));
      persistPreference(key, value);
    },
    [],
  );

  const resetPreferences = React.useCallback(() => {
    setPreferences(DEFAULT_THEME_PREFERENCES);
    setTheme(DEFAULT_THEME_MODE);

    for (const key of PREFERENCE_KEYS) {
      persistPreference(key, DEFAULT_THEME_PREFERENCES[key]);
    }
  }, [setTheme]);

  const value = React.useMemo(
    () => ({ preferences, setPreference, resetPreferences }),
    [preferences, resetPreferences, setPreference],
  );

  return <ThemePreferencesContext.Provider value={value}>{children}</ThemePreferencesContext.Provider>;
}

export function useThemePreferences() {
  const context = React.useContext(ThemePreferencesContext);

  if (!context) {
    throw new Error("useThemePreferences must be used within ThemePreferencesProvider");
  }

  return context;
}

export type { ContentLayout, NavbarStyle, SidebarCollapsible, SidebarVariant, ThemePreset };
