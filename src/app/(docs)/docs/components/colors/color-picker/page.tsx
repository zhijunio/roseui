import { ColorPickerExamples } from "@/components/examples/color-picker/color-picker";

export const metadata = { title: "Color Picker" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ColorPickerExamples />
      </div>
    </div>
  );
}
