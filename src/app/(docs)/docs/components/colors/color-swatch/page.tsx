import { ColorSwatchExamples } from "@/components/examples/color-swatch/color-swatch";

export const metadata = { title: "Color Swatch" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ColorSwatchExamples />
      </div>
    </div>
  );
}
