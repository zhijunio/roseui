"use client";

import { type ComponentType, type ReactNode, useRef, useState } from "react";

import type { Icon } from "@tabler/icons-react";
import {
  IconArrowRight,
  IconBellOff,
  IconBookmark,
  IconCalendarEvent,
  IconChartBar,
  IconCheck,
  IconCreditCard,
  IconFileText,
  IconFolderPlus,
  IconInbox,
  IconLifebuoy,
  IconMessageCircle,
  IconPackage,
  IconPlugConnected,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconServerOff,
  IconSettings,
  IconUpload,
  IconUsers,
} from "@tabler/icons-react";
import { toast } from "sonner";

import { ComponentPreview } from "@/components/examples/component-preview";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export function EmptyStateExample({
  icon: IconComponent,
  title,
  description,
  action,
  children,
  variant = "default",
  iconClassName = "bg-blue-500/10 text-blue-600 dark:text-blue-400",
}: {
  icon: Icon;
  title: string;
  description: string;
  action?: ReactNode;
  children?: ReactNode;
  variant?: "default" | "dashed";
  iconClassName?: string;
}) {
  return (
    <Empty className={`min-h-40 rounded-xl ${variant === "dashed" ? "border border-dashed border-border p-5" : "p-4"}`}>
      <EmptyHeader>
        <EmptyMedia variant="icon" className={iconClassName}>
          <IconComponent aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {children}
        {action}
      </EmptyContent>
    </Empty>
  );
}

export function EmptyIconStateExample({
  icon: IconComponent,
  title,
  description,
  action,
  iconClassName = "bg-blue-500/10 text-blue-600 dark:text-blue-400",
}: {
  icon: Icon;
  title: string;
  description: string;
  action?: ReactNode;
  iconClassName?: string;
}) {
  return (
    <Empty className="min-h-40 rounded-xl p-4">
      <EmptyHeader>
        <EmptyMedia variant="icon" className={iconClassName}>
          <IconComponent aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>{action}</EmptyContent>
    </Empty>
  );
}

export function EmptyBasicExamples() {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");
  const [search, setSearch] = useState("");
  const [automationEnabled, setAutomationEnabled] = useState(false);

  return (
    <>
      <ComponentPreview title="Search Input">
        <EmptyStateExample
          icon={IconSearch}
          iconClassName="bg-blue-500/10 text-blue-600 dark:text-blue-400"
          title={search ? `No results for “${search}”` : "Search your workspace"}
          description="Search projects, reports, and team members."
        >
          <Input
            aria-label="Search workspace"
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search workspace..."
          />
        </EmptyStateExample>
      </ComponentPreview>

      <ComponentPreview title="Documents">
        <EmptyStateExample
          icon={IconFileText}
          iconClassName="bg-violet-500/10 text-violet-600 dark:text-violet-400"
          title="No documents shared"
          description="Upload a file or create a document to get started."
          action={
            <div className="flex gap-2">
              <Button variant="outline">Browse files</Button>
              <Button>
                <IconPlus />
                New document
              </Button>
            </div>
          }
        />
      </ComponentPreview>
      <ComponentPreview title="Dashed Upload">
        <EmptyStateExample
          icon={IconUpload}
          iconClassName="bg-blue-500/10 text-blue-600 dark:text-blue-400"
          title={fileName || "Upload workspace files"}
          description="Drop a file here or choose one from your computer. PDF, CSV, and images up to 20 MB."
          variant="dashed"
          action={
            <>
              <input
                ref={uploadRef}
                type="file"
                className="sr-only"
                onChange={(event) => setFileName(event.currentTarget.files?.[0]?.name ?? "")}
              />
              <Button variant="outline" onClick={() => uploadRef.current?.click()}>
                <IconUpload />
                Choose file
              </Button>
            </>
          }
        />
      </ComponentPreview>

      <ComponentPreview title="Team Members">
        <EmptyStateExample
          icon={IconUsers}
          iconClassName="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          title="Build your team"
          description="Invite people who need access to project updates and reports."
          action={
            <Button>
              <IconPlus />
              Invite a teammate
            </Button>
          }
        />
      </ComponentPreview>

      <ComponentPreview title="No Analytics Data">
        <EmptyStateExample
          icon={IconChartBar}
          iconClassName="bg-blue-500/10 text-blue-600 dark:text-blue-400"
          title="No analytics data yet"
          description="Connect a data source or expand the selected date range to see insights."
          action={<Button variant="outline">Connect data source</Button>}
        />
      </ComponentPreview>
      <ComponentPreview title="No Bookmarks">
        <EmptyStateExample
          icon={IconBookmark}
          iconClassName="bg-violet-500/10 text-violet-600 dark:text-violet-400"
          title="No saved reports"
          description="Bookmark reports you use often to find them here."
          action={<Button variant="outline">Browse reports</Button>}
        />
      </ComponentPreview>
      <ComponentPreview title="No Tasks">
        <EmptyStateExample
          icon={IconCheck}
          iconClassName="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          title="No tasks assigned"
          description="Create a task or ask a teammate to assign work to you."
          action={
            <Button>
              <IconPlus />
              Create task
            </Button>
          }
        />
      </ComponentPreview>
      <ComponentPreview title="Automations Switch">
        <EmptyStateExample
          icon={IconSettings}
          iconClassName="bg-amber-500/10 text-amber-600 dark:text-amber-400"
          title="No automations configured"
          description="Turn on automation suggestions to get started with common workflows."
        >
          <div className="flex items-center gap-3 rounded-lg border px-3 py-2">
            <Switch
              checked={automationEnabled}
              onCheckedChange={setAutomationEnabled}
              aria-label="Enable automation suggestions"
            />
            <span className="text-sm">{automationEnabled ? "Suggestions enabled" : "Enable suggestions"}</span>
          </div>
        </EmptyStateExample>
      </ComponentPreview>
    </>
  );
}

