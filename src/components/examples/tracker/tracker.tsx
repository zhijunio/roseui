import { ComponentPreview } from "@/components/docs/component-preview";
import { Tracker, type TrackerBlockProps } from "@/components/roseui/tracker";

const statuses = [
  "success",
  "success",
  "success",
  "destructive",
  "success",
  "warning",
  ...Array.from({ length: 16 }, () => "success" as const),
  "warning",
  "success",
  "success",
  "success",
  "success",
  "success",
  "destructive",
  "success",
  ...Array.from({ length: 18 }, () => "success" as const),
] as const;

const data: TrackerBlockProps[] = statuses.map((variant, index) => {
  const time = new Date(Date.UTC(2025, 5, 24, index));
  const label = time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });
  return {
    key: String(index),
    label: `${variant} deployment at ${label} UTC`,
    variant,
    tooltip: `${variant} @ ${label}`,
  };
});

export function TrackerExamples() {
  return (
    <>
      <ComponentPreview title="Status and Timestamps" layout="panel">
        <div className="grid gap-2">
          <div>
            <p className="text-sm font-medium">Production deployments</p>
            <p className="text-muted-foreground text-xs">Recent deployments by hour</p>
          </div>
          <Tracker data={data} aria-label="Deployment outcomes over the last 48 hours" />
          <div className="text-muted-foreground flex justify-between text-xs">
            <span>Jun 24 · 00:00</span>
            <span>Jun 24 · 12:00</span>
            <span>Jun 25 · 23:00</span>
          </div>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Without tooltips" layout="panel">
        <Tracker data={data} aria-label="Deployment outcomes over the last 48 hours" disabledTooltip />
      </ComponentPreview>
    </>
  );
}
