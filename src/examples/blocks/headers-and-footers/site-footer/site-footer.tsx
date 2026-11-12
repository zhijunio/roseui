"use client";

import { type FormEvent, useState } from "react";

import Link from "next/link";

import { IconArrowUpRight, IconBrandGithub, IconBrandLinkedin, IconBrandX, IconCheck } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo-mark";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { ComponentPreview } from "@/examples/component-preview";

type FooterVariant = "columns" | "minimal" | "logo";
const columns = [
  { title: "Product", links: ["Components", "Blocks", "Templates", "Pricing"] },
  {
    title: "Resources",
    links: ["Documentation", "Changelog", "Guides", "Figma kit"],
  },
  { title: "Company", links: ["About", "Customers", "Careers", "Contact"] },
];

function LargeLogoMark() {
  return (
    <div className="flex h-auto w-full justify-center text-[240px] leading-[.55] font-semibold tracking-[-0.08em]">
      N
    </div>
  );
}

function FooterLink({ label, external = false }: { label: string; external?: boolean }) {
  return (
    <Link
      href="#"
      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
    >
      {label}
      {external && <IconArrowUpRight size={13} />}
    </Link>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const reduce = useReducedMotion() ?? false;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state !== "idle") return;
    if (!email.includes("@") || !email.includes(".")) {
      setError("That email doesn't look right");
      return;
    }
    setError(null);
    setState("loading");
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    setState("done");
  }

  const message = state === "done" ? `Check ${email} to confirm` : (error ?? "One email a month. Unsubscribe anytime.");
  return (
    <form onSubmit={submit} className="mt-5 grid max-w-[400px] gap-2" noValidate>
      <h2 className="text-sm font-medium">Get the monthly release notes</h2>
      <div
        className={`bg-background flex h-10 items-center gap-2 rounded-lg border p-1 pl-3 transition-colors ${error ? "border-destructive" : "focus-within:border-foreground"}`}
      >
        <label htmlFor="footer-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-describedby="footer-email-message"
          aria-invalid={Boolean(error)}
          placeholder="you@example.com"
          value={email}
          readOnly={state !== "idle"}
          onChange={(event) => {
            setEmail(event.target.value);
            setError(null);
          }}
          className="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
        <Button type="submit" size="sm" disabled={state !== "idle"}>
          {state === "done" ? (
            <>
              <IconCheck size={15} /> Subscribed
            </>
          ) : state === "loading" ? (
            "Subscribing…"
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.p
          id="footer-email-message"
          aria-live="polite"
          key={message}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: reduce ? 0 : 0.16 }}
          className={`min-h-5 text-xs ${error ? "text-destructive" : state === "done" ? "text-success" : "text-muted-foreground"}`}
        >
          {message}
        </motion.p>
      </AnimatePresence>
    </form>
  );
}

function SiteFooterPreview({ variant }: { variant: FooterVariant }) {
  const reduce = useReducedMotion() ?? false;
  const logo = (
    <span className="inline-flex items-center gap-2">
      <LogoMark />
      <span className="text-base font-medium">RoseUI</span>
    </span>
  );
  const status = (
    <span className="text-muted-foreground inline-flex items-center gap-2 text-sm">
      <span className="bg-success ring-success/15 size-2 rounded-full ring-4" />
      All systems normal
    </span>
  );
  const socials = (
    <div className="text-muted-foreground flex items-center gap-4">
      <Link href="#" aria-label="RoseUI on X">
        <IconBrandX size={15} />
      </Link>
      <Link href="#" aria-label="RoseUI on GitHub">
        <IconBrandGithub size={15} />
      </Link>
      <Link href="#" aria-label="RoseUI on LinkedIn">
        <IconBrandLinkedin size={15} />
      </Link>
    </div>
  );
  if (variant === "minimal")
    return (
      <footer className="bg-background grid gap-6 border-t px-6 py-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-5">
          {logo}
          <nav>
            <ul className="flex flex-wrap gap-4 sm:gap-6">
              {["Components", "Documentation", "About", "Privacy", "Terms"].map((label) => (
                <li key={label}>
                  <FooterLink label={label} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-5">
          <span className="text-muted-foreground text-sm">© 2026 RoseUI. A focused workspace for teams.</span>
          <div className="flex flex-wrap items-center gap-5">
            {status}
            {socials}
          </div>
        </div>
      </footer>
    );
  return (
    <footer className="bg-background overflow-hidden border-t px-6 pt-10 pb-0 sm:px-8">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_1.25fr]">
        <div>
          <div>{logo}</div>
          <p className="text-muted-foreground mt-3 max-w-xs text-sm leading-6">
            A focused workspace for teams that care about the details.
          </p>
          <Newsletter />
        </div>
        <nav className="grid grid-cols-2 gap-8 sm:grid-cols-3" aria-label="Footer">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-3 text-sm font-medium">{column.title}</h2>
              <ul className="grid gap-2">
                {column.links.map((label) => (
                  <li key={label}>
                    <FooterLink label={label} external={label === "Figma kit"} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t py-5">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="text-muted-foreground text-sm">© 2026 RoseUI</span>
          <nav className="flex gap-4">
            {["Privacy", "Terms", "Licenses"].map((label) => (
              <FooterLink key={label} label={label} />
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          {status}
          {socials}
        </div>
      </div>
      {variant === "logo" && (
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduce ? 0 : 0.3 }}
          className="text-primary/10 -mx-6 mt-4 h-32 overflow-hidden px-5 sm:-mx-8"
        >
          <LargeLogoMark />
        </motion.div>
      )}
    </footer>
  );
}

export function SiteFooterExamples() {
  const [variant, setVariant] = useState<FooterVariant>("columns");
  return (
    <ComponentPreview title="Website footer" layout="fullBleed">
      <div className="grid w-full justify-items-center gap-5">
        <SegmentedControl
          aria-label="Footer layout"
          value={variant}
          onValueChange={(value) => {
            if (value === "columns" || value === "minimal" || value === "logo") setVariant(value);
          }}
        >
          <SegmentedControlItem value="columns">Columns</SegmentedControlItem>
          <SegmentedControlItem value="minimal">Minimal</SegmentedControlItem>
          <SegmentedControlItem value="logo">Logo</SegmentedControlItem>
        </SegmentedControl>
        <div className="bg-background w-full overflow-hidden rounded-2xl border">
          <SiteFooterPreview variant={variant} />
        </div>
      </div>
    </ComponentPreview>
  );
}
