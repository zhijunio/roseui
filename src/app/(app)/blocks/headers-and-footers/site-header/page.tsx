import { PageHeader } from "@/components/page-header";
import { SiteHeaderExamples } from "./examples";

export const metadata = { title: "Site Header" };

export default function Page() {
  return <div className="space-y-6"><PageHeader title="Site Header" description="A sticky website header with active navigation, a menu panel, and a responsive mobile sheet." /><SiteHeaderExamples /></div>;
}
