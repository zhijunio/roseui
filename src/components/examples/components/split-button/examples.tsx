"use client";

import { useState } from "react";

import { SplitButton, type SplitButtonOption } from "@/components/composite/split-button";
import { ComponentPreview } from "@/components/examples/component-preview";

const exportOptions: readonly SplitButtonOption[] = [
  { id: "csv", label: "Download CSV" },
  { id: "xlsx", label: "Download spreadsheet" },
  { id: "pdf", label: "Download PDF" },
];

export function SplitButtonExamples() {
  const [status, setStatus] = useState("Ready to export 24 records.");

  return (
    <>
      <ComponentPreview title="Export records">
        <div className="space-y-3">
          <SplitButton
            label="Export CSV"
            options={exportOptions}
            onAction={() => setStatus("CSV export prepared for 24 records.")}
            onOptionSelect={(option) => setStatus(`${option.label} prepared for 24 records.`)}
          />
          <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
            {status}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Unavailable export">
        <SplitButton
          label="Export CSV"
          options={exportOptions}
          onAction={() => undefined}
          onOptionSelect={() => undefined}
          disabled
        />
      </ComponentPreview>
    </>
  );
}
