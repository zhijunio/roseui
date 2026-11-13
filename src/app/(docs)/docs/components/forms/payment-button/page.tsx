import { PaymentButtonExamples } from "@/components/examples/payment-button/payment-button";

export const metadata = { title: "Payment Button" };

export default function ComponentExamplePage() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <PaymentButtonExamples />
    </div>
  );
}
