import { Label } from "@/components/ui/label";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { ComponentPreview, type ComponentPreviewLayout } from "@/examples/component-preview";

const sizeLabels: Record<number, string> = {
  1: "Small · 40%",
  2: "Medium · 60%",
  3: "Large · 80%",
};

const colorLabels: Record<number, string> = {
  11: "Neutral",
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
  { title: "Colors", examples: [11, 4, 5, 6, 7], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Sizes", examples: [1, 2, 3], stack: true, layout: "wide" as const, span: 2 as const },
  { title: "Indeterminate", examples: [8] },
  { title: "With Label", examples: [9] },
  { title: "With Value", examples: [12] },
  { title: "Custom SVG Props", examples: [10] },
];

export function ProgressCircleExamples() {
  return (
    <>
      {sections.map((section) => {
        const renderExample = (example: number) => <ProgressCircleExample example={example} />;
        const labelForExample = (example: number) => sizeLabels[example] ?? colorLabels[example];
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

export function ProgressCircleExample({ example }: { example: number }) {
  if (example === 1) return <ProgressCircle size="sm" value={40} aria-label="Small progress" />;
  if (example === 2) return <ProgressCircle value={60} aria-label="Medium progress" />;
  if (example === 3) return <ProgressCircle size="lg" value={80} aria-label="Large progress" />;
  if (example === 4) return <ProgressCircle value={50} aria-label="Accent progress" />;
  if (example === 5) return <ProgressCircle value={50} tone="success" aria-label="Success progress" />;
  if (example === 6) return <ProgressCircle value={50} tone="warning" aria-label="Warning progress" />;
  if (example === 7) return <ProgressCircle value={50} tone="error" aria-label="Danger progress" />;
  if (example === 8) return <ProgressCircle isIndeterminate aria-label="Loading" />;
  if (example === 9) {
    return (
      <div className="flex items-center gap-3">
        <ProgressCircle value={75} aria-labelledby="completed-progress-label" />
        <Label id="completed-progress-label">
          Completed <span className="tabular-nums">75%</span>
        </Label>
      </div>
    );
  }
  if (example === 10) {
    return (
      <div className="flex flex-wrap items-end gap-6">
        {[2, 4, 6].map((strokeWidth) => (
          <div key={strokeWidth} className="grid justify-items-center gap-2">
            <p className="text-xs font-medium text-muted-foreground">{strokeWidth} px stroke</p>
            <ProgressCircle
              value={60}
              strokeWidth={strokeWidth}
              aria-label={`Progress with ${strokeWidth} pixel stroke`}
            />
          </div>
        ))}
      </div>
    );
  }
  if (example === 11) return <ProgressCircle value={50} tone="neutral" aria-label="Neutral progress" />;
  if (example === 12) {
    return (
      <ProgressCircle size="lg" value={75} aria-label="Progress with value">
        {({ valueText }) => <span className="text-xs font-semibold tabular-nums">{valueText}</span>}
      </ProgressCircle>
    );
  }

  return null;
}
