"use client";

import { type ComponentProps, useState } from "react";

import Link from "next/link";

import { IconBell, IconCheck, IconX } from "@tabler/icons-react";
import flags from "react-phone-number-input/flags";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, BadgeAnchor, type BadgePlacement } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/ui/status-dot";
import { users } from "@/data/user";
import { ComponentPreview, type ComponentPreviewLayout } from "@/examples/component-preview";

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
  {
    title: "Colors",
    examples: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    layout: "wide" as const,
    span: 2 as const,
  },
  {
    title: "Sizes",
    examples: [18, 19],
    stack: true,
    layout: "wide" as const,
    span: 2 as const,
  },
  {
    title: "Content Variants",
    examples: [20, 22, 24, 25],
    layout: "wide" as const,
    span: 2 as const,
  },
  {
    title: "Actions",
    examples: [21, 23],
    layout: "wide" as const,
    span: 2 as const,
  },
  {
    title: "Anchored Indicators",
    examples: [26, 27],
    layout: "wide" as const,
    span: 2 as const,
  },
];

export function BadgeExamples() {
  return (
    <>
      {sections.map((section) => {
        const renderExample = (example: number) => <BadgeExample example={example} />;
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
              const label = undefined;
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

const variants = [
  "default",
  "secondary",
  "destructive",
  "success",
  "info",
  "warning",
  "outline",
  "primary-outline",
  "destructive-outline",
  "info-outline",
  "success-outline",
  "warning-outline",
  "primary-light",
  "destructive-light",
  "success-light",
  "info-light",
  "warning-light",
] as const satisfies readonly ComponentProps<typeof Badge>["variant"][];

const badgePlacements = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
] as const satisfies readonly BadgePlacement[];

export function BadgeExample({ example }: { example: number }) {
  const [dismissed, setDismissed] = useState(false);
  if (example === 26)
    return (
      <div className="flex flex-wrap items-center gap-6">
        {badgePlacements.map((placement) => (
          <div key={placement} className="flex flex-col items-center gap-2">
            <BadgeAnchor className="m-2">
              <Button
                variant="outline"
                size="icon-sm"
                aria-label={`Notifications, 5 unread, badge at ${placement.replace("-", " ")}`}
              >
                <IconBell aria-hidden />
              </Button>
              <Badge placement={placement} size="sm" aria-hidden="true">
                5
              </Badge>
            </BadgeAnchor>
            <span className="text-xs text-muted-foreground">{placement.replace("-", " ")}</span>
          </div>
        ))}
      </div>
    );
  if (example === 27)
    return (
      <div className="flex flex-wrap items-center gap-6">
        <BadgeAnchor className="m-2">
          <Avatar size="lg">
            <AvatarImage src={users[0].avatar} alt={users[0].name} />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <Badge
            dot
            placement="bottom-right"
            variant="success"
            role="status"
            aria-label={`${users[0].name} is online`}
          />
        </BadgeAnchor>
        <span className="text-sm text-muted-foreground">Online</span>
      </div>
    );
  if (example <= 17)
    return (
      <Badge variant={variants[example - 1]}>
        {
          [
            "Default",
            "Secondary",
            "Destructive",
            "Success",
            "Info",
            "Warning",
            "Outline",
            "Primary Outline",
            "Destructive Outline",
            "Info Outline",
            "Success Outline",
            "Warning Outline",
            "Primary Light",
            "Destructive Light",
            "Success Light",
            "Info Light",
            "Warning Light",
          ][example - 1]
        }
      </Badge>
    );
  if ([18, 19].includes(example))
    return (
      <div className="flex flex-wrap items-center gap-3">
        {(
          [
            ["sm", "Small"],
            ["default", "Default"],
            ["lg", "Large"],
          ] as const
        ).map(([size, label]) => (
          <Badge key={size} size={size} radius={example === 19 ? "full" : "default"}>
            {example === 19 ? "3" : label}
          </Badge>
        ))}
      </div>
    );
  if (example === 21)
    return dismissed ? (
      <div className="flex items-center gap-2">
        <span role="status" className="text-xs text-muted-foreground">
          {"Badge removed"}
        </span>
        <Button variant="ghost" size="sm" onClick={() => setDismissed(false)}>
          {"Restore"}
        </Button>
      </div>
    ) : (
      <Badge variant="outline">
        {"Badge"}
        <button
          type="button"
          aria-label={"Dismiss badge"}
          onClick={() => setDismissed(true)}
          className="rounded-full outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
        >
          <IconX aria-hidden className="size-3" />
        </button>
      </Badge>
    );
  if (example === 23)
    return (
      <Badge variant="outline" asChild>
        <Link href="/components/button-group">{"Browse buttons"}</Link>
      </Badge>
    );
  if (example === 24)
    return (
      <Badge variant="outline" size="lg" className="pl-0.5">
        <Avatar size="xs" className="size-4">
          <AvatarImage src={users[0].avatar} alt="" />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        {users[0].name}
      </Badge>
    );
  if (example === 25) {
    const Flag = flags.US;
    return (
      <Badge variant="outline">
        <span className="w-4 overflow-hidden rounded-xs">{Flag && <Flag title={"United States"} />}</span>
        {"United States"}
      </Badge>
    );
  }
  return (
    <Badge variant="outline">
      {example === 20 ? <IconCheck aria-hidden /> : <StatusDot color="success" />}
      {example === 20 ? "Verified" : "Online"}
    </Badge>
  );
}
