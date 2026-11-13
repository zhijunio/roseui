import { LeaderboardExamples } from "@/components/examples/leaderboard/leaderboard";
import { CodeBlock } from "@/components/ui/code-block";
import type { LeaderboardItemProps } from "@/components/ui/leaderboard";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Leaderboard" };

const properties = [
  {
    name: "value",
    type: 'LeaderboardItemProps["value"]',
    defaultValue: "undefined",
    description: "Current value represented by the row fill.",
  },
  {
    name: "minValue",
    type: 'LeaderboardItemProps["minValue"]',
    defaultValue: "0",
    description: "Lower bound of the progress range.",
  },
  {
    name: "maxValue",
    type: 'LeaderboardItemProps["maxValue"]',
    defaultValue: "100",
    description: "Upper bound that maps to a full row fill.",
  },
  {
    name: "formatOptions",
    type: 'LeaderboardItemProps["formatOptions"]',
    defaultValue: "—",
    description: "Intl.NumberFormat options used to create valueText for render function children.",
  },
  {
    name: "onAction",
    type: 'LeaderboardItemProps["onAction"]',
    defaultValue: "—",
    description: "Called when the row is activated.",
  },
  {
    name: "children",
    type: 'LeaderboardItemProps["children"]',
    defaultValue: "—",
    description: "Row content or a render function receiving ProgressBar render values.",
  },
  {
    name: "className",
    type: 'LeaderboardItemProps["className"]',
    defaultValue: "—",
    description: "Additional classes for the progress row.",
  },
] satisfies { name: keyof LeaderboardItemProps; type: string; defaultValue: string; description: string }[];

export default function LeaderboardPage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="when-to-use" className="min-w-0 space-y-4">
        <h2 id="when-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-to-use" className="hover:underline">
            When to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Use to rank a small set of entities against a shared measurable value.
        </p>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Avoid when exact comparisons need a sortable table or values use incomparable scales.
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
          code={`import { Leaderboard, LeaderboardContent, LeaderboardItem } from "@/components/ui/leaderboard";

<Leaderboard><LeaderboardContent><LeaderboardItem value={72}>Team A</LeaderboardItem></LeaderboardContent></Leaderboard>`}
        />
      </section>
      <section aria-labelledby="examples" className="min-w-0 space-y-4">
        <h2 id="examples" className="scroll-mt-20 text-xl font-semibold">
          <a href="#examples" className="hover:underline">
            Examples
          </a>
        </h2>
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <LeaderboardExamples />
        </div>
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="scroll-mt-20 text-xl font-semibold">
          <a href="#api-reference" className="hover:underline">
            API reference
          </a>
        </h2>
        <p className="text-sm text-muted-foreground">
          Leaderboard is composed from a header, ordered content, and progress rows. Rows accept React Aria ProgressBar
          props, including formatted render values and an optional action handler.
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
                <TableCell role="rowheader" className="align-middle font-mono text-foreground">
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
        <h3 className="font-semibold">Composition</h3>
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
          <code>{`<Leaderboard>
  <LeaderboardHeader>
    <LeaderboardTitle>Top pages</LeaderboardTitle>
  </LeaderboardHeader>
  <LeaderboardContent aria-label="Most visited pages">
    <LeaderboardItem value={1200} maxValue={1200}>
      {({ valueText }) => <>
        <LeaderboardStart>Documentation</LeaderboardStart>
        <LeaderboardEnd>{valueText}</LeaderboardEnd>
      </>}
    </LeaderboardItem>
  </LeaderboardContent>
</Leaderboard>`}</code>
        </pre>
      </section>
    </div>
  );
}
