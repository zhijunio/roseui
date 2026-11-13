"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TeamSwitcher } from "@/components/ui/team-switcher";

const workspaces = [
  { name: "Northstar Studio", plan: "Pro plan" },
  { name: "Field Notes", plan: "Team plan" },
  { name: "RoseUI", plan: "Enterprise" },
] as const;

export function TeamSwitcherExamples() {
  const [message, setMessage] = useState("");
  return (
    <ComponentPreview title="Workspace Switcher" layout="panel">
      <div className="w-full max-w-sm rounded-xl border bg-sidebar p-3">
        <SidebarProvider>
          <TeamSwitcher
            workspaces={workspaces}
            onCreateWorkspace={() => setMessage("Workspace creation is ready to connect.")}
          />
        </SidebarProvider>
      </div>
      <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
        {message}
      </p>
    </ComponentPreview>
  );
}
