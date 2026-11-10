"use client";

import * as React from "react";

import { useThemeConfig } from "@/components/theme-customizer";
import { SidebarProvider } from "@/components/ui/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { config } = useThemeConfig();

  return (
    <SidebarProvider disableShortcut={config.sidebarCollapsible === "none"}>
      {children}
    </SidebarProvider>
  );
}
