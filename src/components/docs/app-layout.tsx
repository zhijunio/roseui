import type { ReactNode } from "react";

import { cookies } from "next/headers";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn, demoAvatarUrl } from "@/lib/utils";

import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";
import type { AccountUser } from "./user-menu";

const shellUser: AccountUser = {
  name: "Alex Morgan",
  email: "alex.morgan@roseui.com",
  avatar: demoAvatarUrl("Alex Morgan"),
};

export async function AppLayout({ children }: { readonly children: ReactNode }) {
  const cookieStore = await cookies();
  const savedSidebarState = cookieStore.get("sidebar_state")?.value;
  const defaultOpen = savedSidebarState === undefined ? true : savedSidebarState === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar user={shellUser} />
      <SidebarInset
        className={cn(
          "min-w-0 overflow-x-clip",
          "peer-data-[variant=inset]:border",
          "[html[data-content-layout=centered]_&>div]:mx-auto",
          "[html[data-content-layout=centered]_&>div]:w-full",
          "[html[data-content-layout=centered]_&>div]:max-w-screen-2xl",
        )}
      >
        <AppHeader user={shellUser} />
        <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden p-3 md:p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
