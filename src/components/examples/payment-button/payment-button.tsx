"use client";

import { useState } from "react";

import { Banknote as IconBanknote, CreditCard as IconCreditCard, Wallet as IconWallet } from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { PaymentButton } from "@/components/roseui/payment-button";

export function PaymentButtonExamples() {
  const [method, setMethod] = useState<string>();
  return (
    <>
      <ComponentPreview title="Choose a payment method" layout="panel">
        <div className="grid w-full max-w-md gap-2">
          <PaymentButton
            label="Credit or debit card"
            description="Visa, Mastercard, and more"
            icon={<IconCreditCard />}
            onClick={() => setMethod("Card")}
          />
          <PaymentButton
            label="Digital wallet"
            description="Pay with your saved wallet"
            icon={<IconWallet />}
            onClick={() => setMethod("Digital wallet")}
          />
          <PaymentButton
            label="Bank transfer"
            description="Usually completes in 1–2 business days"
            icon={<IconBanknote />}
            onClick={() => setMethod("Bank transfer")}
          />
          <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
            {method ? `${method} selected` : "Select a payment method to continue."}
          </p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Disabled option" layout="panel">
        <div className="w-full max-w-md">
          <PaymentButton label="Invoice" description="Available on business plans" disabled />
        </div>
      </ComponentPreview>
    </>
  );
}
