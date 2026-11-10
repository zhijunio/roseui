import type { ReactNode } from "react";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type StatCardProps = {
  label: ReactNode;
  value: ReactNode;
  change: ReactNode;
  trend: "up" | "down";
  hint: ReactNode;
};

export function StatCard({ label, value, change, trend, hint }: StatCardProps) {
  const positive = trend === "up";

  return (
    <Card data-trend={trend}>
      <CardContent className="space-y-2.5">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="flex min-w-0 items-end justify-between gap-3">
          <span className="min-w-0 truncate text-3xl font-semibold tracking-tight tabular-nums">
            {value}
          </span>
          <span
            aria-label={`${positive ? "Increased" : "Decreased"} by ${change}`}
            className={cn(
              "inline-flex shrink-0 items-center gap-1 text-xs font-medium tabular-nums",
              positive
                ? "text-success"
                : "text-destructive"
            )}
          >
            {positive ? (
              <IconTrendingUp aria-hidden="true" className="size-3.5" />
            ) : (
              <IconTrendingDown aria-hidden="true" className="size-3.5" />
            )}
            {change}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}
