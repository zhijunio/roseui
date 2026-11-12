"use client";

import { type FormEvent, useState } from "react";

import { IconChartBar, IconFolder, IconStarFilled, IconUsers } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckboxGroup, type CheckboxGroupOption } from "@/components/ui/checkbox-group";
import { ComponentPreview } from "@/examples/component-preview";

const interests: CheckboxGroupOption[] = [
  { value: "engineering", label: "Engineering", description: "Build and maintain products." },
  {
    value: "design",
    label: "Design",
    description: "Shape useful, accessible experiences.",
    indicator: <IconStarFilled />,
  },
  { value: "writing", label: "Writing", description: "Create clear product content." },
];

const workspaceFeatures: CheckboxGroupOption[] = [
  { value: "analytics", label: "Analytics", description: "Reports and usage insights." },
  { value: "projects", label: "Projects", description: "Shared spaces for team work." },
  { value: "members", label: "Members", description: "Access and role management.", disabled: true },
];

export function CheckboxGroupExamples() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["analytics"]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(["reports"]);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(["security"]);
  const [savedNotifications, setSavedNotifications] = useState<string[]>([]);

  function saveNotifications(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget).getAll("notifications");
    setSavedNotifications(values.filter((value): value is string => typeof value === "string"));
  }

  return (
    <>
      <ComponentPreview title="Default Selection" layout="field">
        <CheckboxGroup
          label="Select your interests"
          description="Choose all that apply."
          options={interests}
          defaultValue={["design"]}
          name="interests"
        />
      </ComponentPreview>

      <ComponentPreview title="Controlled Selection" layout="field">
        <div className="grid gap-3">
          <CheckboxGroup
            label="Workspace features"
            description="Choose the tools your team uses."
            options={workspaceFeatures}
            value={selectedFeatures}
            onValueChange={setSelectedFeatures}
            name="workspace-features"
          />
          <p aria-live="polite" className="text-xs text-muted-foreground">
            Selected: {selectedFeatures.length ? selectedFeatures.join(", ") : "none"}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Invalid Group" layout="field">
        <CheckboxGroup
          label="Required capabilities"
          description="Select at least one capability to continue."
          options={interests}
          required
          invalid
          errorMessage="Choose at least one capability."
        />
      </ComponentPreview>

      <ComponentPreview title="Horizontal Layout" layout="panel">
        <CheckboxGroup
          label="Product updates"
          options={[
            { value: "product", label: "Product", description: "Feature releases and improvements." },
            { value: "security", label: "Security", description: "Important account activity." },
            { value: "weekly", label: "Weekly digest", description: "A short summary each week." },
          ]}
          orientation="horizontal"
          defaultValue={["security"]}
          className="max-w-xl"
        />
      </ComponentPreview>

      <ComponentPreview title="Form Integration" layout="field">
        <form className="grid w-full max-w-sm gap-3" onSubmit={saveNotifications}>
          <CheckboxGroup
            label="Notification preferences"
            description="Choose at least one update type."
            options={[
              { value: "product", label: "Product updates" },
              { value: "security", label: "Security alerts" },
              { value: "weekly", label: "Weekly summary" },
            ]}
            value={selectedNotifications}
            onValueChange={setSelectedNotifications}
            name="notifications"
            required
          />
          <Button type="submit" size="sm" className="w-fit">
            Save preferences
          </Button>
          {savedNotifications.length > 0 && (
            <p role="status" className="text-xs text-muted-foreground">
              Saved: {savedNotifications.join(", ")}
            </p>
          )}
        </form>
      </ComponentPreview>

      <ComponentPreview title="Feature Add-ons" layout="field">
        <CheckboxGroup
          label="Choose workspace add-ons"
          description="Add optional tools to your workspace."
          options={[
            {
              value: "reports",
              label: (
                <span className="flex items-center gap-2">
                  <IconChartBar className="size-4 text-muted-foreground" /> Advanced reports{" "}
                  <Badge variant="secondary">Popular</Badge>
                </span>
              ),
              description: "Export detailed activity and usage data.",
            },
            {
              value: "storage",
              label: (
                <span className="flex items-center gap-2">
                  <IconFolder className="size-4 text-muted-foreground" /> Project storage
                </span>
              ),
              description: "Keep shared files alongside projects.",
            },
            {
              value: "seats",
              label: (
                <span className="flex items-center gap-2">
                  <IconUsers className="size-4 text-muted-foreground" /> Additional seats
                </span>
              ),
              description: "Invite more people to your workspace.",
            },
          ]}
          defaultValue={["reports"]}
        />
      </ComponentPreview>

      <ComponentPreview title="Card Selection" layout="panel">
        <CheckboxGroup
          label="Workspace add-ons"
          description="Select the tools to include in this workspace."
          options={[
            {
              value: "reports",
              label: (
                <span className="flex items-center gap-2">
                  <IconChartBar aria-hidden="true" className="size-4 text-muted-foreground" /> Advanced reports
                </span>
              ),
              description: "Build custom usage reports.",
            },
            {
              value: "storage",
              label: (
                <span className="flex items-center gap-2">
                  <IconFolder aria-hidden="true" className="size-4 text-muted-foreground" /> Project storage
                </span>
              ),
              description: "Keep shared files with each project.",
            },
            {
              value: "seats",
              label: (
                <span className="flex items-center gap-2">
                  <IconUsers aria-hidden="true" className="size-4 text-muted-foreground" /> Additional seats
                </span>
              ),
              description: "Invite more collaborators.",
            },
          ]}
          value={selectedAddOns}
          onValueChange={setSelectedAddOns}
          orientation="horizontal"
          itemVariant="card"
          name="workspace-add-ons"
        />
      </ComponentPreview>

      <ComponentPreview title="Disabled Group" layout="field">
        <CheckboxGroup
          label="Saved access preferences"
          description="These options are managed by your administrator."
          options={interests}
          defaultValue={["engineering"]}
          disabled
        />
      </ComponentPreview>
    </>
  );
}
