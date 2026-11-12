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
  getFontOption,
  getThemeColorOption,
  parseContentLayout,
  parseFont,
  parseNavbarStyle,
  parseSidebarCollapsible,
  parseSidebarVariant,
  parseThemeColor,
  type ThemePreferences,
  type ThemeTokenSet,
} from "@/data/theme";
import "./globals.css";

type ThemeColorStyle = CSSProperties &
  ThemeTokenSet & {
    "--font-sans": string;
  };

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
    themeColor: parseThemeColor(cookieStore.get("theme_color")?.value),
    font: parseFont(cookieStore.get("font")?.value),
    contentLayout: parseContentLayout(cookieStore.get("content_layout")?.value),
    navbarStyle: parseNavbarStyle(cookieStore.get("navbar_style")?.value),
    sidebarVariant: parseSidebarVariant(cookieStore.get("sidebar_variant")?.value),
    sidebarCollapsible: parseSidebarCollapsible(cookieStore.get("sidebar_collapsible")?.value),
  } satisfies ThemePreferences;
  const themeColor = getThemeColorOption(initialPreferences.themeColor);
  const themeColorStyle: ThemeColorStyle = {
    ...themeColor.light,
    "--font-sans": getFontOption(initialPreferences.font).stack,
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-theme-color={initialPreferences.themeColor}
      data-content-layout={initialPreferences.contentLayout}
      data-navbar-style={initialPreferences.navbarStyle}
      data-sidebar-variant={initialPreferences.sidebarVariant}
      data-sidebar-collapsible={initialPreferences.sidebarCollapsible}
      style={themeColorStyle}
    >
      <body className="min-h-full" suppressHydrationWarning>
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
