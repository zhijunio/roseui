import { PageHeader } from "@/components/page-header";
import { ColorPickerExamples } from "@/app/(app)/components/color-picker/examples";

export const metadata = { title: "Color Picker" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Color Picker" description="Usage examples for the Color Picker component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ColorPickerExamples />
      </div>
    </div>
  );
}
