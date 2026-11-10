import { PageHeader } from "@/components/page-header";
import { SocialButtonExamples } from "@/app/(app)/components/social-button/examples";

export const metadata = { title: "Social Button" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Social Button" description="Usage examples for the Social Button component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <SocialButtonExamples />
      </div>
    </div>
  );
}
