import { ResetPasswordForm } from "@/examples/blocks/auth/reset-password/reset-password";
import { ComponentPreview } from "@/examples/component-preview";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reset Password" />
      <ComponentPreview title="Set a new password" layout="fullBleed" span={2}>
        <div className="mx-auto w-full max-w-md px-1 py-2 sm:px-2">
          <ResetPasswordForm />
        </div>
      </ComponentPreview>
    </div>
  );
}
