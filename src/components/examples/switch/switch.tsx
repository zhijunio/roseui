"use client";

import { useState } from "react";

import { Moon as IconMoon, Sun as IconSun } from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Button } from "@/components/ui/button";
import { FieldLegend, FieldSet } from "@/components/ui/field";
import { LabeledSwitch } from "@/components/ui/labeled-switch";
import { Switch, SwitchButton, SwitchField } from "@/components/ui/switch";

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
          <SwitchField id="notifications-off">
            <SwitchButton className="flex-row-reverse items-center gap-3 text-sm">Notifications off</SwitchButton>
          </SwitchField>
          <SwitchField id="notifications-on" defaultSelected>
            <SwitchButton className="flex-row-reverse items-center gap-3 text-sm">Notifications on</SwitchButton>
          </SwitchField>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Size">
        <div className="flex flex-wrap items-center gap-6">
          <SwitchField id="compact-switch" defaultSelected>
            <SwitchButton size="sm" className="flex-row-reverse items-center gap-3 text-sm">
              Compact
            </SwitchButton>
          </SwitchField>
          <SwitchField id="default-switch" defaultSelected>
            <SwitchButton className="flex-row-reverse items-center gap-3 text-sm">Default</SwitchButton>
          </SwitchField>
          <SwitchField id="large-switch" defaultSelected>
            <SwitchButton size="lg" className="flex-row-reverse items-center gap-3 text-sm">
              Large
            </SwitchButton>
          </SwitchField>
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
          <SwitchField id="maintenance-mode" checked={enabled} onCheckedChange={setEnabled}>
            <SwitchButton className="flex-row-reverse items-center gap-3 text-sm">
              Maintenance mode {enabled ? "on" : "off"}
            </SwitchButton>
          </SwitchField>
          <SwitchField id="locked-feature" disabled checked>
            <SwitchButton className="flex-row-reverse items-center gap-3 text-sm data-[disabled]:opacity-50">
              Managed by your administrator
            </SwitchButton>
          </SwitchField>
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
          <LabeledSwitch label="Weekly report" description="Get a summary every Monday." defaultChecked />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Label Position" layout="grid2">
        <SwitchField id="label-before-switch">
          <SwitchButton className="w-fit items-center gap-3 text-sm">Label before</SwitchButton>
        </SwitchField>
        <SwitchField id="label-after-switch">
          <SwitchButton className="w-fit flex-row-reverse items-center gap-3 text-sm">Label after</SwitchButton>
        </SwitchField>
      </ComponentPreview>

      <ComponentPreview title="Groups" layout="grid2">
        <FieldSet className="rounded-lg border p-4">
          <FieldLegend>Notifications</FieldLegend>
          <div className="grid gap-3">
            {[
              ["marketing-email", "Marketing emails"],
              ["social-updates", "Social updates"],
            ].map(([id, label]) => (
              <SwitchField key={id} id={id}>
                <SwitchButton className="w-full items-center justify-between gap-3 text-sm">{label}</SwitchButton>
              </SwitchField>
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
              <SwitchField key={id} id={id}>
                <SwitchButton size="sm" className="flex-row-reverse items-center gap-2 text-sm">
                  {label}
                </SwitchButton>
              </SwitchField>
            ))}
          </div>
        </FieldSet>
      </ComponentPreview>

      <ComponentPreview title="Grouped Controls" layout="panel">
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
