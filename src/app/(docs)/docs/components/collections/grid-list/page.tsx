import { GridListExamples } from "@/components/examples/grid-list/grid-list";

export const metadata = { title: "Grid List" };

export default function GridListPage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <GridListExamples />
    </div>
  );
}
