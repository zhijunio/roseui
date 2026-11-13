import { TimePickerExamples } from "@/components/examples/time-picker/time-picker";

export const metadata = { title: "Time Picker" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TimePickerExamples />
      </div>
    </div>
  );
}
