import { IconTileExamples } from "@/examples/components/icon-tile/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Icon Tile" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Icon Tile" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <IconTileExamples />
      </div>
    </div>
  );
}
