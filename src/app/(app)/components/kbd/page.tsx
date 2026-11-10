import { PageHeader } from "@/components/page-header";
import { KbdExamples } from "@/app/(app)/components/kbd/examples";

export const metadata = { title: "Kbd" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Kbd" description="Usage examples for the Kbd component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <KbdExamples />
      </div>
    </div>
  );
}
