import { InputOtpExamples } from "@/components/examples/input-otp/input-otp";

export const metadata = { title: "Input OTP" };

export default function ComponentExamplePage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <InputOtpExamples />
      </div>
    </div>
  );
}
