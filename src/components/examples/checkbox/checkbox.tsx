"use client";

import { type FormEvent, useId, useState } from "react";

import {
  Building as IconBuilding,
  ChartBar as IconChartBar,
  CreditCard as IconCreditCard,
  Folder as IconFolder,
  Info as IconInfoCircle,
  Key as IconKey,
  Settings as IconSettings,
  ShieldCheck as IconShieldCheck,
  Star as IconStarFilled,
  User as IconUser,
  Users as IconUsers,
} from "lucide-react";
import { Focusable } from "react-aria-components/Focusable";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckboxButton, CheckboxField } from "@/components/ui/checkbox";
import { HintText } from "@/components/ui/hint-text";
import { LabeledCheckbox } from "@/components/ui/labeled-checkbox";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

export function CheckboxExamples() {
  return (
    <>
      <CheckboxUsageExamples />
      <CheckboxLayoutExamples />
    </>
  );
}

export function CheckboxLayoutExamples() {
  const id = useId();
  const [includeAuditLog, setIncludeAuditLog] = useState(true);
  const [selectedProjects, setSelectedProjects] = useState<string[]>(["billing"]);

  return (
    <>
      <ComponentPreview title="Shape Variants" layout="stack" exampleLabels={["Color and shape", "Task list"]}>
        <div className="flex flex-wrap gap-5">
          <CheckboxField defaultSelected>
            <CheckboxButton className="items-center gap-2 text-sm">Primary selection</CheckboxButton>
          </CheckboxField>
          <CheckboxField defaultSelected>
            <CheckboxButton
              className="items-center gap-2 text-sm"
              boxClassName="group-data-[selected]/checkbox-button:border-success group-data-[selected]/checkbox-button:bg-success"
            >
              Approved
            </CheckboxButton>
          </CheckboxField>
          <CheckboxField defaultSelected>
            <CheckboxButton className="items-center gap-2 text-sm" boxClassName="rounded-full">
              Circular selection
            </CheckboxButton>
          </CheckboxField>
          <CheckboxField defaultSelected>
            <CheckboxButton className="items-center gap-2 text-sm" indicator={<IconStarFilled fill="currentColor" />}>
              Custom indicator
            </CheckboxButton>
          </CheckboxField>
        </div>
        <div className="grid w-full max-w-sm gap-3">
          {["Prepare release notes", "Review open issues", "Notify project owners"].map((label, index) => (
            <CheckboxField key={label} defaultSelected={index === 0}>
              <CheckboxButton className="items-center gap-3 text-sm" boxClassName="rounded-full">
                <span className={index === 0 ? "text-muted-foreground line-through" : ""}>{label}</span>
              </CheckboxButton>
            </CheckboxField>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview title="Label Layouts" layout="stack" exampleLabels={["Description and help", "Inline label"]}>
        <div className="grid w-full max-w-md gap-4">
          <CheckboxField defaultSelected>
            <CheckboxButton className="items-start gap-3 rounded-lg border p-4">
              <span className="grid gap-1">
                <span className="text-sm font-medium">Security notifications</span>
                <span className="text-xs text-muted-foreground">Receive alerts when workspace access changes.</span>
              </span>
            </CheckboxButton>
          </CheckboxField>
          <>
            <div className="flex items-center gap-2">
              <CheckboxField id={`${id}-retention`}>
                <CheckboxButton className="items-center gap-2 text-sm">Enable extended retention</CheckboxButton>
              </CheckboxField>
              <TooltipTrigger delay={0}>
                <Focusable>
                  <button
                    type="button"
                    aria-label="About extended retention"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <IconInfoCircle className="size-4" />
                  </button>
                </Focusable>
                <Tooltip>Retained data follows your organization policy.</Tooltip>
              </TooltipTrigger>
            </div>
          </>
        </div>
        <div className="grid w-full max-w-sm gap-3">
          <CheckboxField defaultSelected>
            <CheckboxButton className="items-center gap-2 text-sm">
              Include archived records
              <span
                title="Archived items stay available in search"
                className="cursor-help text-muted-foreground"
                aria-label="Help about archived records"
              >
                ⓘ
              </span>
            </CheckboxButton>
          </CheckboxField>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Labeled Checkboxes">
        <div className="grid w-full max-w-xl gap-3">
          <LabeledCheckbox
            checked={includeAuditLog}
            onCheckedChange={(checked) => setIncludeAuditLog(checked === true)}
            label="Include audit log"
            description="Keep an export of changes made to this workspace."
          />
          <LabeledCheckbox label="Notify workspace owners" description="Send a summary when the export is ready." />
        </div>
        <div className="grid w-full gap-4 md:grid-cols-2">
          <fieldset className="grid gap-2 rounded-xl border p-4">
            <legend className="px-1 text-sm font-medium">Workspace access</legend>
            <LabeledCheckbox label="Billing" description="Invoices, plans, and payment settings" defaultChecked />
            <LabeledCheckbox label="Audit logs" description="Security and access history" />
          </fieldset>
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              { label: "Projects", icon: IconBuilding },
              { label: "Security", icon: IconShieldCheck },
              { label: "API keys", icon: IconKey },
            ].map(({ label, icon: Icon }) => (
              <LabeledCheckbox
                key={label}
                label={
                  <span className="grid justify-items-center gap-2 text-center">
                    <Icon className="size-5 text-primary" />
                    {label}
                  </span>
                }
                containerClassName="relative min-h-32 flex-col items-center justify-center p-4 pt-8"
                className="absolute left-3 top-3 mt-0"
              />
            ))}
          </div>
        </div>
        <div className="w-full max-w-md">
          <LabeledCheckbox
            label="Enable team mentions"
            description="Allow teammates to notify you in project discussions."
            defaultChecked
          />
        </div>
        <div className="w-full max-w-md divide-y rounded-xl border px-4">
          {["Email notifications", "Desktop notifications", "Weekly digest"].map((label, index) => (
            <CheckboxField key={label} defaultSelected={index === 0}>
              <CheckboxButton className="w-full flex-row-reverse items-center justify-between gap-4 py-3 text-sm">
                {label}
              </CheckboxButton>
            </CheckboxField>
          ))}
        </div>
        <div className="grid w-full max-w-md gap-2">
          {[
            { label: "Billing", icon: IconCreditCard },
            { label: "Workspace", icon: IconBuilding },
            { label: "Security", icon: IconShieldCheck },
          ].map(({ label, icon: Icon }, index) => (
            <LabeledCheckbox
              key={label}
              label={
                <span className="flex items-center gap-2">
                  <Icon className="size-4 text-muted-foreground" />
                  {label}
                </span>
              }
              description="Manage access for this section"
              defaultChecked={index === 0}
              containerClassName="items-center p-3"
              className="mt-0"
            />
          ))}
        </div>
        <div className="grid w-full max-w-md grid-cols-2 gap-3">
          {["Product", "Engineering", "Operations", "Design"].map((label, index) => (
            <CheckboxField key={label} defaultSelected={index === 0}>
              <CheckboxButton
                className="relative min-h-24 place-items-center rounded-xl border p-3 text-sm data-[selected]:bg-primary/[0.04]"
                boxClassName="absolute top-3 right-3"
              >
                {label}
              </CheckboxButton>
            </CheckboxField>
          ))}
        </div>
        <div className="grid w-full max-w-md grid-cols-2 gap-3">
          {[
            { label: "Analytics", icon: IconChartBar },
            { label: "Projects", icon: IconFolder },
            { label: "Members", icon: IconUsers },
            { label: "Settings", icon: IconSettings },
          ].map(({ label, icon: Icon }) => (
            <LabeledCheckbox
              key={label}
              label={
                <span className="grid justify-items-center gap-2 text-center">
                  <Icon className="size-5 text-primary" />
                  {label}
                </span>
              }
              containerClassName="min-h-28 flex-col items-center justify-center p-3"
              className="absolute top-3 right-3 mt-0"
            />
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview title="Checkbox Content">
        <div className="grid w-full max-w-xl gap-3 sm:grid-cols-2">
          <CheckboxField defaultSelected>
            <CheckboxButton
              className="relative min-h-24 items-end rounded-xl border bg-muted/40 p-4"
              boxClassName="absolute top-3 right-3"
            >
              <span>
                <span className="block text-sm font-medium">Incident response</span>
                <span className="text-xs text-muted-foreground">Project · 8 members</span>
              </span>
            </CheckboxButton>
          </CheckboxField>
          <LabeledCheckbox
            label={
              <span className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    <IconUser className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <span>
                  <span className="block font-medium">Morgan Lee</span>
                  <span className="text-xs text-muted-foreground">Workspace owner</span>
                </span>
              </span>
            }
            containerClassName="items-center"
          />
        </div>
        <div className="grid w-full max-w-sm gap-3">
          <CheckboxField
            checked={selectedProjects.length === 3 ? true : selectedProjects.length > 0 ? "indeterminate" : false}
            onCheckedChange={(checked) => setSelectedProjects(checked ? ["billing", "identity", "analytics"] : [])}
          >
            <CheckboxButton className="w-full items-center gap-3 border-b pb-3 text-sm font-medium">
              Project permissions
            </CheckboxButton>
          </CheckboxField>
          <div className="grid gap-3 pl-7">
            {[
              { id: "billing", label: "Billing" },
              { id: "identity", label: "Identity" },
              { id: "analytics", label: "Analytics" },
            ].map((project) => (
              <CheckboxField
                key={project.id}
                checked={selectedProjects.includes(project.id)}
                onCheckedChange={(checked) =>
                  setSelectedProjects((current) =>
                    checked ? [...current, project.id] : current.filter((value) => value !== project.id),
                  )
                }
              >
                <CheckboxButton className="items-center gap-3 text-sm">{project.label}</CheckboxButton>
              </CheckboxField>
            ))}
          </div>
        </div>
        <div className="grid w-full gap-4">
          <div className="grid max-w-xl gap-2 sm:grid-cols-2">
            <LabeledCheckbox
              label={
                <span className="flex items-center gap-2">
                  <IconCreditCard className="size-4" />
                  Corporate card ending in 2048
                </span>
              }
              description="Default payment method"
              defaultChecked
              containerClassName="items-center"
            />
            <LabeledCheckbox
              label={
                <span className="flex items-center gap-2">
                  <IconBuilding className="size-4" />
                  Invoice billing
                </span>
              }
              description="Net 30 · Finance team"
              containerClassName="items-center"
            />
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <CheckboxField defaultSelected>
              <CheckboxButton className="items-center gap-2 text-sm">
                Email receipts <Badge variant="secondary">Recommended</Badge>
              </CheckboxButton>
            </CheckboxField>
            <CheckboxField>
              <CheckboxButton className="items-center gap-2 text-sm">Send weekly summary</CheckboxButton>
            </CheckboxField>
            <CheckboxField>
              <CheckboxButton className="items-center gap-2 text-sm">Include archived projects</CheckboxButton>
            </CheckboxField>
          </div>
        </div>
        <fieldset className="grid w-full max-w-md gap-3 rounded-xl border bg-muted/20 p-4">
          <legend className="px-1 text-sm font-medium">Access permissions</legend>
          {["View reports", "Export data", "Manage members"].map((label, index) => (
            <CheckboxField key={label} defaultSelected={index === 0}>
              <CheckboxButton className="items-center gap-3 text-sm">{label}</CheckboxButton>
            </CheckboxField>
          ))}
        </fieldset>
        <div className="flex flex-wrap items-center gap-4">
          {[
            { label: "Email", badge: "Recommended" },
            { label: "SMS", badge: "Optional" },
            { label: "Push", badge: "New" },
          ].map(({ label, badge }) => (
            <CheckboxField key={label}>
              <CheckboxButton className="items-center gap-2 text-sm">
                <span>{label}</span>
                <span className="rounded bg-muted px-1.5 py-0.5 text-[10px]">{badge}</span>
              </CheckboxButton>
            </CheckboxField>
          ))}
        </div>
        <div className="grid w-full max-w-sm gap-3">
          {[
            { label: "Billing alerts", badge: "REQUIRED" },
            { label: "Product updates", badge: "OPTIONAL" },
          ].map(({ label, badge }) => (
            <CheckboxField key={label} defaultSelected={badge === "REQUIRED"}>
              <CheckboxButton className="w-full items-center justify-between gap-4 text-sm">
                <span>{label}</span>
                <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-muted-foreground">
                  {badge}
                </span>
              </CheckboxButton>
            </CheckboxField>
          ))}
        </div>
      </ComponentPreview>
    </>
  );
}

const preferences = [
  { id: "billing", label: "Billing updates" },
  { id: "security", label: "Security alerts" },
  { id: "product", label: "Product news" },
];

export function CheckboxUsageExamples() {
  const id = useId();
  const [selected, setSelected] = useState<string[]>(["security"]);
  const [submitted, setSubmitted] = useState(false);
  const allSelected = selected.length === preferences.length;
  const someSelected = selected.length > 0 && !allSelected;

  function togglePreference(preferenceId: string, checked: boolean) {
    setSelected((current) => (checked ? [...current, preferenceId] : current.filter((item) => item !== preferenceId)));
  }

  function submitRequiredForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <ComponentPreview title="Default Usage">
        <div className="grid gap-4">
          <CheckboxField>
            <CheckboxButton className="items-center gap-3 text-sm">Remember this device</CheckboxButton>
          </CheckboxField>
          <CheckboxField defaultSelected>
            <CheckboxButton className="items-center gap-3 text-sm">Receive product updates</CheckboxButton>
          </CheckboxField>
        </div>

        <div className="grid w-full max-w-sm gap-3">
          <CheckboxField
            checked={allSelected ? true : someSelected ? "indeterminate" : false}
            onCheckedChange={(checked) => setSelected(checked ? preferences.map((item) => item.id) : [])}
          >
            <CheckboxButton className="w-full items-center gap-3 border-b pb-3 text-sm font-medium">
              Notification preferences
            </CheckboxButton>
          </CheckboxField>
          <div className="grid gap-3 pl-7">
            {preferences.map((preference) => (
              <CheckboxField
                key={preference.id}
                checked={selected.includes(preference.id)}
                onCheckedChange={(checked) => togglePreference(preference.id, checked === true)}
              >
                <CheckboxButton className="items-center gap-3 text-sm">{preference.label}</CheckboxButton>
              </CheckboxField>
            ))}
          </div>
        </div>

        <CheckboxField disabled checked>
          <CheckboxButton className="items-center gap-3 text-sm data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60">
            Required policy accepted
          </CheckboxButton>
        </CheckboxField>

        <div className="grid w-full max-w-sm gap-2">
          <CheckboxField id={`${id}-terms`} isInvalid>
            <CheckboxButton className="items-center gap-3 text-sm">Accept the terms</CheckboxButton>
          </CheckboxField>
          <HintText variant="error">You must accept the terms to continue.</HintText>
        </div>

        <fieldset className="grid w-full max-w-sm gap-3">
          <legend className="text-sm font-medium">Notification preferences</legend>
          {["Product updates", "Security alerts", "Weekly summary"].map((label, index) => (
            <CheckboxField key={label} defaultSelected={index === 1}>
              <CheckboxButton className="items-center gap-3 text-sm">{label}</CheckboxButton>
            </CheckboxField>
          ))}
        </fieldset>
      </ComponentPreview>
      <ComponentPreview title="Read Only" layout="stack">
        <CheckboxField readOnly defaultSelected>
          <CheckboxButton className="items-start gap-3 text-sm data-[disabled]:cursor-not-allowed data-[readonly]:cursor-default">
            <span className="grid gap-1">
              <span className="font-medium">Verified workspace policy</span>
              <span className="text-xs text-muted-foreground">This setting is managed by your organization.</span>
            </span>
          </CheckboxButton>
        </CheckboxField>
      </ComponentPreview>
      <ComponentPreview title="Form Integration" layout="field">
        <form className="grid w-full max-w-sm gap-3" onSubmit={submitRequiredForm}>
          <CheckboxField required name="terms" value="accepted">
            <CheckboxButton className="items-start gap-3 text-sm">
              I agree to the terms and privacy policy.
            </CheckboxButton>
          </CheckboxField>
          <Button type="submit" size="sm" className="w-fit">
            Continue
          </Button>
          {submitted && (
            <p role="status" className="text-xs text-muted-foreground">
              Agreement submitted.
            </p>
          )}
        </form>
      </ComponentPreview>
    </>
  );
}
