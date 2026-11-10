import { PageHeader } from "@/components/page-header";
import { MarkerExamples } from "@/app/(app)/components/marker/examples";

export const metadata = { title: "Marker" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Marker" description="Usage examples for the Marker component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <MarkerExamples />
      </div>
    </div>
  );
}
