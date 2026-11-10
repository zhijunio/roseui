"use client";

import { useState } from "react";
import { IconRefresh } from "@tabler/icons-react";

import { ComponentPreview } from "@/components/composite/component-preview";
import {
  PaymentCardField,
  type PaymentCardValues,
} from "@/components/composite/payment-card-field";
import { Button } from "@/components/ui/button";

const emptyValues: PaymentCardValues = {
  cardNumber: "",
  expiryDate: "",
  cvc: "",
};

export function PaymentCardFieldExamples() {
  const [values, setValues] = useState<PaymentCardValues>(emptyValues);

  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2">
      <ComponentPreview previewId="form-payment-card-field-01" title="Default payment card field" layout="field">
        <PaymentCardField onValueChange={setValues} />
      </ComponentPreview>

      <ComponentPreview previewId="form-payment-card-field-02" title="Live field values" layout="fullStack">
        <div className="grid gap-4">
          <PaymentCardField onValueChange={setValues} />
          <div className="rounded-[var(--radius-control)] border bg-muted/30 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium">Captured values</p>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="gap-1.5"
                onClick={() => setValues(emptyValues)}
              >
                <IconRefresh />
                Reset display
              </Button>
            </div>
            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
              <div className="min-w-0">
                <dt className="text-muted-foreground">Card number</dt>
                <dd className="truncate font-mono text-xs">{values.cardNumber || "Not entered"}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-muted-foreground">Expiry date</dt>
                <dd className="font-mono text-xs">{values.expiryDate || "Not entered"}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-muted-foreground">Security code</dt>
                <dd className="font-mono text-xs">{values.cvc || "Not entered"}</dd>
              </div>
            </dl>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
