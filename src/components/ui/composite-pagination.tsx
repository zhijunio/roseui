import type * as React from "react";

import {
  IconChevronLeft as ChevronLeft,
  IconChevronRight as ChevronRight,
  IconDots as MoreHorizontal,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
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
function PaginationLink({
  className,
  isActive,
  isDisabled = false,
  size = "icon",
  onClick,
  tabIndex,
  ...props
}: {
  isActive?: boolean;
  isDisabled?: boolean;
  size?: React.ComponentProps<typeof Button>["size"];
} & React.ComponentProps<"a">) {
  return (
    <Button
      asChild
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(isDisabled && "aria-disabled:pointer-events-none aria-disabled:opacity-50", className)}
    >
      <a
        {...props}
        aria-current={isActive ? "page" : undefined}
        aria-disabled={isDisabled || undefined}
        tabIndex={isDisabled ? -1 : tabIndex}
        onClick={(event) => {
          if (isDisabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
      />
    </Button>
  );
}
function PaginationPrevious({
  className,
  text = "Previous",
  showIcon = true,
  icon,
  ...props
}: ({
  isActive?: boolean;
  isDisabled?: boolean;
  size?: React.ComponentProps<typeof Button>["size"];
} & React.ComponentProps<"a">) & {
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
}: ({
  isActive?: boolean;
  isDisabled?: boolean;
  size?: React.ComponentProps<typeof Button>["size"];
} & React.ComponentProps<"a">) & {
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
