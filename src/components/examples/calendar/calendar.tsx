"use client";

import { useState } from "react";

import { type CalendarDate, getLocalTimeZone, today } from "@internationalized/date";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Calendar } from "@/components/roseui/calendar";

export function CalendarExamples() {
  const [date, setDate] = useState<CalendarDate | null>(null);
  const now = today(getLocalTimeZone());

  return (
    <>
      <ComponentPreview title="Default" layout="field">
        <Calendar aria-label="Event date" />
      </ComponentPreview>
      <ComponentPreview title="Controlled" layout="field">
        <div className="grid gap-3">
          <Calendar aria-label="Choose a date" value={date} onChange={setDate} />
          <p className="min-h-5 text-xs text-muted-foreground" aria-live="polite">
            {date?.toString() ?? "No date selected"}
          </p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Date Boundaries" layout="field">
        <Calendar
          aria-label="Choose an available date"
          minValue={now}
          maxValue={now.add({ days: 30 })}
          isDateUnavailable={(day) => {
            const weekday = day.toDate("UTC").getUTCDay();
            return weekday === 0 || weekday === 6;
          }}
        />
      </ComponentPreview>
    </>
  );
}
