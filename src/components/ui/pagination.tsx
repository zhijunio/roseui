"use client";

import type * as React from "react";
import { Button as ButtonPrimitive } from "react-aria-components/Button";
import { Link as LinkPrimitive, type LinkProps as AriaLinkProps } from "react-aria-components/Link";

import { ChevronLeft, ChevronRight, Ellipsis as MoreHorizontal } from "lucide-react";

import { buttonVariants, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />;
}
function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("flex items-center gap-0.5", className)} {...props} />;
}
function PaginationItem(props: React.ComponentProps<"li">) {
  return <li {...props} />;
}
type PaginationLinkProps = Omit<AriaLinkProps, "className" | "isDisabled" | "isCurrent" | "children" | "render"> & {
  children?: React.ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  size?: ButtonProps["size"];
  className?: string;
};

function PaginationLink({
  className,
  isActive,
  isDisabled = false,
  size = "icon",
  href,
  onPress,
  ...props
}: PaginationLinkProps) {
  const { children, "aria-label": ariaLabel } = props;
  const sharedProps = {
    ...props,
    isDisabled,
    className: cn(
      buttonVariants({ variant: isActive ? "outline" : "ghost", size }),
      "max-md:min-h-11 max-md:min-w-11",
      isDisabled && "aria-disabled:pointer-events-none aria-disabled:opacity-50",
      isActive && "forced-colors:border-[Highlight] forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
      className,
    ),
    "aria-current": isActive ? ("page" as const) : undefined,
    "aria-disabled": isDisabled || undefined,
  };
  if (onPress) {
    return (
      <ButtonPrimitive
        aria-label={ariaLabel}
        aria-current={isActive ? "page" : undefined}
        aria-disabled={isDisabled || undefined}
        isDisabled={isDisabled}
        onPress={onPress}
        className={sharedProps.className}
      >
        {children}
      </ButtonPrimitive>
    );
  }
  return <LinkPrimitive {...sharedProps} href={href} />;
}
function PaginationPrevious({
  className,
  text = "Previous",
  showIcon = true,
  icon,
  ...props
}: Omit<PaginationLinkProps, "children"> & {
  text?: string;
  showIcon?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <PaginationLink aria-label="Go to previous page" size="default" className={cn("pl-1.5", className)} {...props}>
      {showIcon && (icon ?? <ChevronLeft aria-hidden="true" />)}
      {text && <span className={showIcon ? "hidden sm:block" : undefined}>{text}</span>}
    </PaginationLink>
  );
}
function PaginationNext({
  className,
  text = "Next",
  showIcon = true,
  icon,
  ...props
}: Omit<PaginationLinkProps, "children"> & {
  text?: string;
  showIcon?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <PaginationLink aria-label="Go to next page" size="default" className={cn("pr-1.5", className)} {...props}>
      {text && <span className={showIcon ? "hidden sm:block" : undefined}>{text}</span>}
      {showIcon && (icon ?? <ChevronRight aria-hidden="true" />)}
    </PaginationLink>
  );
}
function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn("flex size-9 items-center justify-center", className)} {...props}>
      <MoreHorizontal aria-hidden="true" className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
