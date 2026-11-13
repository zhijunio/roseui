"use client";

import * as React from "react";

import { IconCheck, IconCircleDashed, IconRocket, IconUser } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { getUserAvatar } from "@/data/user";
import { ComponentPreview } from "@/examples/component-preview";
import { cn } from "@/lib/utils";

const timelineShowcase = [
  { title: "Basic Timeline", index: 0 },
  { title: "Order Status", index: 2 },
  { title: "Pipeline Steps", index: 5 },
  { title: "Deployment Log", index: 9 },
  { title: "Activity Feed", index: 10 },
  { title: "Horizontal Labels", index: 8 },
] as const;

type Entry = { date: string; title: string; description?: string; icon?: React.ReactNode };

const sets: Entry[][] = [
  [
    { date: "Today · 09:00", title: "Project created", description: "Workspace initialized by Alex Morgan." },
    { date: "Today · 10:30", title: "Team invited", description: "Four members joined the project." },
    { date: "Today · 13:15", title: "First update", description: "The launch plan is ready for review." },
  ],
  [
    { date: "Week 1", title: "Planning", description: "Scope and owners confirmed." },
    { date: "Week 2", title: "Design", description: "Prototype approved by stakeholders." },
    { date: "Week 4", title: "Development", description: "Core implementation in progress." },
  ],
  [
    { date: "09:42", title: "Order received", description: "Order #OR-2841 was placed." },
    { date: "09:45", title: "Payment confirmed", description: "Card payment authorized." },
    { date: "10:12", title: "Ready to ship", description: "Package handed to the carrier." },
  ],
  [
    { date: "2 hours ago", title: "Merge pull request #482", description: "Release settings and deployment workflow." },
    { date: "Yesterday", title: "Fix billing export", description: "Commit 7d90a1c · Jamie Chen." },
    { date: "Nov 1", title: "Add audit events", description: "Commit 12bc314 · Alex Morgan." },
  ],
  [
    { date: "Nov 04", title: "Design review", description: "Review the updated dashboard." },
    { date: "Nov 12", title: "Beta release", description: "Invite the first customer cohort." },
    { date: "Dec 02", title: "General availability", description: "Launch to all workspaces." },
  ],
  [
    { date: "Completed", title: "Build", description: "Artifacts compiled successfully.", icon: <IconCheck /> },
    { date: "Running", title: "Test", description: "Integration suite is running.", icon: <IconCircleDashed /> },
    { date: "Pending", title: "Deploy", description: "Waiting for test results.", icon: <IconRocket /> },
  ],
  [
    { date: "Sprint 14", title: "Design system", description: "Shared patterns and tokens." },
    { date: "Sprint 15", title: "Workspace settings", description: "Role and access controls." },
    { date: "Sprint 16", title: "Usage analytics", description: "Adoption and activity metrics." },
  ],
  [
    { date: "08:30", title: "Deployment started", description: "Production · us-east-1" },
    { date: "08:34", title: "Health checks passed", description: "All services are healthy." },
    { date: "08:36", title: "Release complete", description: "Version 2.8.1 is live." },
  ],
  [
    { date: "Phase 1", title: "Discover", description: "Collect needs." },
    { date: "Phase 2", title: "Build", description: "Ship the solution." },
    { date: "Phase 3", title: "Improve", description: "Measure and iterate." },
  ],
  [
    { date: "10:02:14", title: "Build #184 started", description: "main · 2m 31s" },
    { date: "10:04:45", title: "Tests passed", description: "128 checks · no failures" },
    { date: "10:05:02", title: "Deployed to production", description: "us-east-1 · v2.8.1", icon: <IconRocket /> },
  ],
  [
    {
      date: "5 min ago",
      title: "Jamie Chen updated the brief",
      description: "Added the launch checklist.",
      icon: <IconUser />,
    },
    { date: "1 hour ago", title: "Riley Park commented", description: "Looks ready for the next review." },
    { date: "Yesterday", title: "Alex Morgan created the project", description: "Q4 Product Launch workspace." },
  ],
  [
    { date: "Nov 04", title: "Design", description: "Review" },
    { date: "Nov 12", title: "Beta", description: "Invite users" },
    { date: "Dec 02", title: "Launch", description: "General availability" },
  ],
];

const defaultActiveByExample = [2, 2, 3, 3, 3, 3, 0, 2, 2, 3, 5, 3] as const;
const horizontalExamples = new Set([1, 4, 5, 8, 11]);
const interactiveExamples = new Set([0, 1, 2, 3, 4, 5, 6, 7, 9, 10]);

