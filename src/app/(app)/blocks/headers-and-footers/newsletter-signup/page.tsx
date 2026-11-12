import { NewsletterSignupExamples } from "@/examples/blocks/headers-and-footers/newsletter-signup/newsletter-signup";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Newsletter Signup" };

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader title="Newsletter Signup" />
      <NewsletterSignupExamples />
    </div>
  );
}
