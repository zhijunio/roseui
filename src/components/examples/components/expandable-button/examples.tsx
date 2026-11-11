"use client";

import { useState } from "react";

import { IconPlus, IconSparkles } from "@tabler/icons-react";

import { ExpandableButton } from "@/components/composite/expandable-button";
import { ComponentPreview } from "@/components/examples/component-preview";

export function ExpandableButtonExamples() {
  const [message, setMessage] = useState("No workspace has been created yet.");

  return (
    <>
      <ComponentPreview title="Compact create action">
        <div className="grid gap-3">
          <ExpandableButton
            label="Create workspace"
            successLabel="Workspace created"
            onClick={() => setMessage("Workspace creation started.")}
          />
          <p role="status" className="text-sm text-muted-foreground">
            {message}
          </p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Custom icon and variant">
        <div className="flex flex-wrap items-center gap-3">
          <ExpandableButton
            label="Add teammate"
            successLabel="Invite started"
            icon={<IconPlus aria-hidden />}
            onClick={() => setMessage("Invite flow started.")}
          />
          <ExpandableButton
            label="Generate summary"
            successLabel="Summary ready"
            icon={<IconSparkles aria-hidden />}
            variant="default"
          />
        </div>
      </ComponentPreview>
    </>
  );
}
