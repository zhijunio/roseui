"use client";

import { useState } from "react";

import { IconBriefcase, IconBuilding, IconCode, IconFileText, IconFolder } from "@tabler/icons-react";

import { Tree, type TreeMove, type TreeNode } from "@/components/composite/tree";
import { ComponentPreview } from "@/components/examples/component-preview";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const workspaceFiles: TreeNode[] = [
  {
    id: "app",
    label: "app",
    children: [
      {
        id: "components",
        label: "components",
        children: [
          { id: "button", label: "button.tsx" },
          { id: "input", label: "input.tsx" },
          { id: "tree", label: "tree.tsx" },
        ],
      },
      { id: "page", label: "page.tsx" },
      { id: "styles", label: "styles.css" },
    ],
  },
  {
    id: "public",
    label: "public",
    children: [
      { id: "logo", label: "logo.svg" },
      { id: "images", label: "images", children: [{ id: "avatar", label: "avatar.png" }] },
    ],
  },
  { id: "readme", label: "README.md" },
  { id: "secrets", label: "private.env", disabled: true, trailingContent: "Restricted" },
];

function findNodeLabel(nodes: TreeNode[], id: string | null): string | undefined {
  for (const node of nodes) {
    if (node.id === id) return node.label;
    const childLabel = findNodeLabel(node.children ?? [], id);
    if (childLabel) return childLabel;
  }
}

function findNode(nodes: TreeNode[], id: string): TreeNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    const child = findNode(node.children ?? [], id);
    if (child) return child;
  }
}

function containsNode(node: TreeNode, id: string): boolean {
  return node.id === id || (node.children ?? []).some((child) => containsNode(child, id));
}

function removeNode(nodes: TreeNode[], id: string): { nodes: TreeNode[]; removed?: TreeNode } {
  let removed: TreeNode | undefined;
  const next = nodes.flatMap((node) => {
    if (node.id === id) {
      removed = node;
      return [];
    }
    if (node.children) {
      const result = removeNode(node.children, id);
      if (result.removed) {
        removed = result.removed;
        return [{ ...node, children: result.nodes }];
      }
    }
    return [node];
  });
  return { nodes: next, removed };
}

function insertNode(
  nodes: TreeNode[],
  targetId: string,
  moved: TreeNode,
  position: TreeMove["position"],
): { nodes: TreeNode[]; inserted: boolean } {
  const targetIndex = nodes.findIndex((node) => node.id === targetId);
  if (targetIndex >= 0) {
    if (position === "inside") {
      const target = nodes[targetIndex];
      if (!target?.children) return { nodes, inserted: false };
      const next = [...nodes];
      next[targetIndex] = { ...target, children: [...target.children, moved] };
      return { nodes: next, inserted: true };
    }
    const insertAt = targetIndex + (position === "after" ? 1 : 0);
    const next = [...nodes];
    next.splice(insertAt, 0, moved);
    return { nodes: next, inserted: true };
  }

  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index];
    if (!node?.children) continue;
    const result = insertNode(node.children, targetId, moved, position);
    if (!result.inserted) continue;
    const next = [...nodes];
    next[index] = { ...node, children: result.nodes };
    return { nodes: next, inserted: true };
  }
  return { nodes, inserted: false };
}

function moveTreeNode(nodes: TreeNode[], move: TreeMove): TreeNode[] {
  const source = findNode(nodes, move.sourceId);
  const target = findNode(nodes, move.targetId);
  if (!source || !target || containsNode(source, target.id)) return nodes;
  const removed = removeNode(nodes, source.id);
  if (!removed.removed) return nodes;
  const inserted = insertNode(removed.nodes, target.id, removed.removed, move.position);
  return inserted.inserted ? inserted.nodes : nodes;
}

