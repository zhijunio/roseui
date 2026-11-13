"use client";

import { useMemo, useState } from "react";

import { IconCopy, IconDotsVertical, IconTrash } from "@tabler/icons-react";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable, SortableHeader } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { users } from "@/data/user";
import { ComponentPreview } from "@/examples/component-preview";
import { PageHeader } from "@/examples/page-header";
import { getInitials } from "@/lib/utils";

type Customer = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company: string;
  status: "Active" | "Inactive" | "Pending";
  plan: "Free" | "Pro" | "Enterprise";
  spent: number;
  location: string;
  joined: string;
};

const customers: Customer[] = [
  {
    id: "CUS-1042",
    name: users[6].name,
    email: "emma@vertexlabs.com",
    avatar: users[6].avatar,
    company: "Vertex Labs",
    status: "Active",
    plan: "Enterprise",
    spent: 8420,
    location: "San Francisco, US",
    joined: "2024-01-01",
  },
  {
    id: "CUS-1043",
    name: users[7].name,
    email: "liam@northwind.com",
    avatar: users[7].avatar,
    company: "Northwind",
    status: "Active",
    plan: "Pro",
    spent: 3160,
    location: "London, UK",
    joined: "2024-02-08",
  },
  {
    id: "CUS-1044",
    name: users[8].name,
    email: "olivia@lumen.co",
    avatar: users[8].avatar,
    company: "Lumen Co",
    status: "Pending",
    plan: "Free",
    spent: 780,
    location: "Berlin, DE",
    joined: "2024-03-15",
  },
  {
    id: "CUS-1045",
    name: users[9].name,
    email: "noah@aperture.com",
    avatar: users[9].avatar,
    company: "Aperture",
    status: "Inactive",
    plan: "Pro",
    spent: 2180,
    location: "Toronto, CA",
    joined: "2024-04-22",
  },
  {
    id: "CUS-1046",
    name: users[8].name,
    email: "olivia@blueharbor.com",
    avatar: users[8].avatar,
    company: "Blue Harbor",
    status: "Active",
    plan: "Enterprise",
    spent: 9240,
    location: "Sydney, AU",
    joined: "2024-05-11",
  },
  {
    id: "CUS-1047",
    name: users[9].name,
    email: "noah@sunroot.com",
    avatar: users[9].avatar,
    company: "Sunroot",
    status: "Active",
    plan: "Pro",
    spent: 4560,
    location: "Tokyo, JP",
    joined: "2024-06-19",
  },
  {
    id: "CUS-1048",
    name: users[3].name,
    email: "priya@kitedigital.com",
    avatar: users[3].avatar,
    company: "Kite Digital",
    status: "Pending",
    plan: "Free",
    spent: 520,
    location: "Paris, FR",
    joined: "2024-07-04",
  },
  {
    id: "CUS-1049",
    name: users[4].name,
    email: "daniel@foundry.com",
    avatar: users[4].avatar,
    company: "Foundry",
    status: "Active",
    plan: "Enterprise",
    spent: 6780,
    location: "Austin, US",
    joined: "2024-08-17",
  },
];

const statusStyles: Record<Customer["status"], string> = {
  Active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Inactive: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

const planStyles: Record<Customer["plan"], string> = {
  Free: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  Pro: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Enterprise: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

function makeColumns(onDelete: (customer: Customer) => void): ColumnDef<Customer>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={`Select ${row.original.name}`}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => <SortableHeader column={column} title="Name" />,
      cell: ({ row }) => {
        const c = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="size-9">
              <AvatarImage src={c.avatar} alt={c.name} />
              <AvatarFallback>{getInitials(c.name)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <span className="font-medium">{c.name}</span>
              <p className="truncate text-xs text-muted-foreground">{c.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "company",
      header: "Company",
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.company}</span>,
    },
    {
      accessorKey: "plan",
      header: "Plan",
      cell: ({ row }) => (
        <Badge variant="secondary" className={planStyles[row.original.plan]}>
          {row.original.plan}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="secondary" className={statusStyles[row.original.status]}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "spent",
      header: ({ column }) => (
        <div className="flex justify-end">
          <SortableHeader column={column} title="Spent" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-right font-medium tabular-nums">${row.original.spent.toLocaleString()}</div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.location}</span>,
    },
    {
      accessorKey: "joined",
      header: ({ column }) => <SortableHeader column={column} title="Joined" />,
      cell: ({ row }) => <span className="text-muted-foreground tabular-nums">{row.original.joined}</span>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const c = row.original;
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <IconDotsVertical className="size-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    navigator.clipboard?.writeText(c.id);
                    toast.success("Customer ID copied", { description: c.id });
                  }}
                >
                  <IconCopy className="size-4" /> Copy id
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={() => {
                    onDelete(c);
                    toast.success("Customer deleted", {
                      description: `${c.name} was removed.`,
                    });
                  }}
                >
                  <IconTrash className="size-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}

export function DataTableExamples() {
  const [data, setData] = useState<Customer[]>(customers);
  const columns = useMemo(
    () => makeColumns((customer) => setData((prev) => prev.filter((c) => c.id !== customer.id))),
    [],
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Data Table" />

      <ComponentPreview title="Customer Directory" layout="fullStack">
        <div className="w-full space-y-3">
          <p className="text-sm text-muted-foreground">
            Sort columns, select rows, search by name, and manage visible columns.
          </p>
          <DataTable columns={columns} data={data} searchKey="name" searchPlaceholder="Search customers…" />
        </div>
      </ComponentPreview>
    </div>
  );
}
