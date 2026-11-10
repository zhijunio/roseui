import { PageHeader } from "@/components/page-header";
import { InputOtpExamples } from "@/app/(app)/components/input-otp/examples";

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
