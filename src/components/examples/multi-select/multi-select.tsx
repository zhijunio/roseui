"use client";

import { Label } from "react-aria-components/Label";

import { ComponentPreview } from "@/components/docs/component-preview";
import { MultiSelect, MultiSelectContent, MultiSelectItem } from "@/components/ui/multi-select";

const workstreams = [
  { id: "accounts", name: "Accounts" },
  { id: "billing", name: "Billing" },
  { id: "onboarding", name: "Onboarding" },
  { id: "support", name: "Support" },
  { id: "integrations", name: "Integrations" },
];

const teamMembers = [
  { id: "ava", name: "Ava Chen" },
  { id: "noah", name: "Noah Patel" },
  { id: "mia", name: "Mia Torres" },
  { id: "eli", name: "Eli Brooks" },
];

const notificationChannels = [
  { id: "email", name: "Email" },
  { id: "slack", name: "Slack" },
  { id: "push", name: "Push notifications" },
  { id: "sms", name: "SMS (unavailable)", disabled: true },
];

export function MultiSelectExamples() {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <ComponentPreview title="Search and filter">
        <div className="w-full max-w-lg">
          <MultiSelect
            aria-label="Workstreams"
            name="workstreams"
            placeholder="Choose workstreams"
            searchPlaceholder="Search workstreams"
          >
            <Label>Workstreams</Label>
            <MultiSelectContent items={workstreams}>
              {(item) => (
                <MultiSelectItem id={item.id} textValue={item.name}>
                  {item.name}
                </MultiSelectItem>
              )}
            </MultiSelectContent>
          </MultiSelect>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Default Selection">
        <div className="w-full max-w-lg">
          <MultiSelect aria-label="Reviewers" name="reviewers" searchPlaceholder="Search reviewers">
            <Label>Reviewers</Label>
            <MultiSelectContent items={teamMembers}>
              {(item) => (
                <MultiSelectItem id={item.id} textValue={item.name}>
                  {item.name}
                </MultiSelectItem>
              )}
            </MultiSelectContent>
          </MultiSelect>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Disabled options">
        <div className="w-full max-w-lg">
          <MultiSelect
            aria-label="Notification channels"
            name="notification-channels"
            searchPlaceholder="Search channels"
          >
            <Label>Notification channels</Label>
            <MultiSelectContent items={notificationChannels}>
              {(item) => (
                <MultiSelectItem id={item.id} textValue={item.name} isDisabled={item.disabled}>
                  {item.name}
                </MultiSelectItem>
              )}
            </MultiSelectContent>
          </MultiSelect>
        </div>
      </ComponentPreview>
    </div>
  );
}
