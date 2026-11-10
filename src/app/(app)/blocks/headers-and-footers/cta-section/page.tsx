import { PageHeader } from "@/components/page-header";
import { CtaSectionExamples } from "./examples";

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