function TreePrimaryExamples() {
  const [expandedIds, setExpandedIds] = useState(["app", "components"]);
  const [selectedIds, setSelectedIds] = useState(["button"]);
  const [multipleSelectedIds, setMultipleSelectedIds] = useState(["button"]);
  const [multipleExpandedIds, setMultipleExpandedIds] = useState(["app", "components"]);
  const [reduceMotion, setReduceMotion] = useState(false);
  const selectedLabel = findNodeLabel(workspaceFiles, selectedIds[0] ?? null);

  return (
    <>
      <ComponentPreview title="Workspace Files" span={2} layout="panel">
        <div className="space-y-3">
          <div className="flex justify-end">
            <Button type="button" size="sm" variant="ghost" onClick={() => setExpandedIds([])}>
              Collapse all
            </Button>
          </div>
          <Tree
            aria-label="Workspace files"
            items={workspaceFiles}
            expandedIds={expandedIds}
            onExpandedChange={setExpandedIds}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            className="rounded-lg border p-2"
          />
          <p className="text-xs text-muted-foreground" aria-live="polite">
            Selected: {selectedLabel ?? "None"}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Multiple Selection" layout="panel">
        <div className="space-y-3">
          <Tree
            aria-label="Select files to share"
            items={workspaceFiles}
            selectionMode="multiple"
            expandedIds={multipleExpandedIds}
            onExpandedChange={setMultipleExpandedIds}
            selectedIds={multipleSelectedIds}
            onSelectionChange={setMultipleSelectedIds}
            className="rounded-lg border p-2"
          />
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {multipleSelectedIds.length} selected · Shift + arrow to select a range
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Compact Tree" layout="panel">
        <Tree
          aria-label="Compact project files"
          items={workspaceFiles}
          defaultExpandedIds={["public"]}
          defaultSelectedIds={["readme"]}
          size="sm"
          showGuides={false}
          className="rounded-lg border p-2"
        />
      </ComponentPreview>

      <ComponentPreview title="File Tree Sizes" layout="stack">
        <div className="grid w-full gap-4">
          <div className="grid gap-2">
            <p className="text-xs font-medium text-muted-foreground">Small</p>
            <Tree
              aria-label="Small file tree"
              items={workspaceFiles}
              defaultExpandedIds={["public"]}
              size="sm"
              className="rounded-lg border p-2"
            />
          </div>
          <div className="grid gap-2">
            <p className="text-xs font-medium text-muted-foreground">Medium</p>
            <Tree
              aria-label="Medium file tree"
              items={workspaceFiles}
              defaultExpandedIds={["public"]}
              className="rounded-lg border p-2"
            />
          </div>
          <div className="grid gap-2">
            <p className="text-xs font-medium text-muted-foreground">Large</p>
            <Tree
              aria-label="Large file tree"
              items={workspaceFiles}
              defaultExpandedIds={["public"]}
              size="lg"
              className="rounded-lg border p-2"
            />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Guides on Hover" layout="panel">
        <Tree
          aria-label="File tree with guides shown on hover"
          items={workspaceFiles}
          defaultExpandedIds={["app", "components"]}
          showGuides="hover"
          className="rounded-lg border p-2"
        />
      </ComponentPreview>

      <ComponentPreview title="Reduced Motion" layout="panel">
        <div className="w-full space-y-3">
          <Button
            type="button"
            size="sm"
            variant="outline"
            aria-pressed={reduceMotion}
            onClick={() => setReduceMotion((value) => !value)}
          >
            {reduceMotion ? "Motion reduced" : "Use motion"}
          </Button>
          <Tree
            aria-label="File tree with reduced motion"
            items={workspaceFiles}
            defaultExpandedIds={["public"]}
            reduceMotion={reduceMotion}
            className="rounded-lg border p-2"
          />
        </div>
      </ComponentPreview>

      <DynamicFileTreeExample />
      <DraggableFileTreeExample />
      <FileReviewExample />

      <ComponentPreview title="Empty Search Results" layout="panel">
        <Tree
          aria-label="Empty file search results"
          items={[]}
          emptyState="No matching files."
          className="rounded-lg border p-2"
        />
      </ComponentPreview>
    </>
  );
}

