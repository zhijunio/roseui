"use client";

import * as React from "react";

import Link from "next/link";

import { EllipsisVertical, Search, X } from "lucide-react";

import { NavMain } from "@/components/site/nav-main";
import { UserAvatar, UserMenu } from "@/components/site/user-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NAV_DATA } from "@/data/nav";
import { currentUser } from "@/data/user";

import { useThemePreferences } from "./theme-preferences";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { preferences } = useThemePreferences();
  const { isMobile } = useSidebar();
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <Sidebar {...props} variant={preferences.sidebarVariant} collapsible={preferences.sidebarCollapsible}>
      <SidebarHeader>
        <div className="flex h-10 items-center gap-2 px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <Link prefetch={false} href="/components/accordion" aria-label="RoseUI home">
            <span className="bg-primary text-primary-foreground grid size-7 shrink-0 place-items-center rounded-md text-xs font-semibold">
              R
            </span>
          </Link>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold">RoseUI</p>
            <p className="text-muted-foreground truncate text-xs">Components &amp; Blocks</p>
          </div>
        </div>
        <div className="relative px-1 pt-2 group-data-[collapsible=icon]:hidden">
          <div className="relative h-9">
            <Search
              aria-hidden="true"
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-3.5 -translate-y-1/2"
            />
            <SidebarInput
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setSearchQuery("");
                  event.currentTarget.blur();
                }
              }}
              placeholder="Search components"
              aria-label="Search components"
              className="bg-sidebar-accent/45 h-9 pr-12 pl-8.5"
            />
            {searchQuery ? (
              <button
                type="button"
                aria-label="Clear component search"
                onClick={() => setSearchQuery("")}
                className="text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-sidebar-ring absolute top-1/2 right-2.5 grid size-6 -translate-y-1/2 place-items-center rounded-md transition-colors focus-visible:ring-2"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain sections={NAV_DATA} searchQuery={searchQuery} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu user={currentUser} side={isMobile ? "bottom" : "right"}>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center"
              >
                <UserAvatar user={currentUser} />
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-medium">{currentUser.name}</span>
                  <span className="text-muted-foreground truncate text-xs">{currentUser.email}</span>
                </div>
                <EllipsisVertical className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
              </SidebarMenuButton>
            </UserMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
