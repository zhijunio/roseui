import { GridListExamples } from "@/components/examples/grid-list/grid-list";
import { CodeBlock } from "@/components/ui/code-block";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Grid List" };

const components = [
  {
    name: "GridList",
    description: "Accessible collection with keyboard navigation, selection, sections, and optional drag and drop.",
  },
  {
    name: "GridListItem",
    description: "Selectable collection item. Pass a stable id when rendering items from a collection.",
  },
  { name: "GridListSection", description: "Groups related items in a labeled section." },
  { name: "GridListHeader", description: "Renders a section heading." },
  { name: "GridListLoadMoreItem", description: "Loads another page when the sentinel approaches the visible area." },
  { name: "GridListLabel", description: "Styles the primary text in a row or section heading." },
  { name: "GridListDescription", description: "Renders descriptive text associated with its item or heading." },
  { name: "GridListStart", description: "Groups leading row content." },
  { name: "GridListSpacer", description: "Pushes trailing row content to the end of the row." },
  { name: "GridListEmptyState", description: "Provides padded content for the empty state." },
];

export default function GridListPage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="when-to-use" className="min-w-0 space-y-4">
        <h2 id="when-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-to-use" className="hover:underline">
            When to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Use for selectable or actionable items where rows may include richer content and keyboard interaction.
        </p>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Avoid for simple static text lists; use semantic list markup for noninteractive content.
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
          code={`import { GridList, GridListItem } from "@/components/ui/grid-list";

<GridList aria-label="Files" selectionMode="multiple"><GridListItem id="report">Report.pdf</GridListItem></GridList>`}
        />
      </section>
      <section aria-labelledby="examples" className="min-w-0 space-y-4">
        <h2 id="examples" className="scroll-mt-20 text-xl font-semibold">
          <a href="#examples" className="hover:underline">
            Examples
          </a>
        </h2>
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <GridListExamples />
        </div>
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="scroll-mt-20 text-xl font-semibold">
          <a href="#api-reference" className="hover:underline">
            API reference
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          GridList and GridListItem extend React Aria Components. They support the collection, selection, keyboard, and
          drag and drop props from the underlying components. See the{" "}
          <a href="https://react-aria.adobe.com/GridList" className="text-foreground underline underline-offset-4">
            React Aria GridList API
          </a>
          .
        </p>
        <Table>
          <TableHeader>
            <TableColumn isRowHeader>Component</TableColumn>
            <TableColumn>Purpose</TableColumn>
          </TableHeader>
          <TableBody>
            {components.map((component) => (
              <TableRow key={component.name}>
                <TableCell role="rowheader" className="text-foreground align-top font-mono">
                  {component.name}
                </TableCell>
                <TableCell className="text-muted-foreground whitespace-normal">{component.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <h3 className="font-semibold">Basic usage</h3>
        <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
          <code>{`import { GridList, GridListItem } from "@/components/ui/grid-list";

const items = [
  { id: "beatles", name: "The Beatles" },
  { id: "queen", name: "Queen" },
];

<GridList items={items} aria-label="Choose a band" selectionMode="single">
  {(item) => <GridListItem id={item.id}>{item.name}</GridListItem>}
</GridList>`}</code>
        </pre>
      </section>
    </div>
  );
}
