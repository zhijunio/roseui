import { SignUpExample } from "@/components/examples/blocks/auth/sign-up/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Sign Up"
        description="Create a workspace account with profile, password, and provider options."
      />
      <SignUpExample />
    </div>
  );
}
