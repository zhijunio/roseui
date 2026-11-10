import type { ComponentProps } from "react";
import { IconX as X } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type CloseButtonProps = Omit<ComponentProps<"button">, "aria-label"> & {
  "aria-label": string;
  size?: "xs" | "sm" | "default";
};

export function CloseButton({
  className,
  size = "sm",
  children,
  ...props
}: CloseButtonProps) {
  return (
    <button
      {...props}
      type="button"
      data-slot="close-button"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors motion-reduce:!transition-none hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        size === "xs" && "size-5 [&_svg]:size-3",
        size === "sm" && "size-6 [&_svg]:size-3.5",
        size === "default" && "size-8 [&_svg]:size-4",
        className,
      )}
    >
      {children ?? <X aria-hidden="true" />}
    </button>
  );
}
