"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  IconApps,
  IconArrowRight,
  IconBook2,
  IconChevronDown,
  IconHistory,
  IconLayout,
  IconMenu2,
  IconPalette,
  IconRoute,
  IconX,
  type Icon,
} from "@tabler/icons-react";
import { ComponentPreview } from "@/components/composite/component-preview";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo-mark";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/composite/segmented-control";

type HeaderVariant = "mega" | "simple" | "centered";
type HeaderLink = readonly [label: string, description: string, icon: Icon];
type HeaderItem = {
  value: string;
  label: string;
  links?: readonly HeaderLink[];
};
const items: readonly HeaderItem[] = [
  {
    value: "product",
    label: "Product",
    links: [
      ["Components", "140 interactive React components", IconApps],
      ["Blocks", "Complete sections, ready to ship", IconLayout],
      ["Templates", "Starter sites with every page", IconRoute],
      ["Themes", "Tune color, radius, and motion", IconPalette],
    ],
  },
  {
    value: "resources",
    label: "Resources",
    links: [
      ["Documentation", "Install, theme, and compose", IconBook2],
      ["Guides", "Patterns for real product work", IconRoute],
      ["Changelog", "Every release, week by week", IconHistory],
      ["Community", "Questions, answers, and showcases", IconApps],
    ],
  },
  { value: "pricing", label: "Pricing" },
  { value: "customers", label: "Customers" },
] as const;

