import type * as React from "react";

import { cn } from "@/lib/utils";

const headingElements = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
} as const;

type HeadingProps = React.ComponentProps<"h1"> & {
  level?: keyof typeof headingElements;
};

function Heading({ className, level = 1, ...props }: HeadingProps) {
  const Element = headingElements[level];

  return (
    <Element
      data-slot="heading"
      className={cn(
        "font-heading font-semibold tracking-tight text-foreground",
        level === 1 && "text-2xl leading-8 sm:text-3xl sm:leading-9",
        level === 2 && "text-xl leading-7 sm:text-2xl sm:leading-8",
        level === 3 && "text-lg leading-7",
        level === 4 && "text-base leading-6",
        className,
      )}
      {...props}
    />
  );
}

export type { HeadingProps };
export { Heading };
