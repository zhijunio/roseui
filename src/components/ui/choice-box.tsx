"use client";

import { createContext, useContext } from "react";
import {
  GridList as GridListPrimitive,
  GridListItem as GridListItemPrimitive,
  Text,
  type GridListItemProps,
  type GridListProps,
  type TextProps,
} from "react-aria-components";
import type { Key, Selection } from "react-aria-components";
import { composeRenderProps } from "react-aria-components/composeRenderProps";

import { CheckboxButton, CheckboxField } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

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

type ChoiceBoxContextValue = { columns: ChoiceBoxColumns; isReadOnly: boolean };
const ChoiceBoxContext = createContext<ChoiceBoxContextValue>({ columns: 1, isReadOnly: false });

function choiceBoxLayoutClasses(columns: ChoiceBoxColumns, gap: ChoiceBoxGap) {
  return cn(
    "grid [--gutter:--spacing(4)]",
    columnClasses[columns],
    gapClasses[gap],
    columns === 1 && gap === 0 &&
      "rounded-lg *:data-[slot=choice-box-item]:inset-ring *:data-[slot=choice-box-item]:-mt-px *:data-[slot=choice-box-item]:rounded-none *:data-[slot=choice-box-item]:last:rounded-b-[calc(var(--radius-lg)-1px)] *:data-[slot=choice-box-item]:first:rounded-t-[calc(var(--radius-lg)-1px)]",
  );
}

export type ChoiceBoxProps<T extends object> = Omit<GridListProps<T>, "className"> & {
  className?: string;
  columns?: ChoiceBoxColumns;
  gap?: ChoiceBoxGap;
  isReadOnly?: boolean;
};

export function ChoiceBox<T extends object>({
  columns = 1,
  gap = 0,
  className,
  selectionMode = "single",
  isReadOnly = false,
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  ...props
}: ChoiceBoxProps<T>) {
  const readOnlyKeys: Selection =
    selectedKeys === "all"
      ? "all"
      : new Set<Key>(selectedKeys ?? defaultSelectedKeys ?? []);

  return (
    <ChoiceBoxContext.Provider value={{ columns, isReadOnly }}>
      <GridListPrimitive
        data-slot="choice-box"
        layout={columns === 1 ? "stack" : "grid"}
        selectionMode={selectionMode}
        selectedKeys={isReadOnly ? readOnlyKeys : selectedKeys}
        defaultSelectedKeys={isReadOnly ? undefined : defaultSelectedKeys}
        onSelectionChange={isReadOnly ? undefined : onSelectionChange}
        className={cn(choiceBoxLayoutClasses(columns, gap), className)}
        {...props}
      />
    </ChoiceBoxContext.Provider>
  );
}

type ChoiceBoxItemStyleProps = {
  isActive: boolean;
  isHovered: boolean;
  isFocused: boolean;
  isInvalid: boolean;
  isDisabled: boolean;
  isOneColumn: boolean;
  isLink: boolean;
};

export type ChoiceBoxItemProps = GridListItemProps & {
  label?: string;
  description?: string;
};

