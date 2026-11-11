"use client";

import { CopyButton } from "@/components/composite/copy-button";
import { ComponentPreview } from "@/components/examples/component-preview";

const workspaceId = "ws_1704_roseui";
const endpoint = "https://api.roseui.dev/v1/workspaces/ws_1704";
const auditEvent = JSON.stringify({ event: "access.policy.updated", actor: "mina_patel", version: 12 }, null, 2);

export function CopyButtonExamples() {
  return (
    <>
      <ComponentPreview title="Copy a workspace value">
        <div className="flex w-full min-w-0 flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-muted/30 p-3">
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground">Workspace ID</p>
            <code className="break-all text-sm">{workspaceId}</code>
          </div>
          <CopyButton value={workspaceId} />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Icon-only action">
        <div className="flex w-full min-w-0 items-center justify-between gap-4 rounded-lg border border-border bg-muted/30 p-3">
          <code className="min-w-0 break-all text-sm">{endpoint}</code>
          <CopyButton value={endpoint} iconOnly aria-label="Copy API endpoint" variant="ghost" size="icon" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Copy structured event" span={2} layout="panel">
        <div className="w-full min-w-0 overflow-hidden rounded-lg border border-border bg-muted/30">
          <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
            <span className="text-xs font-medium text-muted-foreground">Audit event payload</span>
            <CopyButton
              value={auditEvent}
              copyLabel="Copy JSON"
              copiedLabel="JSON copied"
              size="sm"
              variant="secondary"
            />
          </div>
          <pre className="max-w-full overflow-x-auto p-3 text-xs leading-5">
            <code>{auditEvent}</code>
          </pre>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Custom action label">
        <CopyButton
          value="incident-review-2026-11"
          copyLabel="Copy incident key"
          copiedLabel="Incident key copied"
          variant="outline"
        />
      </ComponentPreview>
    </>
  );
}
