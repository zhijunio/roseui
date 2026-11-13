import { PaymentFieldExamples } from "@/components/examples/payment-field/payment-field";

export const metadata = { title: "Payment Field" };

export default function PaymentFieldPage() {
  return (
    <div className="space-y-6">
      <PaymentFieldExamples />
    </div>
  );
}
