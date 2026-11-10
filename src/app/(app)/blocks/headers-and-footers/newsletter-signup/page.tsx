import { PageHeader } from "@/components/page-header";
import { NewsletterSignupExamples } from "./examples";

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
