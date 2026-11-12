"use client";

import { type FormEvent, useId, useState } from "react";

import { IconArrowRight, IconCheck, IconClock, IconMail, IconRefresh } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { ComponentPreview } from "@/examples/component-preview";
import { cn } from "@/lib/utils";

type NewsletterVariant = "inline" | "card";
type SubmitState = "idle" | "loading" | "success" | "error";

const issues = [
  ["Issue 42", "Designing for the second visit", "4 min"],
  ["Issue 41", "Why quiet settings pages work", "5 min"],
  ["Issue 40", "Motion that settles with purpose", "3 min"],
] as const;

function NewsletterForm({ variant }: { variant: NewsletterVariant }) {
  const inputId = useId();
  const messageId = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [failNext, setFailNext] = useState(false);
  const reduce = useReducedMotion() ?? false;
  const message =
    state === "success"
      ? `The next issue is on its way to ${email}.`
      : state === "error"
        ? "We could not save that address. Try again."
        : "One thoughtful email each month. Unsubscribe anytime.";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "loading") return;
    if (!email.includes("@") || !email.includes(".")) {
      setState("error");
      return;
    }
    setState("loading");
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    if (failNext) {
      setFailNext(false);
      setState("error");
      return;
    }
    setState("success");
  }

  return (
    <div className={cn("grid gap-5", variant === "card" && "bg-background rounded-2xl border p-5 shadow-sm sm:p-7")}>
      <div className="grid gap-2">
        <div className="text-primary flex items-center gap-2 text-xs font-medium">
          <IconMail size={14} />
          Field notes
        </div>
        <h2 className="text-2xl font-medium tracking-tight">A short read for the details-minded</h2>
        <p className="text-muted-foreground max-w-xl text-sm leading-6">
          Practical notes on building interfaces that feel clear, responsive, and considered.
        </p>
      </div>
      <form onSubmit={submit} noValidate className="grid gap-2 sm:max-w-xl">
        <label htmlFor={inputId} className="text-sm font-medium">
          Email address
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id={inputId}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            disabled={state === "loading" || state === "success"}
            aria-describedby={messageId}
            aria-invalid={state === "error"}
            onChange={(event) => {
              setEmail(event.target.value);
              if (state !== "idle") setState("idle");
            }}
          />
          <Button type="submit" disabled={state === "loading" || state === "success"}>
            {state === "success" ? (
              <>
                <IconCheck size={15} /> Subscribed
              </>
            ) : state === "loading" ? (
              "Joining..."
            ) : (
              <>
                Subscribe <IconArrowRight size={15} />
              </>
            )}
          </Button>
        </div>
        <AnimatePresence initial={false} mode="wait">
          <motion.p
            id={messageId}
            key={message}
            role={state === "error" ? "alert" : "status"}
            aria-live="polite"
            initial={{ opacity: 0, y: reduce ? 0 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -4 }}
            transition={{ duration: reduce ? 0 : 0.16 }}
            className={cn(
              "min-h-5 text-xs",
              state === "error" ? "text-destructive" : state === "success" ? "text-success" : "text-muted-foreground",
            )}
          >
            {message}
          </motion.p>
        </AnimatePresence>
      </form>
      <label className="text-muted-foreground flex w-fit items-center gap-2 text-xs">
        <input
          type="checkbox"
          checked={failNext}
          onChange={(event) => setFailNext(event.target.checked)}
          className="accent-primary size-3.5"
        />
        Fail the next send
      </label>
    </div>
  );
}

function IssueList() {
  return (
    <div className="grid gap-2 border-t pt-4">
      {issues.map(([issue, title, time]) => (
        <article
          key={issue}
          className="hover:bg-muted/60 flex items-center gap-3 rounded-lg px-2 py-2 transition-colors"
        >
          <span className="bg-muted text-muted-foreground grid size-8 shrink-0 place-items-center rounded-full">
            <IconClock size={15} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-muted-foreground text-xs font-medium">{issue}</p>
            <p className="truncate text-sm font-medium">{title}</p>
          </div>
          <span className="text-muted-foreground shrink-0 text-xs">{time}</span>
        </article>
      ))}
    </div>
  );
}

function NewsletterPreview({ variant }: { variant: NewsletterVariant }) {
  const [resetKey, setResetKey] = useState(0);
  return (
    <div className="bg-muted/20 w-full rounded-2xl border p-4 sm:p-7">
      <div
        className={cn(
          "mx-auto grid max-w-4xl gap-8",
          variant === "card"
            ? "lg:grid-cols-[minmax(0,1fr)_minmax(250px,.8fr)] lg:items-start"
            : "lg:grid-cols-[minmax(0,1.1fr)_minmax(250px,.9fr)] lg:items-center",
        )}
      >
        <div key={resetKey}>
          <NewsletterForm variant={variant} />
        </div>
        <div className="bg-background grid gap-4 rounded-xl border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-xs font-medium">Recent issues</p>
              <p className="text-sm font-medium">Three useful reads</p>
            </div>
            <span className="text-muted-foreground text-xs">4,280 readers</span>
          </div>
          <IssueList />
          <Button variant="ghost" size="sm" className="w-fit" onClick={() => setResetKey((key) => key + 1)}>
            Reset demo <IconRefresh size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function NewsletterSignupExamples() {
  const [variant, setVariant] = useState<NewsletterVariant>("inline");
  return (
    <ComponentPreview title="Newsletter signup" layout="fullBleed">
      <div className="grid w-full justify-items-center gap-5">
        <SegmentedControl
          aria-label="Newsletter layout"
          value={variant}
          onValueChange={(value) => {
            if (value === "inline" || value === "card") setVariant(value);
          }}
        >
          <SegmentedControlItem value="inline">Inline</SegmentedControlItem>
          <SegmentedControlItem value="card">Card</SegmentedControlItem>
        </SegmentedControl>
        <NewsletterPreview variant={variant} />
      </div>
    </ComponentPreview>
  );
}
