import { ResetPasswordForm } from "@/components/examples/blocks/auth/reset-password/examples";
import { ComponentPreview } from "@/components/examples/component-preview";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reset Password" description="Set a stronger password after a reset request." />
      <ComponentPreview title="Set a new password" layout="fullBleed" span={2}>
        <div className="mx-auto w-full max-w-md px-1 py-2 sm:px-2">
          <ResetPasswordForm />
        </div>
      </ComponentPreview>
    </div>
  );
}
