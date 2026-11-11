import { LinkExamples } from "@/components/examples/components/link/examples";
import { PageHeader } from "@/components/examples/page-header";

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
