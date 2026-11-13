import { PopoverExamples } from "@/components/examples/popover/popover";

export const metadata = { title: "Popover" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <PopoverExamples />
      </div>
    </div>
  );
}
