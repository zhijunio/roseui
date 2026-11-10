import { IconLoader2 as LoaderCircle } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function Spinner({ size = "default", color = "current", speed = "default", label = "Loading", className }: {
  size?: "sm" | "default" | "lg" | "xl";
  color?: "current" | "accent" | "success" | "warning" | "danger";
  speed?: "slow" | "default" | "fast";
  label?: string;
  className?: string;
}) {
  return <span role="status" aria-label={label} className="inline-flex items-center gap-2"><LoaderCircle aria-hidden="true" className={cn("motion-safe:animate-spin", size === "sm" && "size-4", size === "default" && "size-5", size === "lg" && "size-7", size === "xl" && "size-9", color === "current" && "text-current", color === "accent" && "text-primary", color === "success" && "text-success", color === "warning" && "text-warning", color === "danger" && "text-destructive", speed === "slow" && "motion-safe:animate-[spin_2s_linear_infinite]", speed === "fast" && "motion-safe:animate-[spin_0.6s_linear_infinite]", className)} /><span className="sr-only">{label}</span></span>;
}
