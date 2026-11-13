"use client";

import { useState } from "react";

import { Archive, LayoutDashboard, Search, Settings, Users } from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Button } from "@/components/ui/button";
import {
  CommandMenu,
  CommandMenuItem,
  CommandMenuLabel,
  CommandMenuList,
  CommandMenuSearch,
  CommandMenuSection,
  CommandMenuShortcut,
} from "@/components/ui/command-menu";

export function CommandMenuExamples() {
  const [open, setOpen] = useState(false);

  return (
    <ComponentPreview title="Command Menu">
      <div className="flex w-full max-w-lg justify-center">
        <Button variant="outline" onPress={() => setOpen(true)}>
          <Search aria-hidden="true" />
          Search commands
        </Button>
        <CommandMenu isOpen={open} onOpenChange={setOpen} shortcut="k" aria-label="Search workspace">
          <CommandMenuSearch placeholder="Search pages and actions..." />
          <CommandMenuList aria-label="Commands">
            <CommandMenuSection label="Navigation">
              <CommandMenuItem textValue="Dashboard" onAction={() => setOpen(false)}>
                <LayoutDashboard aria-hidden="true" />
                <CommandMenuLabel>Dashboard</CommandMenuLabel>
                <CommandMenuShortcut>G D</CommandMenuShortcut>
              </CommandMenuItem>
              <CommandMenuItem textValue="Members" onAction={() => setOpen(false)}>
                <Users aria-hidden="true" />
                <CommandMenuLabel>Members</CommandMenuLabel>
                <CommandMenuShortcut>G M</CommandMenuShortcut>
              </CommandMenuItem>
              <CommandMenuItem textValue="Settings" onAction={() => setOpen(false)}>
                <Settings aria-hidden="true" />
                <CommandMenuLabel>Settings</CommandMenuLabel>
              </CommandMenuItem>
            </CommandMenuSection>
            <CommandMenuSection label="Actions">
              <CommandMenuItem textValue="Archive workspace" onAction={() => setOpen(false)}>
                <Archive aria-hidden="true" />
                <CommandMenuLabel>Archive workspace</CommandMenuLabel>
              </CommandMenuItem>
            </CommandMenuSection>
          </CommandMenuList>
        </CommandMenu>
      </div>
    </ComponentPreview>
  );
}
