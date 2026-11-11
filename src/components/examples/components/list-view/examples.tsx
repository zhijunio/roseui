"use client";

import { useEffect, useRef, useState } from "react";

import {
  IconArrowRight,
  IconCheck,
  IconDots,
  IconFileText,
  IconFolder,
  IconInbox,
  IconSend,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import type { Key, Selection } from "react-aria-components";

import {
  ActionBar,
  ActionBarContent,
  ActionBarLabel,
  ActionBarPrefix,
  ActionBarSeparator,
  ActionBarSuffix,
} from "@/components/composite/action-bar";
import {
  ListView,
  ListViewDescription,
  ListViewItem,
  ListViewItemAction,
  ListViewItemContent,
  ListViewTitle,
} from "@/components/composite/list-view";
import { ComponentPreview } from "@/components/examples/component-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type FileItem = { id: string; name: string; detail: string; kind: "folder" | "file" };

const files: FileItem[] = [
  { id: "brief", name: "Product brief", detail: "Updated 12 minutes ago · 1.8 MB", kind: "file" },
  { id: "research", name: "Research", detail: "8 files · Shared with the team", kind: "folder" },
  { id: "roadmap", name: "Q3 roadmap", detail: "Updated yesterday · 920 KB", kind: "file" },
  { id: "design", name: "Design system", detail: "14 files · Updated Monday", kind: "folder" },
];

function FileRows({
  items = files,
  action = false,
  onAction,
}: {
  items?: FileItem[];
  action?: boolean;
  onAction?: (name: string) => void;
}) {
  return (
    <>
      {items.map((item) => (
        <ListViewItem
          key={item.id}
          id={item.id}
          textValue={item.name}
          focusMode={action ? "child" : "row"}
          allowsArrowNavigation
        >
          <ListViewItemContent>
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"
            >
              {item.kind === "folder" ? <IconFolder className="size-4" /> : <IconFileText className="size-4" />}
            </span>
            <span className="min-w-0">
              <ListViewTitle>{item.name}</ListViewTitle>
              <ListViewDescription>{item.detail}</ListViewDescription>
            </span>
          </ListViewItemContent>
          {action && (
            <ListViewItemAction>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={`More actions for ${item.name}`}
                onClick={() => onAction?.(item.name)}
              >
                <IconDots aria-hidden="true" />
              </Button>
            </ListViewItemAction>
          )}
        </ListViewItem>
      ))}
    </>
  );
}

function MultiSelectExample() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set<Key>());
  const [visibleFiles, setVisibleFiles] = useState(files);
  const listRef = useRef<HTMLDivElement>(null);
  const actionBarWasOpen = useRef(false);
  const selectedCount = selectedKeys === "all" ? visibleFiles.length : selectedKeys.size;
  const selectedNames = visibleFiles
    .filter((file) => selectedKeys === "all" || selectedKeys.has(file.id))
    .map((file) => file.name);

  useEffect(() => {
    if (actionBarWasOpen.current && selectedCount === 0) {
      window.requestAnimationFrame(() =>
        listRef.current?.querySelector<HTMLElement>('[aria-label="Project file selection"]')?.focus(),
      );
    }
    actionBarWasOpen.current = selectedCount > 0;
  }, [selectedCount]);

  function deleteSelected() {
    setVisibleFiles((current) => current.filter((file) => selectedKeys !== "all" && !selectedKeys.has(file.id)));
    setSelectedKeys(new Set());
  }
  return (
    <div ref={listRef} className="w-full space-y-3">
      <p className="text-sm text-muted-foreground">Select files with the keyboard or pointer to reveal bulk actions.</p>
      <ListView
        aria-label="Project file selection"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <FileRows items={visibleFiles} />
      </ListView>
      <output aria-live="polite" className="block min-h-5 text-xs text-muted-foreground">
        {selectedCount ? `${selectedCount} selected: ${selectedNames.join(", ")}` : "No files selected"}
      </output>
      <ActionBar aria-label="Selected file actions" isOpen={selectedCount > 0}>
        <ActionBarPrefix>
          <Badge variant="secondary">{selectedCount} selected</Badge>
        </ActionBarPrefix>
        <ActionBarSeparator />
        <ActionBarContent>
          <Button size="sm" variant="ghost" onClick={deleteSelected}>
            <IconTrash aria-hidden="true" />
            <ActionBarLabel>Delete</ActionBarLabel>
          </Button>
        </ActionBarContent>
        <ActionBarSuffix>
          <Button
            size="icon-sm"
            variant="ghost"
            aria-label="Clear selection"
            onClick={() => setSelectedKeys(new Set())}
          >
            <IconX aria-hidden="true" />
          </Button>
        </ActionBarSuffix>
      </ActionBar>
    </div>
  );
}

