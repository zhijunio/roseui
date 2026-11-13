import { SearchFieldExamples } from "@/components/examples/search-field/search-field";

export const metadata = { title: "Search Field" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SearchFieldExamples />
      </div>
    </div>
  );
}
