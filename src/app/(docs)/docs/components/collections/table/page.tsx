import { BusinessTableExamples } from "@/components/examples/table/business-table";
import { TableExamples } from "@/components/examples/table/table";
import { CodeBlock } from "@/components/ui/code-block";
import type { TableColumnProps, TableProps } from "@/components/ui/table";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Table" };

const parts = [
  { name: "TableBody", description: "Extends React Aria TableBody. Supports className and collection props." },
  { name: "TableCell", description: "Extends React Aria Cell. Supports className and cell props such as colSpan." },
  { name: "TableHeader", description: "Extends React Aria TableHeader. Supports className and column collections." },
  { name: "TableRow", description: "Extends React Aria Row. Supports className, row selection, and row actions." },
  {
    name: "TableLoadMoreItem",
    description: "Local extension: intersection sentinel for loading more rows as the user scrolls.",
  },
  { name: "TableFooter", description: "Local extension: optional footer rows, such as totals." },
];

const tableProps = [
  {
    name: "allowResize",
    type: 'TableProps["allowResize"]',
    defaultValue: "false",
    description: "Enables column resizing. Set isResizable on each resizable TableColumn.",
  },
  {
    name: "bleed",
    type: 'TableProps["bleed"]',
    defaultValue: "false",
    description: "Extends the table to the edges of its container.",
  },
  {
    name: "className",
    type: 'TableProps["className"]',
    defaultValue: "—",
    description: "Classes for the scrollable table wrapper.",
  },
  {
    name: "tableClassName",
    type: 'TableProps["tableClassName"]',
    defaultValue: "—",
    description: "Local extension: classes for the underlying React Aria Table element.",
  },
  {
    name: "role",
    type: 'TableProps["role"]',
    defaultValue: '"table"',
    description: "Local extension: overrides the table role for specialized compositions such as TreeTable.",
  },
] satisfies {
  name: keyof TableProps;
  type: string;
  defaultValue: string;
  description: string;
}[];

const columnProps = [
  {
    name: "className",
    type: 'TableColumnProps["className"]',
    defaultValue: "—",
    description: "Additional classes for this column heading.",
  },
  {
    name: "isResizable",
    type: 'TableColumnProps["isResizable"]',
    defaultValue: "false",
    description: "Allows this column to be resized when the parent Table has allowResize enabled.",
  },
] satisfies { name: keyof TableColumnProps; type: string; defaultValue: string; description: string }[];

