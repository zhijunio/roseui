"use client";

import {
  Children,
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconMoon,
  IconRefresh,
  IconSun,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    content: "flex min-w-0 w-full flex-col items-stretch gap-4",
    preview: "w-full",
  },
  fullStack: {
    content: "flex min-w-0 w-full flex-col items-stretch gap-4",
    preview: "w-full min-w-0",
  },
  grid2: { content: "grid w-full gap-4 sm:grid-cols-2", preview: "" },
  grid3: { content: "grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-3", preview: "" },
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

export function ComponentPreview({
  title,
  children,
  className = "",
  previewClassName,
  layout = "inline",
  span = 1,
  exampleLabels,
  bare = false,
  density = "default",
}: {
  title: string;
  children: ReactNode;
  className?: string;
  previewClassName?: string;
  layout?: ComponentPreviewLayout;
  span?: 1 | 2;
  exampleLabels?: readonly (string | undefined)[];
  bare?: boolean;
  density?: "default" | "chart";
}) {
  const [viewport, setViewport] = useState<PreviewViewport>("desktop");
  const [fullscreen, setFullscreen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    useCallback(() => () => {}, []),
    useCallback(() => true, []),
    useCallback(() => false, []),
  );
  const previewChildren = exampleLabels
    ? Children.map(children, (child, index) => (
        <div className={cn("grid min-w-0 gap-2", layout === "inline" ? "w-fit max-w-full" : "w-full")}>
          {exampleLabels[index] ? (
            <p className="text-xs font-medium text-muted-foreground">{exampleLabels[index]}</p>
          ) : null}
          {child}
        </div>
      ))
    : children;

  useEffect(() => {
    if (!fullscreen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setFullscreen(false);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [fullscreen]);

  if (bare) {
    return <div className={cn(span === 2 && "xl:col-span-2", className)}>{previewChildren}</div>;
  }

  const contentClassName = cn(
    previewLayouts[layout].content,
    previewLayouts[layout].preview,
    previewClassName,
    viewport !== "desktop" &&
      "mx-auto w-full rounded-[var(--radius)] border border-border bg-background p-4 shadow-sm sm:p-5",
    viewport === "tablet" && "max-w-[768px]",
    viewport === "mobile" && "max-w-[375px]",
  );

  return (
    <Card
      data-slot="component-preview"
      data-preview-fullscreen={fullscreen ? "true" : undefined}
      className={cn(
        "group/component-preview min-w-0 gap-0 overflow-hidden rounded-xl border border-border/80 bg-card p-0 py-0 shadow-none ring-0 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-1 motion-safe:duration-200 motion-reduce:animate-none",
        fullscreen && "fixed inset-0 z-50 flex h-dvh w-full max-w-none rounded-none border-0 bg-background shadow-none",
        density === "chart" && "[--card-spacing:--spacing(4)]",
        span === 2 && "xl:col-span-2",
        className,
      )}
    >
      <CardHeader
        className={cn(
          "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border/80 p-4 md:px-6",
          density === "chart" && "md:px-5",
        )}
      >
        <CardTitle className="min-w-0 truncate text-sm font-medium leading-5">{title}</CardTitle>
        <div className="flex shrink-0 items-center gap-1" aria-label="Preview controls">
          <div className="flex items-center gap-0.5 rounded-md border border-border bg-muted/40 p-0.5">
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              aria-label={resolvedTheme === "dark" ? "Use light theme" : "Use dark theme"}
              title={resolvedTheme === "dark" ? "Light theme" : "Dark theme"}
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            >
              {mounted && resolvedTheme === "dark" ? <IconSun /> : <IconMoon />}
            </Button>
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              aria-label="Refresh preview"
              title="Refresh preview"
              onClick={() => setRefreshKey((value) => value + 1)}
            >
              <IconRefresh />
            </Button>
          </div>
          <div className="flex items-center gap-0.5 rounded-md border border-border bg-muted/40 p-0.5">
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
                size="icon-xs"
                variant={viewport === value ? "secondary" : "ghost"}
                aria-label={label}
                aria-pressed={viewport === value}
                title={label}
                onClick={() => setViewport(value)}
              >
                <Icon />
              </Button>
            ))}
            <span aria-hidden="true" className="mx-1 h-4 w-px bg-border" />
            <Button
              type="button"
              size="icon-xs"
              variant="ghost"
              aria-label={fullscreen ? "Exit full-screen preview" : "Open full-screen preview"}
              aria-pressed={fullscreen}
              title={fullscreen ? "Exit full screen" : "Full screen"}
              onClick={() => setFullscreen((value) => !value)}
            >
              {fullscreen ? <IconArrowsMinimize /> : <IconArrowsMaximize />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent
        className={cn(
          "min-h-0 min-w-0 overflow-auto p-4 md:px-6",
          density === "chart" && "p-5 md:px-5",
          fullscreen && "flex-1",
        )}
      >
        <PreviewViewportContext.Provider value={viewport}>
          <div className="contents">
            <div
              key={refreshKey}
              data-preview-viewport={viewport}
              className={cn("group/preview-viewport", contentClassName)}
            >
              {previewChildren}
            </div>
          </div>
        </PreviewViewportContext.Provider>
      </CardContent>
    </Card>
  );
}
