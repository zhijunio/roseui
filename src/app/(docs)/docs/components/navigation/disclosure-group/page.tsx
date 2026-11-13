import { DisclosureGroupExamples } from "@/components/examples/disclosure-group/disclosure-group";

export const metadata = { title: "Disclosure Group" };

export default function ComponentExamplePage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <DisclosureGroupExamples />
    </div>
  );
}
