"use client";

import { useState } from "react";

import {
  Archive as IconArchive,
  ChevronDown as IconChevronDown,
  CreditCard as IconCreditCard,
  FolderKanban as IconFolderKanban,
  Settings as IconSettings,
  Users as IconUsers,
} from "lucide-react";
import type { Selection } from "react-aria-components";
import { ListBox } from "react-aria-components/ListBox";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Button } from "@/components/ui/button";
import { DropdownDescription, DropdownItem, DropdownLabel, DropdownSection } from "@/components/ui/dropdown";
import { Menu, MenuHeader, MenuItem, MenuSeparator, MenuSubMenu, MenuTrigger } from "@/components/ui/menu";

export function DropdownExamples() {
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(["owners", "status"]));
  const [theme, setTheme] = useState<Selection>(new Set(["system"]));
  const selectedTheme = Array.from(theme)[0] ?? "system";

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <ComponentPreview title="Dropdown Items">
        <ListBox
          aria-label="Workspace shortcuts"
          selectionMode="single"
          defaultSelectedKeys={new Set(["projects"])}
          className="bg-popover w-full max-w-md rounded-lg border p-1"
        >
          <DropdownSection title="Workspace">
            <DropdownItem id="projects" textValue="Projects">
              <IconFolderKanban aria-hidden="true" />
              <DropdownLabel>Projects</DropdownLabel>
              <DropdownDescription>Browse and manage projects</DropdownDescription>
            </DropdownItem>
            <DropdownItem id="members" textValue="Members">
              <IconUsers aria-hidden="true" />
              <DropdownLabel>Members</DropdownLabel>
              <DropdownDescription>Manage workspace access</DropdownDescription>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Account">
            <DropdownItem id="settings" textValue="Settings">
              <IconSettings aria-hidden="true" />
              <DropdownLabel>Settings</DropdownLabel>
              <DropdownDescription>Update preferences</DropdownDescription>
            </DropdownItem>
            <DropdownItem id="billing" textValue="Billing">
              <IconCreditCard aria-hidden="true" />
              <DropdownLabel>Billing</DropdownLabel>
              <DropdownDescription>Review plans and invoices</DropdownDescription>
            </DropdownItem>
            <DropdownItem id="archive" textValue="Archive" isDisabled>
              <IconArchive aria-hidden="true" />
              <DropdownLabel>Archive unavailable</DropdownLabel>
              <DropdownDescription>Ask an owner to enable this action</DropdownDescription>
            </DropdownItem>
          </DropdownSection>
        </ListBox>
      </ComponentPreview>

      <ComponentPreview title="Checkbox and Radio Choices">
        <div className="flex flex-wrap items-start gap-2">
          <MenuTrigger>
            <Button variant="outline">
              Visible columns <IconChevronDown aria-hidden="true" className="size-4" />
            </Button>
            <Menu
              aria-label="Visible columns"
              className="min-w-48"
              selectionMode="multiple"
              selectedKeys={visibleColumns}
              onSelectionChange={setVisibleColumns}
            >
              <MenuHeader>Show columns</MenuHeader>
              <MenuSeparator />
              <MenuItem id="owners">Owners</MenuItem>
              <MenuItem id="status">Status</MenuItem>
              <MenuItem id="updated">Last updated</MenuItem>
            </Menu>
          </MenuTrigger>

          <MenuTrigger>
            <Button variant="outline">
              Theme: {selectedTheme} <IconChevronDown aria-hidden="true" className="size-4" />
            </Button>
            <Menu
              aria-label="Theme"
              className="min-w-48"
              selectionMode="single"
              selectedKeys={theme}
              onSelectionChange={setTheme}
            >
              <MenuHeader>Appearance</MenuHeader>
              <MenuSeparator />
              <MenuItem id="light">Light</MenuItem>
              <MenuItem id="dark">Dark</MenuItem>
              <MenuItem id="system">System</MenuItem>
            </Menu>
          </MenuTrigger>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Nested Actions">
        <MenuTrigger>
          <Button variant="outline">
            Project options <IconChevronDown aria-hidden="true" className="size-4" />
          </Button>
          <Menu aria-label="Project options" className="min-w-52">
            <MenuItem onAction={() => undefined}>Open project</MenuItem>
            <MenuSubMenu>
              <MenuItem>Export project</MenuItem>
              <Menu aria-label="Export project">
                <MenuItem onAction={() => undefined}>Download CSV</MenuItem>
                <MenuItem onAction={() => undefined}>Download PDF</MenuItem>
              </Menu>
            </MenuSubMenu>
            <MenuSeparator />
            <MenuItem isDisabled>Archive unavailable</MenuItem>
          </Menu>
        </MenuTrigger>
      </ComponentPreview>
    </div>
  );
}
