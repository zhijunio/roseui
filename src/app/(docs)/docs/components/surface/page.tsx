import { SurfaceExamples } from "@/examples/components/surface/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Surface" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Surface" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SurfaceExamples />
      </div>
    </div>
  );
}
