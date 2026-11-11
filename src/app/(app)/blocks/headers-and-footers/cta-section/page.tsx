import { CtaSectionExamples } from "@/components/examples/blocks/headers-and-footers/cta-section/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "CTA Section" };

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="CTA Section"
        description="Closing prompts with centered, split, and dismissible banner layouts."
      />
      <CtaSectionExamples />
    </div>
  );
}
