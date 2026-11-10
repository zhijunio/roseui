import { PageHeader } from "@/components/page-header";
import { ColorSwatchPickerExamples } from "@/app/(app)/components/color-swatch-picker/examples";

export const metadata = { title: "Color Swatch Picker" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Color Swatch Picker" description="Usage examples for the Color Swatch Picker component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ColorSwatchPickerExamples />
      </div>
    </div>
  );
}