export function ListViewExamples() {
  const [activeKey, setActiveKey] = useState<Selection>(new Set(["brief"]));
  const [actionFeedback, setActionFeedback] = useState("");
  return (
    <>
      <ComponentPreview title="Primary" layout="panel">
        <ListView aria-label="Project files">
          <FileRows action onAction={(name) => setActionFeedback(`Actions opened for ${name}.`)} />
        </ListView>
        <output role="status" className="block min-h-4 px-2 pt-2 text-xs text-muted-foreground">
          {actionFeedback}
        </output>
      </ComponentPreview>
      <ComponentPreview title="Secondary" layout="panel">
        <ListView aria-label="Recent files" variant="secondary">
          <FileRows items={files.slice(0, 3)} action />
        </ListView>
      </ComponentPreview>
      <ComponentPreview title="Single Selection" layout="panel">
        <ListView
          aria-label="Choose a file"
          selectionMode="single"
          selectedKeys={activeKey}
          onSelectionChange={setActiveKey}
        >
          <FileRows />
        </ListView>
      </ComponentPreview>
      <ComponentPreview title="Multiple Selection" span={2} layout="panel">
        <MultiSelectExample />
      </ComponentPreview>
      <ComponentPreview title="Disabled Items" layout="panel">
        <ListView aria-label="Available files" selectionMode="multiple" disabledKeys={["research"]}>
          <FileRows />
        </ListView>
      </ComponentPreview>
      <ComponentPreview title="Empty State" layout="panel">
        <ListView
          aria-label="Search results"
          renderEmptyState={() => (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">No matching files.</div>
          )}
        />
      </ComponentPreview>
      <ComponentPreview title="List Content and Markers" span={2} layout="grid3">
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Plan the next product release</li>
          <li>Review support feedback</li>
          <li>Publish the monthly report</li>
        </ul>
        <div className="divide-y">
          {[
            { label: "Inbox", count: "12", Icon: IconInbox },
            { label: "Sent", count: "", Icon: IconSend },
            { label: "Trash", count: "3", Icon: IconTrash },
          ].map(({ label, count, Icon }) => (
            <div key={label} className="flex h-11 items-center gap-3 text-sm">
              <Icon className="size-4 text-muted-foreground" />
              {label}
              {count && (
                <Badge variant="secondary" className="ml-auto">
                  {count}
                </Badge>
              )}
            </div>
          ))}
        </div>
        <ul className="space-y-3 text-sm">
          {["Organize the shared workspace", "Keep project owners informed", "Document decisions as you go"].map(
            (item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-success/10 text-success">
                  <IconCheck className="size-3.5" />
                </span>
                <span>{item}</span>
              </li>
            ),
          )}
        </ul>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
          {["Overview", "Activity", "Members", "Reports"].map((item, index) => (
            <span
              key={item}
              className={
                index === 0 ? "inline-flex items-center gap-2 font-medium text-primary" : "text-muted-foreground"
              }
            >
              {item}
              {index === 0 && <IconArrowRight className="size-3.5" />}
            </span>
          ))}
        </div>
      </ComponentPreview>
    </>
  );
}
