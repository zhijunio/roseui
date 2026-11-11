"use client";

import { useState } from "react";

import { type CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import {
  IconCalendarEvent as CalendarDays,
  IconClockHour3 as Clock3,
  IconWorld as Globe2,
  IconClockHour3,
  IconVideo as Video,
} from "@tabler/icons-react";

import { DatePicker } from "@/components/composite/date-picker";
import { DateSelector, type DateSelectorValue, formatDateSelectorValue } from "@/components/composite/date-selector";
import { ComponentPreview } from "@/components/examples/component-preview";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function MeetingSchedulerExample() {
  const [date, setDate] = useState(() => today(getLocalTimeZone()));
  const [selectedTime, setSelectedTime] = useState("14:00");
  const times = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

  return (
    <div className="grid w-full max-w-3xl gap-3 rounded-xl border border-border bg-muted/40 p-3 lg:grid-cols-[200px_minmax(260px,1fr)_150px] lg:items-stretch">
      <Card className="gap-0 border-border py-4 shadow-sm">
        <CardContent className="flex h-full flex-col gap-4 px-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarFallback className="bg-primary text-primary-foreground">M</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">Mertcan Esmergul</p>
              <p className="truncate text-xs text-muted-foreground">hi@mertcan.works</p>
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold">30 min intro meeting</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Let&apos;s discuss your needs and how we can collaborate.
            </p>
          </div>
          <div className="mt-auto grid gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Clock3 aria-hidden="true" className="size-4" />
              30 minutes
            </span>
            <span className="inline-flex items-center gap-2">
              <Globe2 aria-hidden="true" className="size-4" />
              English
            </span>
            <span className="inline-flex items-center gap-2">
              <Video aria-hidden="true" className="size-4" />
              Google Meet
            </span>
          </div>
        </CardContent>
      </Card>
      <div className="grid min-w-0 content-start gap-3 rounded-xl border border-border bg-card p-3 shadow-sm">
        <p className="text-sm font-medium">Choose a date</p>
        <DatePicker value={date} onChange={(next) => next && setDate(next)} aria-label="Choose meeting date" />
      </div>
      <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3 shadow-sm">
        <p className="mb-1 text-sm font-medium">Available times</p>
        {times.map((time) => (
          <Button
            key={time}
            type="button"
            variant={selectedTime === time ? "default" : "outline"}
            size="sm"
            aria-pressed={selectedTime === time}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </Button>
        ))}
        <Button type="button" className="mt-auto" size="sm">
          <CalendarDays aria-hidden="true" className="size-4" />
          Continue
        </Button>
      </div>
    </div>
  );
}

export function DatePickerExamples() {
  return (
    <>
      <DatePickerFieldsExamples />
      <DatePickerAdditionalExamples />
      <ComponentPreview title="Meeting Scheduler" layout="wide" span={2}>
        <MeetingSchedulerExample />
      </ComponentPreview>
      <DatePickerSelectorExamples />
    </>
  );
}

export function DatePickerAdditionalExamples() {
  const currentDate = today(getLocalTimeZone());
  const [customDate, setCustomDate] = useState<typeof currentDate | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<typeof currentDate | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <ComponentPreview title="Date Boundaries" layout="field">
        <DatePicker
          label="Report date"
          minValue={currentDate}
          maxValue={currentDate.add({ days: 14 })}
          isDateUnavailable={(date) => {
            const dayOfWeek = date.toDate("UTC").getUTCDay();
            return dayOfWeek === 0 || dayOfWeek === 6;
          }}
        />
      </ComponentPreview>

      <ComponentPreview title="Custom Trigger Icon" layout="field">
        <DatePicker
          label="Event date"
          value={customDate}
          onChange={setCustomDate}
          icon={<IconClockHour3 aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />}
        />
      </ComponentPreview>

      <ComponentPreview title="Localized Format" layout="field">
        <DatePicker label="Event date" defaultValue={currentDate} locale="en-GB" />
      </ComponentPreview>

      <ComponentPreview title="Form Validation" layout="field">
        <form
          className="grid w-full gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <DatePicker
            name="appointment-date"
            label="Appointment date"
            value={appointmentDate}
            onChange={(nextDate) => {
              setAppointmentDate(nextDate);
              if (nextDate) setSubmitted(false);
            }}
            isInvalid={submitted && !appointmentDate}
            errorMessage="Choose an appointment date before continuing."
            description="Select a date to continue."
          />
          <div className="flex items-center gap-3">
            <Button type="submit" size="sm">
              Submit
            </Button>
            {submitted && appointmentDate && (
              <p role="status" className="text-xs text-muted-foreground">
                Appointment date submitted.
              </p>
            )}
          </div>
        </form>
      </ComponentPreview>
    </>
  );
}

