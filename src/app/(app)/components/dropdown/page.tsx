import { PageHeader } from "@/components/page-header";
import { DropdownExamples } from "@/app/(app)/components/dropdown/examples";

export const metadata = { title: "Dropdown" };

export default function DropdownPage() {
  return <div className="space-y-6">
    <PageHeader title="Dropdown" description="Present contextual actions and compact choices." />
    <DropdownExamples />
  </div>;
}
