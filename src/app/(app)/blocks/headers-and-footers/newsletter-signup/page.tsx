import { NewsletterSignupExamples } from "@/components/examples/blocks/headers-and-footers/newsletter-signup/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Newsletter Signup" };

export default function Page() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Newsletter Signup"
        description="A focused email signup with inline and card layouts, validation, and delivery feedback."
      />
      <NewsletterSignupExamples />
    </div>
  );
}
