"use client";

import { useState } from "react";

import { getLocalTimeZone, today } from "@internationalized/date";
import { IconMapPin } from "@tabler/icons-react";

import { DateRangePicker, type DateRangeValue } from "@/components/composite/date-range-picker";
import { ComponentPreview } from "@/components/examples/component-preview";
import { Button } from "@/components/ui/button";

export function DateRangePickerExamples() {
  const [range, setRange] = useState<DateRangeValue | null>(null);

  return (
    <>
      <ComponentPreview title="Controlled Range" layout="field">
        <div className="space-y-3">
          <DateRangePicker aria-label="Report period" value={range} onChange={setRange} />
          <p className="min-h-5 text-xs text-muted-foreground" aria-live="polite">
            {range ? `${range.start.toString()} – ${range.end.toString()}` : "No range selected"}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Default Range" layout="field">
        <DateRangePicker aria-label="Choose a reporting period" />
      </ComponentPreview>

      <ComponentPreview title="Disabled Range" layout="field">
        <DateRangePicker disabled aria-label="Locked reporting period" />
      </ComponentPreview>

      <DateRangePickerAdditionalExamples />
    </>
  );
}

export function DateRangePickerAdditionalExamples() {
  const currentDate = today(getLocalTimeZone());
  const [tripDates, setTripDates] = useState<DateRangeValue | null>(null);
  const [formDates, setFormDates] = useState<DateRangeValue | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <ComponentPreview title="Range Boundaries" layout="field">
        <DateRangePicker
          label="Reporting period"
          minValue={currentDate}
          maxValue={currentDate.add({ days: 30 })}
          isDateUnavailable={(date) => {
            const dayOfWeek = date.toDate("UTC").getUTCDay();
            return dayOfWeek === 0 || dayOfWeek === 6;
          }}
        />
      </ComponentPreview>

      <ComponentPreview title="Custom Range Trigger" layout="field">
        <DateRangePicker
          label="Trip dates"
          value={tripDates}
          onChange={setTripDates}
          icon={<IconMapPin aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />}
        />
      </ComponentPreview>

      <ComponentPreview title="Localized Range" layout="field">
        <DateRangePicker
          label="Stay dates"
          defaultValue={{ start: currentDate.add({ days: 7 }), end: currentDate.add({ days: 11 }) }}
          locale="en-GB"
        />
      </ComponentPreview>

      <ComponentPreview title="Range Form Validation" layout="field">
        <form
          className="grid w-full gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <DateRangePicker
            startName="trip-start"
            endName="trip-end"
            label="Trip dates"
            value={formDates}
            onChange={(nextRange) => {
              setFormDates(nextRange);
              if (nextRange) setSubmitted(false);
            }}
            isInvalid={submitted && !formDates}
            errorMessage="Select your check-in and check-out dates."
            description="Choose both the start and end dates."
          />
          <div className="flex items-center gap-3">
            <Button type="submit" size="sm">
              Submit
            </Button>
            {submitted && formDates && (
              <p role="status" className="text-xs text-muted-foreground">
                Trip dates submitted.
              </p>
            )}
          </div>
        </form>
      </ComponentPreview>
    </>
  );
}
