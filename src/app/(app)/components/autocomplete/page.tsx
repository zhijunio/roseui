import { AutocompleteExamples } from "@/components/examples/components/autocomplete/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Autocomplete" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Autocomplete" description="Usage examples for the Autocomplete component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <AutocompleteExamples />
      </div>
    </div>
  );
}
