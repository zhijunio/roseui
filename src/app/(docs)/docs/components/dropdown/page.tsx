import { DropdownExamples } from "@/examples/components/dropdown/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Dropdown" };

export default function DropdownPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dropdown" />
      <DropdownExamples />
    </div>
  );
}
