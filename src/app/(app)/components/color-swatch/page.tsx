import { ColorSwatchExamples } from "@/components/examples/components/color-swatch/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Color Swatch" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Color Swatch" description="Usage examples for the Color Swatch component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ColorSwatchExamples />
      </div>
    </div>
  );
}
