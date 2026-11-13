import { PasswordFieldExamples } from "@/components/examples/password-field/password-field";

export const metadata = { title: "Password Field" };

export default function PasswordFieldPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <PasswordFieldExamples />
      </div>
    </div>
  );
}
