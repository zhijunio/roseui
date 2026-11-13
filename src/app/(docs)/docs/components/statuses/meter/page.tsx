import { MeterExamples } from "@/components/examples/meter/meter";
import { CodeBlock } from "@/components/ui/code-block";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Meter" };

const properties = [
  { name: "value", type: "number", defaultValue: "—", description: "Current measured value." },
  { name: "minValue", type: "number", defaultValue: "0", description: "Minimum value in the range." },
  {
    name: "maxValue",
    type: "number",
    defaultValue: "100",
    description: "Maximum value; invalid ranges fall back to minValue + 100.",
  },
  {
    name: "label",
    type: "string",
    defaultValue: "—",
    description: "Visible accessible label. Supply this or ariaLabel.",
  },
  {
    name: "ariaLabel",
    type: "string",
    defaultValue: "—",
    description: "Accessible name when no visible label is provided.",
  },
  { name: "valueLabel", type: "string", defaultValue: "—", description: "Custom displayed and announced value text." },
  {
    name: "formatOptions",
    type: "Intl.NumberFormatOptions",
    defaultValue: "—",
    description: "Formats the clamped value when valueLabel is omitted.",
  },
  {
    name: "tone",
    type: "MeterTone",
    defaultValue: "automatic",
    description: "Fill color: accent, success, warning, or error.",
  },
  { name: "size", type: "MeterSize", defaultValue: '"md"', description: "Track thickness: sm, md, or lg." },
  {
    name: "description",
    type: "ReactNode",
    defaultValue: "—",
    description: "Optional supporting text connected through aria-describedby.",
  },
] satisfies { name: string; type: string; defaultValue: string; description: string }[];

export default function ComponentExamplePage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="when-to-use" className="min-w-0 space-y-4">
        <h2 id="when-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-to-use" className="hover:underline">
            When to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Use to communicate a value within a known range, such as storage or quota usage.
        </p>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Avoid for indeterminate work or when exact values and trends need a chart.
        </p>
      </section>
      <section aria-labelledby="usage" className="min-w-0 space-y-4">
        <h2 id="usage" className="scroll-mt-20 text-xl font-semibold">
          <a href="#usage" className="hover:underline">
            Usage
          </a>
        </h2>
        <CodeBlock
          fileName="Usage.tsx"
          language="tsx"
          code={`import { Meter } from "@/components/ui/meter";

<Meter label="Storage used" value={used} maxValue={capacity} />`}
        />
      </section>
      <section aria-labelledby="examples" className="space-y-4">
        <h2 id="examples" className="text-xl font-semibold">
          Examples
        </h2>
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <MeterExamples />
        </div>
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="scroll-mt-20 text-xl font-semibold">
          <a href="#api-reference" className="hover:underline">
            API reference
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Meter is a non-interactive measurement. Its visible fill and spoken value are clamped to the configured range.
          Use Progress for task completion that changes over time.
        </p>
        <Table>
          <TableHeader>
            <TableColumn isRowHeader>Prop</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Default</TableColumn>
            <TableColumn>Description</TableColumn>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.name}>
                <TableCell role="rowheader" className="text-foreground align-middle font-mono">
                  {property.name}
                </TableCell>
                <TableCell className="min-w-48 max-w-sm whitespace-normal align-top">
                  <code className="text-xs">{property.type}</code>
                </TableCell>
                <TableCell className="align-top">
                  <code className="text-xs">{property.defaultValue}</code>
                </TableCell>
                <TableCell className="min-w-56 whitespace-normal align-top text-muted-foreground">
                  {property.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="text-muted-foreground text-sm">
          Composition helpers: <code>MeterHeader</code> arranges the label and value, <code>MeterValue</code> reads the
          formatted value from context, <code>MeterTrack</code> renders the bar, and <code>MeterDescription</code> adds
          accessible supporting text.
        </p>
      </section>
    </div>
  );
}
