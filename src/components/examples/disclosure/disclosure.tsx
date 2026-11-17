"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Disclosure, DisclosurePanel, DisclosureTrigger } from "@/components/roseui/disclosure-group";

export function DisclosureExamples() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <ComponentPreview title="Disclosure">
        <Disclosure isExpanded={expanded} onExpandedChange={setExpanded} className="w-full max-w-xl">
          <DisclosureTrigger>Workspace settings</DisclosureTrigger>
          <DisclosurePanel>Manage your workspace name, member access, and notification preferences.</DisclosurePanel>
        </Disclosure>
      </ComponentPreview>
      <ComponentPreview title="Initially Expanded" layout="panel">
        <Disclosure defaultExpanded className="w-full max-w-xl">
          <DisclosureTrigger>Billing details</DisclosureTrigger>
          <DisclosurePanel>Your next invoice is scheduled for the first day of the next billing cycle.</DisclosurePanel>
        </Disclosure>
      </ComponentPreview>
      <ComponentPreview title="Disabled">
        <Disclosure disabled className="w-full max-w-xl">
          <DisclosureTrigger>Workspace policy</DisclosureTrigger>
          <DisclosurePanel>This section is unavailable to your account.</DisclosurePanel>
        </Disclosure>
      </ComponentPreview>
    </>
  );
}
