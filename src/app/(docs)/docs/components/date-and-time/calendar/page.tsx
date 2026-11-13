import { CalendarExamples } from "@/components/examples/calendar/calendar";

export const metadata = { title: "Calendar" };

export default function ComponentExamplePage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <CalendarExamples />
    </div>
  );
}
