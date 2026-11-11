import { RadioExamples } from "@/components/examples/components/radio-group/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Radio Group" };

export default function RadioGroupPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Radio Group" description="Let people choose one option from a set." />
      <RadioExamples />
    </div>
  );
}
