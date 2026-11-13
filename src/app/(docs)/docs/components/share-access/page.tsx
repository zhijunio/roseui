import { ShareAccessExamples } from "@/examples/components/share-access/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Share Access" };

export default function ShareAccessPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Share Access" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ShareAccessExamples />
      </div>
    </div>
  );
}
