"use client";

import { useState } from "react";

import { Plus as IconPlus, Sparkles as IconSparkles } from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { ExpandableButton } from "@/components/ui/expandable-button";

export function ExpandableButtonExamples() {
  const [message, setMessage] = useState("No workspace has been created yet.");

  return (
    <>
      <ComponentPreview title="Compact create action">
        <div className="grid gap-3">
          <ExpandableButton
            label="Create workspace"
            successLabel="Workspace created"
            onPress={() => setMessage("Workspace creation started.")}
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
            onPress={() => setMessage("Invite flow started.")}
          />
          <ExpandableButton
            label="Generate summary"
            successLabel="Summary ready"
            icon={<IconSparkles aria-hidden />}
            variant="default"
          />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Disabled and pending">
        <div className="flex flex-wrap items-center gap-3">
          <ExpandableButton label="Unavailable" isDisabled />
          <ExpandableButton label="Creating project" isPending />
        </div>
      </ComponentPreview>
    </>
  );
}