const chronologyExamples = [
  {
    title: "Centered Milestones",
    events: [
      { date: "May 20", title: "Planning approved", detail: "Scope and owners confirmed.", status: "success" as const },
      { date: "May 22", title: "Design review", detail: "Final screens are under review.", status: "current" as const },
      { date: "May 28", title: "Release", detail: "Ready for the first customer cohort.", status: "muted" as const },
    ],
  },
  {
    title: "Studio Review",
    events: [
      { date: "09:10", title: "Brief received", detail: "Maya shared the product brief.", status: "success" as const },
      { date: "10:25", title: "Design in review", detail: "Two comments need a decision.", status: "current" as const },
      { date: "11:40", title: "Handoff", detail: "Engineering handoff is queued.", status: "muted" as const },
    ],
  },
  {
    title: "Compact Log",
    events: [
      { date: "10:02:14", title: "Build started", detail: "main · run #184", status: "default" as const },
      { date: "10:04:45", title: "Tests passed", detail: "128 checks · no failures", status: "success" as const },
      { date: "10:05:02", title: "Deployed", detail: "us-east-1 · v2.8.1", status: "success" as const },
    ],
  },
  {
    title: "Incident Response",
    events: [
      {
        date: "09:12",
        title: "Latency alert",
        detail: "Checkout p95 crossed the threshold.",
        status: "danger" as const,
      },
      {
        date: "09:18",
        title: "Traffic shifted",
        detail: "Requests moved to the healthy region.",
        status: "warning" as const,
      },
      { date: "09:31", title: "Recovery verified", detail: "Latency returned to normal.", status: "success" as const },
    ],
  },
  {
    title: "Version History",
    events: [
      { date: "May 2026", title: "Version 2.8", detail: "Added workspace audit events.", status: "success" as const },
      { date: "Apr 2026", title: "Version 2.7", detail: "Improved billing exports.", status: "default" as const },
      {
        date: "Mar 2026",
        title: "Version 2.6",
        detail: "Introduced team access controls.",
        status: "default" as const,
      },
    ],
  },
  {
    title: "Repository Activity",
    events: [
      {
        date: "2 min ago",
        title: "Jamie Chen merged a pull request",
        detail: "Improve workspace search · #482",
        status: "success" as const,
      },
      {
        date: "1 hour ago",
        title: "Riley Park pushed a commit",
        detail: "Update billing copy · 7d90a1c",
        status: "default" as const,
      },
      {
        date: "Yesterday",
        title: "Alex Morgan opened a review",
        detail: "Add export permissions · #479",
        status: "default" as const,
      },
    ],
  },
  {
    title: "Split Content",
    events: [
      {
        date: "Today · 09:00",
        title: "Workspace created",
        detail: "Initial project structure is ready.",
        status: "success" as const,
      },
      {
        date: "Today · 10:30",
        title: "Team invited",
        detail: "Four members joined the workspace.",
        status: "current" as const,
      },
      {
        date: "Today · 13:15",
        title: "Launch plan",
        detail: "The plan is waiting for approval.",
        status: "muted" as const,
      },
    ],
  },
];

