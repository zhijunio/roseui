import { CookieConsentExamples } from "@/components/examples/components/cookie-consent/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Cookie Consent" };

export default function CookieConsentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Cookie Consent"
        description="A calm, accessible preference prompt with a progressive disclosure path."
      />
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CookieConsentExamples />
      </div>
    </div>
  );
}
