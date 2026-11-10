import { PageHeader } from "@/components/page-header";
import { LinkExamples } from "@/app/(app)/components/link/examples";

export const metadata = { title: "Link" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Link" description="Usage examples for the Link component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <LinkExamples />
      </div>
    </div>
  );
}
