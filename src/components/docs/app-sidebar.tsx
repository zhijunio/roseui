"use client";

import * as React from "react";

import Link from "next/link";

import { EllipsisVertical, Search, X } from "lucide-react";

import { NavMain } from "@/components/docs/nav-main";
import { UserAvatar, UserMenu } from "@/components/docs/user-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoMark } from "@/components/ui/logo-mark";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { NAV_DATA } from "@/data/nav";
import { currentUser } from "@/data/user";

import { useThemePreferences } from "./theme-preferences";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { preferences } = useThemePreferences();
  const { isMobile } = useSidebar();
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <Sidebar {...props} variant={preferences.sidebarVariant} collapsible={preferences.sidebarCollapsible}>
      <SidebarHeader className="px-2">
        <div className="flex h-10 items-center gap-2 px-2 group-data-[collapsible=dock]:justify-center group-data-[collapsible=dock]:px-0">
          <Link prefetch={false} href="/docs/components/navigation/accordion" aria-label="RoseUI home">
            <LogoMark size={28} />
          </Link>
          <div className="min-w-0 group-data-[collapsible=dock]:hidden">
            <p className="truncate text-sm font-semibold">RoseUI</p>
            <p className="text-muted-foreground truncate text-xs">Components &amp; Blocks</p>
          </div>
        </div>
        <div className="relative px-1 pt-2 group-data-[collapsible=dock]:hidden">
          <div className="relative h-9">
            <Search
              aria-hidden="true"
              className="text-muted-foreground pointer-events-none absolute top-1/2 left-3.5 size-3.5 -translate-y-1/2"
            />
            <Input
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
      <SidebarContent className="px-2">
        <NavMain sections={NAV_DATA} searchQuery={searchQuery} />
      </SidebarContent>
      <SidebarFooter className="items-stretch p-2">
        <UserMenu user={currentUser} side={isMobile ? "bottom" : "right"}>
          <Button
            type="button"
            variant="ghost"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-14 w-full justify-start gap-3 px-2 group-data-[collapsible=dock]:justify-center"
            aria-label={`Open account menu for ${currentUser.name}`}
          >
            <UserAvatar user={currentUser} />
            <span className="grid min-w-0 flex-1 text-left text-sm leading-tight group-data-[collapsible=dock]:hidden">
              <span className="truncate font-medium">{currentUser.name}</span>
              <span className="text-muted-foreground truncate text-xs">{currentUser.email}</span>
            </span>
            <EllipsisVertical className="ml-auto size-4 group-data-[collapsible=dock]:hidden" aria-hidden="true" />
          </Button>
        </UserMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
