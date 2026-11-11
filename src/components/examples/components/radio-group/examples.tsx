"use client";

import { useState } from "react";

import { IconCheck, IconDeviceDesktop, IconDeviceMobile, IconDeviceTablet } from "@tabler/icons-react";

import { FieldError } from "@/components/composite/field";
import { LabeledRadio, LabeledRadioGroup } from "@/components/composite/labeled-radio";
import { ComponentPreview } from "@/components/examples/component-preview";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function RadioExamples() {
  const [delivery, setDelivery] = useState("email");
  const [exportFormat, setExportFormat] = useState("");
  const exportFormatInvalid = exportFormat === "";
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <ComponentPreview title="Billing Cycle">
        <RadioGroup aria-label="Billing cycle" defaultValue="monthly" className="max-w-sm">
          <Label htmlFor="billing-monthly" className="flex items-center gap-3 rounded-lg border p-3">
            <RadioGroupItem id="billing-monthly" value="monthly" />
            Monthly billing
          </Label>
          <Label htmlFor="billing-yearly" className="flex items-center gap-3 rounded-lg border p-3">
            <RadioGroupItem id="billing-yearly" value="yearly" />
            Annual billing <span className="ml-auto text-xs text-muted-foreground">Save 15%</span>
          </Label>
        </RadioGroup>
      </ComponentPreview>
      <ComponentPreview title="Horizontal Choices">
        <RadioGroup
          aria-label="Contact method"
          defaultValue="email"
          orientation="horizontal"
          className="flex flex-wrap gap-4"
        >
          {["Email", "Phone", "No contact"].map((choice) => {
            const id = `contact-${choice.toLowerCase().replace(/\s+/g, "-")}`;
            return (
              <Label key={id} htmlFor={id} className="flex items-center gap-2">
                <RadioGroupItem id={id} value={choice.toLowerCase().replace(/\s+/g, "-")} />
                {choice}
              </Label>
            );
          })}
        </RadioGroup>
      </ComponentPreview>
      <ComponentPreview title="Plan Cards">
        <LabeledRadioGroup defaultValue="business" aria-label="Workspace plan" className="max-w-md">
          <LabeledRadio value="starter" label="Starter" description="For small teams getting started." />
          <LabeledRadio value="business" label="Business" description="Advanced controls for growing teams." />
          <LabeledRadio value="enterprise" label="Enterprise" description="Custom security and support." />
        </LabeledRadioGroup>
      </ComponentPreview>
      <ComponentPreview title="Icon Choices">
        <RadioGroup aria-label="Preferred device" defaultValue="mobile" className="grid max-w-md grid-cols-3 gap-2">
          {[
            { id: "mobile", label: "Mobile", Icon: IconDeviceMobile },
            { id: "tablet", label: "Tablet", Icon: IconDeviceTablet, disabled: true },
            { id: "desktop", label: "Desktop", Icon: IconDeviceDesktop },
          ].map(({ id, label, Icon, disabled }) => (
            <label
              key={id}
              className="relative flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg border p-3 has-data-[state=checked]:bg-accent/40 has-data-disabled:opacity-50"
            >
              <RadioGroupItem
                className="sr-only after:absolute after:inset-0"
                value={id}
                aria-label={label}
                disabled={disabled}
              />
              <Icon className="size-5 text-muted-foreground" />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </RadioGroup>
      </ComponentPreview>
      <ComponentPreview title="Controlled Selection">
        <div className="grid max-w-sm gap-3">
          <RadioGroup aria-label="Invoice delivery" value={delivery} onValueChange={setDelivery}>
            <Label htmlFor="delivery-email" className="flex items-center gap-3">
              <RadioGroupItem id="delivery-email" value="email" />
              Email
            </Label>
            <Label htmlFor="delivery-download" className="flex items-center gap-3">
              <RadioGroupItem id="delivery-download" value="download" />
              Download
            </Label>
          </RadioGroup>
          <output aria-live="polite" className="text-xs text-muted-foreground">
            Selected: {delivery}
          </output>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Validation">
        <div className="grid max-w-sm gap-3">
          <p id="export-label" className="text-sm font-medium">
            Export format
          </p>
          <RadioGroup
            aria-labelledby="export-label"
            aria-describedby={exportFormatInvalid ? "export-error" : undefined}
            aria-invalid={exportFormatInvalid}
            required
            value={exportFormat}
            onValueChange={setExportFormat}
          >
            <Label htmlFor="format-csv" className="flex items-center gap-3">
              <RadioGroupItem id="format-csv" value="csv" aria-invalid={exportFormatInvalid} />
              CSV file
            </Label>
            <Label htmlFor="format-archive" className="flex items-center gap-3">
              <RadioGroupItem id="format-archive" value="archive" aria-invalid={exportFormatInvalid} />
              Complete archive
            </Label>
          </RadioGroup>
          {exportFormatInvalid ? (
            <FieldError id="export-error">Choose an export format to continue.</FieldError>
          ) : (
            <p role="status" className="flex items-center gap-2 text-xs text-muted-foreground">
              <IconCheck className="size-3.5" />
              Export format selected: {exportFormat === "csv" ? "CSV file" : "Complete archive"}.
            </p>
          )}
        </div>
      </ComponentPreview>
    </div>
  );
}
