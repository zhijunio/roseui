"use client";

import { useState } from "react";

import { IconCheck, IconPlus } from "@tabler/icons-react";

import { AvatarGroup, AvatarGroupCount } from "@/components/composite/avatar-group";
import { ComponentPreview, type ComponentPreviewLayout } from "@/components/examples/component-preview";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { users } from "@/data/user";
import { cn, getInitials } from "@/lib/utils";

type ExampleSection = {
  title: string;
  description?: string;
  examples: number[];
  stack?: boolean;
  columns?: 2 | 3;
  layout?: ComponentPreviewLayout;
  span?: 1 | 2;
};

const sections: ExampleSection[] = [
  { title: "Layouts", examples: [10, 39, 40], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Sizes", examples: [41], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Counts", examples: [11, 12, 38], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Team Patterns", examples: [20, 21, 25, 28, 29], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Status & Interaction", examples: [18, 22, 23, 24], stack: true, layout: "wide" as const, span: 2 as const },
];

const exampleLabels: Record<number, string> = {
  10: "Stacked avatars",
  39: "Grid layout",
  40: "Open overlap",
  41: "Group sizes",
  11: "Known overflow count",
  12: "Add member",
  38: "Maximum with overflow",
  20: "Trusted by teams",
  21: "Fallback group",
  25: "Invite summary",
  28: "Empty team with invite",
  29: "Compact invite action",
  18: "Online member",
  22: "Hover names",
  23: "Focus names",
  24: "Interactive members",
};

export function AvatarGroupExamples() {
  return (
    <>
      {sections.map((section) => {
        const renderExample = (example: number) => <AvatarGroupExample example={example} />;
        const labelForExample = (example: number) => exampleLabels[example];
        const isStack = section.stack === true;
        const layout = section.layout ?? (isStack ? "stack" : "inline");
        const columns = section.columns;
        const previewClassName =
          columns === 3
            ? "grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3"
            : columns === 2
              ? "grid items-stretch gap-4 sm:grid-cols-2"
              : isStack
                ? "flex-col flex-nowrap items-stretch gap-6"
                : undefined;
        return (
          <ComponentPreview
            key={section.title}
            title={section.title}
            span={section.span ?? 1}
            layout={layout}
            previewClassName={previewClassName}
          >
            {section.examples.map((example) => {
              const label = labelForExample?.(example);
              return (
                <div key={example} className={isStack ? "min-w-0 w-full space-y-2" : "min-w-0"}>
                  {isStack && label ? <p className="text-xs font-medium text-muted-foreground">{label}</p> : null}
                  {renderExample(example)}
                </div>
              );
            })}
          </ComponentPreview>
        );
      })}
    </>
  );
}

function GroupMember({
  person,
  size = "sm",
  fallbackOnly = false,
  grayscale = false,
  children,
}: {
  person: (typeof users)[number];
  size?: "xs" | "sm" | "default" | "lg" | "xl";
  fallbackOnly?: boolean;
  grayscale?: boolean;
  children?: React.ReactNode;
}) {
  const initials = getInitials(person.name);
  return (
    <Avatar role="img" aria-label={person.name} size={size}>
      {!fallbackOnly && <AvatarImage src={person.avatar} alt="" className={grayscale ? "grayscale" : undefined} />}
      <AvatarFallback>{initials}</AvatarFallback>
      {children}
    </Avatar>
  );
}

function PeopleGroup({ example }: { example: number }) {
  const interactive = [22, 23, 24].includes(example);
  const group = (
    <AvatarGroup
      aria-label={example === 38 ? "Project team, 6 members" : "Project team"}
      max={example === 38 ? 3 : undefined}
      layout={example === 39 ? "grid" : "stack"}
      overlap={example === 40 ? "none" : "ring"}
      className={cn(interactive && "hover:space-x-1 focus-within:space-x-1 motion-safe:transition-[margin]")}
    >
      {users.slice(0, [38, 39].includes(example) ? 6 : 4).map((person, index) => {
        const avatar = (
          <GroupMember key={person.id} person={person} fallbackOnly={example === 21} grayscale={example === 28}>
            {example === 18 && index === 0 && <AvatarBadge className="bg-primary" aria-label="Online" />}
          </GroupMember>
        );

        return interactive ? (
          <Tooltip key={person.id}>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={person.name}
                className="relative rounded-full focus-visible:outline-2 focus-visible:outline-ring hover:z-10 focus-visible:z-10 motion-safe:transition-transform motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1"
              >
                {avatar}
              </button>
            </TooltipTrigger>
            {example !== 23 && <TooltipContent>{person.name}</TooltipContent>}
          </Tooltip>
        ) : (
          <span key={person.id} className={cn("rounded-full", example !== 40 && "ring-2 ring-background")}>
            {avatar}
          </span>
        );
      })}
      {[11, 12, 29].includes(example) && (
        <AvatarGroupCount>{example === 12 ? <IconPlus aria-label="More members" /> : "+5"}</AvatarGroupCount>
      )}
    </AvatarGroup>
  );

  if ([20, 21, 25].includes(example)) {
    return (
      <div
        className={cn("flex flex-wrap items-center gap-3 border p-2", example === 21 ? "rounded-lg" : "rounded-full")}
      >
        {group}
        <span className="text-xs text-muted-foreground">
          {example === 25 ? "+3" : example === 20 ? "Trusted by 100K+ users" : "Joined by 500+ developers"}
        </span>
      </div>
    );
  }

  return group;
}

export function AvatarGroupExample({ example }: { example: number }) {
  const [invited, setInvited] = useState(false);

  if (example === 41) {
    return (
      <div className="grid gap-4">
        {(["xs", "sm", "lg"] as const).map((size) => (
          <div key={size} className="flex flex-wrap items-center gap-4">
            <span className="w-20 text-xs font-medium text-muted-foreground">
              {size === "xs" ? "Extra small" : size === "sm" ? "Small" : "Large"}
            </span>
            <AvatarGroup aria-label={`Project team, ${size} avatars`}>
              {users.slice(0, 4).map((person) => (
                <GroupMember key={person.id} person={person} size={size} />
              ))}
            </AvatarGroup>
          </div>
        ))}
      </div>
    );
  }

  if ([28, 29].includes(example)) {
    return (
      <div className={cn("flex items-center gap-3", example === 28 && "flex-col text-center")}>
        <PeopleGroup example={example} />
        {example === 28 && (
          <div>
            <p className="text-sm font-medium">No active collaborators</p>
            <p className="text-xs text-muted-foreground">Invite teammates to start working together.</p>
          </div>
        )}
        <Button
          variant="outline"
          size={example === 29 ? "icon" : "sm"}
          aria-label="Invite teammate"
          disabled={invited}
          onClick={() => setInvited(true)}
        >
          {invited ? <IconCheck aria-hidden /> : <IconPlus aria-hidden />}
          {example === 28 && (invited ? "Invitation sent" : "Invite teammate")}
        </Button>
        <span role="status" className={example === 29 ? "sr-only" : "hidden"}>
          {invited && "Invitation sent"}
        </span>
      </div>
    );
  }

  return <PeopleGroup example={example} />;
}
