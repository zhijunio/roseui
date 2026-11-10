import { PageHeader } from "@/components/page-header";
import { ComponentPreview } from "@/components/composite/component-preview";
import {
  BackupCodesExample,
  EmailCodeExample,
  RecoveryPhraseExample,
  TotpSetupExample,
} from "./examples";

export const metadata = { title: "Two-factor Setup" };

export default function TwoFactorSetupPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Two-factor Setup" description="Explore the setup states for authenticator apps, email codes, backup codes, and recovery phrases." />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentPreview previewId="auth-two-factor-setup-01" title="TOTP authenticator" layout="fullStack">
          <TotpSetupExample />
        </ComponentPreview>
        <ComponentPreview previewId="auth-two-factor-setup-02" title="Email code" layout="fullStack">
          <EmailCodeExample />
        </ComponentPreview>
        <ComponentPreview previewId="auth-two-factor-setup-03" title="Backup codes" layout="fullStack">
          <BackupCodesExample />
        </ComponentPreview>
        <ComponentPreview previewId="auth-two-factor-setup-04" title="Recovery phrase" layout="fullStack">
          <RecoveryPhraseExample />
        </ComponentPreview>
      </div>
    </div>
  );
}
