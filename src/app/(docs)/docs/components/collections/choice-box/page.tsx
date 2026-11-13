import { ChoiceBoxExamples } from "@/components/examples/choice-box/choice-box";
import { CodeBlock } from "@/components/ui/code-block";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Choice Box" };

export default function ChoiceBoxPage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="when-to-use" className="min-w-0 space-y-4">
        <h2 id="when-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-to-use" className="hover:underline">
            When to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Use for selecting one or more clearly labeled options from a compact collection.
        </p>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Avoid for long or hierarchical datasets; use searchable selection or a tree instead.
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
          code={`import { ChoiceBox, ChoiceBoxItem } from "@/components/ui/choice-box";

<ChoiceBox aria-label="Plans" selectionMode="single" items={plans}>{(plan) => <ChoiceBoxItem id={plan.id} label={plan.label} />}</ChoiceBox>`}
        />
      </section>
      <section aria-labelledby="examples" className="space-y-4">
        <h2 id="examples" className="text-xl font-semibold">
          Examples
        </h2>
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <ChoiceBoxExamples />
        </div>
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="scroll-mt-20 text-xl font-semibold">
          <a href="#api-reference" className="hover:underline">
            API reference
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          ChoiceBox is built on React Aria GridList. It supports single or multiple selection and composes cards from
          ChoiceBoxItem, ChoiceBoxLabel, and ChoiceBoxDescription.
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
              ["columns", "1 | 2 | 3 | 4 | 5 | 6", "1", "Responsive column count."],
              ["gap", "0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12", "0", "Spacing token between cards."],
              ["selectionMode", "single | multiple | none", "single", "Selection behavior inherited from GridList."],
              [
                "isReadOnly",
                "boolean",
                "false",
                "Disables selection changes while leaving cards available for navigation.",
              ],
              ["ChoiceBoxItem.label", "string", "—", "Label text when children are not supplied."],
              ["ChoiceBoxItem.description", "string", "—", "Description text associated with the item."],
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
