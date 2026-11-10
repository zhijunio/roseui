import { PageHeader } from "@/components/page-header";
import { ScrollspyExamples } from "@/app/(app)/components/scrollspy/examples";

export const metadata = { title: "Scrollspy" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Scrollspy" description="Usage examples for the Scrollspy component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ScrollspyExamples />
      </div>
    </div>
  );
}
