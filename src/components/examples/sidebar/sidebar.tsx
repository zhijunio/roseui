"use client";

import type { CSSProperties } from "react";

import { Activity, FolderKanban, LayoutDashboard, Settings, UsersRound } from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import type { SidebarVariant } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarItem,
  SidebarLabel,
  SidebarProvider,
  SidebarSection,
  SidebarSectionGroup,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const sidebarPreviewStyle: CSSProperties & { "--sidebar-width": string } = { "--sidebar-width": "17rem" };

function SidebarVariantExample({ variant }: { variant: SidebarVariant }) {
  return (
    <SidebarProvider
      defaultOpen
      shortcut=""
      className="bg-background h-[320px] min-h-0 w-full overflow-hidden rounded-lg border [&_[data-slot=sidebar-gap]]:h-full"
      style={sidebarPreviewStyle}
    >
      <Sidebar variant={variant} collapsible="dock" className="!relative !inset-auto !h-full">
        <SidebarHeader>
          <div className="flex h-9 items-center gap-2 px-2">
            <span
              aria-hidden="true"
              className="bg-primary text-primary-foreground grid size-7 shrink-0 place-items-center rounded-md text-xs font-bold"
            >
              R
            </span>
            <span className="truncate text-sm font-semibold group-data-[collapsible=dock]:hidden">RoseUI</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarSectionGroup>
            <SidebarSection label="Workspace" className="gap-y-1">
              <SidebarItem href="#overview" isCurrent onClick={(event) => event.preventDefault()} tooltip="Overview">
                <LayoutDashboard aria-hidden="true" />
                <SidebarLabel>Overview</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="#projects" onClick={(event) => event.preventDefault()} tooltip="Projects">
                <FolderKanban aria-hidden="true" />
                <SidebarLabel>Projects</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="#team" onClick={(event) => event.preventDefault()} tooltip="Team">
                <UsersRound aria-hidden="true" />
                <SidebarLabel>Team</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="#activity" onClick={(event) => event.preventDefault()} tooltip="Activity">
                <Activity aria-hidden="true" />
                <SidebarLabel>Activity</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarSectionGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarSectionGroup>
            <SidebarSection className="gap-y-1">
              <SidebarItem href="#settings" onClick={(event) => event.preventDefault()} tooltip="Settings">
                <Settings aria-hidden="true" />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>
              <div className="flex w-full min-w-0 items-center gap-2 px-2 py-1.5">
                <span
                  aria-hidden="true"
                  className="bg-primary/10 text-primary grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold"
                >
                  JL
                </span>
                <span className="min-w-0 group-data-[collapsible=dock]:hidden">
                  <span className="block truncate text-xs font-medium">Jordan Lee</span>
                  <span className="text-muted-foreground block truncate text-[11px]">Product team</span>
                </span>
              </div>
            </SidebarSection>
          </SidebarSectionGroup>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="min-w-0">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3">
          <SidebarTrigger />
          <div className="min-w-0 flex-1">
            <p className="text-muted-foreground truncate text-[11px]">Workspace / Overview</p>
          </div>
          <kbd className="text-muted-foreground hidden rounded border px-1.5 py-0.5 text-[10px] sm:inline-flex">
            ⌘ K
          </kbd>
        </header>
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-4">
          <div>
            <p className="text-muted-foreground text-[11px]">THIS WEEK</p>
            <h3 className="mt-1 text-base font-semibold tracking-tight">Good morning, Jordan</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-card min-w-0 rounded-md border p-2.5">
              <p className="text-muted-foreground truncate text-[11px]">Active projects</p>
              <p className="mt-1 text-lg font-semibold tabular-nums">12</p>
            </div>
            <div className="bg-card min-w-0 rounded-md border p-2.5">
              <p className="text-muted-foreground truncate text-[11px]">Tasks due</p>
              <p className="mt-1 text-lg font-semibold tabular-nums">08</p>
            </div>
          </div>
          <div className="mt-auto flex min-w-0 items-center gap-2 border-t pt-3">
            <span className="size-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
            <p className="text-muted-foreground truncate text-xs">All systems operational</p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export function SidebarExamples() {
  return (
    <>
      <ComponentPreview title="Default">
        <SidebarVariantExample variant="default" />
      </ComponentPreview>
      <ComponentPreview title="Floating">
        <SidebarVariantExample variant="float" />
      </ComponentPreview>
      <ComponentPreview title="Inset">
        <SidebarVariantExample variant="inset" />
      </ComponentPreview>
    </>
  );
}
