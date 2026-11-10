import { PageHeader } from "@/components/page-header";
import { TopNavigationExamples } from "./examples";

export const metadata = { title: "Top Navigation" };

export default function TopNavigationPage() {
  return <div className="space-y-6"><PageHeader title="Top Navigation" description="A compact workspace with navigation aligned across the top." /><TopNavigationExamples /></div>;
}
