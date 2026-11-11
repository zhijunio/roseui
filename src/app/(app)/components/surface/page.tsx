import { SurfaceExamples } from "@/components/examples/components/surface/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Surface" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Surface" description="Usage examples for the Surface component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SurfaceExamples />
      </div>
    </div>
  );
}
