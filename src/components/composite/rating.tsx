"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import { IconStar } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

export type RatingSize = "sm" | "default" | "lg";
export type RatingColor = "primary" | "warning" | "success";

export type RatingIconRenderProps = {
  value: number;
  isActive: boolean;
  isPartial: boolean;
  partialPercent: number;
};

type RatingValueProps =
  | { rating: number; defaultRating?: never; onRatingChange?: (rating: number) => void }
  | { rating?: never; defaultRating?: number; onRatingChange?: (rating: number) => void };

const sizeClasses: Record<RatingSize, { gap: string; star: string; value: string }> = {
  sm: { gap: "gap-1", star: "size-4", value: "text-xs" },
  default: { gap: "gap-1.5", star: "size-5", value: "text-sm" },
  lg: { gap: "gap-2", star: "size-6", value: "text-base" },
};

function Rating({
  rating,
  defaultRating,
  maxRating = 5,
  size = "default",
  color = "primary",
  showValue = false,
  editable = false,
  disabled = false,
  step = 1,
  onRatingChange,
  icon,
  className,
  starClassName,
  "aria-label": ariaLabel,
  ...props
}: Omit<ComponentProps<"div">, "onChange"> & RatingValueProps & {
  maxRating?: number;
  size?: RatingSize;
  color?: RatingColor;
  showValue?: boolean;
  editable?: boolean;
  disabled?: boolean;
  step?: 0.5 | 1;
  icon?: ReactNode | ((props: RatingIconRenderProps) => ReactNode);
  starClassName?: string;
}) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [uncontrolledRating, setUncontrolledRating] = useState(defaultRating ?? 0);
  const maximum = Number.isFinite(maxRating) ? Math.max(1, Math.floor(maxRating)) : 5;
  const isControlled = rating !== undefined;
  const currentRating = isControlled ? rating : uncontrolledRating;
  const value = Number.isFinite(currentRating) ? Math.min(maximum, Math.max(0, currentRating)) : 0;
  const interactive = editable && !disabled && (!isControlled || onRatingChange !== undefined);
  const displayRating = interactive && hoveredRating !== null ? hoveredRating : value;
  const classes = sizeClasses[size];
  const activeColorClass = color === "warning" ? "text-warning" : color === "success" ? "text-success" : "text-primary";
  const accessibleLabel = ariaLabel ?? (interactive ? "Choose a rating" : `${value.toFixed(1)} out of ${maximum} stars`);

  function chooseRating(nextRating: number) {
    if (!interactive) return;
    const nextValue = Math.min(maximum, Math.max(0, nextRating));
    if (!isControlled) setUncontrolledRating(nextValue);
    onRatingChange?.(nextValue);
  }

  function getPointerRating(clientX: number, element: HTMLButtonElement, index: number) {
    if (step === 1) return index + 1;
    const { left, width } = element.getBoundingClientRect();
    const fraction = (clientX - left) / width;
    return index + (fraction < 0.5 ? 0.5 : 1);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      chooseRating(Math.min(maximum, value + step));
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      chooseRating(Math.max(0, value - step));
    }
  }

  return (
    <div
      {...props}
      data-slot="rating"
      data-disabled={disabled || undefined}
      role={interactive ? "group" : "img"}
      aria-label={accessibleLabel}
      aria-disabled={disabled || undefined}
      className={cn("inline-flex min-w-0 items-center", classes.gap, disabled && "opacity-50", className)}
      onPointerLeave={() => setHoveredRating(null)}
    >
      <div className={cn("inline-flex items-center", classes.gap)}>
        {Array.from({ length: maximum }, (_, index) => {
          const fill = Math.min(100, Math.max(0, (displayRating - index) * 100));
          const renderIcon = (isActive: boolean) => {
            const iconProps: RatingIconRenderProps = { value: index + 1, isActive, isPartial: fill > 0 && fill < 100, partialPercent: fill };
            const content = typeof icon === "function" ? icon(iconProps) : icon ?? <IconStar />;
            return <span aria-hidden="true" className={cn("inline-flex size-full items-center justify-center [&_svg]:size-full [&_svg]:fill-current", isActive ? activeColorClass : "text-muted-foreground/40", starClassName)}>{content}</span>;
          };
          const star = (
            <span className={cn("relative inline-flex shrink-0", classes.star)}>
              {renderIcon(false)}
              {fill > 0 && <span className="absolute inset-y-0 start-0 overflow-hidden" style={{ width: `${fill}%` }}>{renderIcon(true)}</span>}
            </span>
          );

          if (!interactive) return <span key={index}>{star}</span>;

          return (
            <button
              key={index}
              type="button"
              aria-label={step === 0.5 ? `Set rating to ${index + 0.5} or ${index + 1} out of ${maximum}` : `Set rating to ${index + 1} out of ${maximum}`}
              aria-pressed={displayRating === index + 1}
              className={cn("inline-flex shrink-0 items-center justify-center rounded-sm border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", classes.star)}
              onPointerMove={(event) => setHoveredRating(getPointerRating(event.clientX, event.currentTarget, index))}
              onClick={(event) => chooseRating(event.detail === 0 ? index + 1 : getPointerRating(event.clientX, event.currentTarget, index))}
              onKeyDown={handleKeyDown}
            >
              {star}
            </button>
          );
        })}
      </div>
      {showValue && <span data-slot="rating-value" className={cn("w-8 tabular-nums text-muted-foreground", classes.value)}>{displayRating.toFixed(1)}</span>}
    </div>
  );
}

export { Rating };
