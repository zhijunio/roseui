import { SiteFooterExamples } from "@/components/examples/blocks/headers-and-footers/site-footer/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Site Footer" };

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Site Footer"
        description="A quiet website footer with link columns, newsletter signup, status, and a closing brand mark."
      />
      <SiteFooterExamples />
    </div>
  );
}
