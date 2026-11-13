import { NavbarExamples } from "@/components/examples/navbar/navbar";
import { CodeBlock } from "@/components/ui/code-block";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Navbar" };

const properties = [
  ["variant", '"default" | "float" | "inset"', '"default"', "Controls the navigation bar layout."],
  ["isSticky", "boolean", "false", "Keeps the navigation bar at the top or bottom of the viewport."],
  ["placement", '"top" | "bottom"', '"top"', "Selects the sticky edge. Available when isSticky is true."],
  ["side", '"left" | "right"', '"left"', "Sets the edge used by the mobile navigation panel."],
];

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
          Use for a page-level navigation or action bar that remains consistent across a view.
        </p>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Avoid duplicating sidebar navigation or placing unrelated content in the global bar.
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
          code={`import { Navbar, NavbarProvider } from "@/components/ui/navbar";

<NavbarProvider><Navbar aria-label="Workspace navigation">Workspace</Navbar></NavbarProvider>`}
        />
      </section>
      <section aria-labelledby="examples" className="min-w-0 space-y-4">
        <h2 id="examples" className="text-xl font-semibold">
          Examples
        </h2>
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <NavbarExamples />
        </div>
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="text-xl font-semibold">
          API reference
        </h2>
        <p className="text-muted-foreground text-sm">
          Navbar is composed from a provider, a responsive navigation bar, and optional mobile controls.
        </p>
        <Table>
          <TableHeader>
            <TableColumn isRowHeader>Prop</TableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Default</TableColumn>
            <TableColumn>Description</TableColumn>
          </TableHeader>
          <TableBody>
            {properties.map(([name, type, defaultValue, description]) => (
              <TableRow key={name}>
                <TableCell role="rowheader" className="font-mono">
                  {name}
                </TableCell>
                <TableCell>
                  <code className="text-xs">{type}</code>
                </TableCell>
                <TableCell>
                  <code className="text-xs">{defaultValue}</code>
                </TableCell>
                <TableCell className="text-muted-foreground">{description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <pre className="bg-muted overflow-x-auto rounded-lg p-4 text-sm">
          <code>{`import { Navbar, NavbarProvider, NavbarSection, NavbarItem } from "@/components/ui/navbar";

<NavbarProvider>
  <Navbar variant="float" isSticky>
    <NavbarSection>
      <NavbarItem href="/workspace" isCurrent>Workspace</NavbarItem>
    </NavbarSection>
  </Navbar>
</NavbarProvider>`}</code>
        </pre>
      </section>
    </div>
  );
}
