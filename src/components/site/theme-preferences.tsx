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
  themeColor: "theme_color",
  contentLayout: "content_layout",
  navbarStyle: "navbar_style",
  sidebarVariant: "sidebar_variant",
  sidebarCollapsible: "sidebar_collapsible",
} satisfies Record<ThemePreferenceKey, string>;

const PREFERENCE_KEYS = [
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

const BRAND_MARK_PATH =
  "M33.9 35.5 43 44.7a8.3 8.3 0 0 1 0 11.6 8.1 8.1 0 0 1-10.8.7l-.2-.2-.2.2a8.1 8.1 0 0 1-4.4 1.7h-.5a8.1 8.1 0 0 1-5.8-2.4 8.3 8.3 0 0 1 0-11.6l9.1-9.2a2.7 2.7 0 0 1 3.7 0m22.3-14.4a8.1 8.1 0 0 1 .7 10.8l-.2.2.2.2a8.1 8.1 0 0 1 1.7 4.4v.5a8.1 8.1 0 0 1-2.4 5.8 8.3 8.3 0 0 1-11.6 0l-9.2-9.1a2.7 2.7 0 0 1 0-3.7l9.2-9.1a8.3 8.3 0 0 1 11.6 0M19.7 21.1l9.2 9.1a2.7 2.7 0 0 1 0 3.7l-9.2 9.1a8.3 8.3 0 0 1-11.6 0 8.1 8.1 0 0 1-.7-10.8l.2-.2-.2-.2a8.1 8.1 0 0 1-1.7-4.4v-.5a8.1 8.1 0 0 1 2.4-5.8 8.3 8.3 0 0 1 11.6 0m17.8-15.8a8.1 8.1 0 0 1 5.8 2.4 8.3 8.3 0 0 1 0 11.6l-9.1 9.2a2.7 2.7 0 0 1-3.7 0l-9.1-9.2a8.3 8.3 0 0 1 0-11.6 8.1 8.1 0 0 1 10.8-.7l.2.2.2-.2a8.1 8.1 0 0 1 4.4-1.7z";

function applyFavicon(primary: string, foreground: string) {
  let favicon = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]');

  if (!favicon) {
    favicon = document.createElement("link");
    favicon.rel = "icon";
    document.head.appendChild(favicon);
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="${primary}"/><path fill="${foreground}" d="${BRAND_MARK_PATH}"/></svg>`;
  favicon.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function applyThemeTokens(root: HTMLElement, tokens: ThemeTokenSet) {
  for (const [property, value] of Object.entries(tokens)) {
    root.style.setProperty(property, value);
  }
}

function applyThemeColor(
  root: HTMLElement,
  color: ReturnType<typeof getThemeColorOption>,
  resolvedTheme: string | undefined,
) {
  const tokens = resolvedTheme === "dark" ? color.dark : color.light;

  applyThemeTokens(root, tokens);
  applyFavicon(tokens["--primary"], tokens["--primary-foreground"]);
}

function applyPreferences(preferences: ThemePreferences, resolvedTheme: string | undefined) {
  const root = document.documentElement;

  applyThemeColor(root, getThemeColorOption(preferences.themeColor), resolvedTheme);
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

export type { ContentLayout, NavbarStyle, SidebarCollapsible, SidebarVariant };
