"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Disclosure, DisclosureGroup, DisclosurePanel, DisclosureTrigger } from "@/components/roseui/disclosure-group";

export function DisclosureGroupExamples() {
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set(["access"]));

  return (
    <>
      <ComponentPreview title="Single Expansion" layout="panel">
        <DisclosureGroup
          allowsMultipleExpanded={false}
          expandedKeys={expandedKeys}
          onExpandedChange={(keys) => setExpandedKeys(new Set([...keys].map(String)))}
          className="w-full max-w-xl"
        >
          <Disclosure id="access">
            <DisclosureTrigger>Access control</DisclosureTrigger>
            <DisclosurePanel>Choose who can view and edit this workspace.</DisclosurePanel>
          </Disclosure>
          <Disclosure id="notifications">
            <DisclosureTrigger>Notifications</DisclosureTrigger>
            <DisclosurePanel>Set which product and security updates your team receives.</DisclosurePanel>
          </Disclosure>
          <Disclosure id="billing">
            <DisclosureTrigger>Billing</DisclosureTrigger>
            <DisclosurePanel>Manage payment methods and invoice details.</DisclosurePanel>
          </Disclosure>
        </DisclosureGroup>
      </ComponentPreview>
      <ComponentPreview title="Multiple Expansion" layout="panel">
        <DisclosureGroup allowsMultipleExpanded className="w-full max-w-xl">
          <Disclosure id="profile">
            <DisclosureTrigger>Profile</DisclosureTrigger>
            <DisclosurePanel>Update your name and contact information.</DisclosurePanel>
          </Disclosure>
          <Disclosure id="security">
            <DisclosureTrigger>Security</DisclosureTrigger>
            <DisclosurePanel>Configure two-factor authentication and active sessions.</DisclosurePanel>
          </Disclosure>
        </DisclosureGroup>
      </ComponentPreview>
    </>
  );
}
