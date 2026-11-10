"use client";

import * as React from "react";
import {
  IconCheck,
  IconPlus,
  IconSelector,
  type Icon,
} from "@tabler/icons-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export type TeamSwitcherWorkspace = {
  name: string;
  plan?: string;
  icon: Icon;
};

export type TeamSwitcherProps = {
  workspaces: readonly TeamSwitcherWorkspace[];
  defaultWorkspace?: TeamSwitcherWorkspace;
  onWorkspaceChange?: (workspace: TeamSwitcherWorkspace) => void;
  onCreateWorkspace?: () => void;
};

export function TeamSwitcher({
  workspaces,
  defaultWorkspace,
  onWorkspaceChange,
  onCreateWorkspace,
}: TeamSwitcherProps) {
  const { isMobile } = useSidebar();
  const [internalWorkspace, setInternalWorkspace] = React.useState<
    TeamSwitcherWorkspace | undefined
  >(defaultWorkspace ?? workspaces[0]);
  const active = internalWorkspace ?? workspaces[0];

  if (!active) return null;

  const selectWorkspace = (workspace: TeamSwitcherWorkspace) => {
    setInternalWorkspace(workspace);
    onWorkspaceChange?.(workspace);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center"
            >
              <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-primary text-white group-data-[collapsible=icon]:size-8">
                <active.icon className="size-5" />
              </div>
              <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold tracking-tight">
                  {active.name}
                </span>
                {active.plan ? (
                  <span className="truncate text-xs text-muted-foreground">
                    {active.plan}
                  </span>
                ) : null}
              </div>
              <IconSelector className="ml-auto size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-60 !rounded-none !border-0 !bg-card !p-0 !shadow-none !ring-0"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Workspaces
            </DropdownMenuLabel>
            {workspaces.map((workspace) => (
              <DropdownMenuItem
                key={workspace.name}
                onClick={() => selectWorkspace(workspace)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <workspace.icon className="size-3.5 shrink-0" />
                </div>
                <div className="grid flex-1 leading-tight">
                  <span className="truncate text-sm font-medium">
                    {workspace.name}
                  </span>
                  {workspace.plan ? (
                    <span className="truncate text-xs text-muted-foreground">
                      {workspace.plan}
                    </span>
                  ) : null}
                </div>
                {active.name === workspace.name ? (
                  <IconCheck className="size-4 shrink-0" />
                ) : null}
              </DropdownMenuItem>
            ))}
            {onCreateWorkspace ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-2 p-2"
                  onClick={onCreateWorkspace}
                >
                  <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                    <IconPlus className="size-4" />
                  </div>
                  <span className="font-medium text-muted-foreground">
                    Add workspace
                  </span>
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
