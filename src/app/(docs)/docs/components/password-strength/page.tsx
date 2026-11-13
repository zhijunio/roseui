import { PasswordStrengthExamples } from "@/examples/components/password-strength/examples";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Password Strength" };

export default function PasswordStrengthPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Password Strength" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <PasswordStrengthExamples />
      </div>
    </div>
  );
}
