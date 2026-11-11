"use client";

import { useState } from "react";

import { Time } from "@internationalized/date";
import { IconClock, IconInfoCircle } from "@tabler/icons-react";

import { ComponentPreview } from "@/components/examples/component-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TimeField } from "@/components/ui/time-field";

export function TimeFieldExamples() {
  const [time, setTime] = useState<Time | null>(new Time(9, 30));
  const [formMessage, setFormMessage] = useState("");

  return (
    <>
      <ComponentPreview title="Default" layout="field">
        <TimeField label="Meeting time" defaultValue={new Time(9, 30)} />
      </ComponentPreview>

      <ComponentPreview title="Variants" layout="field">
        <div className="grid w-full gap-3">
          <TimeField label="Primary variant" defaultValue={new Time(9, 30)} />
          <TimeField label="Secondary variant" variant="secondary" defaultValue={new Time(9, 30)} />
        </div>
      </ComponentPreview>

      <ComponentPreview title="With Icons" layout="field">
        <TimeField
          label="Start time"
          prefix={<IconClock className="size-4" />}
          suffix={<IconInfoCircle className="size-4" />}
        />
      </ComponentPreview>

      <ComponentPreview title="In a Surface" layout="field">
        <Card className="w-full gap-0 bg-muted/30 shadow-none">
          <CardContent className="p-4">
            <TimeField label="Appointment time" variant="secondary" description="Choose a time for your appointment." />
          </CardContent>
        </Card>
      </ComponentPreview>

      <ComponentPreview title="Description and Required" layout="field">
        <TimeField label="Start time" isRequired defaultValue={new Time(9)} description="This field is required." />
      </ComponentPreview>

      <ComponentPreview title="Disabled and Read-only" layout="field">
        <div className="grid w-full gap-3">
          <TimeField
            label="Disabled time"
            isDisabled
            defaultValue={new Time(9, 30)}
            description="This time field is disabled."
          />
          <TimeField
            label="Published time"
            isReadOnly
            defaultValue={new Time(16, 45)}
            description="This time cannot be changed."
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Full Width" layout="field">
        <TimeField label="Reporting time" fullWidth description="The field fills its available width." />
      </ComponentPreview>

      <ComponentPreview title="Invalid" layout="field">
        <TimeField
          label="Start time"
          isInvalid
          errorMessage="Choose a time within the available hours."
          minValue={new Time(8)}
          maxValue={new Time(18)}
        />
      </ComponentPreview>

      <ComponentPreview title="Controlled" layout="field">
        <div className="grid w-full gap-3">
          <TimeField label="Time" value={time} onChange={setTime} minValue={new Time(8)} maxValue={new Time(18)} />
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setTime(new Time(12))}>
              Set noon
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setTime(null)}>
              Clear
            </Button>
          </div>
          <p className="min-h-5 text-xs text-muted-foreground" aria-live="polite">
            Current value: {time?.toString() ?? "(empty)"}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Time Precision" layout="field">
        <div className="grid w-full gap-3">
          <TimeField label="12-hour format" hourCycle={12} defaultValue={new Time(9, 30)} />
          <TimeField label="Hour only" granularity="hour" defaultValue={new Time(9)} />
          <TimeField label="With seconds" granularity="second" hourCycle={24} defaultValue={new Time(14, 15, 30)} />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Form" layout="field">
        <form
          className="grid w-full gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            setFormMessage("Appointment time submitted.");
          }}
        >
          <TimeField
            label="Appointment time"
            name="appointment-time"
            isRequired
            minValue={new Time(8)}
            maxValue={new Time(18)}
            description="Choose a time between 08:00 and 18:00."
          />
          <div className="flex items-center gap-3">
            <Button type="submit" size="sm">
              Submit
            </Button>
            <p className="text-xs text-muted-foreground" role="status">
              {formMessage}
            </p>
          </div>
        </form>
      </ComponentPreview>
    </>
  );
}
