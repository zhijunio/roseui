import { ForgotPasswordExample } from "@/components/examples/blocks/auth/forgot-password/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Reset password" };

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Forgot Password" description="Send a reset link to a workspace email address." />
      <ForgotPasswordExample />
    </div>
  );
}
