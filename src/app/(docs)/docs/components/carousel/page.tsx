import { CarouselExamples } from "@/examples/components/carousel/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Carousel" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Carousel" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CarouselExamples />
      </div>
    </div>
  );
}
