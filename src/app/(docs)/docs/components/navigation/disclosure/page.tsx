import { DisclosureExamples } from "@/components/examples/disclosure/disclosure";

export const metadata = { title: "Disclosure" };

export default function ComponentExamplePage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <DisclosureExamples />
    </div>
  );
}
