"use client";

import { useRef, useState } from "react";

import { FloatingToc, type FloatingTocItem } from "@/components/composite/floating-toc";
import { ComponentPreview } from "@/components/examples/component-preview";
import { Button } from "@/components/ui/button";

const sections: Array<FloatingTocItem & { heading: string; description: string }> = [
  {
    id: "toc-overview",
    label: "Overview",
    heading: "Workspace overview",
    description: "Review the current workspace, its activity, and the people working across projects.",
  },
  {
    id: "toc-projects",
    label: "Projects",
    level: 1,
    heading: "Projects",
    description: "Group work by team and keep each project’s status, owners, and recent changes in one place.",
  },
  {
    id: "toc-activity",
    label: "Recent activity",
    level: 1,
    heading: "Recent activity",
    description: "Follow updates from teammates and see which decisions changed the project timeline.",
  },
  {
    id: "toc-members",
    label: "Members",
    heading: "Members",
    description: "Manage workspace access and invite collaborators who need to contribute.",
  },
  {
    id: "toc-settings",
    label: "Settings",
    level: 1,
    heading: "Workspace settings",
    description: "Review billing, permissions, and notification preferences for this workspace.",
  },
];

export function FloatingTocExamples() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"hover" | "press">("hover");
  const [placement, setPlacement] = useState<"left" | "right">("right");
  const [open, setOpen] = useState(false);

  return (
    <ComponentPreview title="Scrollable Page Sections" layout="panel" span={2}>
      <div className="w-full space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs text-muted-foreground">Trigger</span>
          <Button
            type="button"
            size="sm"
            variant={mode === "hover" ? "secondary" : "outline"}
            onClick={() => setMode("hover")}
          >
            Hover
          </Button>
          <Button
            type="button"
            size="sm"
            variant={mode === "press" ? "secondary" : "outline"}
            onClick={() => setMode("press")}
          >
            Press
          </Button>
          <span className="ml-2 mr-1 text-xs text-muted-foreground">Placement</span>
          <Button
            type="button"
            size="sm"
            variant={placement === "left" ? "secondary" : "outline"}
            onClick={() => setPlacement("left")}
          >
            Left
          </Button>
          <Button
            type="button"
            size="sm"
            variant={placement === "right" ? "secondary" : "outline"}
            onClick={() => setPlacement("right")}
          >
            Right
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="ml-auto"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close directory" : "Open directory"}
          </Button>
        </div>
        <div className="relative">
          <div ref={scrollRef} className="h-80 space-y-3 overflow-y-auto rounded-lg border p-5 pr-14 sm:p-6 sm:pr-16">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="min-h-36 scroll-mt-4 rounded-lg border bg-card p-4 sm:p-5"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Workspace guide</p>
                <h2 className="mt-2 text-base font-semibold">{section.heading}</h2>
                <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">{section.description}</p>
              </section>
            ))}
          </div>
          <FloatingToc
            items={sections}
            targetRef={scrollRef}
            triggerMode={mode}
            placement={placement}
            open={open}
            onOpenChange={setOpen}
            openDelay={500}
            closeDelay={350}
            offset={12}
            className="absolute bottom-auto top-1/2 -translate-y-1/2"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Nested entries are indented. Keyboard users can focus the directory and follow its section links.
        </p>
      </div>
    </ComponentPreview>
  );
}
