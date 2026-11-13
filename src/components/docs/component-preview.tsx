"use client";

import { Children, createContext, type ReactNode, useContext, useEffect, useRef, useState } from "react";

import Link from "next/link";

import {
  Monitor as IconDeviceDesktop,
  Smartphone as IconDeviceMobile,
  Tablet as IconDeviceTablet,
  ExternalLink as IconExternalLink,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toolbar } from "@/components/ui/toolbar";
import { cn } from "@/lib/utils";

export type ComponentPreviewLayout =
  | "inline"
  | "field"
  | "panel"
  | "wide"
  | "fullBleed"
  | "stack"
  | "fullStack"
  | "grid2"
  | "grid3"
  | "grid4"
  | "fill"
  | "anchor";

const previewLayouts: Record<ComponentPreviewLayout, { content: string; preview: string }> = {
  inline: { content: "flex min-w-0 w-full flex-wrap items-start gap-4", preview: "" },
  field: {
    content: "flex min-w-0 w-full flex-wrap items-start gap-4",
    preview: "w-full max-w-sm",
  },
  panel: {
    content: "flex min-w-0 w-full flex-wrap items-start gap-4",
    preview: "w-full max-w-xl",
  },
  wide: {
    content: "flex min-w-0 w-full flex-wrap items-start gap-4",
    preview: "w-full max-w-4xl min-w-0 overflow-x-auto",
  },
  fullBleed: {
    content: "flex min-w-0 w-full flex-wrap items-start gap-4",
    preview: "w-full min-w-0",
  },
  stack: {
    content:
      "flex min-w-0 w-full flex-col items-stretch gap-4 @md/component-preview:flex-row @md/component-preview:flex-wrap",
    preview: "w-full",
  },
  fullStack: {
    content: "flex min-w-0 w-full flex-col items-stretch gap-4",
    preview: "w-full min-w-0",
  },
  grid2: { content: "grid w-full gap-4 sm:grid-cols-2", preview: "" },
  grid3: { content: "grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-3", preview: "" },
  grid4: { content: "grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4", preview: "" },
  fill: {
    content: "flex min-w-0 w-full flex-wrap items-start gap-4 [&>*]:w-full",
    preview: "",
  },
  anchor: { content: "flex min-w-0 w-full items-start gap-4", preview: "" },
};

export type PreviewViewport = "desktop" | "tablet" | "mobile";

const PreviewViewportContext = createContext<PreviewViewport>("desktop");

export function usePreviewViewport() {
  return useContext(PreviewViewportContext);
}

function findPageScroller(element: HTMLElement) {
  let ancestor = element.parentElement;
  while (ancestor) {
    const overflowY = window.getComputedStyle(ancestor).overflowY;
    if (/(auto|scroll|overlay)/.test(overflowY) && ancestor.scrollHeight > ancestor.clientHeight) {
      return ancestor;
    }
    ancestor = ancestor.parentElement;
  }

  return document.scrollingElement instanceof HTMLElement ? document.scrollingElement : document.documentElement;
}

export interface ComponentPreviewProps {
  title: string;
  standaloneHref?: string;
  children: ReactNode;
  className?: string;
  previewClassName?: string;
  layout?: ComponentPreviewLayout;
  span?: 1 | 2;
  exampleLabels?: readonly (string | undefined)[];
  bare?: boolean;
  density?: "default" | "chart";
  titleLevel?: 3 | 4;
}

