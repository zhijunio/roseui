"use client";
import * as React from "react";

import { Resizable } from "@/components/ui/composite-resizable";
import { ComponentPreview } from "@/examples/component-preview";

const examples = [
  "Horizontal resizable layout",
  "Vertical resizable layout.",
  "Nested mixed-direction resizable layout.",
  "Nested resizable",
  "Handle with animated pill indicator",
  "Handle pill with spring scale on drag",
  "Handle with large capsule expansion on drag",
  "Nested layout with animated pill handles",
  "Three-panel layout with animated pill handles",
  "State-tracked resizable layout.",
  "Handle Types",
  "Handle Variants",
];
function Pane({ title, children, className = "" }: { title: string; children?: React.ReactNode; className?: string }) {
  return (
    <div className={`flex h-full min-h-24 min-w-0 flex-col justify-center gap-1 bg-card p-4 ${className}`}>
      <span className="text-sm font-medium">{title}</span>
      {children && <span className="text-xs text-muted-foreground">{children}</span>}
    </div>
  );
}
function ResizableDemo({ index }: { index: number }) {
  const [size, setSize] = React.useState(36);
  const pane = (title: string, description?: string) => <Pane title={title}>{description}</Pane>;
  if (index === 10)
    return (
      <div className="grid w-full gap-3 sm:grid-cols-2">
        {(["line", "drag", "pill", "handle"] as const).map((type) => (
          <div key={type} className="grid min-w-0 gap-1">
            <span className="text-xs capitalize text-muted-foreground">{type}</span>
            <Resizable
              handleType={type}
              className="h-48 w-full rounded-md"
              first={<Pane title="Navigation" className="p-2" />}
              second={<Pane title="Content" className="p-2" />}
            />
          </div>
        ))}
      </div>
    );
  if (index === 11)
    return (
      <div className="grid w-full gap-3 sm:grid-cols-2">
        {(["default", "primary", "secondary", "tertiary"] as const).map((variant) => (
          <div key={variant} className="grid min-w-0 gap-1">
            <span className="text-xs capitalize text-muted-foreground">{variant}</span>
            <Resizable
              handleType="line"
              withIndicator
              handleVariant={variant}
              className="h-48 w-full rounded-md"
              first={<Pane title="Settings" className="p-2" />}
              second={<Pane title="Preview" className="p-2" />}
            />
          </div>
        ))}
      </div>
    );
  if (index === 1)
    return (
      <Resizable
        orientation="vertical"
        className="h-64 w-full"
        first={pane("Project overview", "Summary, owner, status")}
        second={pane("Recent activity", "Updated 4 minutes ago")}
      />
    );
  if (index === 2)
    return (
      <Resizable
        className="h-64 w-full"
        initialSize={38}
        first={pane("Navigation", "Projects · Members · Settings")}
        second={
          <Resizable
            orientation="vertical"
            initialSize={55}
            className="h-full rounded-none border-0"
            first={pane("Workspace", "Q4 Product Launch")}
            second={pane("Activity", "3 recent updates")}
          />
        }
      />
    );
  if (index === 3 || index === 7)
    return (
      <Resizable
        className="h-64 w-full"
        first={
          <Resizable
            orientation="vertical"
            className="h-full rounded-none border-0"
            first={pane("Folders")}
            second={pane("Shared with me")}
          />
        }
        second={pane("Files", "18 items")}
      />
    );
  if (index === 8)
    return (
      <Resizable
        className="h-56 w-full"
        initialSize={32}
        first={pane("Projects")}
        second={
          <Resizable
            className="h-full rounded-none border-0"
            initialSize={52}
            first={pane("Project details")}
            second={pane("Activity")}
          />
        }
      />
    );
  if (index === 9)
    return (
      <div className="grid w-full gap-2">
        <Resizable
          className="h-48 w-full"
          initialSize={size}
          onSizeChange={setSize}
          first={pane("Table of contents")}
          second={pane("Documentation", "Resize with pointer or arrow keys")}
        />
        <p className="text-xs text-muted-foreground" aria-live="polite">
          Navigation pane: {Math.round(size)}%
        </p>
      </div>
    );
  const handleClassName =
    index === 4
      ? "bg-transparent hover:[&>span]:h-14"
      : index === 5
        ? "bg-transparent active:[&>span]:scale-150"
        : index === 6
          ? "bg-transparent hover:[&>span]:w-16"
          : index >= 7
            ? "bg-transparent hover:[&>span]:scale-125"
            : "";
  return (
    <Resizable
      orientation="horizontal"
      initialSize={index === 6 ? 50 : 36}
      className="h-52 w-full"
      handleClassName={handleClassName}
      first={pane("Navigation", "Drag or focus the divider and use arrow keys")}
      second={pane("Main panel", "Resizable workspace content")}
    />
  );
}

export function ResizableExamples() {
  return (
    <>
      {examples.map((title, index) => (
        <ComponentPreview key={title} title={title}>
          <ResizableDemo index={index} />
        </ComponentPreview>
      ))}
    </>
  );
}
