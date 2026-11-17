import { ToggleExamples } from "@/components/examples/toggle/toggle";

export const metadata = { title: "Toggle" };

export default function TogglePage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <ToggleExamples />
    </div>
  );
}
