import type { ReactNode } from "react";

import { cookies } from "next/headers";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

export async function AppLayout({ children }: { readonly children: ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset
        className={cn(
          "min-w-0 overflow-x-clip",
          "peer-data-[variant=inset]:border",
          "[html[data-content-layout=centered]_&>div]:mx-auto",
          "[html[data-content-layout=centered]_&>div]:w-full",
          "[html[data-content-layout=centered]_&>div]:max-w-screen-2xl",
        )}
      >
        <AppHeader />
        <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden p-3 md:p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
