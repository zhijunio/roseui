import { LinkButtonExamples } from "@/examples/components/link-button/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Link Button" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Link Button" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <LinkButtonExamples />
      </div>
    </div>
  );
}
