import {
  BackupCodesExample,
  EmailCodeExample,
  RecoveryPhraseExample,
  TotpSetupExample,
} from "@/examples/blocks/auth/two-factor-setup/two-factor-setup";
import { ComponentPreview } from "@/examples/component-preview";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Two-factor Setup" };

export default function TwoFactorSetupPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Two-factor Setup" />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <ComponentPreview title="TOTP authenticator" layout="fullStack">
          <TotpSetupExample />
        </ComponentPreview>
        <ComponentPreview title="Email code" layout="fullStack">
          <EmailCodeExample />
        </ComponentPreview>
        <ComponentPreview title="Backup codes" layout="fullStack">
          <BackupCodesExample />
        </ComponentPreview>
        <ComponentPreview title="Recovery phrase" layout="fullStack">
          <RecoveryPhraseExample />
        </ComponentPreview>
      </div>
    </div>
  );
}
