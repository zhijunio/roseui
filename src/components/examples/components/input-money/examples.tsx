"use client";

import * as React from "react";

import { InputMoney } from "@/components/composite/input-money";
import { ComponentPreview } from "@/components/examples/component-preview";

function InputMoneyExamplesContent() {
  const [amount, setAmount] = React.useState<number | null>(6499);
  const [rangeAmount, setRangeAmount] = React.useState<number | null>(null);

  return (
    <>
      <ComponentPreview title="Invoice line amount">
        <div className="grid w-full max-w-md gap-3">
          <InputMoney
            label="Implementation fee"
            value={amount}
            onValueChange={setAmount}
            description="Values are stored in cents for precise totals."
            quickAdd={[10, 25, 50]}
          />
          <p className="text-xs text-muted-foreground">
            Stored amount: {amount === null ? "No amount" : `${amount} cents`}
          </p>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Bounded account credit">
        <div className="w-full max-w-md">
          <InputMoney
            label="Credit adjustment"
            value={rangeAmount}
            onValueChange={setRangeAmount}
            min={0}
            max={250000}
            description="Enter $0.00 to $2,500.00. Amounts above $1,000 need finance approval."
            error={
              rangeAmount !== null && rangeAmount > 100000
                ? "Finance approval is required for this adjustment."
                : undefined
            }
          />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Read-only payment amount">
        <div className="w-full max-w-md">
          <InputMoney
            label="Captured amount"
            value={18375}
            readOnly
            description="This payment has already been captured."
          />
        </div>
      </ComponentPreview>
    </>
  );
}

export function InputMoneyExamples() {
  return <InputMoneyExamplesContent />;
}