export function DatePickerFieldsExamples() {
  const [date, setDate] = useState<CalendarDate | null>(null);
  const selectedDay = today(getLocalTimeZone());
  const [timeRange, setTimeRange] = useState({ start: "09:00", end: "10:00" });

  return (
    <>
      <ComponentPreview title="Single Date" layout="field">
        <div className="space-y-2">
          <DatePicker aria-label="Due date" value={date} onChange={setDate} />
          <p className="min-h-5 text-xs text-muted-foreground" aria-live="polite">
            {date ? date.toString() : "No date selected"}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Default Date" layout="field">
        <DatePicker defaultValue={selectedDay.add({ days: 14 })} aria-label="Project deadline" />
      </ComponentPreview>

      <ComponentPreview title="Disabled Date" layout="field">
        <DatePicker disabled aria-label="Locked due date" />
      </ComponentPreview>

      <ComponentPreview title="Date and Time" layout="field">
        <div className="grid gap-3">
          <DatePicker aria-label="Schedule date" value={date} onChange={setDate} />
          <div className="grid grid-cols-2 gap-2">
            <label className="grid gap-1 text-xs font-medium text-muted-foreground">
              Start time
              <input
                type="time"
                value={timeRange.start}
                onChange={(event) => setTimeRange((current) => ({ ...current, start: event.currentTarget.value }))}
                className="h-9 rounded-lg border border-input bg-background px-2 text-sm text-foreground"
              />
            </label>
            <label className="grid gap-1 text-xs font-medium text-muted-foreground">
              End time
              <input
                type="time"
                value={timeRange.end}
                onChange={(event) => setTimeRange((current) => ({ ...current, end: event.currentTarget.value }))}
                className="h-9 rounded-lg border border-input bg-background px-2 text-sm text-foreground"
              />
            </label>
          </div>
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {date ? `${date.toString()} · ${timeRange.start}–${timeRange.end}` : "Pick a date and time range."}
          </p>
        </div>
      </ComponentPreview>
    </>
  );
}

export function DatePickerSelectorExamples() {
  const [selectorValue, setSelectorValue] = useState<DateSelectorValue>();
  const [selectorDraft, setSelectorDraft] = useState<DateSelectorValue>();
  const [selectorPopoverOpen, setSelectorPopoverOpen] = useState(false);
  const [selectorDialogOpen, setSelectorDialogOpen] = useState(false);
  const [selectorLocale, setSelectorLocale] = useState("en-US");

  return (
    <>
      <ComponentPreview title="Natural Language" layout="panel">
        <DateSelector
          value={selectorValue}
          onChange={setSelectorValue}
          label="Due date"
          inputHint="Try: 2025, Q4, 05/10/2025"
        />
      </ComponentPreview>

      <ComponentPreview title="Popover with Apply" layout="panel">
        <div className="grid gap-3">
          <Popover
            open={selectorPopoverOpen}
            onOpenChange={(open) => {
              setSelectorPopoverOpen(open);
              if (open) setSelectorDraft(selectorValue);
            }}
          >
            <PopoverTrigger asChild>
              <Button type="button" variant="outline" className="w-full justify-start">
                {selectorValue ? formatDateSelectorValue(selectorValue) : "Select a reporting period"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[min(28rem,calc(100vw-2rem))] p-3">
              <DateSelector value={selectorDraft} onChange={setSelectorDraft} allowRange label="Reporting period" />
              <div className="mt-3 flex justify-end gap-2 border-t pt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectorDraft(selectorValue);
                    setSelectorPopoverOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setSelectorValue(selectorDraft);
                    setSelectorPopoverOpen(false);
                  }}
                >
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <p className="text-xs text-muted-foreground">Changes stay in draft until Apply; Cancel discards them.</p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Dialog with Apply" layout="panel">
        <div className="grid gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-fit"
            onClick={() => {
              setSelectorDraft(selectorValue);
              setSelectorDialogOpen(true);
            }}
          >
            Choose due date
          </Button>
          <Dialog open={selectorDialogOpen} onOpenChange={setSelectorDialogOpen}>
            <DialogContent size="md">
              <DialogHeader>
                <DialogTitle>Select due date</DialogTitle>
              </DialogHeader>
              <DateSelector value={selectorDraft} onChange={setSelectorDraft} showInput />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSelectorDraft(selectorValue);
                    setSelectorDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setSelectorValue(selectorDraft);
                    setSelectorDialogOpen(false);
                  }}
                >
                  Apply
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {selectorValue ? formatDateSelectorValue(selectorValue) : "No due date selected."}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Localized Selector" layout="panel">
        <div className="grid gap-3">
          <label className="grid max-w-xs gap-1 text-sm font-medium">
            Language and date format
            <select
              value={selectorLocale}
              onChange={(event) => setSelectorLocale(event.currentTarget.value)}
              className="h-9 rounded-lg border border-input bg-background px-3 text-sm"
            >
              <option value="en-US">English</option>
              <option value="es-ES">Español</option>
              <option value="fr-FR">Français</option>
              <option value="de-DE">Deutsch</option>
              <option value="zh-CN">简体中文</option>
            </select>
          </label>
          <DateSelector
            value={selectorValue}
            onChange={setSelectorValue}
            locale={selectorLocale}
            label="Reporting date"
          />
          <p className="text-xs text-muted-foreground">The selected date preview follows the chosen locale.</p>
        </div>
      </ComponentPreview>
    </>
  );
}
