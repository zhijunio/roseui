"use client";

import * as React from "react";

import { InputTag } from "@/components/composite/input-tag";
import { ComponentPreview } from "@/components/examples/component-preview";

function InputTagExamplesContent() {
  const [labels, setLabels] = React.useState(["Renewal", "Needs review"]);
  const [recipients, setRecipients] = React.useState<string[]>([]);

  return (
    <>
      <ComponentPreview title="Project labels">
        <div className="w-full max-w-lg">
          <InputTag
            label="Project labels"
            value={labels}
            onValueChange={setLabels}
            placeholder="Add a label"
            description="Press Enter or comma to add a label; Backspace selects and removes the last one."
            maxTags={8}
          />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Notification recipients">
        <div className="w-full max-w-lg">
          <InputTag
            label="Recipient addresses"
            value={recipients}
            onValueChange={setRecipients}
            placeholder="Add an email address"
            description="Add each address separately. Duplicate values are ignored."
            error={
              recipients.some((address) => !address.includes("@")) ? "Check the recipient address format." : undefined
            }
          />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Disabled labels">
        <div className="w-full max-w-lg">
          <InputTag
            label="Applied categories"
            defaultValue={["Billing", "Priority"]}
            disabled
            description="These categories are managed by your workspace policy."
          />
        </div>
      </ComponentPreview>
    </>
  );
}

export function InputTagExamples() {
  return <InputTagExamplesContent />;
}
