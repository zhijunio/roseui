"use client";

import * as React from "react";

import { InlineEdit } from "@/components/ui/inline-edit";
import { ComponentPreview } from "@/examples/component-preview";

function InlineEditExamplesContent() {
  const [workspaceName, setWorkspaceName] = React.useState("Operations Hub");
  const [description, setDescription] = React.useState("A shared space for account reviews and service updates.");
  const [failureName, setFailureName] = React.useState("Quarterly Review");

  function saveWithDelay(next: string) {
    return new Promise<void>((resolve) => {
      window.setTimeout(() => resolve(), 500);
    }).then(() => setWorkspaceName(next));
  }

  return (
    <>
      <ComponentPreview title="Workspace details" span={2} layout="panel">
        <div className="grid w-full max-w-2xl gap-6">
          <div className="grid gap-2">
            <span className="text-xs font-medium text-muted-foreground">Workspace name</span>
            <InlineEdit
              as="h2"
              label="Workspace name"
              value={workspaceName}
              validate={(next) => (next ? undefined : "Enter a workspace name.")}
              onSave={saveWithDelay}
              className="text-xl font-semibold tracking-tight"
            />
          </div>
          <div className="grid gap-2">
            <span className="text-xs font-medium text-muted-foreground">Workspace description</span>
            <InlineEdit
              multiline
              label="Workspace description"
              value={description}
              validate={(next) => (next.length > 180 ? "Keep the description under 180 characters." : undefined)}
              onSave={(next) => setDescription(next)}
              className="max-w-xl text-sm leading-6 text-muted-foreground"
            />
          </div>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Failed save and retry">
        <div className="grid w-full max-w-md gap-2">
          <span className="text-xs font-medium text-muted-foreground">Billing contact label</span>
          <InlineEdit
            label="Billing contact label"
            value={failureName}
            validate={(next) => (next.length < 3 ? "Use at least three characters." : undefined)}
            onSave={async (next) => {
              await new Promise((resolve) => window.setTimeout(resolve, 350));
              if (next.toLowerCase().includes("fail"))
                throw new Error("The billing service could not save this label. Try again.");
              setFailureName(next);
            }}
          />
          <p className="text-xs text-muted-foreground">Enter “fail” in the value to preview a rejected save.</p>
        </div>
      </ComponentPreview>
    </>
  );
}

export function InlineEditExamples() {
  return <InlineEditExamplesContent />;
}
