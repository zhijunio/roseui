import { MegaMenuMorphExamples } from "@/components/examples/components/mega-menu-morph/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Mega Menu Morph" };

export default function MegaMenuMorphPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Mega Menu Morph"
        description="Progressive navigation that expands in place and remains usable on narrow screens."
      />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <MegaMenuMorphExamples />
      </div>
    </div>
  );
}
