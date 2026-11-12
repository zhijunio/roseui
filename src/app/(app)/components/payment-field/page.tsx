import { PaymentFieldExamples } from "@/examples/components/payment-field/payment-field";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Payment Field" };

export default function PaymentFieldPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Payment Field" />
      <PaymentFieldExamples />
    </div>
  );
}
