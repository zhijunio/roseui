"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/composite/component-preview";
import { Filters, type FiltersLabels } from "@/components/composite/filters";
import { matchesFilterQuery, type FilterField, type FilterQuery } from "@/components/composite/filters-query";

const fields: FilterField[] = [
  { id: "status", label: "Status", type: "select", options: [{ value: "paid", label: "Paid" }, { value: "pending", label: "Pending" }, { value: "overdue", label: "Overdue" }] },
  { id: "customer", label: "Customer", type: "text" },
  { id: "total", label: "Total", type: "number" },
];
const records = [
  { customer: "Northstar Labs", status: "paid", total: 420 },
  { customer: "Acme Studio", status: "pending", total: 1280 },
  { customer: "Bluebird Systems", status: "overdue", total: 760 },
  { customer: "Fieldwork Co.", status: "paid", total: 95 },
];
const labels: FiltersLabels = {
  add: "Add filter", addGroup: "Add group", remove: "Remove condition", field: "Field", operator: "Condition", value: "Value",
  and: "Match all conditions", or: "Match any condition", contains: "contains", is: "is", "is-not": "is not", gt: "greater than", lt: "less than", between: "between", in: "is any of", apply: "Apply", cancel: "Cancel", true: "Yes", false: "No", advanced: "Advanced filters", invalid: "Enter a valid range.", clearAll: "Clear all",
};

export function FilterExamples() {
  const [query, setQuery] = useState<FilterQuery>({ id: "root", combinator: "and", rules: [] });
  const [advancedQuery, setAdvancedQuery] = useState<FilterQuery>({ id: "advanced", combinator: "and", rules: [] });
  const [appliedQuery, setAppliedQuery] = useState<FilterQuery>({
    id: "applied",
    combinator: "and",
    rules: [
      { id: "paid-status", field: "status", operator: "is", value: "paid" },
      { id: "minimum-total", field: "total", operator: "gt", value: "100" },
    ],
  });
  const matched = records.filter((record) => matchesFilterQuery(record, query, fields));
  const advancedMatched = records.filter((record) => matchesFilterQuery(record, advancedQuery, fields));
  const appliedRecords = records.filter((record) => matchesFilterQuery(record, appliedQuery, fields));
  return <div className="grid min-w-0 items-start gap-5 [&>*]:min-w-0">
    <ComponentPreview previewId="filter-01" title="Filter Records" layout="stack"><Filters fields={fields} value={query} onChange={setQuery} labels={labels} nested /><div className="space-y-2"><p aria-live="polite" className="text-xs text-muted-foreground">{matched.length} of {records.length} records match</p><ul className="divide-y rounded-lg border">{matched.map((record) => <li key={record.customer} className="flex flex-wrap justify-between gap-2 px-3 py-2.5 text-sm"><span>{record.customer}</span><span className="text-muted-foreground">{record.status} · ${record.total.toLocaleString()}</span></li>)}</ul></div></ComponentPreview>
    <ComponentPreview previewId="filter-02" title="Applied filters and results" layout="stack"><Filters fields={fields} value={appliedQuery} onChange={setAppliedQuery} labels={labels} /><div className="space-y-2"><p aria-live="polite" className="text-xs text-muted-foreground">{appliedRecords.length} of {records.length} accounts match</p>{appliedRecords.length ? <ul className="divide-y rounded-lg border">{appliedRecords.map((record) => <li key={record.customer} className="flex flex-wrap justify-between gap-2 px-3 py-2.5 text-sm"><span>{record.customer}</span><span className="text-muted-foreground">{record.status} · ${record.total.toLocaleString()}</span></li>)}</ul> : <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">No accounts match. Adjust or clear the active conditions.</p>}</div></ComponentPreview>
    <ComponentPreview previewId="filter-03" title="Advanced Filter"><Filters fields={fields} value={advancedQuery} onChange={setAdvancedQuery} labels={labels} variant="popover" nested /><div className="space-y-2"><p className="text-xs text-muted-foreground">Add conditions, choose whether all or any should match, then apply them to the records.</p><p aria-live="polite" className="text-xs text-muted-foreground">{advancedMatched.length} of {records.length} records match</p></div></ComponentPreview>
  </div>;
}