function HeroTimelineExample({ title, events }: (typeof chronologyExamples)[number]) {
  return (
    <ComponentPreview title={title} layout="panel">
      <div className="w-full">
        {title === "Centered Milestones" ? (
          <ol className="relative mx-auto grid max-w-xl gap-4 list-none p-0 before:absolute before:inset-y-1 before:left-1/2 before:w-px before:-translate-x-1/2 before:bg-border">
            {events.map((event, index) => {
              const onLeft = index % 2 === 0;
              return (
                <li
                  key={event.title}
                  aria-current={event.status === "current" ? "true" : undefined}
                  className="grid grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] items-center gap-0"
                >
                  <article
                    className={cn(
                      "rounded-lg border border-border bg-card p-3",
                      onLeft ? "col-start-1 text-right" : "col-start-3 text-left",
                    )}
                  >
                    <time className="text-xs font-medium text-muted-foreground">{event.date}</time>
                    <h3 className="mt-1 text-sm font-medium">{event.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{event.detail}</p>
                  </article>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "z-10 col-start-2 row-start-1 mx-auto size-3 rounded-full border-2 bg-card",
                      event.status === "success" && "border-success bg-success",
                      event.status === "current" && "border-primary",
                      event.status === "muted" && "border-muted-foreground/40",
                    )}
                  />
                </li>
              );
            })}
          </ol>
        ) : (
          <Timeline value={0} className="list-none p-0">
            {events.map((event, index) => (
              <TimelineItem key={event.title} step={index + 1} status={event.status} className="pb-5 last:pb-0">
                <TimelineHeader>
                  <TimelineSeparator className="bg-border" />
                  <TimelineIndicator>
                    {event.status === "success" ? <IconCheck aria-hidden="true" /> : undefined}
                  </TimelineIndicator>
                  <TimelineDate>{event.date}</TimelineDate>
                  <TimelineTitle>{event.title}</TimelineTitle>
                </TimelineHeader>
                <TimelineContent>{event.detail}</TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </div>
    </ComponentPreview>
  );
}

const roadmapDotColors = ["bg-primary", "bg-success", "bg-info"] as const;
const activityPeople = ["Jamie Chen", "Riley Park", "Alex Morgan"] as const;

function TimelineDemo({ index }: { index: number }) {
  const [active, setActive] = React.useState<number>(() => defaultActiveByExample[index] ?? 2);
  const horizontal = horizontalExamples.has(index);
  const data = sets[index];
  const itemClassName = cn(
    index === 11 && "mt-6",
    (index === 2 || index === 3 || index === 5 || index === 9 || index === 10) && "ms-10",
    index === 6 && "group-data-[orientation=vertical]/timeline:not-last:pb-0",
  );
  const separatorClassName = cn(
    index === 8 && "-top-[1.35rem]",
    (index === 2 || index === 3 || index === 5 || index === 9) &&
      "group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5",
    index === 10 &&
      "bg-input group-data-completed/timeline-item:!bg-input group-data-[orientation=vertical]/timeline:-left-8 group-data-[orientation=vertical]/timeline:top-2 group-data-[orientation=vertical]/timeline:h-[calc(100%-2.5rem)] group-data-[orientation=vertical]/timeline:translate-y-7",
    index === 9 && "bg-input",
    index === 6 && "group-data-[orientation=vertical]/timeline:bg-foreground/20",
  );

  return (
    <div className="w-full overflow-x-auto py-2">
      <Timeline
        orientation={horizontal ? "horizontal" : "vertical"}
        value={active}
        className={cn("list-none p-0", horizontal && "min-w-[34rem]")}
      >
        {data.map((entry, stepIndex) => {
          const step = stepIndex + 1;
          const pipelineStatus =
            index === 5 ? (stepIndex === 0 ? "completed" : stepIndex === 1 ? "active" : "pending") : null;
          const deploySuccess = index === 9 ? stepIndex < 2 : true;

          const indicatorClassName = cn(
            index === 2 &&
              "flex size-6 items-center justify-center border-none group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground group-data-[orientation=vertical]/timeline:-left-7",
            index === 3 &&
              "flex size-6 items-center justify-center border-none bg-primary/10 text-foreground group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground group-data-[orientation=vertical]/timeline:-left-7",
            index === 5 &&
              cn(
                "flex size-6 items-center justify-center border-none bg-muted text-muted-foreground group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground group-data-[orientation=vertical]/timeline:-left-7",
                pipelineStatus === "active" && "ring-2 ring-ring/20",
              ),
            index === 6 && cn("size-2 border-none", roadmapDotColors[stepIndex] ?? "bg-muted"),
            index === 9 &&
              cn(
                "flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7",
                deploySuccess ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground",
              ),
            index === 10 &&
              "size-8 overflow-hidden rounded-full border-none group-data-[orientation=vertical]/timeline:-left-8",
          );

          const indicatorContent =
            index === 2 ? (
              <IconCheck className="size-4 group-not-data-completed/timeline-item:hidden" />
            ) : index === 10 ? (
              <Avatar className="size-8">
                <AvatarImage
                  src={getUserAvatar(activityPeople[stepIndex] ?? "User")}
                  alt={activityPeople[stepIndex] ?? "User"}
                />
                <AvatarFallback className="text-[10px]">
                  {(activityPeople[stepIndex] ?? "U")
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            ) : (
              entry.icon
            );

          return (
            <TimelineItem key={`${entry.title}-${stepIndex}`} step={step} className={itemClassName}>
              <TimelineHeader className={horizontal ? "min-h-20" : undefined}>
                <TimelineSeparator className={separatorClassName} />
                <TimelineDate
                  className={cn(
                    index === 6 && "mb-0 text-[10px] font-semibold uppercase text-muted-foreground/60",
                    index === 11 && "text-xs",
                  )}
                >
                  {entry.date}
                </TimelineDate>
                <TimelineTitle className={index === 11 ? "text-xs" : undefined}>{entry.title}</TimelineTitle>
                <TimelineIndicator className={indicatorClassName}>{indicatorContent}</TimelineIndicator>
              </TimelineHeader>
              {entry.description && (
                <TimelineContent
                  className={cn(horizontal && "max-w-40 text-xs", index === 6 && "font-medium text-foreground")}
                >
                  {entry.description}
                </TimelineContent>
              )}
            </TimelineItem>
          );
        })}
      </Timeline>
      {interactiveExamples.has(index) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {data.map((entry, stepIndex) => (
            <button
              key={entry.title}
              type="button"
              onClick={() => setActive(stepIndex + 1)}
              aria-pressed={active === stepIndex + 1}
              className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:bg-muted aria-pressed:bg-primary aria-pressed:text-primary-foreground"
            >
              Set {entry.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function TimelineExamples() {
  return (
    <>
      {chronologyExamples.map((example) => (
        <HeroTimelineExample key={example.title} {...example} />
      ))}
      {timelineShowcase.map(({ title, index }) => (
        <ComponentPreview key={title} title={title} layout="panel" span={index === 8 ? 2 : 1}>
          <TimelineDemo index={index} />
        </ComponentPreview>
      ))}
    </>
  );
}
