"use client";

import { ComponentPreview } from "@/components/composite/component-preview";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { HintText } from "@/components/ui/hint-text";
import { Label } from "@/components/ui/label";
import { LabeledCheckbox } from "@/components/composite/labeled-checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IconBuilding, IconChartBar, IconCreditCard, IconFolder, IconInfoCircle, IconKey, IconSettings, IconShieldCheck, IconStarFilled, IconUser, IconUsers } from "@tabler/icons-react";
import { useId, useState, type FormEvent } from "react";

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
      <ComponentPreview previewId="checkbox-01" title="Shape Variants" layout="stack" exampleLabels={["Color and shape", "Task list"]}>
        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox defaultChecked className="data-checked:border-primary data-checked:bg-primary" />
            Primary selection
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox defaultChecked className="data-checked:border-success data-checked:bg-success" />
            Approved
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox defaultChecked className="rounded-full" />
            Circular selection
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox defaultChecked indicator={<IconStarFilled />} />
            Custom indicator
          </label>
        </div>
        <div className="grid w-full max-w-sm gap-3">
          {["Prepare release notes", "Review open issues", "Notify project owners"].map((label, index) => (
            <label key={label} className="flex items-center gap-3 text-sm">
              <Checkbox defaultChecked={index === 0} className="rounded-full" />
              <span className={index === 0 ? "text-muted-foreground line-through" : ""}>{label}</span>
            </label>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="checkbox-02" title="Label Layouts" layout="stack" exampleLabels={["Description and help", "Inline label"]}>
        <div className="grid w-full max-w-md gap-4">
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4">
            <Checkbox defaultChecked aria-label="Enable security notifications" />
            <span className="grid gap-1">
              <span className="text-sm font-medium">Security notifications</span>
              <span className="text-xs text-muted-foreground">Receive alerts when workspace access changes.</span>
            </span>
          </label>
          <TooltipProvider>
            <div className="flex items-center gap-2">
              <Checkbox id={`${id}-retention`} />
              <Label htmlFor={`${id}-retention`}>Enable extended retention</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label="About extended retention"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <IconInfoCircle className="size-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Retained data follows your organization policy.</TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
        <div className="grid w-full max-w-sm gap-3">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox defaultChecked />
            Include archived records
            <span
              title="Archived items stay available in search"
              className="cursor-help text-muted-foreground"
              aria-label="Help about archived records"
            >
              ⓘ
            </span>
          </label>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="checkbox-03" title="Labeled Checkboxes">
        <div className="grid w-full max-w-xl gap-3">
          <LabeledCheckbox
            checked={includeAuditLog}
            onCheckedChange={(checked) => setIncludeAuditLog(checked === true)}
            label="Include audit log"
            description="Keep an export of changes made to this workspace."
          />
          <LabeledCheckbox
            label="Notify workspace owners"
            description="Send a summary when the export is ready."
          />
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
            <label key={label} className="flex items-center justify-between gap-4 py-3 text-sm">
              <span>{label}</span>
              <Checkbox aria-label={label} defaultChecked={index === 0} />
            </label>
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
            <label
              key={label}
              className="relative grid min-h-24 place-items-center rounded-xl border p-3 text-sm"
            >
              <Checkbox aria-label={`Select ${label}`} defaultChecked={index === 0} className="absolute top-3 right-3" />
              {label}
            </label>
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

      <ComponentPreview previewId="checkbox-04" title="Checkbox Content">
        <div className="grid w-full max-w-xl gap-3 sm:grid-cols-2">
          <label className="relative flex min-h-24 cursor-pointer items-end rounded-xl border bg-muted/40 p-4">
            <Checkbox
              defaultChecked
              aria-label="Select incident response project"
              className="absolute top-3 right-3"
            />
            <span>
              <span className="block text-sm font-medium">Incident response</span>
              <span className="text-xs text-muted-foreground">Project · 8 members</span>
            </span>
          </label>
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
          <label className="flex items-center gap-3 border-b pb-3 text-sm font-medium">
            <Checkbox
              checked={
                selectedProjects.length === 3 ? true : selectedProjects.length > 0 ? "indeterminate" : false
              }
              onCheckedChange={(checked) =>
                setSelectedProjects(checked ? ["billing", "identity", "analytics"] : [])
              }
              aria-label="Select all projects"
            />
            <span>Project permissions</span>
          </label>
          <div className="grid gap-3 pl-7">
            {[
              { id: "billing", label: "Billing" },
              { id: "identity", label: "Identity" },
              { id: "analytics", label: "Analytics" },
            ].map((project) => (
              <label key={project.id} className="flex items-center gap-3 text-sm">
                <Checkbox
                  checked={selectedProjects.includes(project.id)}
                  onCheckedChange={(checked) =>
                    setSelectedProjects((current) =>
                      checked ? [...current, project.id] : current.filter((value) => value !== project.id),
                    )
                  }
                />
                <span>{project.label}</span>
              </label>
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
            <label className="flex items-center gap-2 text-sm">
              <Checkbox defaultChecked />
              Email receipts <Badge variant="secondary">Recommended</Badge>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox />
              Send weekly summary
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox />
              Include archived projects
            </label>
          </div>
        </div>
        <fieldset className="grid w-full max-w-md gap-3 rounded-xl border bg-muted/20 p-4">
          <legend className="px-1 text-sm font-medium">Access permissions</legend>
          {["View reports", "Export data", "Manage members"].map((label, index) => (
            <label key={label} className="flex items-center gap-3 text-sm">
              <Checkbox defaultChecked={index === 0} />
              {label}
            </label>
          ))}
        </fieldset>
        <div className="flex flex-wrap items-center gap-4">
          {[
            { label: "Email", badge: "Recommended" },
            { label: "SMS", badge: "Optional" },
            { label: "Push", badge: "New" },
          ].map(({ label, badge }) => (
            <label key={label} className="flex items-center gap-2 text-sm">
              <Checkbox />
              <span>{label}</span>
              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px]">{badge}</span>
            </label>
          ))}
        </div>
        <div className="grid w-full max-w-sm gap-3">
          {[
            { label: "Billing alerts", badge: "REQUIRED" },
            { label: "Product updates", badge: "OPTIONAL" },
          ].map(({ label, badge }) => (
            <label key={label} className="flex items-center justify-between gap-4 text-sm">
              <span className="flex items-center gap-2">
                <Checkbox defaultChecked={badge === "REQUIRED"} />
                {label}
              </span>
              <span className="rounded bg-muted px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-muted-foreground">
                {badge}
              </span>
            </label>
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
    setSelected((current) =>
      checked ? [...current, preferenceId] : current.filter((item) => item !== preferenceId),
    );
  }

  function submitRequiredForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <ComponentPreview previewId="checkbox-05" title="Default Usage">
        <div className="grid gap-4">
          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <Checkbox aria-label="Remember this device" />
            <span>Remember this device</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <Checkbox defaultChecked aria-label="Receive product updates" />
            <span>Receive product updates</span>
          </label>
        </div>

        <div className="grid w-full max-w-sm gap-3">
          <label className="flex cursor-pointer items-center gap-3 border-b pb-3 text-sm font-medium">
            <Checkbox
              checked={allSelected ? true : someSelected ? "indeterminate" : false}
              onCheckedChange={(checked) => setSelected(checked ? preferences.map((item) => item.id) : [])}
              aria-label="Select all notification preferences"
            />
            <span>Notification preferences</span>
          </label>
          <div className="grid gap-3 pl-7">
            {preferences.map((preference) => (
              <label key={preference.id} className="flex cursor-pointer items-center gap-3 text-sm">
                <Checkbox
                  checked={selected.includes(preference.id)}
                  onCheckedChange={(checked) => togglePreference(preference.id, checked === true)}
                  aria-label={preference.label}
                />
                <span>{preference.label}</span>
              </label>
            ))}
          </div>
        </div>

        <label className="flex cursor-not-allowed items-center gap-3 text-sm opacity-60">
          <Checkbox disabled checked aria-label="Required policy accepted" />
          <span>Required policy accepted</span>
        </label>

        <div className="grid w-full max-w-sm gap-2">
          <div className="flex items-center gap-3">
            <Checkbox id={`${id}-terms`} aria-invalid="true" />
            <Label htmlFor={`${id}-terms`}>Accept the terms</Label>
          </div>
          <HintText variant="error">You must accept the terms to continue.</HintText>
        </div>

        <fieldset className="grid w-full max-w-sm gap-3">
          <legend className="text-sm font-medium">Notification preferences</legend>
          {["Product updates", "Security alerts", "Weekly summary"].map((label, index) => (
            <label key={label} className="flex items-center gap-3 text-sm">
              <Checkbox defaultChecked={index === 1} />
              {label}
            </label>
          ))}
        </fieldset>
      </ComponentPreview>
      <ComponentPreview previewId="checkbox-06"
        title="Read Only"

        layout="stack"
      >
        <label className="flex cursor-default items-start gap-3 text-sm">
          <Checkbox readOnly defaultChecked aria-label="Verified workspace policy" />
          <span className="grid gap-1">
            <span className="font-medium">Verified workspace policy</span>
            <span className="text-xs text-muted-foreground">This setting is managed by your organization.</span>
          </span>
        </label>
      </ComponentPreview>
      <ComponentPreview previewId="checkbox-07"
        title="Form Integration"

        layout="field"
      >
        <form className="grid w-full max-w-sm gap-3" onSubmit={submitRequiredForm}>
          <label className="flex cursor-pointer items-start gap-3 text-sm">
            <Checkbox required name="terms" value="accepted" aria-label="Accept the terms and privacy policy" />
            <span>I agree to the terms and privacy policy.</span>
          </label>
          <Button type="submit" size="sm" className="w-fit">
            Continue
          </Button>
          {submitted && <p role="status" className="text-xs text-muted-foreground">Agreement submitted.</p>}
        </form>
      </ComponentPreview>
    </>
  );
}
