"use client";

import { createContext, type ReactNode, useContext } from "react";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { GridList, GridListItem, type GridListItemProps, type GridListProps } from "./grid-list";

type ChoiceBoxColumns = 1 | 2 | 3 | 4 | 5 | 6;
type ChoiceBoxGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
const columnClasses: Record<ChoiceBoxColumns, string> = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
};
const gapClasses: Record<ChoiceBoxGap, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
};
type ChoiceBoxContextValue = { columns: ChoiceBoxColumns; readOnly: boolean };
const ChoiceBoxContext = createContext<ChoiceBoxContextValue>({ columns: 1, readOnly: false });

export type ChoiceBoxProps<
  T extends { id?: string | number; key?: string | number } = { id: string; [key: string]: unknown },
> = Omit<GridListProps<T>, "className"> & {
  className?: string;
  columns?: ChoiceBoxColumns;
  gap?: ChoiceBoxGap;
  readOnly?: boolean;
};

export function ChoiceBox<T extends { id?: string | number; key?: string | number }>({
  columns = 1,
  gap = 0,
  className,
  readOnly = false,
  ...props
}: ChoiceBoxProps<T>) {
  return (
    <ChoiceBoxContext.Provider value={{ columns, readOnly }}>
      <GridList
        {...props}
        readOnly={readOnly}
        data-slot="choice-box"
        layout="grid"
        className={cn(
          "grid [--gutter:--spacing(4)]",
          columnClasses[columns],
          gapClasses[gap],
          columns === 1 &&
            gap === 0 &&
            "rounded-lg *:data-[slot=choice-box-item]:inset-ring *:data-[slot=choice-box-item]:-mt-px *:data-[slot=choice-box-item]:rounded-none *:data-[slot=choice-box-item]:last:rounded-b-[calc(var(--radius-lg)-1px)] *:data-[slot=choice-box-item]:first:rounded-t-[calc(var(--radius-lg)-1px)]",
          className,
        )}
      />
    </ChoiceBoxContext.Provider>
  );
}

export type ChoiceBoxItemProps = Omit<GridListItemProps, "children"> & {
  label?: string;
  description?: string;
  children?: ReactNode;
};

export function ChoiceBoxItem({ label, description, className, children, ...props }: ChoiceBoxItemProps) {
  const { columns, readOnly } = useContext(ChoiceBoxContext);
  return (
    <GridListItem
      {...props}
      data-readonly={readOnly || undefined}
      data-slot="choice-box-item"
      className={cn(
        "group relative grid grid-cols-[1fr_auto] content-start items-start gap-x-[calc(var(--gutter)-(--spacing(1)))] gap-y-1 rounded-lg p-(--gutter) outline-none inset-ring inset-ring-border **:data-[slot=label]:font-medium has-[svg:not([data-slot=check-indicator])]:grid-cols-[auto_1fr_auto] focus-visible:z-20 focus-visible:ring-3 focus-visible:ring-ring/40",
        columns === 1 && "col-span-full",
        className,
      )}
    >
      {children ?? (
        <>
          {label ? <ChoiceBoxLabel>{label}</ChoiceBoxLabel> : null}
          {description ? <ChoiceBoxDescription>{description}</ChoiceBoxDescription> : null}
        </>
      )}
    </GridListItem>
  );
}

export type ChoiceBoxLabelProps = React.ComponentProps<"span">;
export function ChoiceBoxLabel({ className, ...props }: ChoiceBoxLabelProps) {
  return (
    <span
      data-slot="label"
      className={cn("col-start-1 row-start-1 select-none text-base/6 text-foreground sm:text-sm/6", className)}
      {...props}
    />
  );
}
export type ChoiceBoxDescriptionProps = React.ComponentProps<"span">;
export function ChoiceBoxDescription({ className, ...props }: ChoiceBoxDescriptionProps) {
  return (
    <span
      data-slot="description"
      className={cn("col-start-1 row-start-2 text-base/6 text-muted-foreground sm:text-sm/6", className)}
      {...props}
    />
  );
}
