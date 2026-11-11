import { cn } from "@/lib/utils"

function Skeleton({ className, animationType = "pulse", ...props }: React.ComponentProps<"div"> & {
  animationType?: "pulse" | "shimmer" | "none"
}) {
  return (
    <div
      data-slot="skeleton"
      data-animation={animationType}
      className={cn(
        "rounded-md bg-muted",
        animationType === "pulse" && "motion-safe:animate-pulse",
        animationType === "shimmer" && "bg-[linear-gradient(90deg,var(--muted)_25%,color-mix(in_oklch,var(--muted),var(--foreground)_12%)_50%,var(--muted)_75%)] bg-[length:200%_100%] motion-safe:animate-skeleton-shimmer",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
