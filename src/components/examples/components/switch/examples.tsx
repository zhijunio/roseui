"use client";

import { useState } from "react";

import { IconMoon, IconSun } from "@tabler/icons-react";

import { FieldLegend, FieldSet } from "@/components/composite/field";
import { LabeledSwitch } from "@/components/composite/labeled-switch";
import { ComponentPreview } from "@/components/examples/component-preview";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

function IconStateSwitch() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="group inline-flex items-center gap-2.5" data-state={darkMode ? "checked" : "unchecked"}>
      <span className="flex items-center gap-1.5 text-sm text-muted-foreground group-data-[state=unchecked]:text-foreground">
        <IconSun className="size-4" aria-hidden="true" />
        Light
      </span>
      <Switch aria-label="Dark mode" checked={darkMode} onCheckedChange={setDarkMode} />
      <span className="flex items-center gap-1.5 text-sm text-muted-foreground group-data-[state=checked]:text-foreground">
        <IconMoon className="size-4" aria-hidden="true" />
        Dark
      </span>
    </div>
  );
}

export function SwitchExamples() {
  const [enabled, setEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [settings, setSettings] = useState({ productUpdates: true, securityAlerts: true, weeklyDigest: false });
  const [formNotifications, setFormNotifications] = useState(false);
  const [formNotice, setFormNotice] = useState("");

  return (
    <>
      <ComponentPreview title="Appearance">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <Switch id="notifications-off" />
            <Label htmlFor="notifications-off">Notifications off</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="notifications-on" defaultChecked />
            <Label htmlFor="notifications-on">Notifications on</Label>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Size">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <Switch id="compact-switch" size="sm" defaultChecked />
            <Label htmlFor="compact-switch">Compact</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="default-switch" defaultChecked />
            <Label htmlFor="default-switch">Default</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="large-switch" size="lg" defaultChecked />
            <Label htmlFor="large-switch">Large</Label>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Icons">
        <IconStateSwitch />
      </ComponentPreview>

      <ComponentPreview title="Thumb Icons">
        <div className="flex flex-wrap items-center gap-4">
          <Switch aria-label="Use light appearance" defaultChecked thumbIcon={<IconSun className="size-2.5" />} />
          <Switch aria-label="Use dark appearance" thumbIcon={<IconMoon className="size-2.5" />} />
        </div>
      </ComponentPreview>

      <ComponentPreview title="States">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Switch id="maintenance-mode" checked={enabled} onCheckedChange={setEnabled} />
            <Label htmlFor="maintenance-mode">Maintenance mode {enabled ? "on" : "off"}</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="locked-feature" disabled checked />
            <Label htmlFor="locked-feature">Managed by your administrator</Label>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Label & Description" span={2}>
        <div className="w-full max-w-xl space-y-3">
          <LabeledSwitch
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
            label="Email notifications"
            description="Send an email when this export is ready."
          />
          <p className="text-xs text-muted-foreground" aria-live="polite">
            Notifications {emailNotifications ? "enabled" : "disabled"}
          </p>
          <div className="flex items-center justify-between gap-4 rounded-xl border bg-card p-4">
            <div>
              <Label htmlFor="weekly-report">Weekly report</Label>
              <p className="text-xs text-muted-foreground">Get a summary every Monday.</p>
            </div>
            <Switch id="weekly-report" defaultChecked />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Label Position" layout="grid2">
        <div className="flex items-center gap-3">
          <Label htmlFor="label-before-switch">Label before</Label>
          <Switch id="label-before-switch" />
        </div>
        <div className="flex items-center gap-3">
          <Switch id="label-after-switch" />
          <Label htmlFor="label-after-switch">Label after</Label>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Groups" layout="grid2">
        <FieldSet className="rounded-lg border p-4">
          <FieldLegend>Notifications</FieldLegend>
          <div className="grid gap-3">
            {[
              ["marketing-email", "Marketing emails"],
              ["social-updates", "Social updates"],
            ].map(([id, label]) => (
              <div key={id} className="flex items-center justify-between gap-3">
                <Label htmlFor={id}>{label}</Label>
                <Switch id={id} />
              </div>
            ))}
          </div>
        </FieldSet>
        <FieldSet className="min-w-0 rounded-lg border p-4">
          <FieldLegend>Channels</FieldLegend>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {[
              ["channel-email", "Email"],
              ["channel-app", "In app"],
              ["channel-sms", "SMS"],
            ].map(([id, label]) => (
              <div key={id} className="flex items-center gap-2">
                <Switch id={id} size="sm" />
                <Label htmlFor={id}>{label}</Label>
              </div>
            ))}
          </div>
        </FieldSet>
      </ComponentPreview>

      <ComponentPreview title="Settings Group" layout="panel">
        <div
          role="group"
          aria-label="Workspace notification settings"
          className="w-full max-w-lg divide-y overflow-hidden rounded-xl border border-border bg-card"
        >
          <LabeledSwitch
            checked={settings.productUpdates}
            onCheckedChange={(checked) => setSettings((current) => ({ ...current, productUpdates: checked }))}
            label="Product updates"
            description="Release notes and new feature announcements."
            containerClassName="rounded-none border-0 bg-transparent p-4 shadow-none"
          />
          <LabeledSwitch
            checked={settings.securityAlerts}
            onCheckedChange={(checked) => setSettings((current) => ({ ...current, securityAlerts: checked }))}
            label="Security alerts"
            description="Sign-in and access changes for this workspace."
            containerClassName="rounded-none border-0 bg-transparent p-4 shadow-none"
          />
          <LabeledSwitch
            checked={settings.weeklyDigest}
            onCheckedChange={(checked) => setSettings((current) => ({ ...current, weeklyDigest: checked }))}
            label="Weekly digest"
            description="A summary of workspace activity every Monday."
            containerClassName="rounded-none border-0 bg-transparent p-4 shadow-none"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Form Integration" layout="panel">
        <form
          className="w-full max-w-md space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            setFormNotice("Notification preferences saved.");
          }}
        >
          <LabeledSwitch
            checked={formNotifications}
            onCheckedChange={setFormNotifications}
            name="notifications"
            value="enabled"
            required
            label="Enable notifications (required)"
            description="Turn this on before saving your preferences."
          />
          <div className="flex items-center gap-3">
            <Button type="submit" size="sm">
              Save preferences
            </Button>
            <p role="status" className="text-sm text-muted-foreground">
              {formNotice}
            </p>
          </div>
        </form>
      </ComponentPreview>
    </>
  );
}
