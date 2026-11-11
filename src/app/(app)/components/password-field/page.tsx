import { PasswordFieldExamples } from "@/components/examples/components/password-field/examples";
import { PageHeader } from "@/components/examples/page-header";

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
