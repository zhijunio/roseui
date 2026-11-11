import type { CSSProperties } from "react";

import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";

import type { Metadata } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { ThemePreferencesProvider } from "@/components/site/theme-preferences";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PROJECT_CONFIG } from "@/data/site";
import {
  DEFAULT_THEME_MODE,
  getThemeColorOption,
  parseContentLayout,
  parseNavbarStyle,
  parseSidebarCollapsible,
  parseSidebarVariant,
  parseThemeColor,
  parseThemePreset,
  type ThemePreferences,
  type ThemeTokenSet,
} from "@/data/theme";
import "./globals.css";

type ThemeTokenStyle = CSSProperties & ThemeTokenSet;

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: PROJECT_CONFIG.name,
  description: PROJECT_CONFIG.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialPreferences = {
    themePreset: parseThemePreset(cookieStore.get("theme_preset")?.value),
    themeColor: parseThemeColor(cookieStore.get("theme_color")?.value),
    contentLayout: parseContentLayout(cookieStore.get("content_layout")?.value),
    navbarStyle: parseNavbarStyle(cookieStore.get("navbar_style")?.value),
    sidebarVariant: parseSidebarVariant(cookieStore.get("sidebar_variant")?.value),
    sidebarCollapsible: parseSidebarCollapsible(cookieStore.get("sidebar_collapsible")?.value),
  } satisfies ThemePreferences;
  const themeColor = getThemeColorOption(initialPreferences.themeColor);
  const themeColorStyle: ThemeTokenStyle = { ...themeColor.light };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme-preset={initialPreferences.themePreset}
      data-theme-color={initialPreferences.themeColor}
      data-content-layout={initialPreferences.contentLayout}
      data-navbar-style={initialPreferences.navbarStyle}
      data-sidebar-variant={initialPreferences.sidebarVariant}
      data-sidebar-collapsible={initialPreferences.sidebarCollapsible}
      style={themeColorStyle}
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextThemesProvider attribute="class" defaultTheme={DEFAULT_THEME_MODE} enableSystem disableTransitionOnChange>
          <ThemePreferencesProvider initialPreferences={initialPreferences}>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </ThemePreferencesProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
