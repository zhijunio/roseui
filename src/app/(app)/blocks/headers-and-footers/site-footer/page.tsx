import { SiteFooterExamples } from "@/examples/blocks/headers-and-footers/site-footer/site-footer";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Site Footer" };

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Site Footer" />
      <SiteFooterExamples />
    </div>
  );
}
