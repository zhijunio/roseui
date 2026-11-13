import { ColorWheelExamples } from "@/components/examples/color-wheel/color-wheel";
import { CodeBlock } from "@/components/ui/code-block";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Color Wheel" };

export default function ColorWheelPage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="when-to-use" className="min-w-0 space-y-4">
        <h2 id="when-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-to-use" className="hover:underline">
            When to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">Use when users need to choose a hue visually and precisely.</p>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Avoid when a small set of named colors is enough; use swatches for those choices.
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
          code={`import { ColorWheel } from "@/components/ui/color-wheel";

<ColorWheel value={color} onChange={setColor} />`}
        />
      </section>
      <section aria-labelledby="examples" className="space-y-4">
        <h2 id="examples" className="text-xl font-semibold">
          Examples
        </h2>
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <ColorWheelExamples />
        </div>
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="scroll-mt-20 text-xl font-semibold">
          <a href="#api-reference" className="hover:underline">
            API reference
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          ColorWheel extends React Aria ColorWheel and fixes the track radii at 100px and 74px for a consistent 200px
          wheel. See the{" "}
          <a
            href="https://react-aria.adobe.com/ColorWheel#api"
            className="text-foreground underline underline-offset-4"
          >
            React Aria ColorWheel API
          </a>{" "}
          for value, defaultValue, onChange, isDisabled, and accessibility props.
        </p>
        <Table>
          <TableHeader>
            <TableColumn isRowHeader>Prop</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Default</TableColumn>
            <TableColumn>Description</TableColumn>
          </TableHeader>
          <TableBody>
            {[
              [
                "ColorWheel",
                "ColorWheelProps",
                "—",
                "React Aria ColorWheel props except outerRadius and innerRadius, which are fixed by RoseUI.",
              ],
            ].map(([name, type, defaultValue, description]) => (
              <TableRow key={name}>
                <TableCell role="rowheader" className="text-foreground align-middle font-mono">
                  {name}
                </TableCell>
                <TableCell className="min-w-48 max-w-sm whitespace-normal align-top">
                  <code className="text-xs">{type}</code>
                </TableCell>
                <TableCell className="align-top">
                  <code className="text-xs">{defaultValue}</code>
                </TableCell>
                <TableCell className="min-w-56 whitespace-normal align-top text-muted-foreground">
                  {description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
