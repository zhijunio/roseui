import type { Metadata } from "next";

import { DataTableExamples } from "@/components/examples/data-table/data-table";

export const metadata: Metadata = {
  title: "Data Table",
  description: "A sortable, searchable customer directory table.",
};

export default function DataTablePage() {
  return <DataTableExamples />;
}
