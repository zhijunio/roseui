"use client";

import { useState } from "react";

import { IconPlus } from "@tabler/icons-react";

import { AnimatedCounter } from "@/components/ui/animated-counter";

const increments = [144, 208, 316, 176];

export function AnimatedCounterDemo() {
  const [value, setValue] = useState(13080);
  const [clicks, setClicks] = useState(0);

  function addResponses() {
    setValue((current) => current + increments[clicks % increments.length]);
    setClicks((current) => current + 1);
  }

  return (
    <div className="flex min-h-[34rem] items-center justify-center bg-muted/20 p-6 sm:p-10">
      <div className="w-full max-w-[31rem] overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="px-7 pb-6 pt-7 sm:px-8 sm:pb-7 sm:pt-8">
          <AnimatedCounter label="Total responses" value={value} animateOnView />
        </div>
        <button
          type="button"
          onClick={addResponses}
          className="flex min-h-14 w-full items-center justify-between border-t px-7 text-left text-base text-muted-foreground transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 sm:px-8"
        >
          <span>Click to simulate new responses</span>
          <IconPlus aria-hidden="true" className="size-5 shrink-0 text-foreground" />
        </button>
      </div>
    </div>
  );
}
