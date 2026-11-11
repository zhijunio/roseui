"use client";

import { useEffect, useId, useState } from "react";

import { IconCalendar, IconCode, IconFile, IconPhoto, IconSelector, IconUsers, IconX } from "@tabler/icons-react";
import type { Country } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { ComponentPreview, type ComponentPreviewLayout } from "@/components/examples/component-preview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusDot, type StatusDotColor } from "@/components/ui/status-dot";
import { users } from "@/data/user";
import { cn } from "@/lib/utils";

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
  { title: "Default Usage", layout: "wide" as const, span: 2 as const, examples: [1, 4, 15] },
  { title: "Sizes", layout: "wide" as const, span: 2 as const, examples: [5, 33] },
  { title: "Groups", layout: "wide" as const, span: 2 as const, examples: [3, 24] },
  {
    title: "Option Content",
    layout: "wide" as const,
    span: 2 as const,
    examples: [2, 6, 16, 17, 18, 19, 20, 23, 25, 26, 27, 28, 29, 30, 31, 32],
  },
  { title: "Field", layout: "wide" as const, span: 2 as const, examples: [8, 13, 14] },
  { title: "States", layout: "wide" as const, span: 2 as const, examples: [7, 9, 10, 21, 22] },
  { title: "Controlled", layout: "wide" as const, span: 2 as const, examples: [12] },
  { title: "In Dialog", layout: "wide" as const, span: 2 as const, examples: [11] },
  { title: "Required", layout: "wide" as const, span: 2 as const, examples: [34] },
  { title: "Async Loading", layout: "wide" as const, span: 2 as const, examples: [36] },
  { title: "Inline Selection", layout: "wide" as const, span: 2 as const, stack: true, examples: [37, 38, 39] },
  { title: "On a Surface", layout: "wide" as const, span: 2 as const, examples: [35] },
];

const inlineExampleLabels: Record<number, string> = {
  37: "Inline in text",
  38: "Team switcher",
  39: "Custom indicator",
};

