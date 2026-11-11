import { TabsExamples } from "@/components/examples/components/tabs/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Tabs" };

export default function TabsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tabs" description="Organize related views and settings into switchable panels." />
      <TabsExamples />
    </div>
  );
}
