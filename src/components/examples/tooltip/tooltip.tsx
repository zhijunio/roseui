"use client";

import { AlertTriangle as IconAlertTriangle, Lightbulb as IconBulb, Info as IconInfoCircle } from "lucide-react";
import { Button as TooltipButton } from "react-aria-components/Button";
import { Focusable } from "react-aria-components/Focusable";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

function TooltipsPositions() {
  return (
    <>
      <div className="flex w-full flex-wrap gap-10 py-2">
        {tooltipPositionsData.map(({ id, position, title }) => (
          <TooltipTrigger delay={0} key={id}>
            <TooltipButton className="text-sm font-normal text-foreground transition-colors hover:text-foreground">
              {title}
            </TooltipButton>
            <Tooltip placement={position} offset={10}>
              This is a tooltip
            </Tooltip>
          </TooltipTrigger>
        ))}
      </div>
    </>
  );
}

const tooltipPositionsData = [
  { id: 1, position: "top", title: "Top Tooltip" },
  { id: 2, position: "left", title: "Left Tooltip" },
  { id: 3, position: "bottom", title: "Bottom Tooltip" },
  { id: 4, position: "right", title: "Right Tooltip" },
] as const;

function DefaultTooltip() {
  return (
    <>
      <TooltipTrigger delay={0}>
        <TooltipButton className="rounded-lg border px-4 py-2 text-sm">Hover for details</TooltipButton>
        <Tooltip placement="top">This is a tooltip</Tooltip>
      </TooltipTrigger>
    </>
  );
}

function WhiteAndDarkTooltips() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-5">
        <TooltipTrigger delay={0}>
          <TooltipButton className="rounded-lg border px-4 py-2 text-sm">Surface tooltip</TooltipButton>
          <Tooltip className="border-border bg-card text-card-foreground [&>svg]:fill-card">Surface tooltip</Tooltip>
        </TooltipTrigger>
        <TooltipTrigger delay={0}>
          <TooltipButton className="rounded-lg border px-4 py-2 text-sm">Muted tooltip</TooltipButton>
          <Tooltip className="border-border bg-muted text-foreground [&>svg]:fill-muted">Muted tooltip</Tooltip>
        </TooltipTrigger>
      </div>
    </>
  );
}

function GuidanceTooltips() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <TooltipTrigger delay={0}>
          <TooltipButton className="rounded-md border px-3 py-2 text-sm">Learn more</TooltipButton>
          <Tooltip className="max-w-64 items-start gap-2 py-3">
            <IconInfoCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Helpful information</p>
              <p className="text-background/80">Review the setup guide before enabling this integration.</p>
            </div>
          </Tooltip>
        </TooltipTrigger>
        <TooltipTrigger delay={0}>
          <TooltipButton className="rounded-md border px-3 py-2 text-sm">Warning</TooltipButton>
          <Tooltip className="max-w-64 items-start gap-2 py-3">
            <IconAlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <p>Changes here apply to every member in the workspace.</p>
          </Tooltip>
        </TooltipTrigger>
        <TooltipTrigger delay={0}>
          <TooltipButton className="rounded-md border px-3 py-2 text-sm">Tip</TooltipButton>
          <Tooltip className="max-w-64 items-start gap-2 py-3">
            <IconBulb aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <p>Use keyboard shortcuts to speed up common actions.</p>
          </Tooltip>
        </TooltipTrigger>
      </div>
    </>
  );
}

