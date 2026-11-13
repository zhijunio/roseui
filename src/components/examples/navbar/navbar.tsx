"use client";

import Link from "next/link";

import { Bell, FolderKanban, LayoutDashboard, Search, UsersRound } from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import {
  Navbar,
  NavbarInset,
  NavbarItem,
  NavbarMobile,
  NavbarProvider,
  NavbarSection,
  NavbarSpacer,
  NavbarStart,
  NavbarTrigger,
} from "@/components/ui/navbar";

function NavbarVariantExample({ variant }: { variant: "default" | "float" | "inset" }) {
  return (
    <NavbarProvider className="w-full">
      <Navbar variant={variant} aria-label={`${variant} navigation`}>
        <NavbarStart>
          <Link
            href="#home"
            onClick={(event) => event.preventDefault()}
            className="flex items-center gap-2 font-semibold"
          >
            <span
              aria-hidden="true"
              className="bg-primary text-primary-foreground grid size-7 place-items-center rounded-md text-xs font-bold"
            >
              R
            </span>
            <span>RoseUI</span>
          </Link>
        </NavbarStart>
        <NavbarSection className="gap-1">
          <NavbarItem href="#overview" onClick={(event) => event.preventDefault()} isCurrent>
            <LayoutDashboard aria-hidden="true" />
            <span>Overview</span>
          </NavbarItem>
          <NavbarItem href="#projects" onClick={(event) => event.preventDefault()}>
            <FolderKanban aria-hidden="true" />
            <span>Projects</span>
          </NavbarItem>
          <NavbarItem href="#team" onClick={(event) => event.preventDefault()}>
            <UsersRound aria-hidden="true" />
            <span>Team</span>
          </NavbarItem>
        </NavbarSection>
        <NavbarSpacer />
        <NavbarSection className="gap-1">
          <div aria-hidden="true" className="text-muted-foreground flex items-center gap-3 px-2">
            <Search className="size-4" />
            <Bell className="size-4" />
          </div>
          <span
            aria-hidden="true"
            className="bg-primary/10 text-primary ml-1 grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold"
          >
            JL
          </span>
        </NavbarSection>
      </Navbar>
      <NavbarMobile className="bg-background rounded-xl border">
        <NavbarTrigger />
        <NavbarSpacer />
        <span className="text-sm font-semibold">RoseUI</span>
        <span className="text-muted-foreground ml-auto text-xs">Workspace</span>
      </NavbarMobile>
      {variant === "inset" && (
        <NavbarInset className="min-h-36 rounded-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Workspace overview</p>
            </div>
            <span className="text-muted-foreground hidden text-xs sm:inline">Updated just now</span>
          </div>
        </NavbarInset>
      )}
    </NavbarProvider>
  );
}

export function NavbarExamples() {
  return (
    <>
      <ComponentPreview title="Default">
        <NavbarVariantExample variant="default" />
      </ComponentPreview>
      <ComponentPreview title="Floating">
        <NavbarVariantExample variant="float" />
      </ComponentPreview>
      <ComponentPreview title="Inset">
        <NavbarVariantExample variant="inset" />
      </ComponentPreview>
    </>
  );
}
