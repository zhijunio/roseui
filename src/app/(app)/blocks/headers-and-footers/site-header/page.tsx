import { SiteHeaderExamples } from "@/components/examples/blocks/headers-and-footers/site-header/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Site Header" };

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Site Header"
        description="A sticky website header with active navigation, a menu panel, and a responsive mobile sheet."
      />
      <SiteHeaderExamples />
    </div>
  );
}