export function ComponentPreview({
  title,
  standaloneHref,
  children,
  className = "",
  previewClassName,
  layout = "inline",
  span = 1,
  exampleLabels,
  bare = false,
  density = "default",
  titleLevel = 3,
}: ComponentPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState<PreviewViewport>("desktop");
  const Title = titleLevel === 4 ? "h4" : "h3";
  const previewChildren = exampleLabels
    ? Children.map(children, (child, index) => (
        <div
          className={cn(
            "grid min-w-0 gap-2",
            layout === "inline" ? "w-fit max-w-full" : "w-full",
            layout === "stack" && "@md/component-preview:w-[calc(50%-0.5rem)]",
          )}
        >
          {exampleLabels[index] ? (
            <p className="text-muted-foreground text-xs font-medium">{exampleLabels[index]}</p>
          ) : null}
          {child}
        </div>
      ))
    : layout === "stack"
      ? Children.map(children, (child) => (
          <div className="w-full min-w-0 @md/component-preview:w-[calc(50%-0.5rem)]">{child}</div>
        ))
      : children;

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;

    const cleanup = new Map<HTMLIFrameElement, () => void>();
    function connectIframe(frame: HTMLIFrameElement) {
      if (cleanup.has(frame)) return;

      function forwardWheel(event: WheelEvent) {
        if (!preview || event.ctrlKey) return;
        event.preventDefault();
        const multiplier =
          event.deltaMode === WheelEvent.DOM_DELTA_LINE
            ? 16
            : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
              ? frame.clientHeight
              : 1;
        findPageScroller(preview).scrollBy(event.deltaX * multiplier, event.deltaY * multiplier);
      }

      function attachListener() {
        try {
          frame.contentWindow?.addEventListener("wheel", forwardWheel, { passive: false });
        } catch {
          // Cross-origin previews cannot forward wheel input to the host page.
        }
      }

      frame.addEventListener("load", attachListener);
      attachListener();
      cleanup.set(frame, () => {
        frame.removeEventListener("load", attachListener);
        try {
          frame.contentWindow?.removeEventListener("wheel", forwardWheel);
        } catch {
          // The frame may have navigated to a cross-origin document.
        }
      });
    }

    preview.querySelectorAll("iframe").forEach(connectIframe);
    const observer = new MutationObserver(() => preview.querySelectorAll("iframe").forEach(connectIframe));
    observer.observe(preview, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanup.forEach((removeListeners) => {
        removeListeners();
      });
    };
  }, []);

  if (bare) {
    return <div className={cn(span === 2 && "xl:col-span-2", className)}>{previewChildren}</div>;
  }

  const contentClassName = cn(
    previewLayouts[layout].content,
    previewLayouts[layout].preview,
    previewClassName,
    viewport === "mobile" && (layout === "grid2" || layout === "grid3" || layout === "grid4") && "!grid-cols-1",
    viewport === "tablet" && (layout === "grid3" || layout === "grid4") && "!grid-cols-2",
    viewport !== "desktop" &&
      "border-border bg-background mx-auto w-full rounded-[var(--radius)] border p-4 shadow-sm sm:p-5",
    viewport === "tablet" && "max-w-[768px]",
    viewport === "mobile" && "max-w-[375px]",
  );

  return (
    <Card
      ref={previewRef}
      data-slot="component-preview"
      className={cn(
        "group/component-preview border-border/80 bg-card min-w-0 gap-0 overflow-hidden rounded-xl border p-0 py-0 shadow-none ring-0",
        "@container/component-preview",
        density === "chart" && "[--card-spacing:--spacing(4)]",
        span === 2 && "xl:col-span-2",
        className,
      )}
    >
      <CardHeader
        className={cn(
          "border-border/80 flex min-w-0 items-center gap-3 border-b px-4 py-2 sm:px-5",
          density === "chart" && "sm:px-4",
        )}
      >
        <CardTitle className="min-w-0 truncate text-sm leading-5 font-medium">
          <Title>{title}</Title>
        </CardTitle>
        <Toolbar aria-label="Preview controls" className="ml-auto shrink-0 gap-1">
          <div role="group" aria-label="Preview viewport" className="flex items-center gap-1">
            {(
              [
                ["desktop", "Desktop preview", IconDeviceDesktop],
                ["tablet", "Tablet preview", IconDeviceTablet],
                ["mobile", "Mobile preview", IconDeviceMobile],
              ] as const
            ).map(([value, label, Icon]) => (
              <Button
                key={value}
                type="button"
                size="icon-sm"
                variant={viewport === value ? "secondary" : "ghost"}
                aria-label={label}
                aria-pressed={viewport === value}
                title={label}
                onPress={() => setViewport(value)}
              >
                <Icon />
              </Button>
            ))}
          </div>
          {standaloneHref ? (
            <Link
              href={standaloneHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open standalone preview"
              title="Open standalone preview"
              className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
            >
              <IconExternalLink className="size-4" />
            </Link>
          ) : null}
        </Toolbar>
      </CardHeader>
      <CardContent
        className={cn(
          "min-h-0 min-w-0 overflow-auto p-4 md:px-6",
          standaloneHref && "p-0",
          density === "chart" && "p-5 md:px-5",
          standaloneHref && density === "default" && "md:px-0",
        )}
      >
        <PreviewViewportContext.Provider value={viewport}>
          <div className="contents">
            <div data-preview-viewport={viewport} className={cn("group/preview-viewport", contentClassName)}>
              {previewChildren}
            </div>
          </div>
        </PreviewViewportContext.Provider>
      </CardContent>
    </Card>
  );
}
