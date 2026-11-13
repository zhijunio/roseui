import { TagGroupExamples } from "@/components/examples/tag-group/tag-group";

export const metadata = { title: "Tag Group" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <TagGroupExamples />
      </div>
    </div>
  );
}
