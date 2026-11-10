"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  IconArrowRight,
  IconCheck,
  IconChevronRight,
  IconCircleCheck,
  IconX,
} from "@tabler/icons-react";
import { ComponentPreview } from "@/components/composite/component-preview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPersonAvatar } from "@/data/avatar-data";
import { Button } from "@/components/ui/button";
import { SegmentedControl, SegmentedControlItem } from "@/components/composite/segmented-control";
import { cn } from "@/lib/utils";

type CtaVariant = "centered" | "split" | "banner";
type ActionState = "idle" | "loading" | "done";

const points = ["Import your existing work", "Invite the whole team", "Change plans anytime"];

function Faces() {
  return (
    <span className="flex -space-x-2" aria-hidden="true">
      <Avatar size="sm" className="ring-2 ring-background"><AvatarImage src={getPersonAvatar("Sofia Rossi")} alt="" /><AvatarFallback color="primary">SR</AvatarFallback></Avatar>
      <Avatar size="sm" className="ring-2 ring-background"><AvatarImage src={getPersonAvatar("Noah Kim")} alt="" /><AvatarFallback color="success">NK</AvatarFallback></Avatar>
      <Avatar size="sm" className="ring-2 ring-background"><AvatarImage src={getPersonAvatar("Hannah Kim")} alt="" /><AvatarFallback color="warning">HK</AvatarFallback></Avatar>
      <Avatar size="sm" className="ring-2 ring-background"><AvatarFallback>+8</AvatarFallback></Avatar>
    </span>
  );
}

function ActionButton({ state, onClick, children }: { state: ActionState; onClick: () => void; children: React.ReactNode }) {
  return (
    <Button size="lg" onClick={onClick} disabled={state !== "idle"} aria-live="polite">
      {state === "done" ? <><IconCheck size={16} /> Ready to go</> : state === "loading" ? "Setting things up..." : <>{children}<IconArrowRight size={16} /></>}
    </Button>
  );
}

function CtaPreview({ variant }: { variant: CtaVariant }) {
  const [primaryState, setPrimaryState] = useState<ActionState>("idle");
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion() ?? false;

  function start() {
    setPrimaryState("loading");
    window.setTimeout(() => setPrimaryState("done"), 650);
  }

  if (variant === "banner") {
    return (
      <div className="grid min-h-44 place-items-center rounded-xl border bg-muted/30 p-5">
        <AnimatePresence initial={false} mode="wait">
          {visible ? (
            <motion.section
              key="banner"
              initial={{ opacity: 0, y: reduce ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -8 }}
              transition={{ duration: reduce ? 0 : 0.18 }}
              aria-label="Workspace invitation"
              className="flex w-full max-w-3xl flex-wrap items-center justify-between gap-4 rounded-xl border bg-background px-4 py-3 shadow-sm"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><IconCircleCheck size={17} /></span>
                <div className="min-w-0"><p className="truncate text-sm font-medium">Your workspace is ready for its first project.</p><p className="text-xs text-muted-foreground">Invite teammates and keep the launch moving.</p></div>
              </div>
              <div className="flex items-center gap-2"><Button size="sm" onClick={start} disabled={primaryState !== "idle"} aria-live="polite">{primaryState === "done" ? "Invited" : primaryState === "loading" ? "Sending..." : "Invite team"}<IconArrowRight size={14} /></Button><Button size="icon-sm" variant="ghost" aria-label="Dismiss invitation" onClick={() => setVisible(false)}><IconX size={16} /></Button></div>
            </motion.section>
          ) : (
            <motion.div key="restore" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Button variant="outline" onClick={() => setVisible(true)}>Restore banner</Button></motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <motion.section
      layout={!reduce}
      aria-labelledby={`cta-${variant}-title`}
      className={cn("overflow-hidden rounded-2xl border bg-background", variant === "centered" ? "px-5 py-14 text-center sm:px-10" : "p-5 sm:p-8")}
    >
      {variant === "centered" ? (
        <div className="mx-auto grid max-w-2xl justify-items-center gap-4">
          <h2 id="cta-centered-title" className="text-3xl font-medium tracking-tight sm:text-4xl">Build the next project together</h2>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">Bring the team into one calm workspace and turn the first idea into something ready to ship.</p>
          <div className="flex flex-wrap justify-center gap-2"><ActionButton state={primaryState} onClick={start}>Create a workspace</ActionButton><Button size="lg" variant="secondary">Talk to the team</Button></div>
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground"><Faces /><span>No card required to get started</span></div>
        </div>
      ) : (
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(250px,340px)]">
          <div className="grid gap-4">
            <div className="flex items-center gap-1 text-xs text-muted-foreground"><span>Workspace setup</span><IconChevronRight size={13} /><span>Ready to begin</span></div>
            <h2 id="cta-split-title" className="max-w-lg text-3xl font-medium tracking-tight">A clear start for the whole team</h2>
            <p className="max-w-lg text-sm leading-6 text-muted-foreground">Set up your workspace, bring over existing work, and keep every decision close to the project.</p>
            <ul className="grid gap-2 text-sm">{points.map((point) => <li key={point} className="flex items-center gap-2"><IconCircleCheck size={16} className="text-success" />{point}</li>)}</ul>
            <div className="pt-1"><ActionButton state={primaryState} onClick={start}>Create a workspace</ActionButton></div>
          </div>
          <div className="grid gap-4 rounded-xl border bg-muted/30 p-4"><div className="flex items-center justify-between"><span className="text-sm font-medium">Launch checklist</span><span className="text-xs text-muted-foreground">2 of 3</span></div><div className="h-1.5 overflow-hidden rounded-full bg-muted"><motion.div className="h-full rounded-full bg-primary" animate={{ width: primaryState === "done" ? "100%" : "66%" }} transition={{ duration: reduce ? 0 : .25 }} /></div><div className="grid gap-3 text-sm">{["Name your workspace", "Invite your team", "Create first project"].map((item, index) => <div key={item} className="flex items-center gap-2"><span className={cn("grid size-5 place-items-center rounded-full border text-[11px]", index < 2 || primaryState === "done" ? "border-success bg-success/10 text-success" : "text-muted-foreground")}>{index < 2 || primaryState === "done" ? <IconCheck size={12} /> : index + 1}</span><span className={index < 2 || primaryState === "done" ? "text-muted-foreground line-through" : "font-medium"}>{item}</span></div>)}</div></div>
        </div>
      )}
    </motion.section>
  );
}

export function CtaSectionExamples() {
  const [variant, setVariant] = useState<CtaVariant>("centered");
  return (
    <ComponentPreview previewId="headers-and-footers-cta-section-01" title="Call to action" layout="fullBleed">
      <div className="grid w-full justify-items-center gap-5">
        <SegmentedControl aria-label="Call to action layout" value={variant} onValueChange={(value) => { if (value === "centered" || value === "split" || value === "banner") setVariant(value); }}>
          <SegmentedControlItem value="centered">Centered</SegmentedControlItem>
          <SegmentedControlItem value="split">Split</SegmentedControlItem>
          <SegmentedControlItem value="banner">Banner</SegmentedControlItem>
        </SegmentedControl>
        <CtaPreview key={variant} variant={variant} />
      </div>
    </ComponentPreview>
  );
}
