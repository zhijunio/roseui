import { PageHeader } from "@/components/page-header";
import { IconTileExamples } from "@/app/(app)/components/icon-tile/examples";

export const metadata = { title: "Icon Tile" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Icon Tile" description="Usage examples for the Icon Tile component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <IconTileExamples />
      </div>
    </div>
  );
}
