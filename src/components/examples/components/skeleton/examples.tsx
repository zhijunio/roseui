"use client";

import { type ReactNode, useState } from "react";

import { ComponentPreview, type ComponentPreviewLayout } from "@/components/examples/component-preview";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

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
  { title: "Text", examples: [1, 3, 7, 10], columns: 2 as const },
  { title: "Cards", examples: [2, 6, 8], columns: 2 as const },
  { title: "Pages", examples: [4, 5, 9], stack: true, layout: "wide" as const, span: 2 as const },
];

export function SkeletonExamples() {
  return (
    <>
      {sections.map((section) => {
        const renderExample = (example: number) => <SkeletonExample example={example} label="Loading content" />;
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
      <ComponentPreview title="Animation Types" layout="grid3">
        {[
          { label: "Pulse", animationType: "pulse" as const },
          { label: "Shimmer", animationType: "shimmer" as const },
          { label: "Static", animationType: "none" as const },
        ].map(({ label, animationType }) => (
          <div key={label} aria-hidden="true" className="min-w-0 space-y-3">
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <Skeleton animationType={animationType} className="h-4 w-3/4" />
            <Skeleton animationType={animationType} className="h-3 w-full" />
            <Skeleton animationType={animationType} className="h-3 w-1/2" />
          </div>
        ))}
      </ComponentPreview>
      <ComponentPreview title="States">
        <LoadingExample />
      </ComponentPreview>
    </>
  );
}

export function LoadingExample() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full max-w-md space-y-4">
      <div aria-busy={loading} className="min-h-20">
        {loading ? (
          <div aria-hidden="true" className="flex items-center gap-4 py-1">
            <Skeleton className="size-12 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-36 max-w-full" />
              <Skeleton className="h-3 w-24 max-w-full" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 py-1">
            <div
              aria-hidden="true"
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary"
            >
              MC
            </div>
            <div>
              <p className="text-sm font-medium">Maya Chen</p>
              <p className="text-sm text-muted-foreground">{"Design lead"}</p>
            </div>
          </div>
        )}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={() => setLoading((current) => !current)}>
        {loading ? "Show loaded content" : "Show loading state"}
      </Button>
    </div>
  );
}

function TextLines() {
  return (
    <div className="min-w-0 flex-1 space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="min-w-0 space-y-4 rounded-lg border p-4">
      <Skeleton className="aspect-video w-full" />
      <TextLines />
      <div className="flex justify-between gap-3">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="size-8" />
      </div>
    </div>
  );
}

export function SkeletonExample({ example, label }: { example: number; label: string }) {
  let content: ReactNode;
  if (example === 1)
    content = (
      <div className="flex items-center gap-4">
        <Skeleton className="size-12 rounded-full" />
        <TextLines />
      </div>
    );
  else if (example === 2) content = <CardSkeleton />;
  else if (example === 3)
    content = (
      <div className="space-y-5">
        <Skeleton className="h-6 w-1/2" />
        <TextLines />
        <TextLines />
      </div>
    );
  else if (example === 4)
    content = (
      <div className="space-y-5">
        {[0, 1, 2].map((index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className={index === 2 ? "h-24 w-full" : "h-9 w-full"} />
          </div>
        ))}
        <Skeleton className="h-9 w-24" />
      </div>
    );
  else if (example === 5)
    content = (
      <div className="overflow-hidden rounded-lg border">
        <div className="flex gap-4 border-b bg-muted/30 p-3">
          {[0, 1, 2].map((index) => (
            <Skeleton key={index} className="h-3 min-w-0 flex-1" />
          ))}
        </div>
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="flex items-center gap-4 border-b p-3 last:border-b-0">
            <Skeleton className="size-7 rounded-full" />
            <Skeleton className="h-3 min-w-0 flex-1" />
            <Skeleton className="h-3 w-1/4" />
            <Skeleton className="h-5 w-12" />
          </div>
        ))}
      </div>
    );
  else if (example === 6)
    content = (
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((index) => (
          <div key={index} className="min-w-0 space-y-3 rounded-lg border p-3">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    );
  else if (example === 7)
    content = (
      <div>
        <div className="mb-4 flex justify-between">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-8 w-20" />
        </div>
        <Separator />
        {[0, 1, 2].map((index) => (
          <div key={index} className="flex items-center gap-3 border-b py-3 last:border-0">
            <Skeleton className="size-9 rounded-full" />
            <TextLines />
            <Skeleton className="h-7 w-12" />
          </div>
        ))}
      </div>
    );
  else if (example === 8)
    content = (
      <div className="grid gap-4 sm:grid-cols-2">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  else if (example === 9)
    content = (
      <div className="space-y-5">
        <div className="flex flex-col items-center gap-3 rounded-lg border p-5">
          <Skeleton className="size-20 rounded-full" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-40" />
          <div className="mt-2 flex gap-5">
            {[0, 1, 2].map((index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-5 w-10" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 rounded-lg border p-4">
          <Skeleton className="h-4 w-24" />
          <Separator />
          {[0, 1, 2].map((index) => (
            <div key={index} className="flex justify-between gap-4">
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  else
    content = (
      <div className="space-y-5 rounded-lg border p-4">
        {[0, 1, 2].map((index) => (
          <div key={index} className={index === 1 ? "flex justify-end" : "flex gap-3"}>
            {index !== 1 && <Skeleton className="size-8 rounded-full" />}
            <div className="w-3/4 space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton
                className={
                  index === 1 ? "h-12 w-full rounded-lg rounded-tr-none" : "h-16 w-full rounded-lg rounded-tl-none"
                }
              />
              <Skeleton className="h-2 w-10" />
            </div>
          </div>
        ))}
        <div className="flex gap-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="size-9" />
        </div>
      </div>
    );
  return (
    <div role="status" aria-label={label} aria-busy="true" className="w-full max-w-lg">
      <div aria-hidden="true">{content}</div>
      <span className="sr-only">{label}</span>
    </div>
  );
}
