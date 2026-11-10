"use client";

import { ComponentPreview, type ComponentPreviewLayout } from "@/components/composite/component-preview";
import { Button } from "@/components/ui/button";
import { CloseButton } from "@/components/ui/close-button";
import { IconCircleX } from "@tabler/icons-react";
import { useState } from "react";

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
    title: "Sizes",
    examples: [1],
    layout: "wide" as const,
  },
  {
    title: "Custom Icon",
    examples: [2],
  },
  {
    title: "States",
    examples: [3, 4],
    layout: "field" as const,
    stack: true,
  },
];



export function CloseButtonExamples() {
  return <>{sections.map((section) => {
        const renderExample = (example: number) => <CloseButtonExample example={example} />;
        const isStack = section.stack === true;
        const layout = section.layout ?? (isStack ? "stack" : "inline");
        const columns = section.columns;
        const previewClassName = columns === 3
          ? "grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3"
          : columns === 2
            ? "grid items-stretch gap-4 sm:grid-cols-2"
            : isStack
              ? "flex-col flex-nowrap items-stretch gap-6"
              : undefined;
        return (
          <ComponentPreview previewId="close-button-01"
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
      })}</>;
}



export function CloseButtonExample({ example }: { example: number }) {
  const [visible, setVisible] = useState(true);

  if (example === 1) {
    return (
      <div className="flex flex-wrap items-center gap-4">
        {(["xs", "sm", "default"] as const).map((size) => (
          <span key={size} className="flex flex-col items-center gap-2">
            <CloseButton size={size} aria-label={"Close, " + size + " size"} />
            <span className="text-xs text-muted-foreground">{size}</span>
          </span>
        ))}
      </div>
    );
  }

  if (example === 2) {
    return (
      <CloseButton aria-label="Dismiss update" className="text-primary">
        <IconCircleX aria-hidden />
      </CloseButton>
    );
  }

  if (example === 3 && visible) {
    return (
      <div className="flex w-full items-start justify-between gap-3 rounded-lg border bg-card p-3">
        <div>
          <p className="text-sm font-medium">Draft saved</p>
          <p className="text-sm text-muted-foreground">Your changes are ready to publish.</p>
        </div>
        <CloseButton
          aria-label="Dismiss saved draft notice"
          onClick={() => setVisible(false)}
        />
      </div>
    );
  }

  if (example === 3) {
    return (
      <div className="flex items-center gap-3">
        <p role="status" className="text-sm text-muted-foreground">Notice dismissed.</p>
        <Button variant="outline" size="sm" onClick={() => setVisible(true)}>
          Restore
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Unavailable item</span>
      <CloseButton disabled aria-label="Close unavailable item" />
    </div>
  );
}
