"use client";

import { useRef, useState } from "react";
import { IconCheck, IconGripVertical } from "@tabler/icons-react";

import { ComponentPreview } from "@/components/composite/component-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CellKey = `${number}:${number}`;
type GridRow = { name: string; owner: string; status: "Ready" | "Review" | "Blocked"; budget: string };

const columns = ["Project", "Owner", "Status", "Budget"] as const;
const initialRows: GridRow[] = [
  { name: "Platform refresh", owner: "Maya Chen", status: "Ready", budget: "$42,000" },
  { name: "Mobile handoff", owner: "Alex Rivera", status: "Review", budget: "$18,500" },
  { name: "Billing migration", owner: "Sam Patel", status: "Blocked", budget: "$31,200" },
  { name: "Support workflow", owner: "Lee Morgan", status: "Ready", budget: "$12,800" },
];

export function DataGridDemo() {
  const [rows, setRows] = useState(initialRows);
  const [active, setActive] = useState<CellKey>("0:0");
  const [anchor, setAnchor] = useState<CellKey | null>(null);
  const [editing, setEditing] = useState<CellKey | null>(null);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const parse = (key: CellKey) => {
    const [row, column] = key.split(":").map(Number);
    return { row: row ?? 0, column: column ?? 0 };
  };
  const keyFor = (row: number, column: number): CellKey => `${Math.max(0, Math.min(rows.length - 1, row))}:${Math.max(0, Math.min(columns.length - 1, column))}`;
  const selected = (key: CellKey) => {
    if (!anchor) return key === active;
    const { row, column } = parse(key);
    const { row: anchorRow, column: anchorColumn } = parse(anchor);
    const { row: activeRow, column: activeColumn } = parse(active);
    return row >= Math.min(anchorRow, activeRow) && row <= Math.max(anchorRow, activeRow) && column >= Math.min(anchorColumn, activeColumn) && column <= Math.max(anchorColumn, activeColumn);
  };
  const value = (row: GridRow, column: number) => [row.name, row.owner, row.status, row.budget][column];
  const update = (rowIndex: number, column: number, next: string) => {
    setRows((current) => current.map((row, index) => index !== rowIndex ? row : column === 0 ? { ...row, name: next } : column === 1 ? { ...row, owner: next } : column === 3 ? { ...row, budget: next } : row));
    setSaved(false);
  };
  const move = (row: number, column: number, extend: boolean) => {
    const next = keyFor(row, column);
    setActive(next);
    if (!extend) setAnchor(null);
  };

  return <div className="grid min-w-0 gap-3"><div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm text-muted-foreground">Click a cell to select it. Enter edits a value; Shift plus arrows extends the selection.</p><Button size="sm" variant="outline" onClick={() => { setSaved(true); }}><IconCheck />{saved ? "Saved" : "Save changes"}</Button></div><div className="min-w-0 overflow-x-auto rounded-lg border"><table role="grid" aria-label="Editable project budget" className="w-full min-w-[620px] border-collapse text-sm"><thead><tr className="bg-muted/50">{columns.map((column) => <th key={column} scope="col" className="h-10 border-b px-3 text-left text-xs font-medium text-muted-foreground">{column}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={row.name} role="row" className="border-b last:border-0">{columns.map((column, columnIndex) => { const key = keyFor(rowIndex, columnIndex); const isEditing = editing === key; const isSelected = selected(key); return <td key={column} role="gridcell" aria-selected={isSelected} className={`relative h-11 border-r px-3 last:border-r-0 ${isSelected ? "bg-primary/8 ring-1 ring-inset ring-primary/45" : ""}`} onClick={(event) => { setActive(key); setAnchor(event.shiftKey ? anchor ?? active : null); }} onDoubleClick={() => columnIndex !== 2 && setEditing(key)} onKeyDown={(event) => { if (event.key === "Enter" && columnIndex !== 2) { event.preventDefault(); setEditing(key); window.requestAnimationFrame(() => inputRef.current?.select()); } if (event.key === "ArrowDown") { event.preventDefault(); move(rowIndex + 1, columnIndex, event.shiftKey); } if (event.key === "ArrowUp") { event.preventDefault(); move(rowIndex - 1, columnIndex, event.shiftKey); } if (event.key === "ArrowRight") { event.preventDefault(); move(rowIndex, columnIndex + 1, event.shiftKey); } if (event.key === "ArrowLeft") { event.preventDefault(); move(rowIndex, columnIndex - 1, event.shiftKey); } }} tabIndex={isSelected ? 0 : -1}>{isEditing ? <Input ref={inputRef} autoFocus defaultValue={value(row, columnIndex)} aria-label={`Edit ${column} for ${row.name}`} onBlur={(event) => { update(rowIndex, columnIndex, event.currentTarget.value); setEditing(null); }} onKeyDown={(event) => { if (event.key === "Enter" || event.key === "Tab") { update(rowIndex, columnIndex, event.currentTarget.value); setEditing(null); } if (event.key === "Escape") setEditing(null); }} className="-my-1 h-8 min-w-0 px-2" /> : columnIndex === 2 ? <Badge variant={row.status === "Blocked" ? "destructive" : row.status === "Review" ? "secondary" : "outline"}>{row.status}</Badge> : <span className="inline-flex min-w-0 items-center gap-2 truncate">{columnIndex === 0 && <IconGripVertical className="size-3.5 shrink-0 text-muted-foreground/50" aria-hidden="true" />}{value(row, columnIndex)}</span>}</td>; })}</tr>)}</tbody></table></div><p role="status" aria-live="polite" className="text-xs text-muted-foreground">{saved ? "All changes are saved." : "Unsaved edits stay local to this example."}</p></div>;
}

export function DataGridExamples() {
  return <><ComponentPreview title="Editable project grid" layout="fullStack" span={2} previewId="data-grid-01"><DataGridDemo /></ComponentPreview><ComponentPreview previewId="data-grid-02" title="Keyboard model" layout="field"><p className="text-sm leading-6 text-muted-foreground">The grid keeps a visible selection, supports arrow-key movement, Shift range extension, Enter to edit, Tab to commit, and Escape to cancel.</p></ComponentPreview></>;
}
