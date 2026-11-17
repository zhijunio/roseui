"use client";

import type { ReactNode } from "react";
import * as React from "react";

export type ListLayoutOptions = { rowHeight?: number; rowSize?: number; gap?: number; padding?: number };

export class ListLayout {
  constructor(public options: ListLayoutOptions = {}) {}
}

export class GridLayout extends ListLayout {}
export class TableLayout extends ListLayout {}

type VirtualizerLayout = typeof ListLayout | ListLayout;
type VirtualizerContextValue = {
  rowSize: number;
  gap: number;
  padding: number;
  scrollTop: number;
  viewportHeight: number;
  elementRef: React.RefObject<HTMLElement | null>;
  setViewport: (scrollTop: number, viewportHeight: number) => void;
  registerViewport: (element: HTMLElement | null) => void;
};

const VirtualizerContext = React.createContext<VirtualizerContextValue | null>(null);
const INITIAL_VIEWPORT_HEIGHT = 320;
const OVERSCAN = 3;

export function useVirtualizer(itemCount: number) {
  const context = React.useContext(VirtualizerContext);
  if (!context) return null;

  const rowExtent = context.rowSize + context.gap;
  const visibleCount = Math.ceil(context.viewportHeight / rowExtent) + OVERSCAN * 2;
  const start = Math.min(
    Math.max(0, Math.floor(context.scrollTop / rowExtent) - OVERSCAN),
    Math.max(0, itemCount - visibleCount),
  );
  const end = Math.min(itemCount, start + visibleCount);
  const focusIndex = (index: number) => {
    const element = context.elementRef.current;
    if (!element || index < 0 || index >= itemCount) return;
    element.scrollTop = Math.max(0, context.padding + index * rowExtent - rowExtent * 2);
    context.setViewport(element.scrollTop, element.clientHeight || INITIAL_VIEWPORT_HEIGHT);
    window.requestAnimationFrame(() => element.querySelector<HTMLElement>(`[data-virtual-index="${index}"]`)?.focus());
  };

  return {
    start,
    end,
    topPadding: context.padding + start * rowExtent,
    bottomPadding: context.padding + (itemCount - end) * rowExtent,
    onScroll: (event: React.UIEvent<HTMLElement>) => {
      context.setViewport(event.currentTarget.scrollTop, event.currentTarget.clientHeight);
    },
    registerViewport: context.registerViewport,
    focusIndex,
  };
}

export function Virtualizer({
  children,
  layout,
  layoutOptions,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  children?: ReactNode;
  layout?: VirtualizerLayout;
  layoutOptions?: ListLayoutOptions;
}) {
  const options = React.useMemo(() => {
    const layoutDefaults = typeof layout === "function" ? new layout().options : layout?.options;
    return { ...layoutDefaults, ...layoutOptions };
  }, [layout, layoutOptions]);
  const [viewport, setViewport] = React.useState({ scrollTop: 0, viewportHeight: INITIAL_VIEWPORT_HEIGHT });
  const elementRef = React.useRef<HTMLElement | null>(null);
  const updateViewport = React.useCallback((scrollTop: number, viewportHeight: number) => {
    setViewport((current) =>
      current.scrollTop === scrollTop && current.viewportHeight === viewportHeight
        ? current
        : { scrollTop, viewportHeight },
    );
  }, []);
  const registerViewport = React.useCallback(
    (element: HTMLElement | null) => {
      elementRef.current = element;
      if (element) updateViewport(element.scrollTop, element.clientHeight || INITIAL_VIEWPORT_HEIGHT);
    },
    [updateViewport],
  );
  const context = React.useMemo<VirtualizerContextValue>(
    () => ({
      rowSize: Math.max(1, options.rowHeight ?? options.rowSize ?? 40),
      gap: Math.max(0, options.gap ?? 0),
      padding: Math.max(0, options.padding ?? 0),
      ...viewport,
      elementRef,
      setViewport: updateViewport,
      registerViewport,
    }),
    [options, registerViewport, updateViewport, viewport],
  );

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() =>
      updateViewport(element.scrollTop, element.clientHeight || INITIAL_VIEWPORT_HEIGHT),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [registerViewport, updateViewport]);

  return (
    <VirtualizerContext.Provider value={context}>
      <div data-slot="virtualizer" className={className} {...props}>
        {children}
      </div>
    </VirtualizerContext.Provider>
  );
}