export function ChoiceBoxItem({ label, description, className, children, textValue, ...props }: ChoiceBoxItemProps) {
  const { columns, isReadOnly } = useContext(ChoiceBoxContext);

  return (
    <GridListItemPrimitive
      {...props}
      textValue={textValue ?? label ?? (typeof children === "string" ? children : undefined)}
      data-readonly={isReadOnly || undefined}
      data-slot="choice-box-item"
      className={composeRenderProps(className, (renderClassName, values) =>
        choiceBoxItemClassName({
          isActive: (!isReadOnly && values.isSelected) || values.isFocusVisible,
          isHovered: values.isHovered,
          isFocused: !isReadOnly && values.isFocused,
          isInvalid: "isInvalid" in values && Boolean(values.isInvalid),
          isDisabled: values.isDisabled,
          isOneColumn: columns === 1,
          isLink: "href" in props,
          className: renderClassName,
        }),
      )}
    >
      {composeRenderProps(children, (resolvedChildren, values) => {
        const content =
          resolvedChildren !== undefined ? (
            typeof resolvedChildren === "string" ? (
              <ChoiceBoxLabel>{resolvedChildren}</ChoiceBoxLabel>
            ) : (
              resolvedChildren
            )
          ) : (
            <>
              {label ? <ChoiceBoxLabel>{label}</ChoiceBoxLabel> : null}
              {description ? <ChoiceBoxDescription>{description}</ChoiceBoxDescription> : null}
            </>
          );

        return (
          <>
            {content}
            {values.selectionMode === "multiple" ? (
              <CheckboxField
                slot="selection"
                className="col-start-2 self-start gap-x-0 group-has-[svg:not([data-slot=check-indicator])]:col-start-3"
              >
                  <CheckboxButton className="col-span-1" />
              </CheckboxField>
            ) : null}
          </>
        );
      })}
    </GridListItemPrimitive>
  );
}

function choiceBoxItemClassName({
  isActive,
  isHovered,
  isFocused,
  isInvalid,
  isDisabled,
  isOneColumn,
  isLink,
  className,
}: ChoiceBoxItemStyleProps & { className?: string }) {
  return cn(
    "group relative grid grid-cols-[1fr_auto] content-start items-start gap-x-[calc(var(--gutter)-(--spacing(1)))] gap-y-1 rounded-lg p-(--gutter) outline-none",
    "inset-ring inset-ring-border **:data-[slot=label]:font-medium has-[svg:not([data-slot=check-indicator])]:grid-cols-[auto_1fr_auto]",
    "**:data-[slot=avatar]:row-span-2 **:data-[slot=avatar]:mt-0.5 **:data-[slot=avatar]:shrink-0 **:[svg]:row-span-2 **:[svg]:h-[1.1lh] **:[svg]:w-5 **:[svg]:shrink-0",
    "has-data-[slot=avatar]:grid-cols-[auto_1fr_auto] has-[[slot=description]]:**:data-[slot=label]:font-medium",
    "focus-visible:z-20 focus-visible:ring-3 focus-visible:ring-ring/40",
    isOneColumn && "col-span-full",
    isLink ? "cursor-pointer" : "cursor-default",
    isHovered && "not-data-readonly:not-data-focus-visible:not-selected:inset-ring-muted-foreground/30",
    isFocused && "inset-ring-primary/70 ring-ring/20 ring-3",
    isInvalid && "ring-3 ring-destructive/20",
    isActive && "z-10 bg-primary/5 text-foreground inset-ring-primary/50 **:data-[slot=label]:text-foreground **:[[slot=description]]:text-foreground",
    isDisabled && "z-10 opacity-50 **:data-[slot=label]:text-muted-foreground forced-colors:text-[GrayText] **:[[slot=description]]:text-muted-foreground",
    className,
  );
}

export type ChoiceBoxLabelProps = TextProps & { ref?: React.Ref<HTMLDivElement> };

export function ChoiceBoxLabel({ className, ref, ...props }: ChoiceBoxLabelProps) {
  return (
    <Text
      data-slot="label"
      ref={ref}
      className={cn(
        "col-start-1 row-start-1 select-none text-base/6 text-foreground group-disabled:opacity-50 sm:text-sm/6",
        "group-has-[svg:not([data-slot=check-indicator])]:col-start-2 group-has-data-[slot=avatar]:col-start-2",
        className,
      )}
      {...props}
    />
  );
}

export type ChoiceBoxDescriptionProps = ChoiceBoxLabelProps;

export function ChoiceBoxDescription({ className, ref, ...props }: ChoiceBoxDescriptionProps) {
  return (
    <Text
      slot="description"
      data-slot="description"
      ref={ref}
      className={cn(
        "col-start-1 row-start-2 text-base/6 text-muted-foreground sm:text-sm/6",
        "group-has-[svg:not([data-slot=check-indicator])]:col-start-2 group-has-data-[slot=avatar]:col-start-2 group-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

