"use client";

import * as React from "react";

import { MultiSelect, type MultiSelectOption } from "@/components/composite/multi-select";
import { ComponentPreview } from "@/components/examples/component-preview";

const workstreams: MultiSelectOption[] = [
  { value: "accounts", label: "Accounts" },
  { value: "billing", label: "Billing" },
  { value: "onboarding", label: "Onboarding" },
  { value: "support", label: "Support" },
  { value: "integrations", label: "Integrations" },
];

const teamMembers: MultiSelectOption[] = [
  { value: "ava", label: "Ava Chen" },
  { value: "noah", label: "Noah Patel" },
  { value: "mia", label: "Mia Torres" },
  { value: "eli", label: "Eli Brooks" },
];

function MultiSelectExamplesContent() {
  const [filters, setFilters] = React.useState(["accounts", "billing", "support"]);
  const [assignees, setAssignees] = React.useState<string[]>(["ava", "mia"]);

  return (
    <>
      <ComponentPreview title="Workstream filters" span={2} layout="panel">
        <div className="grid w-full max-w-2xl gap-3">
          <MultiSelect
            label="Workstreams"
            options={workstreams}
            value={filters}
            onValueChange={setFilters}
            maxVisible={2}
            description="Choose one or more areas to narrow the service report."
          />
          <p aria-live="polite" className="text-xs text-muted-foreground">
            Showing:{" "}
            {filters.length
              ? filters.map((value) => workstreams.find((option) => option.value === value)?.label).join(", ")
              : "All workstreams"}
          </p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Review assignees">
        <div className="w-full max-w-md">
          <MultiSelect
            label="Reviewers"
            options={teamMembers}
            value={assignees}
            onValueChange={setAssignees}
            placeholder="Choose reviewers"
            maxVisible={1}
          />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Locked assignment">
        <div className="w-full max-w-md">
          <MultiSelect
            label="Assigned groups"
            options={workstreams}
            defaultValue={["accounts", "onboarding"]}
            disabled
            description="Assignments are managed by the account owner."
          />
        </div>
      </ComponentPreview>
    </>
  );
}

export function MultiSelectExamples() {
  return <MultiSelectExamplesContent />;
}
