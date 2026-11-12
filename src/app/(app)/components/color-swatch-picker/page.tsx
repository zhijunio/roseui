import { ColorSwatchPickerExamples } from "@/examples/components/color-swatch-picker/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Color Swatch Picker" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Color Swatch Picker" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ColorSwatchPickerExamples />
      </div>
    </div>
  );
}
