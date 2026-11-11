"use client";

import { type KeyboardEvent, useMemo, useRef, useState } from "react";

import {
  IconBell,
  IconCalendar,
  IconCheck,
  IconChevronRight,
  IconCircleCheck,
  IconCircleDashed,
  IconCircleX,
  IconDots,
  IconFile,
  IconPlus,
  IconSpeakerphone,
} from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { ComponentPreview } from "@/components/examples/component-preview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getUserAvatar } from "@/data/user";

type Tab = "Overview" | "Issues" | "Updates" | "Files";

const tabs: Tab[] = ["Overview", "Issues", "Updates", "Files"];
const issues = [
  ["CHK-138", "Saved card list clips the expiry date on small screens", "Bug"],
  ["CHK-136", "Add an edit link beside each section of the review step", "Design"],
  ["CHK-135", "Wallet sheet opens twice after a failed card check", "Bug"],
  ["CHK-133", "Show the delivery estimate before payment", "Research"],
];

function People() {
  return (
    <div className="flex -space-x-2">
      <Avatar size="sm" className="ring-background ring-2">
        <AvatarImage src={getUserAvatar("Emma Carter")} alt="" />
        <AvatarFallback color="primary">EC</AvatarFallback>
      </Avatar>
      <Avatar size="sm" className="ring-background ring-2">
        <AvatarImage src={getUserAvatar("Marcus Chen")} alt="" />
        <AvatarFallback color="success">MC</AvatarFallback>
      </Avatar>
      <Avatar size="sm" className="ring-background ring-2">
        <AvatarImage src={getUserAvatar("Alex Morgan")} alt="" />
        <AvatarFallback color="warning">AM</AvatarFallback>
      </Avatar>
      <Avatar size="sm" className="ring-background ring-2">
        <AvatarFallback>+2</AvatarFallback>
      </Avatar>
    </div>
  );
}

