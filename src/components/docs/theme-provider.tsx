"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // React 19 treats next-themes' inline bootstrap script as an invalid client-rendered script.
  // Keep it executable in server HTML, then mark the hydrated copy as inert.
  const scriptProps = typeof window === "undefined" ? undefined : { type: "application/json" };

  return (
    <NextThemesProvider {...props} scriptProps={scriptProps}>
      {children}
    </NextThemesProvider>
  );
}
