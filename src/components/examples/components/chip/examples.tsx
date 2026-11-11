"use client";

import { useState } from "react";

import { IconArrowUpRight, IconCheck, IconClock, IconX } from "@tabler/icons-react";

import { ComponentPreview } from "@/components/examples/component-preview";
import { Chip, type ChipColor, type ChipSize, type ChipTextStyle, type ChipVariant } from "@/components/ui/chip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusDot, type StatusDotColor } from "@/components/ui/status-dot";

const colors: ChipColor[] = ["lime", "rose", "yellow", "cyan", "neutral", "gray", "soft"];

const textStyles: { textStyle: ChipTextStyle; label: string; sample: string }[] = [
  { textStyle: "bold", label: "Bold", sample: "+12.5%" },
  { textStyle: "subtle", label: "Subtle", sample: "$3.252" },
  { textStyle: "caption", label: "Caption", sample: "Backend Engineer" },
];

const variants: { variant: ChipVariant; label: string }[] = [
  { variant: "primary", label: "Primary" },
  { variant: "secondary", label: "Secondary" },
  { variant: "tertiary", label: "Tertiary" },
  { variant: "soft", label: "Soft" },
];

const semanticColors: { color: ChipColor; label: string }[] = [
  { color: "default", label: "Default" },
  { color: "accent", label: "Accent" },
  { color: "success", label: "Success" },
  { color: "warning", label: "Warning" },
  { color: "danger", label: "Danger" },
  { color: "info", label: "Info" },
];

const sizes: { size: "sm" | "md" | "lg"; label: string }[] = [
  { size: "sm", label: "Small" },
  { size: "md", label: "Medium" },
  { size: "lg", label: "Large" },
];

const colorStates: { group: string; chips: { color: ChipColor; label: string }[] }[] = [
  {
    group: "Content workflow",
    chips: [
      { color: "default", label: "Draft" },
      { color: "warning", label: "In review" },
      { color: "success", label: "Published" },
    ],
  },
  {
    group: "Release status",
    chips: [
      { color: "accent", label: "New feature" },
      { color: "success", label: "Available" },
      { color: "warning", label: "Beta" },
      { color: "danger", label: "Deprecated" },
    ],
  },
  {
    group: "System status",
    chips: [
      { color: "info", label: "Information" },
      { color: "success", label: "Completed" },
      { color: "warning", label: "Pending" },
      { color: "danger", label: "Failed" },
      { color: "default", label: "Label" },
    ],
  },
];

const statuses: { color: StatusDotColor; label: string }[] = [
  { color: "success", label: "Operational" },
  { color: "warning", label: "Needs attention" },
  { color: "error", label: "Unavailable" },
  { color: "info", label: "In progress" },
  { color: "neutral", label: "Unknown" },
];

