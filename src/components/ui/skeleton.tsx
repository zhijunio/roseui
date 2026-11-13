import { cn } from "@/lib/utils"

function Skeleton({ className, animationType = "pulse", isLoading = false, children, ...props }: React.ComponentProps<"div"> & {
  animationType?: "pulse" | "shimmer" | "none"
  isLoading?: boolean
}) {
  const isComposition = isLoading && children !== undefined

  return (
    <div
      data-slot="skeleton"
      data-animation={animationType}
      data-loading={isLoading || undefined}
      aria-busy={isLoading || undefined}
      className={cn(
        !isComposition && "rounded-md bg-muted",
        !isComposition && animationType === "pulse" && "motion-safe:animate-pulse",
        !isComposition && animationType === "shimmer" &&
          "bg-[linear-gradient(90deg,var(--muted)_25%,var(--border)_50%,var(--muted)_75%)] bg-[length:200%_100%] motion-safe:animate-skeleton-shimmer",
        isComposition && [
          "pointer-events-none select-none",
          "[&_*:not(:has(*)):not([data-slot=avatar])]:rounded-md [&_*:not(:has(*)):not([data-slot=avatar])]:bg-secondary [&_*:not(:has(*)):not([data-slot=avatar])]:text-transparent [&_*:not(:has(*)):not([data-slot=avatar])]:shadow-none [&_*:not(:has(*)):not([data-slot=avatar])]:motion-safe:animate-pulse",
          "**:data-[slot=avatar]:bg-secondary **:data-[slot=avatar]:outline-none **:data-[slot=avatar]:motion-safe:animate-pulse",
          "[&_img]:border-0 [&_img]:bg-secondary [&_img]:text-transparent [&_img]:shadow-none [&_img]:[content-visibility:hidden]",
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Skeleton }
