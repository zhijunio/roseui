"use client";

import { useState } from "react";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { IconCalendarEvent, IconInfoCircle } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DateField } from "@/components/ui/date-field";
import { ComponentPreview } from "@/components/composite/component-preview";

export function DateFieldExamples() {
  const [date, setDate] = useState<CalendarDate | null>(null);
  const [granularity, setGranularity] = useState<"day" | "month" | "year">("day");
  const [formMessage, setFormMessage] = useState("");
  const todayDate = today(getLocalTimeZone());

  return (
    <>
      <ComponentPreview previewId="date-field-01" title="Default" layout="field">
        <DateField label="Date" />
      </ComponentPreview>

      <ComponentPreview previewId="date-field-02" title="Variants" layout="field">
        <div className="grid w-full gap-3">
          <DateField label="Primary variant" variant="primary" />
          <DateField label="Secondary variant" variant="secondary" />
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="date-field-03" title="With Icons" layout="field">
        <DateField label="Start date" prefix={<IconCalendarEvent className="size-4" />} suffix={<IconInfoCircle className="size-4" />} />
      </ComponentPreview>

      <ComponentPreview previewId="date-field-04" title="In a Surface" layout="field">
        <Card className="w-full gap-0 bg-muted/30 shadow-none">
          <CardContent className="p-4">
            <DateField label="Appointment date" variant="secondary" description="Choose a date for your appointment." />
          </CardContent>
        </Card>
      </ComponentPreview>

      <ComponentPreview previewId="date-field-05" title="Description" layout="field">
        <DateField label="Birth date" description="Enter your date of birth." />
      </ComponentPreview>

      <ComponentPreview previewId="date-field-06" title="Required" layout="field">
        <DateField label="Start date" isRequired description="This field is required." />
      </ComponentPreview>

      <ComponentPreview previewId="date-field-07" title="Disabled and Read-only" layout="field">
        <div className="grid w-full gap-3">
          <DateField label="Disabled date" isDisabled defaultValue={todayDate} description="This date field is disabled." />
          <DateField label="Read-only date" isReadOnly defaultValue={todayDate} description="This date cannot be changed." />
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="date-field-08" title="Full Width" layout="field">
        <DateField label="Reporting date" fullWidth description="The field fills its available width." />
      </ComponentPreview>

      <ComponentPreview previewId="date-field-09" title="Invalid" layout="field">
        <DateField label="Date" isInvalid errorMessage="Please enter a valid date." />
      </ComponentPreview>

      <ComponentPreview previewId="date-field-10" title="Granularity"  layout="field">
        <div className="grid w-full gap-3">
          <label className="grid max-w-sm gap-1.5 text-sm font-medium">
            Granularity
            <select value={granularity} onChange={(event) => setGranularity(event.currentTarget.value as typeof granularity)} className="h-9 rounded-lg border border-input bg-background px-3 text-sm">
              <option value="day">Day</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </label>
          <DateField label="Date" granularity={granularity} />
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="date-field-11" title="Controlled"  layout="field">
        <div className="grid w-full gap-3">
          <DateField label="Date" value={date} onChange={setDate} />
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setDate(todayDate)}>Set today</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setDate(null)}>Clear</Button>
          </div>
          <p className="min-h-5 text-xs text-muted-foreground" aria-live="polite">Current value: {date?.toString() ?? "(empty)"}</p>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="date-field-12" title="Form"  layout="field">
        <form className="grid w-full gap-3" onSubmit={(event) => { event.preventDefault(); setFormMessage("Appointment date submitted."); }}>
          <DateField label="Appointment date" name="appointment-date" isRequired minValue={todayDate} description="Choose a date from today onwards." />
          <div className="flex items-center gap-3">
            <Button type="submit" size="sm">Submit</Button>
            <p className="text-xs text-muted-foreground" role="status">{formMessage}</p>
          </div>
        </form>
      </ComponentPreview>

      <ComponentPreview previewId="date-field-13" title="Custom Validation"  layout="field">
        <DateField
          label="Date"
          minValue={todayDate}
          validate={(value) => value.compare(todayDate) >= 0 || "Date must be today or later."}
          errorMessage="Choose a date from today onwards."
          description="Enter a date from today onwards."
        />
      </ComponentPreview>

      <ComponentPreview previewId="date-field-14" title="State-aware Styling"  layout="field">
        <DateField
          label="Due date"
          className={(state) => state.isFocusVisible ? "rounded-lg bg-muted/40 p-2" : ""}
          description="Focus the field to see the surrounding state change."
        />
      </ComponentPreview>
    </>
  );
}
