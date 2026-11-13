"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Countdown } from "@/components/ui/countdown";

const after = (milliseconds: number) => new Date(Date.now() + milliseconds);
const hour = 60 * 60 * 1_000;
const day = 24 * hour;

function RestartableCountdown() {
  const [target, setTarget] = useState(() => after(15_000));
  const [complete, setComplete] = useState(false);

  const restart = (duration: number) => {
    setComplete(false);
    setTarget(after(duration));
  };

  return (
    <div className="grid w-full gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
      <div className="min-w-0 space-y-2">
        <Countdown
          target={target}
          label="Time remaining in the demo timer"
          units={["minutes", "seconds"]}
          onComplete={() => setComplete(true)}
          completeLabel="Timer complete"
          className="w-full max-w-sm"
        />
        <p role="status" aria-live="polite" className="text-muted-foreground min-h-5 text-sm">
          {complete ? "The timer finished. Start another duration to try it again." : "Choose a duration to restart."}
        </p>
      </div>
      <ButtonGroup aria-label="Restart timer">
        <Button variant="outline" size="sm" onPress={() => restart(10_000)}>
          10 seconds
        </Button>
        <Button variant="outline" size="sm" onPress={() => restart(60_000)}>
          1 minute
        </Button>
      </ButtonGroup>
    </div>
  );
}

export function CountdownExamples() {
  const [auditDeadline] = useState(() => after(3 * day + 6 * hour));
  const [renewalReminder] = useState(() => after(13 * hour + 22 * 60 * 1_000));
  const [eventStart] = useState(() => after(2 * day + 4 * hour + 18 * 60 * 1_000));
  const [pastDeadline] = useState(() => after(-hour));

  return (
    <>
      <ComponentPreview title="Upcoming Deadline" layout="fullStack" span={2}>
        <div className="grid w-full min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,auto)] lg:items-center lg:gap-8">
          <Countdown
            target={auditDeadline}
            label="Time remaining for the quarterly access review"
            className="w-full min-w-0 lg:min-w-[19rem]"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Compact Reminder" layout="panel">
        <div className="flex w-full flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-medium">Vendor access expires</span>
          <Countdown
            target={renewalReminder}
            label="Time remaining before vendor access expires"
            units={["hours", "minutes"]}
            variant="compact"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Selected Units" layout="panel">
        <div className="grid w-full gap-3">
          <p className="text-sm font-medium">Product launch</p>
          <Countdown
            target={eventStart}
            label="Time remaining before product launch"
            units={["days", "hours", "minutes"]}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Restart and Complete" layout="fullStack" span={2}>
        <RestartableCountdown />
      </ComponentPreview>

      <ComponentPreview title="Completed Deadline" layout="panel">
        <div className="grid w-full gap-2">
          <p className="text-sm font-medium">Scheduled maintenance</p>
          <Countdown
            target={pastDeadline}
            label="Scheduled maintenance countdown"
            completeLabel="Maintenance window ended"
          />
          <p className="text-muted-foreground text-xs">
            Past deadlines show a completion label instead of negative time.
          </p>
        </div>
      </ComponentPreview>
    </>
  );
}
