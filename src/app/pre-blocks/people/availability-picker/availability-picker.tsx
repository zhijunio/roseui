"use client";

import { useMemo, useState } from "react";

import { IconCalendarEvent, IconCheck } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { cn } from "@/lib/utils";

const availabilityDays = ["Mon 14", "Tue 15", "Wed 16", "Thu 17", "Fri 18"] as const;
const availabilitySlots = ["09:00", "10:30", "13:00", "15:30"] as const;
export function AvailabilityPickerExample() {
  const [day, setDay] = useState<(typeof availabilityDays)[number]>("Wed 16");
  const [slot, setSlot] = useState<(typeof availabilitySlots)[number] | null>(null);
  const reduced = useReducedMotion();
  const available = useMemo(
    () =>
      new Set([
        "Mon 14-09:00",
        "Mon 14-13:00",
        "Tue 15-10:30",
        "Wed 16-10:30",
        "Wed 16-13:00",
        "Thu 17-15:30",
        "Fri 18-09:00",
        "Fri 18-10:30",
      ]),
    [],
  );
  return (
    <div className="grid min-w-0 gap-5">
      <div className="flex items-start gap-3">
        <span className="bg-primary/10 text-primary grid size-9 shrink-0 place-items-center rounded-lg">
          <IconCalendarEvent aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="font-semibold tracking-tight">Find a time together</h2>
          <p className="text-muted-foreground mt-1 text-sm">Choose a slot where the core team is available.</p>
        </div>
      </div>
      <SegmentedControl
        value={day}
        onValueChange={(value) => {
          if (availabilityDays.includes(value as (typeof availabilityDays)[number])) {
            setDay(value as (typeof availabilityDays)[number]);
            setSlot(null);
          }
        }}
        aria-label="Choose a day"
        className="w-full max-w-full overflow-x-auto"
      >
        {availabilityDays.map((item) => (
          <SegmentedControlItem key={item} value={item} className="min-w-20 flex-1">
            {item}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
      <div className="grid gap-2 sm:grid-cols-2">
        {availabilitySlots.map((item) => {
          const isAvailable = available.has(`${day}-${item}`);
          const selected = slot === item;
          return (
            <button
              key={item}
              type="button"
              disabled={!isAvailable}
              aria-pressed={selected}
              onClick={() => setSlot(item)}
              className={cn(
                "hover:bg-muted focus-visible:ring-ring flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-45",
                selected && "border-primary bg-primary/5",
              )}
            >
              <span className="font-medium">{item}</span>
              {selected ? (
                <IconCheck className="text-primary size-4" aria-hidden="true" />
              ) : (
                <span className="text-muted-foreground text-xs">{isAvailable ? "Available" : "Busy"}</span>
              )}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {slot && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.18 }}
            className="bg-muted/30 flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4"
            role="status"
          >
            <div>
              <p className="text-sm font-medium">
                {day} at {slot}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">Maya, Alex, and Sam can join.</p>
            </div>
            <Button size="sm">Confirm time</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
