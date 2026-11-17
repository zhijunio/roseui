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

import { ComponentPreview } from "@/components/docs/component-preview";
import { DropdownDescription, DropdownItem, DropdownLabel, DropdownSection } from "@/components/roseui/dropdown";
import { ListBox } from "@/components/roseui/list-box";
import {
  Menu,
  MenuCheckboxItem,
  MenuHeader,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSubMenu,
  MenuTrigger,
} from "@/components/roseui/menu";
import { Button } from "@/components/ui/button";

export function DropdownExamples() {
  const [visibleColumns, setVisibleColumns] = useState(() => new Set(["owners", "status"]));
  const [theme, setTheme] = useState("system");
  const updateColumn = (column: string, checked: boolean) => {
    setVisibleColumns((current) => {
      const next = new Set(current);
      if (checked) next.add(column);
      else next.delete(column);
      return next;
    });
  };

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
            <DropdownItem id="archive" textValue="Archive" disabled>
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
            <Menu aria-label="Visible columns" className="min-w-48">
              <MenuHeader>Show columns</MenuHeader>
              <MenuSeparator />
              <MenuCheckboxItem
                checked={visibleColumns.has("owners")}
                onCheckedChange={(checked) => updateColumn("owners", checked)}
              >
                Owners
              </MenuCheckboxItem>
              <MenuCheckboxItem
                checked={visibleColumns.has("status")}
                onCheckedChange={(checked) => updateColumn("status", checked)}
              >
                Status
              </MenuCheckboxItem>
              <MenuCheckboxItem
                checked={visibleColumns.has("updated")}
                onCheckedChange={(checked) => updateColumn("updated", checked)}
              >
                Last updated
              </MenuCheckboxItem>
            </Menu>
          </MenuTrigger>

          <MenuTrigger>
            <Button variant="outline">
              Theme: {theme} <IconChevronDown aria-hidden="true" className="size-4" />
            </Button>
            <Menu aria-label="Theme" className="min-w-48">
              <MenuHeader>Appearance</MenuHeader>
              <MenuSeparator />
              <MenuRadioGroup value={theme} onValueChange={setTheme}>
                <MenuRadioItem value="light">Light</MenuRadioItem>
                <MenuRadioItem value="dark">Dark</MenuRadioItem>
                <MenuRadioItem value="system">System</MenuRadioItem>
              </MenuRadioGroup>
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
            <MenuItem onSelect={() => undefined}>Open project</MenuItem>
            <MenuSubMenu>
              <MenuItem>Export project</MenuItem>
              <Menu aria-label="Export project">
                <MenuItem onSelect={() => undefined}>Download CSV</MenuItem>
                <MenuItem onSelect={() => undefined}>Download PDF</MenuItem>
              </Menu>
            </MenuSubMenu>
            <MenuSeparator />
            <MenuItem disabled>Archive unavailable</MenuItem>
          </Menu>
        </MenuTrigger>
      </ComponentPreview>
    </div>
  );
}
