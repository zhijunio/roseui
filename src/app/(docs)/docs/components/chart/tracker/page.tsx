import { TrackerExamples } from "@/components/examples/tracker/tracker";

export const metadata = { title: "Tracker" };

export default function TrackerPage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <TrackerExamples />
    </div>
  );
}
