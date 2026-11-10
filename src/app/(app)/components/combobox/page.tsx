import { PageHeader } from "@/components/page-header";
import { ComboboxExamples } from "@/app/(app)/components/combobox/examples";

export const metadata = { title: "Combobox" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Combobox" description="Usage examples for the Combobox component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ComboboxExamples />
      </div>
    </div>
  );
}