export function SelectExamples() {
  return (
    <>
      {sections.map((section) => {
        const renderExample = (example: number) => <SelectExample example={example} />;
        const labelForExample = (example: number) => inlineExampleLabels[example];
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
      <ComponentPreview title="Settings Cells" layout="panel">
        <ItemGroup variant="outline" dividers>
          <Item className="flex-nowrap rounded-none border-0 bg-transparent px-3 shadow-none first:rounded-t-lg last:rounded-b-lg">
            <ItemContent>
              <ItemTitle>Language</ItemTitle>
              <ItemDescription>Choose the language used in the workspace.</ItemDescription>
            </ItemContent>
            <Select defaultValue="en">
              <SelectTrigger aria-label="Workspace language" className="w-36 shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </Item>
          <Item className="flex-nowrap rounded-none border-0 bg-transparent px-3 shadow-none first:rounded-t-lg last:rounded-b-lg">
            <ItemContent>
              <ItemTitle>Date format</ItemTitle>
              <ItemDescription>Set how dates appear in reports.</ItemDescription>
            </ItemContent>
            <Select defaultValue="month-day-year">
              <SelectTrigger aria-label="Report date format" className="w-36 shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month-day-year">MM/DD/YYYY</SelectItem>
                <SelectItem value="day-month-year">DD/MM/YYYY</SelectItem>
                <SelectItem value="year-month-day">YYYY/MM/DD</SelectItem>
              </SelectContent>
            </Select>
          </Item>
        </ItemGroup>
      </ComponentPreview>
    </>
  );
}

type Option = {
  value: string;
  label: string;
  description?: string;
  group?: string;
  dot?: StatusDotColor;
  badge?: boolean;
  avatar?: (typeof users)[number];
  font?: string;
  offset?: string;
};

const exampleTitles = [
  "Basic",
  "Icons",
  "Grouped Labels",
  "Large List",
  "Small Trigger",
  "Plan Picker",
  "Disabled Item",
  "Field With Label",
  "Invalid",
  "Disabled",
  "In Dialog",
  "Controlled Value",
  "Inline With Input",
  "With Button",
  "Item Aligned",
  "Access Levels",
  "Status Bullets",
  "User Avatars",
  "Status Badges",
  "Left Indicator",
  "Clear Button",
  "Custom Chevrons",
  "Overlapping Dots",
  "Grouped Separators",
  "Country Flags",
  "Status Filter",
  "Option Descriptions",
  "Timezone Offsets",
  "Team Assignment",
  "Priority Badges",
  "Font Preview",
  "Category Icons",
  "Size Scale",
  "Required",
  "On a Surface",
  "Async Options",
  "Inline Context",
  "Inline Team Switcher",
  "Inline Custom Indicator",
];

function CountryFlag({ code, label }: { code: string; label: string }) {
  const Flag = flags[code.toUpperCase() as Country];
  return Flag ? (
    <span className="w-4 overflow-hidden rounded-xs">
      <Flag title={label} />
    </span>
  ) : null;
}

export function SelectExample({ example }: { example: number }) {
  const id = useId();
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState("");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [asyncReady, setAsyncReady] = useState(false);
  let options: Option[] = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];
  if (example === 4)
    options = Array.from({ length: 100 }, (_, index) => ({ value: String(index + 1), label: `Item ${index + 1}` }));
  if ([3, 24].includes(example))
    options = [
      { value: "engineering", label: "Engineering", group: "Product teams" },
      { value: "design", label: "Design", group: "Product teams" },
      { value: "operations", label: "Operations", group: "Business teams" },
      { value: "support", label: "Support", group: "Business teams" },
    ];
  if ([6, 27].includes(example))
    options = [
      { value: "starter", label: "Starter", description: "For individuals getting started" },
      { value: "businessPlan", label: "Business", description: "For growing teams" },
      { value: "enterprise", label: "Enterprise", description: "Advanced features for large organizations" },
    ];
  if (example === 16)
    options = [
      { value: "full", label: "Full access", description: "Manage access and content" },
      { value: "write", label: "Read and write", description: "Edit and publish content" },
      { value: "read", label: "Read only", description: "View content" },
      { value: "none", label: "No access", description: "Cannot view or edit content" },
    ];
  if ([17, 19, 23, 26].includes(example))
    options = [
      { value: "active", label: "Active", dot: "success", badge: example === 19 },
      { value: "pending", label: "Pending", dot: "warning", badge: example === 19 },
      { value: "inactive", label: "Inactive", dot: "error", badge: example === 19 },
      { value: "archived", label: "Archived", dot: "neutral", badge: example === 19 },
    ];
  if ([18, 29].includes(example))
    options = users.map((person) => ({
      value: person.id,
      label: person.name,
      avatar: person,
      description: example === 29 ? "Team member" : undefined,
    }));
  if (example === 25)
    options = [
      { value: "us", label: "United States" },
      { value: "gb", label: "United Kingdom" },
      { value: "de", label: "Germany" },
      { value: "fr", label: "France" },
      { value: "jp", label: "Japan" },
      { value: "au", label: "Australia" },
    ];
  if (example === 28)
    options = [
      { value: "america", label: "New York", offset: "UTC−5", group: "Americas" },
      { value: "europe", label: "London", offset: "UTC+0", group: "Europe" },
      { value: "asia", label: "Tokyo", offset: "UTC+9", group: "Asia" },
    ];
  if (example === 30)
    options = [
      { value: "urgent", label: "Urgent", badge: true, dot: "error" },
      { value: "high", label: "High", badge: true, dot: "warning" },
      { value: "medium", label: "Medium", badge: true, dot: "info" },
      { value: "low", label: "Low", badge: true, dot: "neutral" },
    ];
  if (example === 31)
    options = [
      { value: "sans", label: "Sans serif", font: "font-sans" },
      { value: "mono", label: "Monospace", font: "font-mono" },
      { value: "serif", label: "Serif", font: "font-serif" },
    ];
  if (example === 32)
    options = [
      { value: "documents", label: "Documents" },
      { value: "images", label: "Images" },
      { value: "code", label: "Code" },
    ];
  if (example === 33)
    options = [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium" },
      { value: "large", label: "Large" },
    ];
  if (example === 34)
    options = [
      { value: "private", label: "Private" },
      { value: "team", label: "Team" },
      { value: "public", label: "Public" },
    ];
  if (example === 35)
    options = [
      { value: "weekly", label: "Weekly" },
      { value: "monthly", label: "Monthly" },
      { value: "quarterly", label: "Quarterly" },
    ];
  if (example === 36)
    options = asyncReady
      ? [
          { value: "north", label: "North America" },
          { value: "europe", label: "Europe" },
          { value: "asia", label: "Asia Pacific" },
        ]
      : [];
  if (example === 37)
    options = [
      { value: "starter", label: "Starter" },
      { value: "business", label: "Business" },
      { value: "enterprise", label: "Enterprise" },
    ];
  if (example === 38)
    options = [
      { value: "platform", label: "Platform" },
      { value: "design", label: "Design" },
      { value: "operations", label: "Operations" },
    ];
  if (example === 39)
    options = [
      { value: "all", label: "All projects" },
      { value: "owned", label: "Owned by me" },
      { value: "shared", label: "Shared with me" },
    ];
  useEffect(() => {
    if (example !== 36 || !open || asyncReady) return;
    const timeout = window.setTimeout(() => {
      setAsyncReady(true);
    }, 650);
    return () => window.clearTimeout(timeout);
  }, [asyncReady, example, open]);
  const loading = example === 36 && open && !asyncReady;
  if ([37, 38, 39].includes(example)) {
    const initialValue = example === 37 ? "business" : (options[0]?.value ?? "");
    const inlineSelect = (
      <Select value={value || initialValue} onValueChange={setValue}>
        <SelectTrigger
          variant="inline"
          aria-label={example === 37 ? "Workspace plan" : example === 38 ? "Assigned team" : "Project filter"}
          icon={example === 39 ? <IconSelector className="size-4 text-muted-foreground" /> : undefined}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper" align="start">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
    return (
      <div className="w-full max-w-xl rounded-lg border bg-card p-5 text-sm leading-7">
        {example === 37 ? (
          <p>
            Your workspace is on the {inlineSelect} plan. Change the plan to update the features available to your team.
          </p>
        ) : example === 38 ? (
          <p className="flex flex-wrap items-center gap-1">
            <IconUsers aria-hidden="true" className="size-4 text-muted-foreground" />
            Assigned to the {inlineSelect} team.
          </p>
        ) : (
          <p>Showing {inlineSelect} in the current project list.</p>
        )}
      </div>
    );
  }
  const grouped = Array.from(new Set(options.map((option) => option.group)));
  const select = (
    <Select
      value={value}
      onValueChange={setValue}
      disabled={example === 10}
      required={example === 34}
      open={example === 36 ? open : undefined}
      onOpenChange={example === 36 ? setOpen : undefined}
    >
      <SelectTrigger
        id={id}
        aria-label={exampleTitles[example - 1]}
        aria-required={example === 34 || undefined}
        aria-invalid={example === 9 || undefined}
        aria-describedby={[8, 9].includes(example) ? `${id}-hint` : undefined}
        size={[5, 33].includes(example) ? "sm" : "default"}
        icon={example === 22 ? <IconSelector className="size-4 text-muted-foreground" /> : undefined}
        className={cn("w-full min-w-0", example !== 6 && "[&_[data-description]]:hidden")}
      >
        <SelectValue placeholder={"Select an option"} />
      </SelectTrigger>
      <SelectContent
        position={[7, 20].includes(example) ? "popper" : "item-aligned"}
        className="max-h-72 max-w-[calc(100vw-2rem)] motion-reduce:animate-none"
      >
        {example === 36 && loading && (
          <SelectItem value="loading" disabled>
            Loading options…
          </SelectItem>
        )}
        {grouped.map((group, index) => (
          <SelectGroup key={group ?? "default"}>
            {index > 0 && <SelectSeparator />}
            {group && <SelectLabel>{group}</SelectLabel>}
            {options
              .filter((option) => option.group === group)
              .map((option, optionIndex) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  textValue={option.label}
                  disabled={example === 7 && optionIndex === 2}
                  indicatorPosition={example === 20 ? "left" : "right"}
                  className={cn(option.font, example === 6 && "py-2")}
                >
                  {option.avatar && (
                    <Avatar size="xs">
                      <AvatarImage src={option.avatar.avatar} alt="" />
                      <AvatarFallback>{option.label[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  {example === 25 && <CountryFlag code={option.value} label={option.label} />}
                  {example === 2 && <IconCalendar aria-hidden />}
                  {example === 32 &&
                    (option.value === "images" ? (
                      <IconPhoto aria-hidden />
                    ) : option.value === "code" ? (
                      <IconCode aria-hidden />
                    ) : (
                      <IconFile aria-hidden />
                    ))}
                  {option.dot && !option.badge && <StatusDot color={option.dot} />}
                  <span
                    className={cn(
                      option.description && "flex flex-col",
                      option.badge && "inline-flex items-center gap-1.5 rounded border px-1.5 py-0.5 text-xs",
                    )}
                  >
                    {option.badge && <StatusDot color={option.dot} />}
                    <span>{option.label}</span>
                    {option.description && (
                      <small data-description className="text-xs text-muted-foreground">
                        {option.description}
                      </small>
                    )}
                  </span>
                  {option.offset && <span className="ml-auto pl-4 text-xs text-muted-foreground">{option.offset}</span>}
                </SelectItem>
              ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
  if (example === 11)
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">{"Open dialog"}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{"Choose an option"}</DialogTitle>
            <DialogDescription>{"Choose the value shown to workspace members."}</DialogDescription>
          </DialogHeader>
          {select}
        </DialogContent>
      </Dialog>
    );
  return (
    <div className={cn("w-full max-w-xs space-y-2", example === 35 && "rounded-lg bg-muted p-4")}>
      {[8, 9, 34].includes(example) && (
        <Label htmlFor={id}>{example === 34 ? "Workspace visibility (required)" : "Display preference"}</Label>
      )}
      <div className="flex min-w-0 items-center gap-2">
        {example === 13 && (
          <Input
            aria-label={"Search"}
            placeholder={"Search"}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="min-w-0"
          />
        )}
        {select}
        {example === 14 && (
          <Button
            onClick={() =>
              setFeedback(
                value ? (options.find((option) => option.value === value)?.label ?? "") : "Please choose an option.",
              )
            }
          >
            {"Apply"}
          </Button>
        )}
        {[21, 22].includes(example) && value && (
          <Button variant="ghost" size="icon-sm" aria-label={"Clear selection"} onClick={() => setValue("")}>
            <IconX aria-hidden />
          </Button>
        )}
      </div>
      {example === 12 && (
        <p role="status" className="text-xs text-muted-foreground">
          {value
            ? `Selected: ${options.find((option) => option.value === value)?.label ?? value}`
            : "No option selected."}
        </p>
      )}
      {[8, 9].includes(example) && (
        <p id={`${id}-hint`} className={cn("text-xs text-muted-foreground", example === 9 && "text-destructive")}>
          {example === 9 ? "Please choose an option." : "Choose the value shown to workspace members."}
        </p>
      )}
      {example === 14 && (
        <p role="status" className="text-xs text-muted-foreground">
          {feedback}
        </p>
      )}
      {example === 36 && (
        <p role="status" className="text-xs text-muted-foreground">
          {loading ? "Loading regions…" : asyncReady ? "Regions loaded." : "Options load when you open the menu."}
        </p>
      )}
    </div>
  );
}
