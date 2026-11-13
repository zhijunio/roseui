import { ForgotPasswordExample } from "@/examples/blocks/auth/forgot-password/forgot-password";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Reset password" };

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Forgot Password" />
      <ForgotPasswordExample />
    </div>
  );
}
