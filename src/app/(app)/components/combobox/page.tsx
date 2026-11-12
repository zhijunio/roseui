import { ComboboxExamples } from "@/examples/components/combobox/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Combobox" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Combobox" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ComboboxExamples />
      </div>
    </div>
  );
}