export default function TablePage() {
  return (
    <div className="space-y-10">
      <section aria-labelledby="when-to-use" className="min-w-0 space-y-4">
        <h2 id="when-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-to-use" className="hover:underline">
            When to use
          </a>
        </h2>
        <ul className="text-muted-foreground list-disc space-y-1 ps-5 text-sm">
          <li>Compare structured records across shared columns, such as people, orders, projects, or inventory.</li>
          <li>Support keyboard navigation, sorting, selection, row actions, or large result sets.</li>
          <li>Show details in a compact, scannable format with optional expandable content.</li>
        </ul>
      </section>

      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <ul className="text-muted-foreground list-disc space-y-1 ps-5 text-sm">
          <li>Use Grid List when each item is a card or a flexible row rather than a set of comparable columns.</li>
          <li>Use a description list for a small set of label and value pairs.</li>
          <li>
            Use DataTable when you need the included TanStack filtering, pagination, column visibility, or server
            pagination controls.
          </li>
        </ul>
      </section>

      <section aria-labelledby="usage" className="min-w-0 space-y-4">
        <h2 id="usage" className="scroll-mt-20 text-xl font-semibold">
          <a href="#usage" className="hover:underline">
            Usage
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Give the table an accessible name, provide stable row ids, and mark the primary column with{" "}
          <code>isRowHeader</code>. Add selection, sorting, or loading props only when users need those interactions.
        </p>
        <CodeBlock
          fileName="ProjectsTable.tsx"
          language="tsx"
          code={`import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

const projects = [
  { id: "atlas", name: "Atlas redesign", owner: "Maya Chen", status: "In progress" },
  { id: "mobile", name: "Mobile onboarding", owner: "Leo Park", status: "In review" },
];

export function ProjectsTable() {
  return (
    <Table aria-label="Projects" selectionMode="multiple">
      <TableHeader>
        <TableColumn isRowHeader>Name</TableColumn>
        <TableColumn>Owner</TableColumn>
        <TableColumn>Status</TableColumn>
      </TableHeader>
      <TableBody items={projects}>
        {(project) => (
          <TableRow id={project.id}>
            <TableCell>{project.name}</TableCell>
            <TableCell>{project.owner}</TableCell>
            <TableCell>{project.status}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}`}
        />
      </section>

      <section aria-labelledby="examples" className="min-w-0 space-y-4">
        <h2 id="examples" className="scroll-mt-20 text-xl font-semibold">
          <a href="#examples" className="hover:underline">
            Examples
          </a>
        </h2>
        <TableExamples />
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <BusinessTableExamples />
        </div>
      </section>

      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="scroll-mt-20 text-xl font-semibold">
          <a href="#api-reference" className="hover:underline">
            API reference
          </a>
        </h2>
        <div className="space-y-2">
          <h3 className="font-semibold">
            <code>Table</code>
          </h3>
          <p className="text-muted-foreground text-sm">
            Table extends React Aria Table. See the{" "}
            <a href="https://react-aria.adobe.com/Table#api" className="text-foreground underline underline-offset-4">
              React Aria Table API
            </a>{" "}
            for collection, selection, sorting, keyboard, and drag-and-drop props. RoseUI adds the properties below.
          </p>
        </div>
        <Table aria-label="Table props">
          <TableHeader>
            <TableColumn isRowHeader>Prop</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Default</TableColumn>
            <TableColumn>Description</TableColumn>
          </TableHeader>
          <TableBody>
            {tableProps.map((property) => (
              <TableRow key={property.name} id={property.name}>
                <TableCell className="text-foreground align-middle font-mono">{property.name}</TableCell>
                <TableCell className="max-w-sm min-w-48 align-top whitespace-normal">
                  <code className="text-xs">{property.type}</code>
                </TableCell>
                <TableCell className="align-top">
                  <code className="text-xs">{property.defaultValue}</code>
                </TableCell>
                <TableCell className="text-muted-foreground min-w-56 align-top whitespace-normal">
                  {property.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="space-y-2 pt-2">
          <h3 className="font-semibold">
            <code>TableColumn</code>
          </h3>
          <p className="text-muted-foreground text-sm">
            TableColumn extends React Aria Column. Its Intent-specific resizing prop is listed below.
          </p>
        </div>
        <Table aria-label="TableColumn props">
          <TableHeader>
            <TableColumn isRowHeader>Prop</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Default</TableColumn>
            <TableColumn>Description</TableColumn>
          </TableHeader>
          <TableBody>
            {columnProps.map((property) => (
              <TableRow key={property.name} id={property.name}>
                <TableCell className="text-foreground align-top font-mono">{property.name}</TableCell>
                <TableCell className="align-top font-mono text-xs">{property.type}</TableCell>
                <TableCell className="align-top">{property.defaultValue}</TableCell>
                <TableCell className="text-muted-foreground whitespace-normal">{property.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="space-y-2 pt-2">
          <h3 className="font-semibold">Composed components</h3>
          <p className="text-muted-foreground text-sm">
            TableBody, TableCell, TableHeader, and TableRow extend their React Aria counterparts. TableFooter and
            TableLoadMoreItem are RoseUI additions.
          </p>
        </div>
        <Table aria-label="Composed table components">
          <TableHeader>
            <TableColumn isRowHeader>Component</TableColumn>
            <TableColumn>Purpose</TableColumn>
          </TableHeader>
          <TableBody>
            {parts.map((item) => (
              <TableRow key={item.name} id={item.name}>
                <TableCell className="text-foreground align-top font-mono">{item.name}</TableCell>
                <TableCell className="text-muted-foreground whitespace-normal">{item.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
