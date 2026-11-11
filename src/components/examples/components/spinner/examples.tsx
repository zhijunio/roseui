"use client";

import { useEffect, useState } from "react";

import { ComponentPreview, type ComponentPreviewLayout } from "@/components/examples/component-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
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
  { title: "Appearance", examples: [12], columns: 3 as const },
  { title: "Sizes", examples: [1], columns: 3 as const },
  { title: "Speed", examples: [13], columns: 3 as const },
  { title: "In Controls", examples: [2, 3, 4, 6], columns: 3 as const },
  {
    title: "Loading States",
    examples: [5, 7, 8, 9, 10, 11],
    columns: 2 as const,
    layout: "wide" as const,
    span: 2 as const,
  },
];

export function SpinnerExamples() {
  return (
    <>
      {sections.map((section) => {
        const renderExample = (example: number) => <SpinnerExample example={example} />;
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

export function SpinnerExample({ example }: { example: number }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [loading]);
  const spinner = <Spinner label={"Loading"} size="sm" />;
  if (example === 1)
    return (
      <>
        {(["sm", "default", "lg", "xl"] as const).map((size) => (
          <Spinner key={size} label={"Loading"} size={size} />
        ))}
      </>
    );
  if (example === 2)
    return (
      <>
        <Button disabled>
          {spinner}
          {"Saving…"}
        </Button>
        <Button disabled variant="outline">
          {spinner}
          {"Loading"}
        </Button>
      </>
    );
  if (example === 3)
    return (
      <>
        <Badge variant="secondary">
          {spinner}
          {"Processing"}
        </Badge>
        <Badge variant="outline">
          {spinner}
          {"Syncing"}
        </Badge>
      </>
    );
  if (example === 4)
    return (
      <div className="relative w-full max-w-xs">
        <Input aria-label={"Search"} placeholder={"Search"} className="pr-10" />
        <span className="absolute top-2 right-3">{spinner}</span>
      </div>
    );
  if (example === 6)
    return (
      <Button onClick={() => setLoading(true)} disabled={loading} aria-busy={loading}>
        {loading && spinner}
        {loading ? "Saving…" : "Save changes"}
      </Button>
    );
  if (example === 9)
    return (
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        {spinner}
        {"Fetching records"}
      </p>
    );
  if (example === 10)
    return (
      <span role="status" aria-label={"Loading"} className="flex gap-1.5">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            aria-hidden
            className="size-2 rounded-full bg-primary motion-safe:animate-bounce"
            style={{ animationDelay: `${index * 120}ms` }}
          />
        ))}
      </span>
    );
  if (example === 12)
    return (
      <>
        {(["current", "accent", "success", "warning", "danger"] as const).map((color) => (
          <Spinner key={color} label={`${color} loading`} color={color} />
        ))}
      </>
    );
  if (example === 13)
    return (
      <>
        {(["slow", "default", "fast"] as const).map((speed) => (
          <div key={speed} className="grid justify-items-center gap-2">
            <Spinner label={`${speed} loading`} speed={speed} />
            <span className="text-xs text-muted-foreground">
              {speed === "default" ? "Default" : speed[0].toUpperCase() + speed.slice(1)}
            </span>
          </div>
        ))}
      </>
    );
  if ([7, 11].includes(example))
    return (
      <div className="relative w-full max-w-sm overflow-hidden rounded-lg border p-5" aria-busy="true">
        <div className="space-y-3">
          <p className="font-medium">{"Workspace report"}</p>
          <p className="text-sm text-muted-foreground">{"Your latest activity and usage summary."}</p>
          <Button variant="outline" disabled>
            {"Export"}
          </Button>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-background/85">{spinner}</div>
      </div>
    );
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-8 text-center",
        example === 8 && "min-h-72",
      )}
      aria-busy="true"
    >
      <Spinner label={"Loading"} size={example === 8 ? "lg" : "default"} />
      <p className="text-sm font-medium">{example === 8 ? "Loading workspace" : "Fetching records"}</p>
      <p className="text-xs text-muted-foreground">{"Please wait while your data loads."}</p>
    </div>
  );
}
