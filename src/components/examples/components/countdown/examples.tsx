import { Countdown } from "@/components/composite/countdown";
import { ComponentPreview } from "@/components/examples/component-preview";

const quarterClose = new Date("2026-12-15T17:00:00Z");
const accessReview = new Date("2026-12-01T00:00:00Z");
const completedWindow = new Date("2026-11-01T00:00:00Z");

export function CountdownExamples() {
  return (
    <>
      <ComponentPreview
        title="Quarterly Access Review"
        layout="fullStack"
        span={2}
        className="mx-auto w-full max-w-6xl"
      >
        <div className="grid w-full min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,auto)] lg:items-center lg:gap-8">
          <div className="min-w-0 space-y-2">
            <p className="max-w-prose text-sm leading-6 text-muted-foreground">
              Review member roles and outstanding invitations before the next workspace renewal.
            </p>
            <p className="text-xs font-medium text-muted-foreground">Due December 15, 2026 at 5:00 PM UTC</p>
          </div>
          <Countdown
            target={quarterClose}
            label="Time remaining for the quarterly access review"
            className="w-full min-w-0 lg:min-w-[19rem]"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Compact Reminder">
        <div className="flex w-full flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-medium">Vendor access expires</span>
          <Countdown
            target={accessReview}
            label="Time remaining before vendor access expires"
            units={["hours", "minutes"]}
            variant="compact"
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Completed Window">
        <div className="w-full space-y-3">
          <p className="text-sm font-medium">Scheduled maintenance</p>
          <Countdown
            target={completedWindow}
            label="Scheduled maintenance countdown"
            completeLabel="Maintenance window ended"
          />
        </div>
      </ComponentPreview>
    </>
  );
}
