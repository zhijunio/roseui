"use client";

import { useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { TreeTable, type TreeTableColumn, type TreeTableNode } from "@/components/ui/tree-table";
import { ComponentPreview } from "@/examples/component-preview";

type TeamRow = { name: string; owner: string; members: number; status: "Active" | "Review" };

const teams: readonly TreeTableNode<TeamRow>[] = [
  {
    id: "operations",
    data: { name: "Operations", owner: "Mina Patel", members: 18, status: "Active" },
    children: [
      { id: "customer-success", data: { name: "Customer success", owner: "Eli Brooks", members: 8, status: "Active" } },
      { id: "vendor-review", data: { name: "Vendor review", owner: "Nora Kim", members: 10, status: "Review" } },
    ],
  },
  { id: "product", data: { name: "Product", owner: "Leo Chen", members: 12, status: "Active" }, hasChildren: true },
];

const columns: readonly TreeTableColumn<TeamRow>[] = [
  { id: "owner", label: "Owner", render: (row) => row.owner, sortValue: (row) => row.owner },
  {
    id: "members",
    label: "Members",
    render: (row) => <span className="tabular-nums">{row.members}</span>,
    sortValue: (row) => row.members,
  },
  {
    id: "status",
    label: "Status",
    render: (row) => <Badge variant={row.status === "Active" ? "secondary" : "outline"}>{row.status}</Badge>,
    sortValue: (row) => row.status,
  },
];

export function TreeTableExamples() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["customer-success"]);
  const loadAttempted = useRef(false);
  return (
    <div className="grid min-w-0 items-start gap-5 [&>*]:min-w-0">
      <ComponentPreview title="Team directory" layout="fullStack">
        <TreeTable
          ariaLabel="Team directory"
          rows={teams}
          columns={columns}
          rowLabel={(row) => row.name}
          defaultExpandedIds={["operations"]}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          loadChildren={async (node): Promise<readonly TreeTableNode<TeamRow>[]> => {
            await new Promise((resolve) => window.setTimeout(resolve, 350));
            if (!loadAttempted.current) {
              loadAttempted.current = true;
              throw new Error("Temporary directory service issue.");
            }
            return [
              {
                id: `${node.id}-platform`,
                data: { name: "Platform", owner: "Ari Singh", members: 7, status: "Active" as const },
              },
            ];
          }}
        />
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {selectedIds.length} rows selected. Expand Product to load its teams.
        </p>
      </ComponentPreview>
    </div>
  );
}
