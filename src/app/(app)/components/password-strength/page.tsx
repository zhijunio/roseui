import { PageHeader } from "@/components/page-header";
import { PasswordStrengthExamples } from "@/app/(app)/components/password-strength/examples";

export const metadata = { title: "Password Strength" };

export default function PasswordStrengthPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Password Strength" description="Show which account password requirements are met while typing." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <PasswordStrengthExamples />
      </div>
    </div>
  );
}
