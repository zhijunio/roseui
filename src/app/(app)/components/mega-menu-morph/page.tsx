import { MegaMenuMorphExamples } from "@/examples/components/mega-menu-morph/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Mega Menu Morph" };

export default function MegaMenuMorphPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Mega Menu Morph" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <MegaMenuMorphExamples />
      </div>
    </div>
  );
}
