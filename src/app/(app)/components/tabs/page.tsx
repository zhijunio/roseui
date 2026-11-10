import { PageHeader } from "@/components/page-header";
import { TabsExamples } from "@/app/(app)/components/tabs/examples";

export const metadata = { title: "Tabs" };

export default function TabsPage() {
  return <div className="space-y-6"><PageHeader title="Tabs" description="Organize related views and settings into switchable panels." /><TabsExamples /></div>;
}
