import { AnnouncementExamples } from "@/components/examples/components/announcement/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Announcement" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Announcement" description="Usage examples for the Announcement component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <AnnouncementExamples />
      </div>
    </div>
  );
}
