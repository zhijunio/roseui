import { ResetPasswordForm } from "./examples";
import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";

export const metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return <div className="space-y-6"><PageHeader title="Reset Password" description="Set a stronger password after a reset request." /><ComponentPreview previewId="auth-reset-password-01" title="Set a new password" layout="fullBleed" span={2}><div className="mx-auto w-full max-w-md px-1 py-2 sm:px-2"><ResetPasswordForm /></div></ComponentPreview></div>;
}
