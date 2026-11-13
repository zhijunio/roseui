"use client";

import { useState } from "react";

import { File as IconFile, Folder as IconFolder, FolderOpen as IconFolderOpen } from "lucide-react";
import { Collection } from "react-aria-components/Collection";
import type { Key, Selection } from "react-aria-components/Tree";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Tree, TreeContent, TreeItem } from "@/components/ui/tree";

type FileNode = { id: string; name: string; children?: FileNode[] };

function FileTreeItem({ item }: { item: FileNode }) {
  return (
    <TreeItem id={item.id} textValue={item.name}>
      <TreeContent>{item.name}</TreeContent>
      {item.children ? <Collection items={item.children}>{(child) => <FileTreeItem item={child} />}</Collection> : null}
    </TreeItem>
  );
}

function containsNode(node: FileNode, id: string): boolean {
  return node.id === id || Boolean(node.children?.some((child) => containsNode(child, id)));
}

function removeNode(nodes: FileNode[], id: string): { nodes: FileNode[]; removed?: FileNode } {
  let removed: FileNode | undefined;
  const next = nodes.flatMap((node) => {
    if (node.id === id) {
      removed = node;
      return [];
    }
    if (!node.children) return [node];
    const result = removeNode(node.children, id);
    removed ??= result.removed;
    return result.removed ? [{ ...node, children: result.nodes }] : [node];
  });
  return { nodes: next, removed };
}

function moveNode(nodes: FileNode[], sourceId: string, targetId: string, position: "before" | "after" | "inside") {
  const source = findNode(nodes, sourceId);
  if (!source || containsNode(source, targetId)) return nodes;
  const removed = removeNode(nodes, sourceId);
  if (!removed.removed) return nodes;
  const moving = removed.removed;

  function insert(items: FileNode[]): { nodes: FileNode[]; inserted: boolean } {
    const next: FileNode[] = [];
    for (const [index, item] of items.entries()) {
      if (item.id === targetId) {
        if (position === "before") next.push(moving, item);
        else if (position === "after") next.push(item, moving);
        else next.push({ ...item, children: [...(item.children ?? []), moving] });
        return { nodes: [...next, ...items.slice(index + 1)], inserted: true };
      }
      if (item.children) {
        const result = insert(item.children);
        if (result.inserted) {
          next.push({ ...item, children: result.nodes }, ...items.slice(index + 1));
          return { nodes: next, inserted: true };
        }
      }
      next.push(item);
    }
    return { nodes: next, inserted: false };
  }

  const result = insert(removed.nodes);
  return result.inserted ? result.nodes : nodes;
}

function findNode(nodes: FileNode[], id: string): FileNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    const child = node.children ? findNode(node.children, id) : undefined;
    if (child) return child;
  }
}

function selectedKeys(selection: Selection) {
  return selection === "all" ? [] : [...selection].map(String);
}

