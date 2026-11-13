"use client";

import { useState } from "react";

import { IconChevronDown, IconCopy, IconDots, IconEye, IconPencil, IconTrash } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ComponentPreview } from "@/examples/component-preview";

export function DropdownExamples() {
  const [showOwners, setShowOwners] = useState(true);
  const [theme, setTheme] = useState("system");
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <ComponentPreview title="Document Actions">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" aria-label="Open document actions">
              <IconDots />
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Document</DropdownMenuLabel>
            <DropdownMenuItem>
              <IconEye />
              Preview
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPencil />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconCopy />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <IconTrash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentPreview>
      <ComponentPreview title="Checkbox and Radio Choices">
        <div className="flex flex-wrap gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Visible columns
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Show columns</DropdownMenuLabel>
              <DropdownMenuCheckboxItem checked={showOwners} onCheckedChange={setShowOwners}>
                Owners
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem defaultChecked>Status</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Last updated</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Theme: {theme}
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Nested Actions">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Project options
              <IconChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Open project</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Export project</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Download CSV</DropdownMenuItem>
                <DropdownMenuItem>Download PDF</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Archive unavailable</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentPreview>
    </div>
  );
}
