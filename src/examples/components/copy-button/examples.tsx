"use client";

import { CopyButton } from "@/components/ui/copy-button";
import { ComponentPreview } from "@/examples/component-preview";

const workspaceId = "ws_1704_roseui";
const endpoint = "https://api.roseui.dev/v1/workspaces/ws_1704";
const incidentKey = "incident-review-2026-11";

export function CopyButtonExamples() {
  return (
    <>
      <ComponentPreview title="Default behavior">
        <div className="flex w-full min-w-0 flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-muted/30 p-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground">Workspace ID</p>
            <code className="break-all text-sm">{workspaceId}</code>
          </div>
          <CopyButton value={workspaceId} />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Custom feedback">
        <CopyButton
          value={incidentKey}
          copyLabel="Copy incident key"
          copiedLabel="Incident key copied"
          variant="outline"
        />
      </ComponentPreview>

      <ComponentPreview title="Icon-only style">
        <div className="flex w-full min-w-0 items-center justify-between gap-4 rounded-lg border border-border bg-muted/30 p-3">
          <code className="min-w-0 break-all text-sm">{endpoint}</code>
          <CopyButton value={endpoint} iconOnly aria-label="Copy API endpoint" variant="ghost" size="icon" />
        </div>
      </ComponentPreview>
    </>
  );
}
