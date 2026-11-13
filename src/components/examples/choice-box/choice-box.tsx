"use client";

import { useState } from "react";

import { Cloud as IconCloud, ShieldCheck as IconShieldCheck, Sparkles as IconSparkles } from "lucide-react";
import type { Selection } from "react-aria-components";

import { ComponentPreview } from "@/components/docs/component-preview";
import { ChoiceBox, ChoiceBoxDescription, ChoiceBoxItem, ChoiceBoxLabel } from "@/components/ui/choice-box";

const plans = [
  { id: "starter", label: "Starter", description: "For personal projects and small teams." },
  { id: "growth", label: "Growth", description: "For teams scaling their workflow." },
  { id: "business", label: "Business", description: "For organizations with advanced needs." },
  { id: "enterprise", label: "Enterprise", description: "For custom deployment and support." },
];

export function ChoiceBoxExamples() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["sm"]));

  return (
    <>
      <ComponentPreview title="Selection" layout="panel">
        <ChoiceBox aria-label="Select items" selectionMode="multiple" items={plans}>
          {(plan) => <ChoiceBoxItem id={plan.id} label={plan.label} description={plan.description} />}
        </ChoiceBox>
      </ComponentPreview>
      <ComponentPreview title="Multiple Selection" layout="panel">
        <ChoiceBox
          aria-label="Choose packages"
          items={packages}
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          {(plan) => <ChoiceBoxItem id={plan.id} label={plan.label} description={plan.description} />}
        </ChoiceBox>
        <p className="text-muted-foreground mt-2 text-sm">Selected: {Array.from(selectedKeys).join(", ") || "none"}</p>
      </ComponentPreview>
      <ComponentPreview title="Columns and Gap" layout="panel">
        <ChoiceBox aria-label="Select prices" items={prices} selectionMode="multiple" columns={2} gap={2}>
          {(item) => <ChoiceBoxItem id={item.id} label={item.label} description={item.description} />}
        </ChoiceBox>
      </ComponentPreview>
      <ComponentPreview title="Icons and Disabled Items" layout="panel">
        <ChoiceBox aria-label="Choose a workspace type" selectionMode="multiple" columns={3} gap={2}>
          <ChoiceBoxItem textValue="Cloud">
            <IconCloud aria-hidden="true" />
            <ChoiceBoxLabel>Cloud</ChoiceBoxLabel>
            <ChoiceBoxDescription>Managed</ChoiceBoxDescription>
          </ChoiceBoxItem>
          <ChoiceBoxItem textValue="Secure">
            <IconShieldCheck aria-hidden="true" />
            <ChoiceBoxLabel>Secure</ChoiceBoxLabel>
            <ChoiceBoxDescription>Private</ChoiceBoxDescription>
          </ChoiceBoxItem>
          <ChoiceBoxItem textValue="AI" isDisabled>
            <IconSparkles aria-hidden="true" />
            <ChoiceBoxLabel>AI tools</ChoiceBoxLabel>
            <ChoiceBoxDescription>Coming soon</ChoiceBoxDescription>
          </ChoiceBoxItem>
        </ChoiceBox>
      </ComponentPreview>
      <ComponentPreview title="Read Only" layout="panel">
        <ChoiceBox aria-label="Selected plan" selectionMode="single" defaultSelectedKeys={["growth"]} isReadOnly>
          {plans.slice(0, 3).map((plan) => (
            <ChoiceBoxItem key={plan.id} id={plan.id} label={plan.label} description={plan.description} />
          ))}
        </ChoiceBox>
      </ComponentPreview>
      <ComponentPreview title="Disabled Items" layout="panel">
        <ChoiceBox aria-label="Select packages" items={packages} selectionMode="multiple">
          {(item) => (
            <ChoiceBoxItem
              id={item.id}
              label={item.label}
              description={item.description}
              isDisabled={item.id === "sm" || item.id === "lg"}
            />
          )}
        </ChoiceBox>
      </ComponentPreview>
    </>
  );
}

const prices = [
  { id: "basic", label: "Basic", description: "Essentials to get started." },
  { id: "standard", label: "Standard", description: "More features and support." },
  { id: "premium", label: "Premium", description: "Advanced tools for growing teams." },
  { id: "deluxe", label: "Deluxe", description: "Top-tier features for maximum performance." },
  { id: "ultimate", label: "Ultimate", description: "Every feature in one plan." },
  { id: "enterprise", label: "Enterprise", description: "Custom options for large organizations." },
];

const packages = [
  { id: "sm", label: "Small", description: "Basic resources for light projects." },
  { id: "md", label: "Medium", description: "More power and storage for growing sites." },
  { id: "lg", label: "Large", description: "Resources and support for busy sites." },
  { id: "xl", label: "Extra Large", description: "Maximum power for demanding applications." },
];
