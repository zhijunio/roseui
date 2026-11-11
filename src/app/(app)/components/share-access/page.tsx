import { ShareAccessExamples } from "@/components/examples/components/share-access/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Share Access" };

export default function ShareAccessPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Share Access" description="Invite collaborators with a focused access control surface." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ShareAccessExamples />
      </div>
    </div>
  );
}
