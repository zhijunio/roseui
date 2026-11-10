import { PageHeader } from "@/components/page-header";
import { IconStackExamples } from "@/app/(app)/components/icon-stack/examples";

export const metadata = { title: "Icon Stack" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Icon Stack" description="Usage examples for the Icon Stack component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <IconStackExamples />
      </div>
    </div>
  );
}
