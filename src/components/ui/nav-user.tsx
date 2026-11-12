"use client";

import type { ComponentProps } from "react";

import { IconDotsVertical } from "@tabler/icons-react";

import { UserMenu } from "@/components/ui/user-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { getInitials } from "@/lib/utils";

export type NavUserProps = Pick<ComponentProps<typeof UserMenu>, "user" | "workspaceType" | "items" | "onSignOut">;

export function NavUser({ user, workspaceType, items, onSignOut }: NavUserProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <UserMenu
          user={user}
          workspaceType={workspaceType}
          desktopSide="right"
          items={items}
          renderTrigger={({ open: menuOpen, mobile }) => (
            <SidebarMenuButton
              size="lg"
              className="h-14 bg-sidebar/70 shadow-resting hover:bg-sidebar-accent hover:text-sidebar-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-foreground"
              aria-label={`Open account menu for ${user.name}`}
              aria-haspopup={mobile ? "dialog" : "menu"}
              aria-expanded={menuOpen}
              data-state={menuOpen ? "open" : "closed"}
            >
              <Avatar className="size-10 rounded-md after:border-0">
                {user.avatar ? <AvatarImage src={user.avatar} alt="" /> : null}
                <AvatarFallback className="rounded-md">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate text-sm font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
              </div>
              <IconDotsVertical className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          )}
          onSignOut={onSignOut}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
