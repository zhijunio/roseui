import { ColorFieldExamples } from "@/components/examples/color-field/color-field";

export const metadata = { title: "Color Field" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ColorFieldExamples />
      </div>
    </div>
  );
}
