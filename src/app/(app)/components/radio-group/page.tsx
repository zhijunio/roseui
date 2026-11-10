import { PageHeader } from "@/components/page-header";
import { RadioExamples } from "@/app/(app)/components/radio-group/examples";

export const metadata = { title: "Radio Group" };

export default function RadioGroupPage() {
  return <div className="space-y-6"><PageHeader title="Radio Group" description="Let people choose one option from a set." /><RadioExamples /></div>;
}
