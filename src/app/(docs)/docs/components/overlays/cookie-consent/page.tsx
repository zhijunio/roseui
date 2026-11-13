import { CookieConsentExamples } from "@/components/examples/cookie-consent/cookie-consent";

export const metadata = { title: "Cookie Consent" };

export default function CookieConsentPage() {
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
        <CookieConsentExamples />
      </div>
    </div>
  );
}
