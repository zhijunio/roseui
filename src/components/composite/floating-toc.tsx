"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type RefObject,
} from "react";
import { IconList } from "@tabler/icons-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Scrollspy } from "@/components/composite/scrollspy";
import { cn } from "@/lib/utils";

export type FloatingTocItem = {
  id: string;
  label: string;
  level?: 0 | 1 | 2 | 3;
  disabled?: boolean;
};

type FloatingTocProps = {
  items: FloatingTocItem[];
  placement?: "left" | "right";
  triggerMode?: "hover" | "press";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
  offset?: number;
  targetRef?: RefObject<HTMLElement | null>;
  ariaLabel?: string;
  className?: string;
};

function getScrollElement(target: HTMLElement | null): HTMLElement | null {
  if (!target) return null;
  if (target.matches('[data-slot="scroll-area-viewport"]')) return target;
  return (
    target.querySelector<HTMLElement>('[data-slot="scroll-area-viewport"]') ??
    target
  );
}

function FloatingToc({
  items,
  placement = "right",
  triggerMode = "hover",
  open,
  defaultOpen = false,
  onOpenChange,
  openDelay = 200,
  closeDelay = 300,
  offset = 0,
  targetRef,
  ariaLabel = "On this page",
  className,
}: FloatingTocProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const hoverTimer = useRef<number | null>(null);
  const keyboardOpen = useRef(false);
  const menuRef = useRef<HTMLElement | null>(null);
  const isOpen = open ?? internalOpen;

  useEffect(
    () => () => {
      if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current);
    },
    [],
  );

  function updateOpen(nextOpen: boolean) {
    if (open === undefined) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }

  function clearHoverTimer() {
    if (hoverTimer.current !== null) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  }

  function scheduleHover(nextOpen: boolean, delay: number) {
    clearHoverTimer();
    hoverTimer.current = window.setTimeout(() => {
      hoverTimer.current = null;
      updateOpen(nextOpen);
    }, delay);
  }

  function navigateTo(
    id: string,
    disabled: boolean | undefined,
    event: MouseEvent<HTMLAnchorElement>,
  ) {
    if (disabled) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    const section = document.getElementById(id);
    if (!section) return;

    const scrollElement = getScrollElement(targetRef?.current ?? null);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (scrollElement) {
      const top =
        section.getBoundingClientRect().top -
        scrollElement.getBoundingClientRect().top +
        scrollElement.scrollTop -
        offset;
      scrollElement.scrollTo({
        top: Math.max(0, top),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    } else {
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: Math.max(0, top),
        behavior: reducedMotion ? "auto" : "smooth",
      });
    }

    window.history.replaceState(window.history.state, "", `#${id}`);
    setActiveId(id);
    updateOpen(false);
  }

  const menu = (
    <nav ref={menuRef} aria-label={ariaLabel} className="grid gap-0.5">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-current={activeId === item.id ? "location" : undefined}
          aria-disabled={item.disabled || undefined}
          tabIndex={item.disabled ? -1 : undefined}
          onClick={(event) => navigateTo(item.id, item.disabled, event)}
          style={{ paddingInlineStart: `${8 + (item.level ?? 0) * 12}px` }}
          className={cn(
            "rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50",
            activeId === item.id && "bg-muted font-medium text-foreground",
            item.disabled && "pointer-events-none opacity-50",
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );

  const trigger = (
    <Popover open={isOpen} onOpenChange={updateOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={ariaLabel}
          aria-expanded={isOpen}
          onPointerEnter={() =>
            triggerMode === "hover" && scheduleHover(true, openDelay)
          }
          onPointerLeave={() =>
            triggerMode === "hover" && scheduleHover(false, closeDelay)
          }
          onClick={(event) => {
            if (triggerMode !== "hover") return;
            event.preventDefault();
            updateOpen(!isOpen);
          }}
          onKeyDown={(event) => {
            if (
              triggerMode === "hover" &&
              !isOpen &&
              ["ArrowDown", "Enter", " "].includes(event.key)
            ) {
              event.preventDefault();
              keyboardOpen.current = true;
              updateOpen(true);
            }
          }}
          className={cn(
            "flex min-w-8 flex-col items-center gap-2 rounded-full border border-border bg-background/90 p-2 shadow-sm backdrop-blur-sm outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50",
            placement === "left" ? "items-start" : "items-end",
          )}
        >
          {items.map((item) => (
            <span
              key={item.id}
              aria-hidden="true"
              data-active={activeId === item.id || undefined}
              style={{
                width:
                  activeId === item.id
                    ? 24
                    : Math.max(8, 18 - (item.level ?? 0) * 3),
              }}
              className={cn(
                "h-0.5 rounded-full bg-muted-foreground/50 transition-[width,background-color]",
                activeId === item.id && "bg-primary",
                "motion-reduce:transition-none",
              )}
            />
          ))}
          <IconList
            aria-hidden="true"
            className="size-4 text-muted-foreground"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side={placement === "right" ? "left" : "right"}
        align="center"
        onPointerEnter={clearHoverTimer}
        onPointerLeave={() =>
          triggerMode === "hover" && scheduleHover(false, closeDelay)
        }
        onFocusCapture={clearHoverTimer}
        onOpenAutoFocus={(event) => {
          if (!keyboardOpen.current) return;
          event.preventDefault();
          keyboardOpen.current = false;
          window.requestAnimationFrame(() =>
            menuRef.current
              ?.querySelector<HTMLAnchorElement>(
                "a:not([aria-disabled='true'])",
              )
              ?.focus(),
          );
        }}
        onBlurCapture={(event) => {
          if (
            !(event.relatedTarget instanceof Node) ||
            !event.currentTarget.contains(event.relatedTarget)
          ) {
            if (triggerMode === "hover") scheduleHover(false, closeDelay);
          }
        }}
        className="w-64 p-2"
      >
        {menu}
      </PopoverContent>
    </Popover>
  );

  return (
    <Scrollspy
      dataAttribute="floating-toc"
      targetRef={targetRef}
      offset={offset}
      history={false}
      onUpdate={setActiveId}
      className={cn(
        "fixed z-40",
        placement === "right"
          ? "bottom-4 right-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2"
          : "bottom-4 left-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2",
        className,
      )}
    >
      <div hidden aria-hidden="true">
        {items.map((item) => (
          <span key={item.id} data-floating-toc-anchor={item.id} />
        ))}
      </div>
      {trigger}
    </Scrollspy>
  );
}

export { FloatingToc };