function SiteHeaderPreview({ variant }: { variant: HeaderVariant }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState("product");
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion() ?? false;
  const currentLabel =
    items.find((item) => item.value === current)?.label ?? "Northstar";
  const currentItem = items.find((item) => item.value === open);

  useEffect(() => {
    if (!open && !mobileOpen) return;
    function closeOnEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
        setExpanded(null);
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open, mobileOpen]);

  function moveNav(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const buttons = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        "[data-header-nav-item]",
      ),
    );
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (index < 0) return;
    event.preventDefault();
    const next =
      (index + (event.key === "ArrowRight" ? 1 : -1) + buttons.length) %
      buttons.length;
    buttons[next]?.focus();
  }

  return (
    <div
      ref={scroller}
      onScroll={() => setScrolled((scroller.current?.scrollTop ?? 0) > 8)}
      className="relative h-[640px] w-full overflow-y-auto rounded-2xl border bg-background [scrollbar-color:var(--border-strong)_transparent]"
    >
      <header
        onMouseLeave={() => setOpen(null)}
        className={`sticky top-0 z-30 border-b transition-colors ${scrolled || open || mobileOpen ? "border-border bg-background/95 shadow-sm backdrop-blur-sm" : "border-transparent bg-transparent"}`}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div
            className={
              variant === "centered"
                ? "grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3"
                : "flex h-16 items-center gap-3"
            }
          >
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-base font-medium"
            >
              <LogoMark />
              <span>Northstar</span>
            </Link>
            <nav
              onKeyDown={moveNav}
              className={
                variant === "centered"
                  ? "hidden rounded-full border bg-muted/60 p-1 md:block"
                  : "ml-2 hidden md:block"
              }
              aria-label="Main navigation"
            >
              <ul className="flex items-center gap-0.5">
                {items.map((item) => {
                  const hasPanel = variant === "mega" && Boolean(item.links);
                  const active = current === item.value;
                  return (
                    <li key={item.value}>
                      <button
                        data-header-nav-item
                        type="button"
                        aria-expanded={
                          hasPanel ? open === item.value : undefined
                        }
                        aria-haspopup={hasPanel ? "true" : undefined}
                        aria-controls={
                          hasPanel ? "site-header-mega-menu" : undefined
                        }
                        onFocus={() => {
                          if (hasPanel) setOpen(item.value);
                        }}
                        onMouseEnter={() => {
                          if (hasPanel) setOpen(item.value);
                        }}
                        onClick={() => {
                          setCurrent(item.value);
                          setOpen(
                            hasPanel
                              ? open === item.value
                                ? null
                                : item.value
                              : null,
                          );
                        }}
                        className={`relative inline-flex h-9 items-center gap-1 rounded-xl px-3 text-sm font-medium transition-colors hover:text-foreground ${variant === "centered" ? "rounded-full" : ""} ${active ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {item.label}
                        {hasPanel && (
                          <IconChevronDown
                            size={14}
                            className={`transition-transform ${open === item.value ? "rotate-180" : ""}`}
                          />
                        )}
                        {active && (
                          <motion.span
                            layoutId={`header-active-${variant}`}
                            className={
                              variant === "centered"
                                ? "absolute inset-0 -z-10 rounded-full border bg-background shadow-sm"
                                : "absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary"
                            }
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="ml-auto hidden items-center gap-2 sm:flex">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
              <Button size="sm">Get started</Button>
            </div>
            <button
              type="button"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="site-header-mobile-menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="ml-auto grid size-9 place-items-center rounded-xl hover:bg-muted sm:hidden"
            >
              {mobileOpen ? <IconX size={19} /> : <IconMenu2 size={19} />}
            </button>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {open && currentItem?.links && variant === "mega" && (
            <motion.div
              id="site-header-mega-menu"
              role="region"
              aria-label={`${currentItem.label} navigation`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: reduce ? 0 : 0.22 }}
              className="hidden overflow-hidden border-t md:block"
            >
              <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_240px] gap-3 px-6 py-3">
                <div className="grid grid-cols-2 gap-1">
                  {currentItem.links.map(([label, description, Icon]) => (
                    <Link
                      key={label}
                      href="#"
                      onClick={() => setOpen(null)}
                      className="flex gap-3 rounded-xl p-3 hover:bg-muted"
                    >
                      <Icon
                        size={17}
                        className="mt-0.5 shrink-0 text-muted-foreground"
                      />
                      <span>
                        <span className="block text-sm font-medium">
                          {label}
                        </span>
                        <span className="mt-1 block text-xs text-muted-foreground">
                          {description}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="#"
                  className="grid content-start gap-1 rounded-xl bg-muted/70 p-3"
                >
                  <span className="mb-5 text-xs font-medium text-primary">
                    New this month
                  </span>
                  <span className="text-sm font-medium">
                    Headers, footers, and hero sections
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                    Explore <IconArrowRight size={13} />
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="site-header-mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t bg-background px-6 py-2 sm:hidden"
            >
              <ul>
                {items.map((item) => (
                  <li
                    key={item.value}
                    className="border-b border-border-subtle last:border-0"
                  >
                    {variant === "mega" && item.links ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={expanded === item.value}
                          onClick={() =>
                            setExpanded(
                              expanded === item.value ? null : item.value,
                            )
                          }
                          className="flex w-full items-center justify-between py-3 text-left text-sm font-medium"
                        >
                          {item.label}
                          <IconChevronDown
                            size={17}
                            className={
                              expanded === item.value ? "rotate-180" : ""
                            }
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded === item.value && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pb-2"
                            >
                              {item.links.map(([label, description, Icon]) => (
                                <li key={label}>
                                  <Link
                                    href="#"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-muted-foreground"
                                  >
                                    <Icon size={16} />
                                    {label}
                                    <span className="sr-only">
                                      {description}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href="#"
                        onClick={() => {
                          setCurrent(item.value);
                          setMobileOpen(false);
                        }}
                        className="flex items-center justify-between py-3 text-sm font-medium"
                      >
                        {item.label}
                        {current === item.value && (
                          <span className="size-1.5 rounded-full bg-primary" />
                        )}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-2 py-4">
                <Button variant="outline">Sign in</Button>
                <Button>Get started</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <main className="-mt-16 min-h-[1000px]">
        <section className="grid justify-items-center gap-3 bg-muted/40 px-6 pb-20 pt-36 text-center">
          <h2 className="text-4xl font-medium tracking-tight">
            {currentLabel}
          </h2>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            A calm, flexible workspace for teams shipping meaningful work.
          </p>
        </section>
        <section className="grid gap-3 p-6 sm:grid-cols-3">
          {[
            "Plan together",
            "Ship confidently",
            "Learn quickly",
            "Keep context",
            "Make progress",
            "Share clearly",
          ].map((item) => (
            <div
              key={item}
              className="h-28 rounded-2xl border border-border bg-card/60"
              aria-label={item}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export function SiteHeaderExamples() {
  const [variant, setVariant] = useState<HeaderVariant>("mega");
  return (
    <ComponentPreview
      previewId="headers-and-footers-site-header-01"
      title="Website header"
      layout="fullBleed"
    >
      <div className="grid w-full justify-items-center gap-5">
        <SegmentedControl
          aria-label="Header layout"
          value={variant}
          onValueChange={(value) => {
            if (value === "mega" || value === "simple" || value === "centered")
              setVariant(value);
          }}
        >
          <SegmentedControlItem value="mega">Mega menu</SegmentedControlItem>
          <SegmentedControlItem value="simple">Simple</SegmentedControlItem>
          <SegmentedControlItem value="centered">Centered</SegmentedControlItem>
        </SegmentedControl>
        <SiteHeaderPreview variant={variant} />
      </div>
    </ComponentPreview>
  );
}