export function TreeExamples() {
  const [expandedKeys, setExpandedKeys] = useState<Set<Key>>(new Set(["departments", "sales", "reports"]));
  const [selection, setSelection] = useState<Selection>(new Set(["q1"]));
  const [moveMessage, setMoveMessage] = useState("Drag a file to move it.");
  const [movableItems, setMovableItems] = useState<FileNode[]>([
    { id: "design", name: "Design", children: [{ id: "brief", name: "Brief.pdf" }] },
    { id: "engineering", name: "Engineering", children: [{ id: "readme", name: "README.md" }] },
  ]);

  function handleMove(move: { sourceId: string; targetId: string; position: "before" | "after" | "inside" }) {
    setMovableItems((items) => moveNode(items, move.sourceId, move.targetId, move.position));
    setMoveMessage(`Moved ${move.sourceId} ${move.position} ${move.targetId}.`);
  }

  return (
    <>
      <ComponentPreview title="Single Selection and Icons" layout="panel">
        <Tree aria-label="Workspace files" className="rounded-lg border p-2">
          <TreeItem id="departments" textValue="Departments">
            <TreeContent>
              <IconFolderOpen aria-hidden="true" /> Departments
            </TreeContent>
            <TreeItem id="sales" textValue="Sales">
              <TreeContent>
                <IconFolder aria-hidden="true" /> Sales
              </TreeContent>
              <TreeItem id="reports" textValue="Reports">
                <TreeContent>
                  <IconFolderOpen aria-hidden="true" /> Reports
                </TreeContent>
                <TreeItem id="q1" textValue="Q1 report">
                  <TreeContent>
                    <IconFile aria-hidden="true" /> Q1 report.pdf
                  </TreeContent>
                </TreeItem>
                <TreeItem id="q2" textValue="Q2 report">
                  <TreeContent>
                    <IconFile aria-hidden="true" /> Q2 report.pdf
                  </TreeContent>
                </TreeItem>
              </TreeItem>
              <TreeItem id="contacts" textValue="Client contacts">
                <TreeContent>
                  <IconFolder aria-hidden="true" /> Client contacts
                </TreeContent>
                <TreeItem id="europe" textValue="Europe contacts">
                  <TreeContent>
                    <IconFile aria-hidden="true" /> Europe.xlsx
                  </TreeContent>
                </TreeItem>
              </TreeItem>
            </TreeItem>
            <TreeItem id="hr" textValue="Human resources">
              <TreeContent>
                <IconFolder aria-hidden="true" /> Human resources
              </TreeContent>
              <TreeItem id="handbook" textValue="Employee handbook">
                <TreeContent>
                  <IconFile aria-hidden="true" /> Employee handbook.pdf
                </TreeContent>
              </TreeItem>
            </TreeItem>
          </TreeItem>
        </Tree>
      </ComponentPreview>

      <ComponentPreview title="Multiple Selection" layout="panel">
        <div className="grid gap-3">
          <Tree aria-label="Files to share" selectionMode="multiple" className="rounded-lg border p-2">
            <TreeItem id="app" textValue="Application">
              <TreeContent>
                <IconFolder aria-hidden="true" /> Application
              </TreeContent>
              <TreeItem id="page" textValue="Page">
                <TreeContent>
                  <IconFile aria-hidden="true" /> page.tsx
                </TreeContent>
              </TreeItem>
              <TreeItem id="layout" textValue="Layout">
                <TreeContent>
                  <IconFile aria-hidden="true" /> layout.tsx
                </TreeContent>
              </TreeItem>
            </TreeItem>
            <TreeItem id="readme" textValue="Readme">
              <TreeContent>
                <IconFile aria-hidden="true" /> README.md
              </TreeContent>
            </TreeItem>
          </Tree>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Controlled Expansion and Selection" layout="panel">
        <div className="grid gap-3">
          <Tree<FileNode>
            aria-label="Controlled project tree"
            expandedKeys={expandedKeys}
            onExpandedChange={setExpandedKeys}
            selectedKeys={selection}
            onSelectionChange={setSelection}
            className="rounded-lg border p-2"
          >
            <TreeItem id="src" textValue="Source">
              <TreeContent>
                <IconFolder aria-hidden="true" /> src
              </TreeContent>
              <TreeItem id="components" textValue="Components">
                <TreeContent>
                  <IconFolder aria-hidden="true" /> components
                </TreeContent>
                <TreeItem id="button" textValue="Button component">
                  <TreeContent>
                    <IconFile aria-hidden="true" /> button.tsx
                  </TreeContent>
                </TreeItem>
              </TreeItem>
              <TreeItem id="styles" textValue="Styles">
                <TreeContent>
                  <IconFile aria-hidden="true" /> globals.css
                </TreeContent>
              </TreeItem>
            </TreeItem>
          </Tree>
          <p className="text-xs text-muted-foreground" aria-live="polite">
            Selected: {selectedKeys(selection).join(", ") || "None"}
          </p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Drag and Drop" layout="panel">
        <div className="grid w-full gap-3">
          <Tree
            aria-label="Reorder project files"
            items={movableItems}
            onItemMove={handleMove}
            expanderStyle="plus-minus"
            showGuides="hover"
            className="rounded-lg border p-2"
          >
            {(item) => <FileTreeItem item={item} />}
          </Tree>
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {moveMessage}
          </p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Empty State">
        <Tree aria-label="No search results" items={[]} emptyState="No matching files." className="w-full" />
      </ComponentPreview>
    </>
  );
}
