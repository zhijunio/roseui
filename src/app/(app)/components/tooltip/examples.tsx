




import { ComponentPreview } from "@/components/composite/component-preview";
import { IconAlertTriangle, IconBulb, IconInfoCircle } from "@tabler/icons-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

function TooltipsPositions() {
  return <TooltipProvider delayDuration={0}>
      <div className="flex w-full flex-wrap gap-10 py-2">
        {tooltipPositionsData.map(({ id, position, title }) => (
          <Tooltip key={id}>
            <TooltipTrigger className="text-sm font-normal text-foreground transition-colors hover:text-foreground">
              {title}
            </TooltipTrigger>
            <TooltipContent
              side={position}
              sideOffset={10}
              arrowClassName="!bg-popover !fill-popover"
              className="rounded-lg border-border bg-popover px-3 py-1.5 text-sm font-medium text-popover-foreground shadow-md [&>svg]:!bg-popover [&>svg]:!fill-popover"
            >
              This is a tooltip
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>;
}

const tooltipPositionsData = [
  { id: 1, position: "top", title: "Top Tooltip" },
  { id: 2, position: "left", title: "Left Tooltip" },
  { id: 3, position: "bottom", title: "Bottom Tooltip" },
  { id: 4, position: "right", title: "Right Tooltip" },
] as const;

function DefaultTooltip() {
  return <TooltipProvider delayDuration={0}><Tooltip><TooltipTrigger className="rounded-lg border px-4 py-2 text-sm">Hover for details</TooltipTrigger><TooltipContent side="top">This is a tooltip</TooltipContent></Tooltip></TooltipProvider>;
}

function WhiteAndDarkTooltips() {
  return <TooltipProvider delayDuration={0}>
    <div className="flex flex-wrap items-center gap-5">
      <Tooltip><TooltipTrigger className="rounded-lg border px-4 py-2 text-sm">Surface tooltip</TooltipTrigger><TooltipContent className="border-border bg-card text-card-foreground [&>svg]:fill-card">Surface tooltip</TooltipContent></Tooltip>
      <Tooltip><TooltipTrigger className="rounded-lg border px-4 py-2 text-sm">Muted tooltip</TooltipTrigger><TooltipContent className="border-border bg-muted text-foreground [&>svg]:fill-muted">Muted tooltip</TooltipContent></Tooltip>
    </div>
  </TooltipProvider>;
}

function GuidanceTooltips() {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex flex-wrap items-center gap-4">
        <Tooltip>
          <TooltipTrigger className="rounded-md border px-3 py-2 text-sm">Learn more</TooltipTrigger>
          <TooltipContent className="max-w-64 items-start gap-2 py-3">
            <IconInfoCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Helpful information</p>
              <p className="text-background/80">Review the setup guide before enabling this integration.</p>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger className="rounded-md border px-3 py-2 text-sm">Warning</TooltipTrigger>
          <TooltipContent className="max-w-64 items-start gap-2 py-3">
            <IconAlertTriangle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <p>Changes here apply to every member in the workspace.</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger className="rounded-md border px-3 py-2 text-sm">Tip</TooltipTrigger>
          <TooltipContent className="max-w-64 items-start gap-2 py-3">
            <IconBulb aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <p>Use keyboard shortcuts to speed up common actions.</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export function TooltipExamples() {
  return (
    <>
      <ComponentPreview previewId="tooltip-01" title="Guidance">
        <GuidanceTooltips />
      </ComponentPreview>
      <ComponentPreview previewId="tooltip-02" title="Basic">
      <DefaultTooltip />

      <WhiteAndDarkTooltips />


            <TooltipProvider delayDuration={0}>
              <div className="flex flex-wrap items-center gap-5">
                <Tooltip><TooltipTrigger className="rounded-lg border px-3 py-2 text-sm">Compact</TooltipTrigger><TooltipContent className="text-xs">Compact tooltip</TooltipContent></Tooltip>
                <Tooltip><TooltipTrigger className="rounded-lg border px-3 py-2 text-sm">Roomy</TooltipTrigger><TooltipContent className="px-4 py-2 text-sm">Roomier tooltip</TooltipContent></Tooltip>
                <Tooltip><TooltipTrigger className="rounded-lg border px-3 py-2 text-sm">No arrow</TooltipTrigger><TooltipContent showArrow={false}>Tooltip without a visible arrow</TooltipContent></Tooltip>
              </div>
            </TooltipProvider>


            <TooltipProvider delayDuration={0}>
              <div className="flex flex-wrap items-center gap-4">
                <Tooltip><TooltipTrigger className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">Save changes</TooltipTrigger><TooltipContent className="flex items-center gap-3"><span>Save</span><kbd className="rounded border border-white/20 px-1.5 py-0.5 text-[10px]">⌘ S</kbd></TooltipContent></Tooltip>
                <Tooltip><TooltipTrigger className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-muted">Open search</TooltipTrigger><TooltipContent className="flex items-center gap-3"><span>Search</span><kbd className="rounded border border-white/20 px-1.5 py-0.5 text-[10px]">⌘ K</kbd></TooltipContent></Tooltip>
              </div>
            </TooltipProvider>
      </ComponentPreview>
          <ComponentPreview previewId="tooltip-03" title="Placement">
      <TooltipsPositions />
      </ComponentPreview>
          <ComponentPreview previewId="tooltip-04" title="Triggers">

            <TooltipProvider delayDuration={0}>
              <div className="flex flex-wrap items-center gap-5">
                {[
                  { label: "Edit", description: "Edit this item" },
                  { label: "Share", description: "Share with your team" },
                  { label: "More", description: "More options" },
                ].map((item) => <Tooltip key={item.label}><TooltipTrigger className="flex size-10 items-center justify-center rounded-lg border text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">{item.label.slice(0, 1)}</TooltipTrigger><TooltipContent>{item.description}</TooltipContent></Tooltip>)}
                <Tooltip><TooltipTrigger className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">Need help?</TooltipTrigger><TooltipContent side="right" className="max-w-56">Contact your workspace admin if you need access to this feature.</TooltipContent></Tooltip>
              </div>
            </TooltipProvider>

      <TooltipProvider delayDuration={0}><Tooltip><TooltipTrigger aria-label="Notifications, 3 unread" className="relative rounded-lg border p-3">Notifications<span className="ml-2 rounded-full bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">3</span></TooltipTrigger><TooltipContent>3 unread notifications</TooltipContent></Tooltip></TooltipProvider>

      <TooltipProvider delayDuration={0}><div className="flex gap-1">{["Undo","Redo","Copy","Delete"].map((label)=><Tooltip key={label}><TooltipTrigger aria-label={label} className="size-9 rounded-md border text-xs">{label.slice(0,1)}</TooltipTrigger><TooltipContent>{label}</TooltipContent></Tooltip>)}</div></TooltipProvider>

      <TooltipProvider delayDuration={0}><Tooltip><TooltipTrigger asChild><span tabIndex={0} className="inline-flex"><button disabled className="rounded-md border px-3 py-2 text-sm opacity-50">Publish</button></span></TooltipTrigger><TooltipContent>Complete all required fields to publish.</TooltipContent></Tooltip></TooltipProvider>

      <TooltipProvider delayDuration={0}><Tooltip><TooltipTrigger className="rounded-md border px-3 py-2 text-sm">Open activity</TooltipTrigger><TooltipContent>You have unread updates. Open activity to review them.</TooltipContent></Tooltip></TooltipProvider>
      </ComponentPreview>
          <ComponentPreview previewId="tooltip-05" title="Content Variants">
      <TooltipProvider delayDuration={0}><div className="flex flex-wrap gap-3">{[{name:"Production",state:"Operational"},{name:"Staging",state:"Deploying"}].map(item=><Tooltip key={item.name}><TooltipTrigger className="rounded-full border px-3 py-1 text-xs">{item.name}<span className="ml-2 inline-block size-2 rounded-full bg-success" /></TooltipTrigger><TooltipContent>{item.state}</TooltipContent></Tooltip>)}</div></TooltipProvider>

      <TooltipProvider delayDuration={0}><Tooltip><TooltipTrigger className="rounded-lg border px-3 py-2 text-sm">acme.example · Verified</TooltipTrigger><TooltipContent className="grid gap-1"><strong>Verified domain</strong><span className="text-background/70">Members can sign in with this domain.</span></TooltipContent></Tooltip></TooltipProvider>

      <TooltipProvider delayDuration={0}><Tooltip><TooltipTrigger className="rounded-md border border-warning/40 px-3 py-2 text-sm text-warning">Review required</TooltipTrigger><TooltipContent side="right">This change affects all workspace members.</TooltipContent></Tooltip></TooltipProvider>

      <TooltipProvider delayDuration={0}><Tooltip><TooltipTrigger className="rounded-md bg-muted px-3 py-2 text-sm">Advanced analytics <span className="ml-1 rounded bg-primary/10 px-1 text-primary">Pro</span></TooltipTrigger><TooltipContent>Upgrade your plan to enable advanced analytics.</TooltipContent></Tooltip></TooltipProvider>

      <TooltipProvider delayDuration={0}><Tooltip><TooltipTrigger className="flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-sm"><span className="grid size-7 place-items-center rounded-full bg-primary/10">MC</span>Morgan Chen</TooltipTrigger><TooltipContent>Workspace administrator</TooltipContent></Tooltip></TooltipProvider>

      <TooltipProvider delayDuration={0}><Tooltip><TooltipTrigger className="flex items-center gap-2 text-sm"><span className="size-2 rounded-full bg-success" />Jordan Lee</TooltipTrigger><TooltipContent>Online now</TooltipContent></Tooltip></TooltipProvider>

      <TooltipProvider delayDuration={0}><Tooltip><TooltipTrigger className="rounded-md border px-3 py-2 text-sm">report-final.pdf <span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-xs">PDF</span></TooltipTrigger><TooltipContent>PDF document · 2.4 MB · Updated today</TooltipContent></Tooltip></TooltipProvider>

      <TooltipProvider delayDuration={0}><div className="flex gap-2">{["Design","High priority","Q3"].map(label=><Tooltip key={label}><TooltipTrigger className="rounded-full bg-muted px-2.5 py-1 text-xs">{label}</TooltipTrigger><TooltipContent>Label: {label}</TooltipContent></Tooltip>)}</div></TooltipProvider>
      </ComponentPreview>
    </>
  );
}
