"use client";

import * as React from "react";

import { IconArchive, IconBellOff, IconCheck, IconStar, IconTrash } from "@tabler/icons-react";

import { SwipeActions } from "@/components/composite/swipe-actions";
import { ComponentPreview } from "@/components/examples/component-preview";

function InboxExample() {
  const [status, setStatus] = React.useState("Swipe a row or use its actions button.");
  return (
    <div className="grid gap-3">
      <SwipeActions
        label="message actions"
        actions={[
          { label: "Archive", icon: <IconArchive />, onSelect: () => setStatus("Message archived.") },
          { label: "Mark as read", icon: <IconCheck />, onSelect: () => setStatus("Message marked as read.") },
        ]}
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">Quarterly inventory review</p>
          <p className="truncate text-xs text-muted-foreground">
            Mina Chen · Updated the stock summary for the west region.
          </p>
        </div>
      </SwipeActions>
      <SwipeActions
        label="message actions"
        actions={[
          { label: "Mute", icon: <IconBellOff />, onSelect: () => setStatus("Project updates muted.") },
          {
            label: "Delete",
            icon: <IconTrash />,
            variant: "destructive",
            onSelect: () => setStatus("Conversation removed."),
          },
        ]}
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">Website refresh</p>
          <p className="truncate text-xs text-muted-foreground">Design team · New comments on the handoff checklist.</p>
        </div>
      </SwipeActions>
      <p className="min-h-5 text-xs text-muted-foreground" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}

function TaskExample() {
  const [saved, setSaved] = React.useState(false);
  return (
    <SwipeActions
      label="task actions"
      actions={[
        { label: saved ? "Unstar" : "Star", icon: <IconStar />, onSelect: () => setSaved((value) => !value) },
        { label: "Archive", icon: <IconArchive />, onSelect: () => setSaved(true) },
      ]}
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">Prepare launch checklist</p>
        <p className="truncate text-xs text-muted-foreground">Due Friday · Product operations</p>
      </div>
    </SwipeActions>
  );
}

export function SwipeActionsExamples() {
  return (
    <>
      <ComponentPreview title="Inbox rows" exampleLabels={["Archive", "Mark read", "Mute", "Delete"]}>
        <InboxExample />
      </ComponentPreview>
      <ComponentPreview title="Task row" exampleLabels={["Star", "Archive"]}>
        <TaskExample />
      </ComponentPreview>
    </>
  );
}
