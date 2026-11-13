import { RangeCalendarExamples } from "@/components/examples/range-calendar/range-calendar";

export const metadata = { title: "Range Calendar" };

export default function ComponentExamplePage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <RangeCalendarExamples />
    </div>
  );
}
