import { HoldToConfirmExamples } from "@/components/examples/hold-to-confirm/hold-to-confirm";

export const metadata = { title: "Hold to Confirm" };

export default function HoldToConfirmPage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <HoldToConfirmExamples />
    </div>
  );
}
