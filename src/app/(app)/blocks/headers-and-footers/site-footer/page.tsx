import { PageHeader } from "@/components/page-header";
import { SiteFooterExamples } from "./examples";

export const metadata = { title: "Site Footer" };

export default function Page() {
  return <div className="space-y-6"><PageHeader title="Site Footer" description="A quiet website footer with link columns, newsletter signup, status, and a closing brand mark." /><SiteFooterExamples /></div>;
}
