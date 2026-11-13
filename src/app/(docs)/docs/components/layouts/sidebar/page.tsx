import { SidebarExamples } from "@/components/examples/sidebar/sidebar";
import { CodeBlock } from "@/components/ui/code-block";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = { title: "Sidebar" };

const properties = [
  ["variant", '"default" | "float" | "inset"', '"default"', "Controls the sidebar surface and content relationship."],
  ["collapsible", '"hidden" | "dock" | "none"', '"hidden"', "Chooses how the sidebar responds when collapsed."],
  ["side", '"left" | "right"', '"left"', "Places the sidebar on either side of the viewport."],
  ["isOpen", "boolean", "—", "Controls the expanded state on SidebarProvider."],
  ["defaultOpen", "boolean", "true", "Sets the initial expanded state on SidebarProvider."],
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
          Use for persistent navigation among sections or related destinations in an application.
        </p>
      </section>
      <section aria-labelledby="when-not-to-use" className="min-w-0 space-y-4">
        <h2 id="when-not-to-use" className="scroll-mt-20 text-xl font-semibold">
          <a href="#when-not-to-use" className="hover:underline">
            When not to use
          </a>
        </h2>
        <p className="text-muted-foreground text-sm">
          Avoid for a short flat set of links on a narrow screen; use compact navigation.
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
          code={`import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";

<SidebarProvider><Sidebar>Navigation</Sidebar></SidebarProvider>`}
        />
      </section>
      <section aria-labelledby="examples" className="min-w-0 space-y-4">
        <h2 id="examples" className="text-xl font-semibold">
          Examples
        </h2>
        <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
          <SidebarExamples />
        </div>
      </section>
      <section aria-labelledby="api-reference" className="min-w-0 space-y-4">
        <h2 id="api-reference" className="text-xl font-semibold">
          API reference
        </h2>
        <p className="text-muted-foreground text-sm">
          Wrap Sidebar and SidebarInset in SidebarProvider. SidebarTrigger toggles the desktop collapse state or opens
          the mobile panel.
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
                <TableCell>
                  <span className="font-mono">{name}</span>
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
          <code>{`import { Sidebar, SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

<SidebarProvider>
  <Sidebar variant="float" collapsible="dock" />
  <SidebarInset>{children}</SidebarInset>
</SidebarProvider>`}</code>
        </pre>
      </section>
    </div>
  );
}
