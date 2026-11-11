"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/examples/component-preview";
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@/components/ui/native-select";

export const metadata = { title: "Native Select" };

export function NativeSelectExamples() {
  const [interval, setInterval] = useState("monthly");
  return (
    <>
      <ComponentPreview title="Basic Native Select">
        <NativeSelect aria-label="Choose a billing interval">
          <NativeSelectOption value="">Choose a billing interval</NativeSelectOption>
          <NativeSelectOption value="monthly">Monthly</NativeSelectOption>
          <NativeSelectOption value="annual">Annual</NativeSelectOption>
          <NativeSelectOption value="biennial" disabled>
            Every two years (unavailable)
          </NativeSelectOption>
        </NativeSelect>
      </ComponentPreview>
      <ComponentPreview title="Grouped Options">
        <NativeSelect aria-label="Select a region">
          <NativeSelectOption value="">Choose a deployment region</NativeSelectOption>
          <NativeSelectOptGroup label="North America">
            <NativeSelectOption value="us-east">US East</NativeSelectOption>
            <NativeSelectOption value="us-west">US West</NativeSelectOption>
            <NativeSelectOption value="ca-central">Canada Central</NativeSelectOption>
          </NativeSelectOptGroup>
          <NativeSelectOptGroup label="Europe">
            <NativeSelectOption value="eu-central">EU Central</NativeSelectOption>
            <NativeSelectOption value="eu-west">EU West</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>
      </ComponentPreview>
      <ComponentPreview title="Multiple Selection">
        <div className="grid w-full max-w-sm gap-2">
          <label htmlFor="dietary-preferences" className="text-sm font-medium">
            Dietary preferences
          </label>
          <NativeSelect
            id="dietary-preferences"
            multiple
            defaultValue={["vegetarian", "gluten-free"]}
            aria-describedby="dietary-preferences-hint"
          >
            <NativeSelectOption value="vegetarian">Vegetarian</NativeSelectOption>
            <NativeSelectOption value="vegan">Vegan</NativeSelectOption>
            <NativeSelectOption value="gluten-free">Gluten-free</NativeSelectOption>
            <NativeSelectOption value="halal">Halal</NativeSelectOption>
            <NativeSelectOption value="kosher">Kosher</NativeSelectOption>
            <NativeSelectOption value="dairy-free">Dairy-free</NativeSelectOption>
          </NativeSelect>
          <p id="dietary-preferences-hint" className="text-xs text-muted-foreground">
            Select multiple options. Use Ctrl or Command while choosing.
          </p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Compact Select">
        <NativeSelect aria-label="Select a time zone" size="sm">
          <NativeSelectOption value="utc">UTC</NativeSelectOption>
          <NativeSelectOption value="pst">Pacific Time</NativeSelectOption>
          <NativeSelectOption value="cet">Central European Time</NativeSelectOption>
          <NativeSelectOption value="jst">Japan Standard Time</NativeSelectOption>
        </NativeSelect>
      </ComponentPreview>
      <ComponentPreview title="Controlled Select" layout="field">
        <div className="grid w-full max-w-sm gap-2">
          <label htmlFor="billing-interval" className="text-sm font-medium">
            Billing interval
          </label>
          <NativeSelect id="billing-interval" value={interval} onChange={(event) => setInterval(event.target.value)}>
            <NativeSelectOption value="monthly">Monthly</NativeSelectOption>
            <NativeSelectOption value="annual">Annual</NativeSelectOption>
          </NativeSelect>
          <output aria-live="polite" className="text-xs text-muted-foreground">
            Current interval: {interval}
          </output>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Full Width" layout="field">
        <div className="grid w-full max-w-sm gap-2">
          <label htmlFor="workspace-region" className="text-sm font-medium">
            Workspace region
          </label>
          <NativeSelect id="workspace-region" fullWidth defaultValue="us">
            <NativeSelectOption value="us">United States</NativeSelectOption>
            <NativeSelectOption value="eu">European Union</NativeSelectOption>
            <NativeSelectOption value="apac">Asia Pacific</NativeSelectOption>
          </NativeSelect>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Select in a Field">
        <div className="grid w-full max-w-sm gap-2">
          <label htmlFor="region-native-select" className="text-sm font-medium">
            Default region
          </label>
          <NativeSelect id="region-native-select" defaultValue="">
            <NativeSelectOption value="">Choose a region</NativeSelectOption>
            <NativeSelectOption value="us">United States</NativeSelectOption>
            <NativeSelectOption value="uk">United Kingdom</NativeSelectOption>
            <NativeSelectOption value="sg">Singapore</NativeSelectOption>
          </NativeSelect>
          <p id="region-native-select-hint" className="text-xs text-muted-foreground">
            New projects will be created in this region.
          </p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Disabled Select">
        <div className="grid w-full max-w-sm gap-2">
          <label htmlFor="locked-plan" className="text-sm font-medium">
            Workspace plan
          </label>
          <NativeSelect id="locked-plan" disabled defaultValue="enterprise">
            <NativeSelectOption value="enterprise">Enterprise</NativeSelectOption>
          </NativeSelect>
          <p className="text-xs text-muted-foreground">Only workspace owners can change the current plan.</p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Invalid Select">
        <div className="grid w-full max-w-sm gap-2">
          <label htmlFor="required-team" className="text-sm font-medium">
            Team assignment <span className="text-destructive">*</span>
          </label>
          <NativeSelect id="required-team" aria-invalid="true" aria-describedby="required-team-error" defaultValue="">
            <NativeSelectOption value="">Select a team</NativeSelectOption>
            <NativeSelectOption value="platform">Platform</NativeSelectOption>
            <NativeSelectOption value="operations">Operations</NativeSelectOption>
          </NativeSelect>
          <p id="required-team-error" className="text-xs text-destructive">
            Choose a team before saving this member.
          </p>
        </div>
      </ComponentPreview>
    </>
  );
}
