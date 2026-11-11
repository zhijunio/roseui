"use client";

import type * as React from "react";

import Link from "next/link";

import { EllipsisVertical } from "lucide-react";

import { NavMain } from "@/components/site/nav-main";
import { UserAvatar, UserMenu } from "@/components/site/user-menu";
import { LogoMark } from "@/components/ui/logo-mark";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
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

  return (
    <Sidebar {...props} variant={preferences.sidebarVariant} collapsible={preferences.sidebarCollapsible}>
      <SidebarHeader className="p-3 pt-7">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="group-data-[collapsible=icon]:size-16! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0! data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link prefetch={false} href="/components/accordion">
                <LogoMark size={52} className="rounded-[16px] bg-[#db2626]" />
                <span className="text-base font-semibold group-data-[collapsible=icon]:hidden">RoseUI</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-2.5">
        <NavMain sections={NAV_DATA} />
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:hidden">
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu user={currentUser} side={isMobile ? "bottom" : "right"}>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <UserAvatar user={currentUser} />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{currentUser.name}</span>
                  <span className="text-muted-foreground truncate text-xs">{currentUser.email}</span>
                </div>
                <EllipsisVertical className="ml-auto size-4" />
              </SidebarMenuButton>
            </UserMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
