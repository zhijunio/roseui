"use client";

import * as React from "react";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X as IconX } from "lucide-react";

import { cn } from "@/lib/utils";

type SheetProps = React.ComponentProps<typeof DialogPrimitive.Root>;
function Sheet(props: SheetProps) {
  return <DialogPrimitive.Root {...props} />;
}

function SheetTrigger({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" className={className} {...props} />;
}

function SheetClose({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="sheet-close" className={className} {...props} />;
}

function SheetPortal(props: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal {...props} />;
}

function SheetOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-overlay duration-200 supports-backdrop-filter:backdrop-blur-xs data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 motion-reduce:!animate-none motion-reduce:!transition-none",
        className,
      )}
      {...props}
    />
  );
}

type SheetContentProps = Omit<React.ComponentProps<typeof DialogPrimitive.Content>, "children" | "className"> & {
  children?: React.ReactNode;
  detached?: boolean;
  disableEscapeClose?: boolean;
  dismissible?: boolean;
  onPointerCancel?: React.PointerEventHandler<HTMLDivElement>;
  onPointerDown?: React.PointerEventHandler<HTMLDivElement>;
  onPointerDownOutside?: React.ComponentProps<typeof DialogPrimitive.Content>["onPointerDownOutside"];
  onPointerUp?: React.PointerEventHandler<HTMLDivElement>;
  overlayClassName?: string;
  showCloseButton?: boolean;
  showOverlay?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  swipeDirection?: "up" | "right" | "down" | "left";
  swipeThreshold?: number;
  className?: string;
};

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  showOverlay = true,
  dismissible = true,
  detached = false,
  disableEscapeClose = false,
  swipeDirection,
  swipeThreshold = 72,
  overlayClassName,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onEscapeKeyDown,
  onPointerDownOutside,
  ...props
}: SheetContentProps) {
  const pointerStart = React.useRef<{ x: number; y: number } | null>(null);
  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    onPointerDown?.(event);
    if (
      event.defaultPrevented ||
      !dismissible ||
      !swipeDirection ||
      (event.pointerType === "mouse" && event.button !== 0)
    )
      return;
    if (
      !(event.target instanceof Element) ||
      event.target.closest("[data-sheet-no-swipe],input,textarea,select,[contenteditable=true]")
    )
      return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };
  const handlePointerUp: React.PointerEventHandler<HTMLDivElement> = (event) => {
    onPointerUp?.(event);
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || !dismissible || !swipeDirection || event.defaultPrevented) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    const distance =
      swipeDirection === "left" ? -dx : swipeDirection === "right" ? dx : swipeDirection === "up" ? -dy : dy;
    const crossAxis = swipeDirection === "left" || swipeDirection === "right" ? Math.abs(dy) : Math.abs(dx);
    if (distance < swipeThreshold || distance <= crossAxis) return;
    const target = event.currentTarget;
    const openChange = new Event("sheetdismiss");
    target.dispatchEvent(openChange);
    target.closest("[data-radix-dialog-content]")?.dispatchEvent(new CustomEvent("sheet:close"));
  };
  const handlePointerCancel: React.PointerEventHandler<HTMLDivElement> = (event) => {
    pointerStart.current = null;
    onPointerCancel?.(event);
  };
  const closeRef = React.useRef<HTMLButtonElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const close = () => closeRef.current?.click();
    content.addEventListener("sheet:close", close);
    return () => content.removeEventListener("sheet:close", close);
  }, []);
  return (
    <DialogPrimitive.Portal>
      {showOverlay && <SheetOverlay className={overlayClassName} />}
      <DialogPrimitive.Content
        {...props}
        ref={contentRef}
        data-slot="sheet-content"
        data-side={side}
        data-detached={detached || undefined}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onEscapeKeyDown={(event) => {
          onEscapeKeyDown?.(event);
          if (!dismissible || disableEscapeClose || event.defaultPrevented) event.preventDefault();
        }}
        onPointerDownOutside={(event) => {
          onPointerDownOutside?.(event);
          if (!dismissible || event.defaultPrevented) event.preventDefault();
        }}
        className={cn(
          "fixed z-50 flex flex-col gap-4 rounded-[var(--radius)] bg-background bg-clip-padding text-sm text-foreground shadow-lg transition duration-200 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[side=bottom][data-state=open]:slide-in-from-bottom-10 data-[side=left][data-state=open]:slide-in-from-left-10 data-[side=right][data-state=open]:slide-in-from-right-10 data-[side=top][data-state=open]:slide-in-from-top-10 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[side=bottom][data-state=closed]:slide-out-to-bottom-10 data-[side=left][data-state=closed]:slide-out-to-left-10 data-[side=right][data-state=closed]:slide-out-to-right-10 data-[side=top][data-state=closed]:slide-out-to-top-10 data-[detached=true]:rounded-[var(--radius)] motion-reduce:!animate-none motion-reduce:!transition-none",
          className,
        )}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            ref={closeRef}
            data-slot="sheet-close"
            aria-label="Close panel"
            className="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <IconX className="size-4" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-header" className={cn("flex flex-col gap-0.5 p-4", className)} {...props} />;
}
function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-footer" className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />;
}
function SheetTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn("font-heading text-base font-medium text-foreground", className)}
      {...props}
    />
  );
}
function SheetDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
