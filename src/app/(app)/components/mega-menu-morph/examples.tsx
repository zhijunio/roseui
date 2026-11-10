"use client";

import { useState } from "react";
import { IconArrowUpRight, IconChevronDown, IconCode, IconLayoutDashboard, IconUsers } from "@tabler/icons-react";

import { ComponentPreview } from "@/components/composite/component-preview";
import { Button } from "@/components/ui/button";

const groups = [{ label: "Workspace", description: "Projects, activity, and reports", Icon: IconLayoutDashboard }, { label: "People", description: "Members and permissions", Icon: IconUsers }, { label: "Developer", description: "Keys, webhooks, and logs", Icon: IconCode }];

function MegaMenu() {
  const [open, setOpen] = useState(false);
  return <div className="w-full max-w-xl overflow-hidden rounded-xl border bg-card"><div className="flex items-center justify-between border-b px-3 py-2"><span className="text-sm font-medium">Workspace</span><Button size="sm" variant="ghost" aria-expanded={open} aria-controls="mega-menu-panel" onClick={() => setOpen((value) => !value)}>Explore <IconChevronDown className={`size-4 motion-safe:transition-transform ${open ? "rotate-180" : ""}`} /></Button></div><div id="mega-menu-panel" hidden={!open} className="grid gap-1 p-2 sm:grid-cols-3">{groups.map(({ label, description, Icon }) => <button key={label} type="button" className="group rounded-lg p-3 text-left outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"><Icon className="size-4 text-muted-foreground" /><span className="mt-3 block text-sm font-medium">{label}</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">{description}</span><IconArrowUpRight className="mt-3 size-3 text-muted-foreground opacity-0 motion-safe:transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" /></button>)}</div></div>;
}

export function MegaMenuMorphExamples() { return <><ComponentPreview previewId="mega-menu-morph-01" title="Expandable navigation" layout="field"><MegaMenu /></ComponentPreview><ComponentPreview previewId="mega-menu-morph-02" title="Compact link" layout="field"><Button variant="outline" size="sm">Open workspace menu <IconChevronDown /></Button></ComponentPreview></>; }
