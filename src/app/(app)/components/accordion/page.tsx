import { PageHeader } from "@/components/page-header";
import { AccordionExamples } from "@/app/(app)/components/accordion/examples";

export const metadata = { title: "Accordion" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Accordion" description="Usage examples for the Accordion component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <AccordionExamples />
      </div>
    </div>
  );
}
