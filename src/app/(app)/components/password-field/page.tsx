import { PageHeader } from "@/components/page-header";
import { PasswordFieldExamples } from "@/app/(app)/components/password-field/examples";

export const metadata = { title: "Password Field" };

export default function PasswordFieldPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Password Field" description="Password entry with accessible visibility controls." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <PasswordFieldExamples />
      </div>
    </div>
  );
}
