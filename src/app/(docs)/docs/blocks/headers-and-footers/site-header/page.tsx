import { SiteHeaderExamples } from "@/examples/blocks/headers-and-footers/site-header/site-header";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Site Header" };

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Site Header" />
      <SiteHeaderExamples />
    </div>
  );
}
