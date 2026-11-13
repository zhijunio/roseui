import { PasswordStrengthExamples } from "@/components/examples/password-strength/password-strength";

export const metadata = { title: "Password Strength" };

export default function PasswordStrengthPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <PasswordStrengthExamples />
      </div>
    </div>
  );
}
