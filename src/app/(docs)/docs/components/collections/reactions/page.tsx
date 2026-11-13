import { ReactionsExamples } from "@/components/examples/reactions/reactions";

export const metadata = { title: "Reactions" };

export default function ReactionsPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ReactionsExamples />
      </div>
    </div>
  );
}
