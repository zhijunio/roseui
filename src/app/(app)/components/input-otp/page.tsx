import { InputOtpExamples } from "@/components/examples/components/input-otp/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Input Otp" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Input Otp" description="Usage examples for the Input Otp component." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <InputOtpExamples />
      </div>
    </div>
  );
}
