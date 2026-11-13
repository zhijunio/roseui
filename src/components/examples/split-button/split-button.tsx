"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { SplitButton, type SplitButtonOption } from "@/components/ui/split-button";

const publishOptions: readonly SplitButtonOption[] = [
  { id: "schedule", label: "Schedule…" },
  { id: "draft", label: "Save as draft" },
];

const exportOptions: readonly SplitButtonOption[] = [
  { id: "xlsx", label: "Download spreadsheet" },
  { id: "pdf", label: "Download PDF" },
  { id: "print", label: "Print", disabled: true },
];

const inviteOptions: readonly SplitButtonOption[] = [
  { id: "link", label: "Invite with a link" },
  { id: "csv", label: "Import from CSV" },
];

function ActionExample({ label, options }: { label: string; options: readonly SplitButtonOption[] }) {
  const [status, setStatus] = useState("");

  return (
    <div className="space-y-3">
      <SplitButton
        label={label}
        options={options}
        onAction={() => setStatus(`${label} started.`)}
        onOptionSelect={(option) => setStatus(`${option.label} selected.`)}
      />
      {status ? (
        <p role="status" aria-live="polite" className="text-muted-foreground text-sm">
          {status}
        </p>
      ) : null}
    </div>
  );
}

export function SplitButtonExamples() {
  return (
    <>
      <ComponentPreview title="Actions" layout="stack">
        <ActionExample label="Publish" options={publishOptions} />
        <ActionExample label="Export CSV" options={exportOptions} />
        <ActionExample label="Invite people" options={inviteOptions} />
      </ComponentPreview>

      <ComponentPreview title="States" layout="stack">
        <SplitButton
          label="Publish"
          options={publishOptions}
          onAction={() => undefined}
          onOptionSelect={() => undefined}
          disabled
        />
        <SplitButton
          label="Export CSV"
          options={exportOptions}
          onAction={() => undefined}
          onOptionSelect={() => undefined}
        />
      </ComponentPreview>
    </>
  );
}
