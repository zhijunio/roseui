import { LinkButtonExamples } from "@/components/examples/components/link-button/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Link Button" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Link Button" description="Link-styled controls for navigation and lightweight actions." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <LinkButtonExamples />
      </div>
    </div>
  );
}
