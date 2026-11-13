"use client";

import { ToggleButton } from "react-aria-components/ToggleButton";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ShowMoreProps extends Omit<React.ComponentProps<typeof ToggleButton>, "className"> {
  className?: string;
  orientation?: "horizontal" | "vertical";
  as?: "text" | "button";
  text?: string;
}

export function ShowMore({ as = "button", orientation = "horizontal", className, text, ...props }: ShowMoreProps) {
  return (
    <div
      className={cn(
        "text-sm leading-6 before:border-border after:border-border",
        orientation === "vertical"
          ? "mx-2 flex h-auto flex-col items-center self-stretch before:mb-2 before:flex-1 before:border-l after:mt-2 after:flex-1 after:border-r"
          : "my-2 flex w-full items-center self-stretch before:me-2 before:flex-1 before:border-t after:ms-2 after:flex-1 after:border-t",
        className,
      )}
    >
      {as === "button" ? (
        <ToggleButton
          {...props}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "group/show-more")}
        />
      ) : (
        <span className="bg-background px-2 text-muted-foreground">{text}</span>
      )}
    </div>
  );
}
