import { DialogExamples } from "@/components/examples/dialog/dialog";

export const metadata = { title: "Dialog" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <DialogExamples />
      </div>
    </div>
  );
}
