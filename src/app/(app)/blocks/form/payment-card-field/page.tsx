import { PaymentCardFieldExamples } from "@/components/examples/blocks/form/payment-card-field/examples";
import { PageHeader } from "@/components/examples/page-header";

export const metadata = { title: "Payment Card Field" };

export default function PaymentCardFieldPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Payment Card Field"
        description="Collect card details with formatting, validation feedback, and accessible field labels."
      />
      <PaymentCardFieldExamples />
    </div>
  );
}
