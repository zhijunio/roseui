import { TabsExamples } from "@/examples/components/tabs/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Tabs" };

export default function TabsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tabs" />
      <TabsExamples />
    </div>
  );
}
