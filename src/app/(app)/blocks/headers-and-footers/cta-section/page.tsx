import { CtaSectionExamples } from "@/examples/blocks/headers-and-footers/cta-section/cta-section";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "CTA Section" };

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="CTA Section" />
      <CtaSectionExamples />
    </div>
  );
}
