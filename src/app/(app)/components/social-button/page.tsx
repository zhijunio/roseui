import { SocialButtonExamples } from "@/examples/components/social-button/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Social Button" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Social Button" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SocialButtonExamples />
      </div>
    </div>
  );
}
