import { DropdownExamples } from "@/components/examples/components/dropdown/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Dropdown" };

export default function DropdownPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dropdown" description="Present contextual actions and compact choices." />
      <DropdownExamples />
    </div>
  );
}
