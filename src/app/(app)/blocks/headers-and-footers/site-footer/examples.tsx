"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconCheck,
} from "@tabler/icons-react";
import { ComponentPreview } from "@/components/composite/component-preview";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/ui/logo-mark";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/composite/segmented-control";

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
    <div className="flex h-auto w-full justify-center text-[240px] font-semibold leading-[.55] tracking-[-0.08em]">
      N
    </div>
  );
}

function FooterLink({
  label,
  external = false,
}: {
  label: string;
  external?: boolean;
}) {
  return (
    <Link
      href="#"
      className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
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

  const message =
    state === "done"
      ? `Check ${email} to confirm`
      : (error ?? "One email a month. Unsubscribe anytime.");
  return (
    <form
      onSubmit={submit}
      className="mt-5 grid max-w-[400px] gap-2"
      noValidate
    >
      <h2 className="text-sm font-medium">Get the monthly release notes</h2>
      <div
        className={`flex h-10 items-center gap-2 rounded-lg border bg-background p-1 pl-3 transition-colors ${error ? "border-destructive" : "focus-within:border-foreground"}`}
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
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
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
      <span className="text-base font-medium">Northstar</span>
    </span>
  );
  const status = (
    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <span className="size-2 rounded-full bg-success ring-4 ring-success/15" />
      All systems normal
    </span>
  );
  const socials = (
    <div className="flex items-center gap-4 text-muted-foreground">
      <Link href="#" aria-label="Northstar on X">
        <IconBrandX size={15} />
      </Link>
      <Link href="#" aria-label="Northstar on GitHub">
        <IconBrandGithub size={15} />
      </Link>
      <Link href="#" aria-label="Northstar on LinkedIn">
        <IconBrandLinkedin size={15} />
      </Link>
    </div>
  );
  if (variant === "minimal")
    return (
      <footer className="grid gap-6 border-t bg-background px-6 py-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-5">
          {logo}
          <nav>
            <ul className="flex flex-wrap gap-4 sm:gap-6">
              {["Components", "Documentation", "About", "Privacy", "Terms"].map(
                (label) => (
                  <li key={label}>
                    <FooterLink label={label} />
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-5">
          <span className="text-sm text-muted-foreground">
            © 2026 Northstar. A focused workspace for teams.
          </span>
          <div className="flex flex-wrap items-center gap-5">
            {status}
            {socials}
          </div>
        </div>
      </footer>
    );
  return (
    <footer className="overflow-hidden border-t bg-background px-6 pb-0 pt-10 sm:px-8">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_1.25fr]">
        <div>
          <div>{logo}</div>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
            A focused workspace for teams that care about the details.
          </p>
          <Newsletter />
        </div>
        <nav
          className="grid grid-cols-2 gap-8 sm:grid-cols-3"
          aria-label="Footer"
        >
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-3 text-sm font-medium">{column.title}</h2>
              <ul className="grid gap-2">
                {column.links.map((label) => (
                  <li key={label}>
                    <FooterLink
                      label={label}
                      external={label === "Figma kit"}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t py-5">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="text-sm text-muted-foreground">
            © 2026 Northstar
          </span>
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
          className="-mx-6 mt-4 h-32 overflow-hidden px-5 text-primary/10 sm:-mx-8"
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
    <ComponentPreview
      previewId="headers-and-footers-site-footer-01"
      title="Website footer"
      layout="fullBleed"
    >
      <div className="grid w-full justify-items-center gap-5">
        <SegmentedControl
          aria-label="Footer layout"
          value={variant}
          onValueChange={(value) => {
            if (value === "columns" || value === "minimal" || value === "logo")
              setVariant(value);
          }}
        >
          <SegmentedControlItem value="columns">Columns</SegmentedControlItem>
          <SegmentedControlItem value="minimal">Minimal</SegmentedControlItem>
          <SegmentedControlItem value="logo">Logo</SegmentedControlItem>
        </SegmentedControl>
        <div className="w-full overflow-hidden rounded-2xl border bg-background">
          <SiteFooterPreview variant={variant} />
        </div>
      </div>
    </ComponentPreview>
  );
}