export function ChipExamples() {
  return (
    <>
      <ComponentPreview title="Configure a Chip" layout="panel">
        <ChipPlayground />
      </ComponentPreview>

      <ComponentPreview title="Typography and Colors" layout="panel">
        <div className="grid w-full gap-3">
          {textStyles.map(({ textStyle, label, sample }) => (
            <div key={textStyle} className="grid gap-2 sm:grid-cols-[5rem_minmax(0,1fr)] sm:items-center">
              <span className="text-sm font-medium text-muted-foreground">{label}</span>
              <div className="flex flex-wrap items-center gap-2">
                {colors.map((color) => (
                  <Chip key={`${textStyle}-${color}`} textStyle={textStyle} color={color}>
                    {sample}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview title="Variants" layout="panel">
        <div className="grid w-full gap-3">
          {variants.map(({ variant, label }) => (
            <div key={variant} className="grid gap-2 sm:grid-cols-[5rem_minmax(0,1fr)] sm:items-center">
              <span className="text-sm font-medium text-muted-foreground">{label}</span>
              <div className="flex flex-wrap items-center gap-2">
                {semanticColors.map(({ color, label: colorLabel }) => (
                  <Chip key={`${variant}-${color}`} variant={variant} color={color}>
                    {colorLabel}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview title="Color States" layout="panel">
        <div className="grid w-full gap-3">
          {colorStates.map(({ group, chips }) => (
            <div key={group} className="grid gap-2 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-center">
              <span className="text-sm font-medium text-muted-foreground">{group}</span>
              <div className="flex flex-wrap items-center gap-2">
                {chips.map(({ color, label }) => (
                  <Chip key={`${group}-${label}`} color={color}>
                    {label}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview title="Sizes" layout="inline">
        <div role="group" aria-label="Chip sizes" className="flex flex-wrap items-center gap-3">
          {sizes.map(({ size, label }) => (
            <span key={size} className="inline-flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{label}</span>
              <Chip size={size} color="accent">
                Product update
              </Chip>
            </span>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview title="With Icons" layout="inline">
        <div role="group" aria-label="Chips with icons" className="flex flex-wrap items-center gap-2">
          <Chip color="success">
            <IconCheck aria-hidden="true" />
            Approved
          </Chip>
          <Chip color="warning">
            <IconClock aria-hidden="true" />
            Pending review
          </Chip>
          <Chip color="danger">
            <IconX aria-hidden="true" />
            Blocked
          </Chip>
          <Chip color="accent">
            View details
            <IconArrowUpRight aria-hidden="true" />
          </Chip>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Status Indicators" layout="inline">
        <div
          role="group"
          aria-label="Status indicators"
          className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm"
        >
          {statuses.map(({ color, label }) => (
            <span key={color} className="inline-flex items-center gap-2">
              <StatusDot color={color} />
              {label}
            </span>
          ))}
        </div>
      </ComponentPreview>
    </>
  );
}

const colorOptions: { value: ChipColor; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "accent", label: "Accent" },
  { value: "success", label: "Success" },
  { value: "warning", label: "Warning" },
  { value: "danger", label: "Danger" },
  { value: "info", label: "Info" },
  { value: "lime", label: "Lime" },
  { value: "rose", label: "Rose" },
  { value: "yellow", label: "Yellow" },
  { value: "cyan", label: "Cyan" },
  { value: "neutral", label: "Neutral" },
  { value: "gray", label: "Gray" },
  { value: "soft", label: "Soft gray" },
];

const variantOptions: { value: ChipVariant; label: string }[] = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "tertiary", label: "Tertiary" },
  { value: "soft", label: "Soft" },
];

const sizeOptions: { value: ChipSize; label: string }[] = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
];

const textStyleOptions: { value: ChipTextStyle; label: string }[] = [
  { value: "bold", label: "Bold" },
  { value: "subtle", label: "Subtle" },
  { value: "caption", label: "Caption" },
];

function optionValue<T extends string>(options: { value: T }[], value: string): T | undefined {
  return options.find((option) => option.value === value)?.value;
}

export function ChipPlayground() {
  const [color, setColor] = useState<ChipColor>("accent");
  const [variant, setVariant] = useState<ChipVariant>("primary");
  const [size, setSize] = useState<ChipSize>("md");
  const [textStyle, setTextStyle] = useState<ChipTextStyle>("bold");

  return (
    <div className="grid w-full gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium">
          Color
          <Select
            value={color}
            onValueChange={(value) => {
              const next = optionValue(colorOptions, value);
              if (next) setColor(next);
            }}
          >
            <SelectTrigger aria-label="Chip color" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Variant
          <Select
            value={variant}
            onValueChange={(value) => {
              const next = optionValue(variantOptions, value);
              if (next) setVariant(next);
            }}
          >
            <SelectTrigger aria-label="Chip variant" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {variantOptions.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Size
          <Select
            value={size}
            onValueChange={(value) => {
              const next = optionValue(sizeOptions, value);
              if (next) setSize(next);
            }}
          >
            <SelectTrigger aria-label="Chip size" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sizeOptions.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Text style
          <Select
            value={textStyle}
            onValueChange={(value) => {
              const next = optionValue(textStyleOptions, value);
              if (next) setTextStyle(next);
            }}
          >
            <SelectTrigger aria-label="Chip text style" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {textStyleOptions.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>
      <div className="flex min-h-20 items-center justify-center rounded-lg border border-dashed bg-muted/30 p-4">
        <Chip color={color} variant={variant} size={size} textStyle={textStyle}>
          Preview chip
        </Chip>
      </div>
      <pre className="overflow-x-auto rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
        <code>{`<Chip color="${color}" variant="${variant}" size="${size}" textStyle="${textStyle}">Preview chip</Chip>`}</code>
      </pre>
    </div>
  );
}