function DynamicFileTreeExample() {
  const [files, setFiles] = useState<TreeNode[]>(workspaceFiles.slice(0, 2));
  const [nextFile, setNextFile] = useState(1);

  return (
    <ComponentPreview title="Dynamic Collection" layout="panel">
      <div className="w-full space-y-3">
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              setFiles((current) => [...current, { id: `new-file-${nextFile}`, label: `draft-${nextFile}.tsx` }]);
              setNextFile((current) => current + 1);
            }}
          >
            Add file
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            disabled={files.length <= 1}
            onClick={() => setFiles((current) => current.slice(0, -1))}
          >
            Remove last file
          </Button>
        </div>
        <Tree
          aria-label="Dynamic project files"
          items={files}
          defaultExpandedIds={["app", "components"]}
          className="rounded-lg border p-2"
        />
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {files.length} top-level items
        </p>
      </div>
    </ComponentPreview>
  );
}

function DraggableFileTreeExample() {
  const [files, setFiles] = useState(workspaceFiles);
  const [expandedIds, setExpandedIds] = useState(["app", "components", "public"]);
  const [notice, setNotice] = useState(
    "Drag a row onto a folder or between files. Keyboard: Alt + Arrow Up/Down moves among siblings.",
  );

  function moveFile(move: TreeMove) {
    setFiles((current) => moveTreeNode(current, move));
    const source = findNode(files, move.sourceId);
    const target = findNode(files, move.targetId);
    if (move.position === "inside" && target)
      setExpandedIds((current) => (current.includes(target.id) ? current : [...current, target.id]));
    if (source && target) setNotice(`${source.label} moved ${move.position} ${target.label}.`);
  }

  return (
    <ComponentPreview title="Drag and Drop" layout="panel">
      <div className="w-full space-y-3">
        <Tree
          aria-label="Reorderable project files"
          items={files}
          expandedIds={expandedIds}
          onExpandedChange={setExpandedIds}
          selectionMode="none"
          showGuides="hover"
          onItemMove={moveFile}
          className="rounded-lg border p-2"
        />
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {notice}
        </p>
      </div>
    </ComponentPreview>
  );
}

function FileReviewExample() {
  const [selectedIds, setSelectedIds] = useState(["tree", "button"]);
  const reviewItems: TreeNode[] = [
    {
      id: "src",
      label: "src",
      children: [
        {
          id: "components",
          label: "components",
          children: [
            { id: "tree", label: "tree.tsx", trailingContent: "3 comments" },
            { id: "button", label: "button.tsx", trailingContent: "Approved" },
          ],
        },
        { id: "readme", label: "README.md" },
      ],
    },
  ];

  return (
    <ComponentPreview title="File Review" layout="panel">
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>Pull request #184 · Update workspace controls</span>
          <span>{selectedIds.length} selected</span>
        </div>
        <Tree
          aria-label="Files changed in pull request 184"
          items={reviewItems}
          defaultExpandedIds={["src", "components"]}
          selectionMode="multiple"
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          className="rounded-lg border p-2"
        />
        <p className="text-xs text-muted-foreground">
          Select files to focus the review. Existing file details and selection remain owned by the page.
        </p>
      </div>
    </ComponentPreview>
  );
}

export function TreeExamples() {
  return (
    <>
      <TreePrimaryExamples />
      <TreeExtraExamples />
    </>
  );
}

function CheckPermission({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  return (
    <Checkbox
      checked={checked}
      aria-label={label}
      onCheckedChange={onToggle}
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => {
        if (event.key === " " || event.key === "Enter") event.stopPropagation();
      }}
      className="size-3.5"
    />
  );
}