export function TooltipExamples() {
  return (
    <>
      <ComponentPreview title="Guidance">
        <GuidanceTooltips />
      </ComponentPreview>
      <ComponentPreview title="Basic">
        <DefaultTooltip />

        <WhiteAndDarkTooltips />

        <>
          <div className="flex flex-wrap items-center gap-5">
            <TooltipTrigger delay={0}>
              <TooltipButton className="rounded-lg border px-3 py-2 text-sm">Compact</TooltipButton>
              <Tooltip className="text-xs">Compact tooltip</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger delay={0}>
              <TooltipButton className="rounded-lg border px-3 py-2 text-sm">Roomy</TooltipButton>
              <Tooltip className="px-4 py-2 text-sm">Roomier tooltip</Tooltip>
            </TooltipTrigger>
            <TooltipTrigger delay={0}>
              <TooltipButton className="rounded-lg border px-3 py-2 text-sm">No arrow</TooltipButton>
              <Tooltip showArrow={false}>Tooltip without a visible arrow</Tooltip>
            </TooltipTrigger>
          </div>
        </>

        <>
          <div className="flex flex-wrap items-center gap-4">
            <TooltipTrigger delay={0}>
              <TooltipButton className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">
                Save changes
              </TooltipButton>
              <Tooltip className="flex items-center gap-3">
                <span>Save</span>
                <kbd className="rounded border border-white/20 px-1.5 py-0.5 text-[10px]">⌘ S</kbd>
              </Tooltip>
            </TooltipTrigger>
            <TooltipTrigger delay={0}>
              <TooltipButton className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">
                Open search
              </TooltipButton>
              <Tooltip className="flex items-center gap-3">
                <span>Search</span>
                <kbd className="rounded border border-white/20 px-1.5 py-0.5 text-[10px]">⌘ K</kbd>
              </Tooltip>
            </TooltipTrigger>
          </div>
        </>
      </ComponentPreview>
      <ComponentPreview title="Placement">
        <TooltipsPositions />
      </ComponentPreview>
      <ComponentPreview title="Triggers">
        <>
          <div className="flex flex-wrap items-center gap-5">
            {[
              { label: "Edit", description: "Edit this item" },
              { label: "Share", description: "Share with your team" },
              { label: "More", description: "More options" },
            ].map((item) => (
              <TooltipTrigger delay={0} key={item.label}>
                <TooltipButton className="flex size-10 items-center justify-center rounded-lg border text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  {item.label.slice(0, 1)}
                </TooltipButton>
                <Tooltip>{item.description}</Tooltip>
              </TooltipTrigger>
            ))}
            <TooltipTrigger delay={0}>
              <TooltipButton className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
                Need help?
              </TooltipButton>
              <Tooltip placement="right" className="max-w-56">
                Contact your workspace admin if you need access to this feature.
              </Tooltip>
            </TooltipTrigger>
          </div>
        </>

        <>
          <TooltipTrigger delay={0}>
            <TooltipButton aria-label="Notifications, 3 unread" className="relative rounded-lg border p-3">
              Notifications
              <span className="ml-2 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">3</span>
            </TooltipButton>
            <Tooltip>3 unread notifications</Tooltip>
          </TooltipTrigger>
        </>

        <>
          <div className="flex gap-1">
            {["Undo", "Redo", "Copy", "Delete"].map((label) => (
              <TooltipTrigger delay={0} key={label}>
                <TooltipButton aria-label={label} className="size-9 rounded-md border text-xs">
                  {label.slice(0, 1)}
                </TooltipButton>
                <Tooltip>{label}</Tooltip>
              </TooltipTrigger>
            ))}
          </div>
        </>

        <>
          <TooltipTrigger delay={0}>
            <Focusable>
              <span
                role="button"
                aria-disabled="true"
                tabIndex={0}
                className="rounded-md border px-3 py-2 text-sm opacity-50"
              >
                Publish
              </span>
            </Focusable>
            <Tooltip>Complete all required fields to publish.</Tooltip>
          </TooltipTrigger>
        </>

        <>
          <TooltipTrigger delay={0}>
            <TooltipButton className="rounded-md border px-3 py-2 text-sm">Open activity</TooltipButton>
            <Tooltip>You have unread updates. Open activity to review them.</Tooltip>
          </TooltipTrigger>
        </>
      </ComponentPreview>
      <ComponentPreview title="Content Variants">
        <>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Production", state: "Operational" },
              { name: "Staging", state: "Deploying" },
            ].map((item) => (
              <TooltipTrigger delay={0} key={item.name}>
                <TooltipButton className="rounded-full border px-3 py-1 text-xs">
                  {item.name}
                  <span className="ml-2 inline-block size-2 rounded-full bg-success" />
                </TooltipButton>
                <Tooltip>{item.state}</Tooltip>
              </TooltipTrigger>
            ))}
          </div>
        </>

        <>
          <TooltipTrigger delay={0}>
            <TooltipButton className="rounded-lg border px-3 py-2 text-sm">acme.example · Verified</TooltipButton>
            <Tooltip className="grid gap-1">
              <strong>Verified domain</strong>
              <span className="text-background/70">Members can sign in with this domain.</span>
            </Tooltip>
          </TooltipTrigger>
        </>

        <>
          <TooltipTrigger delay={0}>
            <TooltipButton className="rounded-md border border-warning/40 px-3 py-2 text-sm text-warning">
              Review required
            </TooltipButton>
            <Tooltip placement="right">This change affects all workspace members.</Tooltip>
          </TooltipTrigger>
        </>

        <>
          <TooltipTrigger delay={0}>
            <TooltipButton className="rounded-md bg-muted px-3 py-2 text-sm">
              Advanced analytics <span className="ml-1 rounded bg-primary/10 px-1 text-primary">Pro</span>
            </TooltipButton>
            <Tooltip>Upgrade your plan to enable advanced analytics.</Tooltip>
          </TooltipTrigger>
        </>

        <>
          <TooltipTrigger delay={0}>
            <TooltipButton className="flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-sm">
              <span className="grid size-7 place-items-center rounded-full bg-primary/10">MC</span>Morgan Chen
            </TooltipButton>
            <Tooltip>Workspace administrator</Tooltip>
          </TooltipTrigger>
        </>

        <>
          <TooltipTrigger delay={0}>
            <TooltipButton className="flex items-center gap-2 text-sm">
              <span className="size-2 rounded-full bg-success" />
              Jordan Lee
            </TooltipButton>
            <Tooltip>Online now</Tooltip>
          </TooltipTrigger>
        </>

        <>
          <TooltipTrigger delay={0}>
            <TooltipButton className="rounded-md border px-3 py-2 text-sm">
              report-final.pdf <span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-xs">PDF</span>
            </TooltipButton>
            <Tooltip>PDF document · 2.4 MB · Updated today</Tooltip>
          </TooltipTrigger>
        </>

        <>
          <div className="flex gap-2">
            {["Design", "High priority", "Q3"].map((label) => (
              <TooltipTrigger delay={0} key={label}>
                <TooltipButton className="rounded-full bg-muted px-2.5 py-1 text-xs">{label}</TooltipButton>
                <Tooltip>Label: {label}</Tooltip>
              </TooltipTrigger>
            ))}
          </div>
        </>
      </ComponentPreview>
    </>
  );
}
