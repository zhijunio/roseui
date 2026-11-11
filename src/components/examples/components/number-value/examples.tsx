import { ComponentPreview } from "@/components/examples/component-preview";
import { NumberValue } from "@/components/ui/number-value";

export function NumberValueExamples() {
  return (
    <>
      <ComponentPreview title="Decimal and Tabular Digits" layout="panel">
        <div className="grid gap-3 text-2xl font-semibold">
          <NumberValue value={12845.67} maximumFractionDigits={2} />
          <NumberValue value={12845.67} minimumFractionDigits={2} maximumFractionDigits={2} className="font-mono" />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Currency" layout="panel">
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 text-2xl font-semibold">
          <NumberValue value={1250} formatStyle="currency" currency="USD" />
          <NumberValue value={1250} formatStyle="currency" currency="EUR" locale="de-DE" />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Compact Notation" layout="panel">
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 text-2xl font-semibold">
          <NumberValue value={1250000} notation="compact" />
          <NumberValue value={1250000000} notation="compact" />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Percent and Sign" layout="panel">
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 text-2xl font-semibold">
          <NumberValue value={0.256} formatStyle="percent" maximumFractionDigits={1} />
          <NumberValue value={12} signDisplay="always" />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Unit and Prefix / Suffix" layout="panel">
        <div className="grid gap-3 text-2xl font-semibold">
          <NumberValue value={4.5} formatStyle="unit" unit="kilogram" maximumFractionDigits={1} />
          <NumberValue value={82} prefix="$" suffix=" / month" maximumFractionDigits={0} />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Custom Render" layout="panel">
        <NumberValue
          value={98.4}
          maximumFractionDigits={1}
          className="gap-2 rounded-lg border px-3 py-2 text-2xl font-semibold"
          prefix={<span className="text-sm font-normal text-muted-foreground">Satisfaction</span>}
          suffix={<span className="text-base text-muted-foreground">%</span>}
        />
      </ComponentPreview>
    </>
  );
}
