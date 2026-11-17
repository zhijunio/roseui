import { MeterExamples } from "@/components/examples/meter/meter";

export const metadata = { title: "Meter" };

export default function MeterPage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <MeterExamples />
    </div>
  );
}
