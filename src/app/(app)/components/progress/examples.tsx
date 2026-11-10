"use client";

import { ComponentPreview, type ComponentPreviewLayout } from "@/components/composite/component-preview";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const sizeLabels: Record<number, string> = {
  1: "Small · 40%",
  2: "Medium · 60%",
  3: "Large · 80%",
};



const colorLabels: Record<number, string> = {
  12: "Neutral",
  4: "Accent",
  5: "Success",
  6: "Warning",
  7: "Danger",
};



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
  { title: "Colors", examples: [12, 4, 5, 6, 7], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Sizes", examples: [1, 2, 3], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Indeterminate", examples: [8], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Custom Value Scale", examples: [9], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Without Label", examples: [10], layout: "wide" as const, span: 2 as const },
  { title: "Custom Styles", examples: [11], stack: true, layout: "wide" as const, span: 2 as const },
];



export function ProgressExamples() {
  return <>{sections.map((section) => {
        const renderExample = (example: number) => <ProgressExample example={example} />;
        const labelForExample = (example: number) => sizeLabels[example] ?? colorLabels[example];
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
          <ComponentPreview previewId="progress-01"
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
      })}</>;
}



export function ProgressExample({ example }: { example: number }) {
  const [value, setValue] = useState(125);

  if (example === 1) return <Progress size="sm" value={40} aria-label="Small progress" />;
  if (example === 2) return <Progress size="md" value={60} aria-label="Medium progress" />;
  if (example === 3) return <Progress size="lg" value={80} aria-label="Large progress" />;
  if (example === 4) return <Progress value={50} tone="accent" aria-label="Accent progress" />;
  if (example === 5) return <Progress value={50} tone="success" aria-label="Success progress" />;
  if (example === 6) return <Progress value={50} tone="warning" aria-label="Warning progress" />;
  if (example === 7) return <Progress value={50} tone="error" aria-label="Danger progress" />;
  if (example === 8) {
    return (
      <div className="w-full space-y-2">
        <p className="text-sm">Loading...</p>
        <Progress value={null} aria-label="Loading" />
      </div>
    );
  }
  if (example === 9) {
    const percentage = Math.round(((value - 50) / 200) * 100);

    return (
      <div className="w-full space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span>Progress</span>
          <span className="tabular-nums">{percentage}%</span>
        </div>
        <Progress value={value} minValue={50} maxValue={250} aria-label="Custom value scale progress" />
        <Slider
          label="Adjust value"
          min={50}
          max={250}
          step={10}
          value={value}
          onValueChange={setValue}
          formatValue={(nextValue) => `${nextValue} of 250`}
        />
      </div>
    );
  }
  if (example === 10) {
    return <Progress value={45} aria-label="Loading progress" className="w-64" />;
  }
  if (example === 11) {
    return (
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Uploading resume.pdf</span>
          <span className="tabular-nums">45%</span>
        </div>
        <Progress
          value={45}
          aria-label="Upload progress"
          className="h-3 rounded-full [&>[data-slot=progress-indicator]]:rounded-full"
        />
      </div>
    );
  }
  if (example === 12) return <Progress value={50} tone="neutral" aria-label="Neutral progress" />;

  return null;
}
