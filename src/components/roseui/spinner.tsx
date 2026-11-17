"use client";

import type { SVGProps } from "react";

import * as Progress from "@radix-ui/react-progress";
import { Loader2 as LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export type SpinnerVariant = "default" | "ring" | "spin";
export type SpinnerSize = "sm" | "default" | "lg" | "xl";
export type SpinnerColor = "current" | "accent" | "success" | "warning" | "danger";
export type SpinnerSpeed = "slow" | "default" | "fast";

function Ring({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={cn("size-4", className)} {...props}>
      <path
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="3.636"
        d="M11.909 21a9.09 9.09 0 1 0 0-18.182 9.09 9.09 0 0 0 0 18.182Z"
      />
      <path
        fill="currentColor"
        d="M4.636 11.91a7.273 7.273 0 0 1 7.273-7.274V1C5.885 1 1 5.885 1 11.91zm1.819 4.81a7.24 7.24 0 0 1-1.819-4.81H1c0 2.764 1.032 5.294 2.727 7.215z"
      />
    </svg>
  );
}

function SegmentedSpin({
  className,
  isIndeterminate,
  ...props
}: SVGProps<SVGSVGElement> & { isIndeterminate: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 2400 2400" className={cn("size-4", className)} {...props}>
      <g strokeWidth="200" strokeLinecap="round" fill="none">
        <line x1="1200" y1="600" x2="1200" y2="100" />
        <line opacity="0.5" x1="1200" y1="2300" x2="1200" y2="1800" />
        <line opacity="0.917" x1="900" y1="680.4" x2="650" y2="247.4" />
        <line opacity="0.417" x1="1750" y1="2152.6" x2="1500" y2="1719.6" />
        <line opacity="0.833" x1="680.4" y1="900" x2="247.4" y2="650" />
        <line opacity="0.333" x1="2152.6" y1="1750" x2="1719.6" y2="1500" />
        <line opacity="0.75" x1="600" y1="1200" x2="100" y2="1200" />
        <line opacity="0.25" x1="2300" y1="1200" x2="1800" y2="1200" />
        <line opacity="0.667" x1="680.4" y1="1500" x2="247.4" y2="1750" />
        <line opacity="0.167" x1="2152.6" y1="650" x2="1719.6" y2="900" />
        <line opacity="0.583" x1="900" y1="1719.6" x2="650" y2="2152.6" />
        <line opacity="0.083" x1="1750" y1="247.4" x2="1500" y2="680.4" />
        {isIndeterminate && (
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            keyTimes="0;0.08333;0.16667;0.25;0.33333;0.41667;0.5;0.58333;0.66667;0.75;0.83333;0.91667"
            values="0 1199 1199;30 1199 1199;60 1199 1199;90 1199 1199;120 1199 1199;150 1199 1199;180 1199 1199;210 1199 1199;240 1199 1199;270 1199 1199;300 1199 1199;330 1199 1199"
            dur="0.83333s"
            begin="0.08333s"
            repeatCount="indefinite"
            calcMode="discrete"
          />
        )}
      </g>
    </svg>
  );
}

export function Spinner({
  size = "default",
  color = "current",
  speed = "default",
  variant = "default",
  mode = "status",
  label = "Loading",
  percentage,
  isIndeterminate = percentage === undefined,
  formatOptions,
  className,
}: {
  size?: SpinnerSize;
  color?: SpinnerColor;
  speed?: SpinnerSpeed;
  variant?: SpinnerVariant;
  mode?: "status" | "progress";
  label?: string;
  percentage?: number;
  isIndeterminate?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
  className?: string;
}) {
  const iconClassName = cn(
    "motion-safe:animate-spin",
    size === "sm" && "size-4",
    size === "default" && "size-5",
    size === "lg" && "size-7",
    size === "xl" && "size-9",
    color === "current" && "text-current",
    color === "accent" && "text-primary",
    color === "success" && "text-success",
    color === "warning" && "text-warning",
    color === "danger" && "text-destructive",
    speed === "slow" && "motion-safe:animate-[spin_2s_linear_infinite]",
    speed === "fast" && "motion-safe:animate-[spin_0.6s_linear_infinite]",
    variant === "ring" && isIndeterminate && "motion-safe:animate-spin",
    className,
  );
  const icon =
    variant === "ring" ? (
      <Ring className={iconClassName} />
    ) : variant === "spin" ? (
      <SegmentedSpin isIndeterminate={isIndeterminate} className={iconClassName} />
    ) : (
      <LoaderCircle aria-hidden="true" className={iconClassName} />
    );

  if (mode === "progress") {
    return (
      <Progress.Root data-slot="spinner" aria-label={label} value={percentage} max={100} className="inline-flex">
        <Progress.Indicator
          aria-hidden="true"
          className="inline-flex"
          style={{ transform: `translateX(-${isIndeterminate ? 100 : 100 - (percentage ?? 0)}%)` }}
        >
          {icon}
        </Progress.Indicator>
      </Progress.Root>
    );
  }

  return (
    <span data-slot="spinner" role="status" aria-label={label} className="inline-flex items-center gap-2">
      <span aria-hidden="true" className="inline-flex">
        {icon}
      </span>
      <span className="sr-only">{label}</span>
    </span>
  );
}
