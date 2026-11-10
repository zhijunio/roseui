"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function ScrollArea({
  orientation = "vertical",
  fadeEdges = false,
  className,
  children,
  onScroll,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  orientation?: "vertical" | "horizontal" | "both"
  fadeEdges?: boolean
}) {
  const [viewport, setViewport] = React.useState<HTMLDivElement | null>(null)
  const [visibleEdges, setVisibleEdges] = React.useState({
    top: false,
    right: false,
    bottom: false,
    left: false,
  })

  const updateVisibleEdges = React.useCallback(() => {
    if (!viewport || !fadeEdges) return

    setVisibleEdges({
      top: orientation !== "horizontal" && viewport.scrollTop > 0,
      right:
        orientation !== "vertical" &&
        viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 1,
      bottom:
        orientation !== "horizontal" &&
        viewport.scrollTop + viewport.clientHeight < viewport.scrollHeight - 1,
      left: orientation !== "vertical" && viewport.scrollLeft > 0,
    })
  }, [fadeEdges, orientation, viewport])

  React.useEffect(() => {
    if (!fadeEdges || !viewport) return

    const resizeObserver = new ResizeObserver(updateVisibleEdges)
    resizeObserver.observe(viewport)
    if (viewport.firstElementChild) resizeObserver.observe(viewport.firstElementChild)

    const mutationObserver = new MutationObserver(updateVisibleEdges)
    mutationObserver.observe(viewport, { childList: true, subtree: true, characterData: true })

    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [fadeEdges, updateVisibleEdges, viewport])

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    updateVisibleEdges()
    onScroll?.(event)
  }

  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={setViewport}
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        onScroll={handleScroll}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {fadeEdges && (
        <>
          {visibleEdges.top && (
            <div
              aria-hidden
              data-slot="scroll-area-fade-top"
              className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-background to-transparent"
            />
          )}
          {visibleEdges.right && (
            <div
              aria-hidden
              data-slot="scroll-area-fade-right"
              className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-background to-transparent"
            />
          )}
          {visibleEdges.bottom && (
            <div
              aria-hidden
              data-slot="scroll-area-fade-bottom"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-background to-transparent"
            />
          )}
          {visibleEdges.left && (
            <div
              aria-hidden
              data-slot="scroll-area-fade-left"
              className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-background to-transparent"
            />
          )}
        </>
      )}
      {orientation === "both" ? (
        <>
          <ScrollBar orientation="vertical" />
          <ScrollBar orientation="horizontal" />
        </>
      ) : (
        <ScrollBar orientation={orientation} />
      )}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
