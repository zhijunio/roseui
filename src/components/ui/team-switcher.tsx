"use client";

import * as React from "react";

import { Check, ChevronsUpDown, Plus } from "lucide-react";

import {
  MenuTrigger,
  Menu,
  MenuItem,
  MenuHeader,
  MenuSeparator,
} from "@/components/ui/menu";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo-mark";
import { SidebarSection, SidebarSectionGroup, useSidebar } from "@/components/ui/sidebar";

export type TeamSwitcherWorkspace = {
  name: string;
  plan?: string;
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
  const [internalWorkspace, setInternalWorkspace] = React.useState<TeamSwitcherWorkspace | undefined>(
    defaultWorkspace ?? workspaces[0],
  );
  const active = internalWorkspace ?? workspaces[0];

  if (!active) return null;

  const selectWorkspace = (workspace: TeamSwitcherWorkspace) => {
    setInternalWorkspace(workspace);
    onWorkspaceChange?.(workspace);
  };

  return (
    <SidebarSectionGroup>
      <SidebarSection className="p-2">
        <MenuTrigger>

            <Button
              variant="ghost"
              className="h-12 w-full justify-start gap-2 px-2 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=dock]:justify-center"
            >
              <div className="size-9 shrink-0 group-data-[collapsible=dock]:size-8">
                <LogoMark size="100%" />
              </div>
              <div className="grid flex-1 text-left leading-tight group-data-[collapsible=dock]:hidden">
                <span className="truncate font-semibold tracking-tight">{active.name}</span>
                {active.plan ? <span className="truncate text-xs text-muted-foreground">{active.plan}</span> : null}
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground group-data-[collapsible=dock]:hidden" />
            </Button>

          <Menu
            className="w-(--trigger-width) min-w-60 !rounded-none !border-0 !bg-card !p-0 !shadow-none !ring-0"
            placement={isMobile ? "bottom start" : "right top"}
            popover={{ offset: 4 }}
          >
            <MenuHeader className="text-xs text-muted-foreground">Workspaces</MenuHeader>
            {workspaces.map((workspace) => (
              <MenuItem
                key={workspace.name}
                onClick={() => selectWorkspace(workspace)}
                className="grid grid-cols-[1.5rem_minmax(0,1fr)_1rem] items-center gap-x-3 gap-y-0 p-2"
              >
                <div className="col-start-1 row-span-2 flex size-6 items-center justify-center">
                  <LogoMark size={24} />
                </div>
                <div className="col-start-2 row-span-2 flex min-w-0 flex-col justify-center leading-tight">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="truncate text-sm font-medium">{workspace.name}</span>
                    {active.name === workspace.name ? <Check className="ml-auto size-4 shrink-0" /> : null}
                  </div>
                  {workspace.plan ? (
                    <span className="truncate text-xs text-muted-foreground">{workspace.plan}</span>
                  ) : null}
                </div>
              </MenuItem>
            ))}
            {onCreateWorkspace ? (
              <>
                <MenuSeparator />
                <MenuItem className="gap-2 p-2" onClick={onCreateWorkspace}>
                  <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                    <Plus className="size-4" />
                  </div>
                  <span className="font-medium text-muted-foreground">Add workspace</span>
                </MenuItem>
              </>
            ) : null}
          </Menu>
        </MenuTrigger>
      </SidebarSection>
    </SidebarSectionGroup>
  );
}
