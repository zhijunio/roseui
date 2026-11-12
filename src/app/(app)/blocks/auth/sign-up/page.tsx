import { SignUpExample } from "@/examples/blocks/auth/sign-up/sign-up";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Sign Up" />
      <SignUpExample />
    </div>
  );
}
