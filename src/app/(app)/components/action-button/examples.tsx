"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/composite/component-preview";
import { ActionButton } from "@/components/composite/action-button";

export function ActionButtonExamples() {
  const [saveMessage, setSaveMessage] = useState("Changes are ready to save.");
  const [retryMessage, setRetryMessage] = useState("");
  const [failFirstAttempt, setFailFirstAttempt] = useState(true);

  return (
    <>
      <ComponentPreview previewId="action-button-01" title="Save workspace settings">
        <div className="space-y-3">
          <ActionButton
            label="Save changes"
            pendingLabel="Saving changes"
            successLabel="Changes saved"
            onAction={async () => {
              await new Promise((resolve) => window.setTimeout(resolve, 800));
              setSaveMessage("Workspace settings were saved.");
            }}
          />
          <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
            {saveMessage}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="action-button-02" title="Recover from a failed save">
        <div className="space-y-3">
          <ActionButton
            label="Publish report"
            pendingLabel="Publishing report"
            successLabel="Report published"
            onAction={async () => {
              await new Promise((resolve) => window.setTimeout(resolve, 600));
              if (failFirstAttempt) throw new Error("The report could not be published.");
              setRetryMessage("The report is now available to your team.");
            }}
            onActionError={() => {
              setFailFirstAttempt(false);
              setRetryMessage("Publishing failed. You can retry the action.");
            }}
          />
          <p
            role={retryMessage.startsWith("Publishing failed") ? "alert" : "status"}
            aria-live="polite"
            className="text-sm text-muted-foreground"
          >
            {retryMessage || "The first attempt will fail; retry to publish."}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="action-button-03" title="Disabled action">
        <ActionButton
          label="Publish report"
          onAction={() => undefined}
          disabled
        />
      </ComponentPreview>
    </>
  );
}
