import { TrackerExamples } from "@/components/examples/tracker/tracker";
import { CodeBlock } from "@/components/ui/code-block";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Tracker" };

export default function TrackerPage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="when-to-use" className="min-w-0 space-y-4">
        <h2 id="when-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-to-use" className="hover:underline">
            When to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Use to show a compact sequence of statuses or progress segments over time.
        </p>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Avoid when each segment needs detailed labels, controls, or independent content.
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
          code={`import { Tracker } from "@/components/ui/tracker";

<Tracker data={activity} aria-label="Deployment history" />`}
        />
      </section>
      <section aria-labelledby="examples" className="space-y-4">
        <h2 id="examples" className="text-xl font-semibold">
          Examples
        </h2>
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <TrackerExamples />
        </div>
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="scroll-mt-20 text-xl font-semibold">
          <a href="#api-reference" className="hover:underline">
            API reference
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Tracker renders ordered segments and forwards standard div attributes, including aria-label.
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
                "data",
                "TrackerBlockProps[]",
                "[]",
                "Ordered segments; each can set key, label, color, variant, tooltip, and disabledTooltip.",
              ],
              [
                "variant",
                '"neutral" | "info" | "success" | "warning" | "destructive"',
                "—",
                "Default semantic color for segments without a color or own variant.",
              ],
              ["disabledTooltip", "boolean", "false", "Disables tooltips for all segments."],
              ["defaultBackgroundColor", "string", '"bg-secondary"', "Fallback Tailwind background class."],
              ["aria-label", "string", "—", "Accessible name for the tracker group."],
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
