import { EventCalendarExamples } from "@/components/examples/event-calendar/event-calendar";

export const metadata = { title: "Event Calendar" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <EventCalendarExamples />
      </div>
    </div>
  );
}
