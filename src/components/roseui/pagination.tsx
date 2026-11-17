"use client";

import type * as React from "react";

import { ChevronLeft, ChevronRight, Ellipsis as MoreHorizontal } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
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

type PaginationLinkProps = Omit<React.ComponentProps<"a">, "className" | "aria-current" | "disabled" | "onClick"> & {
  children?: React.ReactNode;
  href?: string;
  isActive?: boolean;
  disabled?: boolean;
  size?: React.ComponentProps<typeof Button>["size"];
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

function PaginationLink({
  className,
  isActive,
  disabled = false,
  size = "icon",
  href,
  children,
  onClick,
  "aria-label": ariaLabel,
  id,
  title,
  tabIndex,
  target,
  rel,
  download,
  ...props
}: PaginationLinkProps) {
  const linkClassName = cn(
    buttonVariants({ variant: isActive ? "outline" : "ghost", size }),
    "max-md:min-h-11 max-md:min-w-11",
    disabled && "pointer-events-none opacity-50",
    isActive && "forced-colors:border-[Highlight] forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]",
    className,
  );
  if (href) {
    return (
      <a
        {...props}
        id={id}
        title={title}
        tabIndex={tabIndex}
        target={target}
        rel={rel}
        download={download}
        href={href}
        onClick={(event) => onClick?.(event)}
        aria-label={ariaLabel}
        aria-current={isActive ? "page" : undefined}
        aria-disabled={disabled || undefined}
        className={linkClassName}
      >
        {children}
      </a>
    );
  }
  return (
    <Button
      id={id}
      title={title}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      aria-current={isActive ? "page" : undefined}
      disabled={disabled}
      onClick={(event) => onClick?.(event)}
      className={linkClassName}
    >
      {children}
    </Button>
  );
}

function PaginationPrevious({
  className,
  text = "Previous",
  showIcon = true,
  icon,
  ...props
}: Omit<PaginationLinkProps, "children"> & { text?: string; showIcon?: boolean; icon?: React.ReactNode }) {
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
}: Omit<PaginationLinkProps, "children"> & { text?: string; showIcon?: boolean; icon?: React.ReactNode }) {
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
