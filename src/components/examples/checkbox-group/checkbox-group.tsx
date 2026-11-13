"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { CheckboxButton, CheckboxField, CheckboxGroup } from "@/components/ui/checkbox";
import { FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";

export function CheckboxGroupExamples() {
  const [notifications, setNotifications] = useState<string[]>(["product"]);
  const [features, setFeatures] = useState<string[]>(["audit"]);

  return (
    <>
      <ComponentPreview title="Checkbox Group" layout="field">
        <CheckboxGroup aria-label="Notification settings" name="notifications" defaultValue={["security"]}>
          <FieldLabel>Notifications</FieldLabel>
          <CheckboxField value="product">
            <CheckboxButton>Product updates</CheckboxButton>
          </CheckboxField>
          <CheckboxField value="security">
            <CheckboxButton>Security alerts</CheckboxButton>
          </CheckboxField>
          <CheckboxField value="billing">
            <CheckboxButton>Billing notices</CheckboxButton>
          </CheckboxField>
        </CheckboxGroup>
      </ComponentPreview>

      <ComponentPreview title="Controlled Selection" layout="field">
        <CheckboxGroup
          aria-label="Workspace features"
          name="features"
          value={features}
          onChange={setFeatures}
          className="max-w-sm"
        >
          <FieldLabel>Workspace features</FieldLabel>
          <FieldDescription>Choose the features your team can use.</FieldDescription>
          <CheckboxField value="audit">
            <CheckboxButton>Audit log</CheckboxButton>
          </CheckboxField>
          <CheckboxField value="sso">
            <CheckboxButton>Single sign-on</CheckboxButton>
          </CheckboxField>
          <CheckboxField value="exports">
            <CheckboxButton>Data exports</CheckboxButton>
          </CheckboxField>
          <FieldDescription>Selected: {features.length > 0 ? features.join(", ") : "None"}</FieldDescription>
        </CheckboxGroup>
      </ComponentPreview>

      <ComponentPreview title="Required and Validation" layout="field">
        <CheckboxGroup
          aria-label="Terms"
          isRequired
          isInvalid={notifications.length === 0}
          value={notifications}
          onChange={setNotifications}
          className="max-w-sm"
        >
          <FieldLabel>Notification preferences</FieldLabel>
          <FieldDescription>Select at least one preference.</FieldDescription>
          <CheckboxField value="product">
            <CheckboxButton>Product announcements</CheckboxButton>
          </CheckboxField>
          <CheckboxField value="security">
            <CheckboxButton>Security notifications</CheckboxButton>
          </CheckboxField>
          <FieldError>{notifications.length === 0 ? "Select at least one option." : null}</FieldError>
        </CheckboxGroup>
      </ComponentPreview>

      <ComponentPreview title="Disabled Option" layout="field">
        <CheckboxGroup aria-label="Permission settings" defaultValue={["read"]}>
          <FieldLabel>Project permissions</FieldLabel>
          <CheckboxField value="read">
            <CheckboxButton>Read projects</CheckboxButton>
          </CheckboxField>
          <CheckboxField value="write" isDisabled>
            <CheckboxButton>Modify projects (admin only)</CheckboxButton>
          </CheckboxField>
          <CheckboxField value="invite">
            <CheckboxButton>Invite members</CheckboxButton>
          </CheckboxField>
        </CheckboxGroup>
      </ComponentPreview>
    </>
  );
}