export function TreeExtraExamples() {
  const [checked, setChecked] = useState<Set<string>>(() => new Set(["view-project", "view-user"]));
  const toggle = (id: string) =>
    setChecked((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const explorer: TreeNode[] = [
    {
      id: "src",
      label: "src",
      icon: <IconFolder className="size-4 text-muted-foreground" />,
      children: [
        {
          id: "app",
          label: "app",
          icon: <IconFolder className="size-4 text-muted-foreground" />,
          children: [
            { id: "page", label: "page.tsx", icon: <IconCode className="size-4 text-muted-foreground" /> },
            { id: "layout", label: "layout.tsx", icon: <IconCode className="size-4 text-muted-foreground" /> },
          ],
        },
        { id: "readme", label: "README.md", icon: <IconFileText className="size-4 text-muted-foreground" /> },
      ],
    },
  ];
  const org: TreeNode[] = [
    {
      id: "company",
      label: "Company",
      icon: <IconBuilding className="size-4" />,
      children: [
        {
          id: "design",
          label: "Design lead",
          icon: (
            <Avatar size="xs">
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
          ),
          trailingContent: "Lead",
          children: [
            {
              id: "designer",
              label: "Product designer",
              icon: (
                <Avatar size="xs">
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
              ),
              trailingContent: "Member",
            },
          ],
        },
        {
          id: "engineering",
          label: "Engineering lead",
          icon: (
            <Avatar size="xs">
              <AvatarFallback>SP</AvatarFallback>
            </Avatar>
          ),
          trailingContent: "Lead",
        },
      ],
    },
  ];
  const permissions: TreeNode[] = [
    {
      id: "workspace",
      label: "Workspace permissions",
      icon: <IconBriefcase className="size-4" />,
      children: [
        {
          id: "projects",
          label: "Projects",
          children: [
            {
              id: "view-project",
              label: "View projects",
              trailingContent: (
                <CheckPermission
                  label={"View projects"}
                  checked={checked.has("view-project")}
                  onToggle={() => toggle("view-project")}
                />
              ),
            },
            {
              id: "edit-project",
              label: "Edit projects",
              trailingContent: (
                <CheckPermission
                  label={"Edit projects"}
                  checked={checked.has("edit-project")}
                  onToggle={() => toggle("edit-project")}
                />
              ),
            },
          ],
        },
        {
          id: "users",
          label: "Users",
          children: [
            {
              id: "view-user",
              label: "View users",
              trailingContent: (
                <CheckPermission
                  label={"View users"}
                  checked={checked.has("view-user")}
                  onToggle={() => toggle("view-user")}
                />
              ),
            },
            {
              id: "manage-user",
              label: "Manage users",
              trailingContent: (
                <CheckPermission
                  label={"Manage users"}
                  checked={checked.has("manage-user")}
                  onToggle={() => toggle("manage-user")}
                />
              ),
            },
          ],
        },
      ],
    },
  ];
  return (
    <>
      <ComponentPreview title={"File Explorer"}>
        <Tree
          aria-label={"Project files"}
          items={explorer}
          defaultExpandedIds={["src", "app"]}
          defaultSelectedIds={["page"]}
          className="w-full rounded-lg border p-2"
        />
      </ComponentPreview>
      <ComponentPreview title={"Org Chart"}>
        <Tree
          aria-label={"Organization"}
          items={org}
          defaultExpandedIds={["company", "design"]}
          className="w-full rounded-lg border p-2"
        />
      </ComponentPreview>
      <ComponentPreview title={"Permissions"}>
        <div className="w-full space-y-2">
          <Tree
            aria-label={"Permissions"}
            items={permissions}
            defaultExpandedIds={["workspace", "projects", "users"]}
            selectionMode="none"
            expanderStyle="plus-minus"
            className="rounded-lg border p-2"
          />
          <p className="text-xs text-muted-foreground">{`${checked.size} permissions selected`}</p>
        </div>
      </ComponentPreview>
    </>
  );
}
