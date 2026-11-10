import type { Metadata } from "next";
import { DataTableExamples } from "./examples";

export const metadata: Metadata = {
  title: "Data Table",
  description: "A sortable, searchable customer directory table.",
};

export default function DataTablePage() {
  return <DataTableExamples />;
}