function PageHeaderPreview() {
  const scroller = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<Tab>("Overview");
  const [compact, setCompact] = useState(false);
  const [done, setDone] = useState(31);
  const [following, setFollowing] = useState(false);
  const reduce = useReducedMotion() ?? false;
  const remaining = useMemo(() => issues.slice(0, Math.max(0, 4 - Math.max(0, done - 31))), [done]);

  function onScroll() {
    setCompact((scroller.current?.scrollTop ?? 0) > 16);
  }

  function moveTab(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("[role=tab]"));
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (index < 0) return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next]?.focus();
    const nextTab = tabs[next];
    if (nextTab) setTab(nextTab);
  }

  return (
    <div
      ref={scroller}
      onScroll={onScroll}
      className="bg-background h-[640px] w-full [scrollbar-color:var(--border)_transparent] overflow-y-auto rounded-2xl border"
    >
      <div className="bg-background/95 sticky top-0 z-20 border-b backdrop-blur-sm">
        <motion.div
          layout={!reduce}
          className="mx-auto max-w-5xl px-7 pt-4"
          animate={{ paddingBottom: compact ? 0 : 4 }}
        >
          <div className="flex min-h-8 items-center justify-between gap-4">
            <div className="text-muted-foreground flex min-w-0 items-center gap-1.5 text-xs">
              <span className="hidden sm:inline">Northstar</span>
              <IconChevronRight size={13} />
              <span>Projects</span>
              <IconChevronRight size={13} />
              <span className="text-muted-foreground truncate">Checkout redesign</span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <div className="hidden items-center gap-2 md:flex">
                <Button size="sm" variant="secondary" onClick={() => setFollowing(!following)}>
                  <IconBell size={15} />
                  {following ? "Following" : "Follow"}
                </Button>
                <Button size="sm" variant="secondary">
                  <IconSpeakerphone size={15} /> Share update
                </Button>
              </div>
              <Button size="icon-sm" variant="outline" aria-label="More project actions">
                <IconDots size={16} />
              </Button>
              <Button size="sm">
                <IconPlus size={15} />
                <span className="hidden sm:inline">New issue</span>
              </Button>
            </div>
          </div>
          <motion.div
            className="overflow-hidden"
            animate={{ height: compact ? 0 : "auto", opacity: compact ? 0 : 1 }}
            transition={{ duration: reduce ? 0 : 0.22 }}
          >
            <div className="grid gap-3 py-5">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-medium tracking-tight">Checkout redesign</h2>
                <Badge variant="success-light" dot>
                  On track
                </Badge>
              </div>
              <p className="text-muted-foreground max-w-2xl text-sm leading-6">
                Rebuilding mobile checkout around saved payment methods and a single review step, then rolling it out in
                stages from October 14.
              </p>
              <div className="text-muted-foreground flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                <People />
                <span>
                  Led by <strong className="text-foreground font-medium">Emma Carter</strong>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <IconCalendar size={14} />
                  Target Oct 14
                </span>
              </div>
            </div>
          </motion.div>
          {compact && (
            <motion.button
              type="button"
              onClick={() => scroller.current?.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
              className="hover:bg-muted my-2 flex items-center gap-2 rounded-lg px-2 py-1 text-left text-sm font-medium"
            >
              <span>Checkout redesign</span>
              <Badge variant="success-light" size="sm" dot>
                On track
              </Badge>
            </motion.button>
          )}
          <div
            onKeyDown={moveTab}
            role="tablist"
            aria-label="Project sections"
            className="mt-1 flex items-center gap-5 overflow-x-auto text-sm"
          >
            {tabs.map((item) => (
              <button
                key={item}
                id={`project-tab-${item.toLowerCase()}`}
                role="tab"
                aria-selected={tab === item}
                aria-controls={`project-panel-${item.toLowerCase()}`}
                tabIndex={tab === item ? 0 : -1}
                type="button"
                onClick={() => setTab(item)}
                className={`relative shrink-0 pb-2 font-medium transition-colors ${tab === item ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {item}
                {item === "Issues" && <span className="text-muted-foreground ml-1.5 text-xs">4</span>}
                {tab === item && (
                  <motion.span
                    layoutId="page-header-tab"
                    className="bg-primary absolute inset-x-0 bottom-0 h-0.5 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="mx-auto min-h-[900px] max-w-5xl px-5 py-6 md:px-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            id={`project-panel-${tab.toLowerCase()}`}
            role="tabpanel"
            aria-labelledby={`project-tab-${tab.toLowerCase()}`}
            tabIndex={0}
            initial={{ opacity: 0, x: reduce ? 0 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduce ? 0 : -8 }}
            transition={{ duration: reduce ? 0 : 0.18 }}
          >
            {tab === "Overview" && (
              <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-sm font-medium">Project progress</span>
                    <span className="text-muted-foreground text-sm tabular-nums">{done} / 35 issues</span>
                  </div>
                  <Progress value={done} max={35} />
                  <div className="mt-8 space-y-4">
                    <h3 className="text-sm font-medium">Milestones</h3>
                    {[
                      ["Saved payment methods", "Shipped Sep 18", IconCircleCheck],
                      ["Single review step", "In progress, due Oct 1", IconCircleDashed],
                      ["Staged rollout", "Planned for Oct 14", IconCircleX],
                    ].map(([name, note, Icon]) => (
                      <div key={String(name)} className="flex items-center gap-3 border-b pb-3 last:border-0">
                        <Icon size={16} className="text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{String(name)}</p>
                          <p className="text-muted-foreground text-xs">{String(note)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-sm font-medium">Recent activity</h3>
                  <div className="space-y-4">
                    {[
                      ["Sofia Rossi", "Sofia moved CHK-131 to review", "1h ago"],
                      ["Marcus Chen", "Marcus merged the saved cards endpoint", "3h ago"],
                      ["Emma Carter", "Emma shared Checkout flows v3", "Yesterday"],
                    ].map(([name, text, time]) => (
                      <div key={String(text)} className="flex items-center gap-3">
                        <Avatar size="sm">
                          <AvatarImage src={getUserAvatar(String(name))} alt="" />
                          <AvatarFallback>
                            {String(name)
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <p className="min-w-0 flex-1 text-sm">{String(text)}</p>
                        <span className="text-muted-foreground text-xs">{String(time)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {tab === "Issues" && (
              <div className="space-y-2">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Open issues</h3>
                    <p className="text-muted-foreground text-sm">Small details that keep checkout moving.</p>
                  </div>
                  <Button size="sm">
                    <IconPlus size={15} /> Add issue
                  </Button>
                </div>
                {remaining.map(([id, title, label]) => (
                  <div key={id} className="flex items-center gap-3 rounded-lg border p-3">
                    <button
                      type="button"
                      aria-label={`Mark ${id} complete`}
                      onClick={() => setDone(done + 1)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <IconCheck size={17} />
                    </button>
                    <span className="text-muted-foreground text-xs font-medium">{id}</span>
                    <span className="min-w-0 flex-1 truncate text-sm">{title}</span>
                    <Badge variant="outline" size="sm" className="hidden sm:inline-flex">
                      {label}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
            {tab === "Updates" && (
              <div className="space-y-4">
                {[
                  ["Emma Carter", "Saved payment methods reached every iOS customer on Thursday."],
                  ["Sofia Rossi", "Five usability sessions are done and the review step is next."],
                  ["Marcus Chen", "Card tokenization is waiting on the payments team."],
                ].map(([name, text], index) => (
                  <article key={text} className="flex gap-3 border-b pb-4 last:border-0">
                    <Avatar size="sm">
                      <AvatarImage src={getUserAvatar(name)} alt="" />
                      <AvatarFallback>
                        {name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium">{name}</span>
                        <span className="text-muted-foreground text-xs">Sep {19 - index * 7}</span>
                        <Badge variant={index === 2 ? "warning-light" : "success-light"} size="sm">
                          {index === 2 ? "At risk" : "On track"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-2 text-sm leading-6">{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
            {tab === "Files" && (
              <div className="divide-y">
                {[
                  "Checkout flows v3",
                  "Review step walkthrough",
                  "Payments API notes",
                  "Usability findings, round two",
                ].map((name, index) => (
                  <div key={name} className="flex items-center gap-3 py-3">
                    <IconFile size={17} className="text-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{name}</p>
                      <p className="text-muted-foreground text-xs">
                        {["Design file", "Video", "Document", "PDF"][index]} · {index + 2}.4 MB
                      </p>
                    </div>
                    <span className="text-muted-foreground text-xs">Sep {20 - index * 2}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function PageHeaderExamples() {
  return (
    <ComponentPreview title="Project header" layout="fullBleed">
      <PageHeaderPreview />
    </ComponentPreview>
  );
}
