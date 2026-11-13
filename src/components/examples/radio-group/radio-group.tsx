"use client";

import { useState } from "react";

import {
  Check as IconCheck,
  Monitor as IconDeviceDesktop,
  Smartphone as IconDeviceMobile,
  Tablet as IconDeviceTablet,
} from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { FieldError } from "@/components/ui/field";
import { RadioButton, RadioField, RadioGroup } from "@/components/ui/radio-group";

export function RadioExamples() {
  const [delivery, setDelivery] = useState("email");
  const [exportFormat, setExportFormat] = useState("");
  const exportFormatInvalid = exportFormat === "";
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <ComponentPreview title="Default Selection">
        <RadioGroup aria-label="Billing cycle" defaultValue="monthly" className="max-w-sm">
          <RadioField value="monthly">
            <RadioButton className="items-center gap-3 rounded-lg border p-3 text-sm data-[selected]:bg-primary/[0.04]">
              Monthly billing
            </RadioButton>
          </RadioField>
          <RadioField value="yearly">
            <RadioButton className="items-center gap-3 rounded-lg border p-3 text-sm data-[selected]:bg-primary/[0.04]">
              Annual billing <span className="ml-auto text-xs text-muted-foreground">Save 15%</span>
            </RadioButton>
          </RadioField>
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
            const value = choice.toLowerCase().replace(/\s+/g, "-");
            return (
              <RadioField key={value} value={value}>
                <RadioButton className="items-center gap-2 text-sm">{choice}</RadioButton>
              </RadioField>
            );
          })}
        </RadioGroup>
      </ComponentPreview>
      <ComponentPreview title="Icon Choices">
        <RadioGroup aria-label="Preferred device" defaultValue="mobile" className="grid max-w-md grid-cols-3 gap-2">
          {[
            { id: "mobile", label: "Mobile", Icon: IconDeviceMobile },
            { id: "tablet", label: "Tablet", Icon: IconDeviceTablet, disabled: true },
            { id: "desktop", label: "Desktop", Icon: IconDeviceDesktop },
          ].map(({ id, label, Icon, disabled }) => (
            <RadioField key={id} value={id} disabled={disabled}>
              <RadioButton
                className="relative min-h-24 flex-col items-center justify-center gap-2 rounded-lg border p-3 text-sm data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring data-[selected]:bg-accent/40 data-[disabled]:opacity-50"
                boxClassName="sr-only"
              >
                <Icon className="size-5 text-muted-foreground" />
                <span>{label}</span>
              </RadioButton>
            </RadioField>
          ))}
        </RadioGroup>
      </ComponentPreview>
      <ComponentPreview title="Controlled Selection">
        <div className="grid max-w-sm gap-3">
          <RadioGroup aria-label="Invoice delivery" value={delivery} onValueChange={setDelivery}>
            <RadioField value="email">
              <RadioButton className="items-center gap-3 text-sm">Email</RadioButton>
            </RadioField>
            <RadioField value="download">
              <RadioButton className="items-center gap-3 text-sm">Download</RadioButton>
            </RadioField>
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
            isInvalid={exportFormatInvalid}
            required
            value={exportFormat}
            onValueChange={setExportFormat}
          >
            <RadioField value="csv">
              <RadioButton className="items-center gap-3 text-sm">CSV file</RadioButton>
            </RadioField>
            <RadioField value="archive">
              <RadioButton className="items-center gap-3 text-sm">Complete archive</RadioButton>
            </RadioField>
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
