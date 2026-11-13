import { RadioExamples } from "@/examples/components/radio-group/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Radio Group" };

export default function RadioGroupPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Radio Group" />
      <RadioExamples />
    </div>
  );
}