export function EmptyIconExamples() {
  return (
    <>
      <ComponentPreview title="Comments Board">
        <EmptyIconStateExample
          icon={IconMessageCircle}
          iconClassName="bg-violet-500/10 text-violet-600 dark:text-violet-400"
          title="No comments yet"
          description="Start a discussion on this project board."
          action={<Button variant="outline">Add a comment</Button>}
        />
      </ComponentPreview>
      <ComponentPreview title="Layered Products">
        <EmptyIconStateExample
          icon={IconPackage}
          iconClassName="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          title="No products in catalog"
          description="Add your first product to start managing inventory."
          action={<Button>Add product</Button>}
        />
      </ComponentPreview>
      <ComponentPreview title="Chat Messages">
        <EmptyIconStateExample
          icon={IconMessageCircle}
          iconClassName="bg-violet-500/10 text-violet-600 dark:text-violet-400"
          title="No messages yet"
          description="Start a conversation with your project team."
          action={<Button>New message</Button>}
        />
      </ComponentPreview>
      <ComponentPreview title="Payments">
        <EmptyIconStateExample
          icon={IconCreditCard}
          iconClassName="bg-violet-500/10 text-violet-600 dark:text-violet-400"
          title="No payments recorded"
          description="Completed invoices and payment history will appear here."
          action={<Button variant="outline">View billing settings</Button>}
        />
      </ComponentPreview>

      <ComponentPreview title="Calendar Events">
        <EmptyIconStateExample
          icon={IconCalendarEvent}
          iconClassName="bg-blue-500/10 text-blue-600 dark:text-blue-400"
          title="No upcoming events"
          description="Schedule a review or check another date for upcoming team events."
          action={<Button variant="outline">Open calendar</Button>}
        />
      </ComponentPreview>
    </>
  );
}

type Action = { label: string; icon?: ComponentType<{ className?: string }> };

type EmptyStateDef = {
  icon: ComponentType<{ className?: string }>;
  tint: string;
  previewTitle: string;
  title: string;
  description: string;
  primary: Action;
  secondary?: Action;
};

const states: EmptyStateDef[] = [
  {
    icon: IconSearch,
    tint: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
    previewTitle: "Filtered Search Results",
    title: "No results found",
    description: "We couldn't find anything matching “quarterly-forecast”. Try a different term or clear your filters.",
    primary: { label: "Clear search", icon: IconRefresh },
    secondary: { label: "Browse all" },
  },
  {
    icon: IconFolderPlus,
    tint: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    previewTitle: "New Project Workspace",
    title: "No projects yet",
    description: "Projects keep your tasks, files and milestones together. Create your first one to get started.",
    primary: { label: "New project", icon: IconPlus },
    secondary: { label: "Import" },
  },
  {
    icon: IconInbox,
    tint: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    previewTitle: "Inbox Status",
    title: "Inbox zero",
    description: "You're all caught up — there are no messages that need your attention right now. Nice work.",
    primary: { label: "Compose", icon: IconMessageCircle },
    secondary: { label: "View archive" },
  },
  {
    icon: IconBellOff,
    tint: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    previewTitle: "Notification Feed",
    title: "No notifications",
    description: "When something needs your attention — mentions, assignments or deploys — it'll show up here.",
    primary: { label: "Notification settings", icon: IconSettings },
  },
  {
    icon: IconServerOff,
    tint: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    previewTitle: "Data Load Failure",
    title: "Something went wrong",
    description: "We couldn't load this data. This is usually temporary — try again in a moment.",
    primary: { label: "Try again", icon: IconRefresh },
    secondary: { label: "Contact support", icon: IconLifebuoy },
  },
  {
    icon: IconPlugConnected,
    tint: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    previewTitle: "Integration Setup",
    title: "No integrations connected",
    description: "Connect your favorite tools to sync data automatically and keep everything in one place.",
    primary: { label: "Browse integrations", icon: IconArrowRight },
    secondary: { label: "Learn more" },
  },
];

export function EmptyStatesGrid() {
  return (
    <>
      {states.map((s) => (
        <ComponentPreview key={s.title} title={s.previewTitle} layout="fullStack">
          <EmptyState {...s} />
        </ComponentPreview>
      ))}
    </>
  );
}

function EmptyState({ icon: Icon, tint, title, description, primary, secondary }: EmptyStateDef) {
  const fire = (label: string) => () => toast(label, { description: "Demo action — wired for preview." });

  return (
    <div className="flex min-h-64 w-full flex-col items-center justify-center gap-4 px-4 py-8 text-center">
      <div className={`flex size-14 shrink-0 items-center justify-center rounded-full ${tint}`}>
        <Icon className="size-7" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-base font-medium tracking-tight">{title}</h3>
        <p className="mx-auto max-w-[30ch] text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
        <Button size="sm" onClick={fire(primary.label)}>
          {primary.icon && <primary.icon className="size-4" />}
          {primary.label}
        </Button>
        {secondary && (
          <Button size="sm" variant="outline" onClick={fire(secondary.label)}>
            {secondary.icon && <secondary.icon className="size-4" />}
            {secondary.label}
          </Button>
        )}
      </div>
    </div>
  );
}

export function EmptyExamples() {
  return (
    <>
      <EmptyBasicExamples />
      <EmptyIconExamples />
    </>
  );
}
