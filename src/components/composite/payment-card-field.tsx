"use client";

import { type ChangeEvent, useId, useState } from "react";

import { IconCalendar, IconCreditCard, IconLock } from "@tabler/icons-react";
import { usePaymentInputs } from "react-payment-inputs";

import { Field, FieldDescription, FieldLabel } from "@/components/composite/field";
import { Input } from "@/components/ui/input";

export type PaymentCardValues = {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
};

const emptyValues: PaymentCardValues = {
  cardNumber: "",
  expiryDate: "",
  cvc: "",
};

export function PaymentCardField({ onValueChange }: { onValueChange?: (values: PaymentCardValues) => void }) {
  const id = useId();
  const [values, setValues] = useState(emptyValues);
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs({ autoFocus: false });

  function updateValue(field: keyof PaymentCardValues, event: ChangeEvent<HTMLInputElement>) {
    const nextValues = { ...values, [field]: event.currentTarget.value };
    setValues(nextValues);
    onValueChange?.(nextValues);
  }

  const cardNumberProps = getCardNumberProps({
    onChange: (event: ChangeEvent<HTMLInputElement>) => updateValue("cardNumber", event),
  });
  const expiryDateProps = getExpiryDateProps({
    onChange: (event: ChangeEvent<HTMLInputElement>) => updateValue("expiryDate", event),
  });
  const cvcProps = getCVCProps({
    onChange: (event: ChangeEvent<HTMLInputElement>) => updateValue("cvc", event),
  });

  return (
    <div className="grid w-full max-w-md gap-4">
      <Field>
        <FieldLabel htmlFor={`${id}-card-number`}>Card number</FieldLabel>
        <div className="relative">
          <Input
            {...cardNumberProps}
            id={`${id}-card-number`}
            type="text"
            aria-invalid={Boolean(meta.touchedInputs.cardNumber && meta.erroredInputs.cardNumber)}
            className="pe-10"
            placeholder="1234 5678 9012 3456"
            inputMode="numeric"
          />
          <IconCreditCard
            aria-hidden="true"
            className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
        </div>
        {meta.touchedInputs.cardNumber && meta.erroredInputs.cardNumber ? (
          <FieldDescription role="alert" className="text-destructive">
            {meta.erroredInputs.cardNumber}
          </FieldDescription>
        ) : null}
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field>
          <FieldLabel htmlFor={`${id}-expiry-date`}>Expiry date</FieldLabel>
          <div className="relative">
            <Input
              {...expiryDateProps}
              id={`${id}-expiry-date`}
              type="text"
              aria-invalid={Boolean(meta.touchedInputs.expiryDate && meta.erroredInputs.expiryDate)}
              className="pe-10"
              placeholder="MM / YY"
              inputMode="numeric"
            />
            <IconCalendar
              aria-hidden="true"
              className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
          {meta.touchedInputs.expiryDate && meta.erroredInputs.expiryDate ? (
            <FieldDescription role="alert" className="text-destructive">
              {meta.erroredInputs.expiryDate}
            </FieldDescription>
          ) : null}
        </Field>

        <Field>
          <FieldLabel htmlFor={`${id}-cvc`}>Security code</FieldLabel>
          <div className="relative">
            <Input
              {...cvcProps}
              id={`${id}-cvc`}
              type="text"
              aria-invalid={Boolean(meta.touchedInputs.cvc && meta.erroredInputs.cvc)}
              className="pe-10"
              placeholder="CVC"
              inputMode="numeric"
              autoComplete="cc-csc"
            />
            <IconLock
              aria-hidden="true"
              className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
          </div>
          {meta.touchedInputs.cvc && meta.erroredInputs.cvc ? (
            <FieldDescription role="alert" className="text-destructive">
              {meta.erroredInputs.cvc}
            </FieldDescription>
          ) : null}
        </Field>
      </div>
      <FieldDescription>Card details are formatted and checked as you enter them.</FieldDescription>
    </div>
  );
}
