"use client"

import { ChevronDown, ChevronRight } from "lucide-react"
import { createContext, use, type HTMLAttributes, type Ref } from "react"
import { Button as PrimitiveButton } from "react-aria-components/Button"
import { composeRenderProps } from "react-aria-components/composeRenderProps"
import { TableLoadMoreItem as TableLoadMoreItemPrimitive } from "react-aria-components/Table"
import {
  type CellProps,
  type ColumnProps,
  type ColumnResizerProps,
  type TableHeaderProps as HeaderProps,
  type RowProps,
  type TableBodyProps,
  type TableFooterProps,
  type TableProps as TablePrimitiveProps,
  Cell,
  Collection,
  Column,
  ColumnResizer as ColumnResizerPrimitive,
  ResizableTableContainer,
  Row,
  TableBody as TableBodyPrimitive,
  TableFooter as TableFooterPrimitive,
  TableHeader as TableHeaderPrimitive,
  Table as TablePrimitive,
  useTableOptions,
} from "react-aria-components/Table"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

export type TableProps = Omit<TablePrimitiveProps, "className" | "role"> & Pick<HTMLAttributes<HTMLTableElement>, "role"> & {
  allowResize?: boolean
  className?: string
  tableClassName?: string
  bleed?: boolean
  ref?: Ref<HTMLTableElement>
}

const TableContext = createContext<Pick<TableProps, "allowResize" | "bleed">>({
  allowResize: false,
})

const useTableContext = () => use(TableContext)

function Root({ className, ...props }: TablePrimitiveProps & Pick<HTMLAttributes<HTMLTableElement>, "role"> & { ref?: Ref<HTMLTableElement> }) {
  return (
    <TablePrimitive
      className={cn(
        "w-full min-w-full caption-bottom text-sm/6 outline-hidden [--table-selected-background:var(--color-secondary)]/50",
        className,
      )}
      {...props}
    />
  )
}

export function Table({
  allowResize,
  className,
  bleed = false,
  tableClassName,
  ref,
  ...props
}: TableProps) {
  const ariaLabel = props["aria-label"] ?? (props["aria-labelledby"] ? undefined : "Table")
  const tableProps = { ...props, "aria-label": ariaLabel }

  return (
    <TableContext.Provider value={{ allowResize, bleed }}>
      <div className="flow-root">
        <div
          className={cn(
            "relative -mx-(--gutter) overflow-x-auto whitespace-nowrap [--gutter:--spacing(4)] [--gutter-y:--spacing(2)] has-data-[slot=table-resizable-container]:overflow-auto",
            className,
          )}
        >
          <div
            className={cn("inline-block min-w-full align-middle", !bleed && "sm:px-(--gutter)")}
          >
            {allowResize ? (
              <ResizableTableContainer data-slot="table-resizable-container">
                <Root ref={ref} className={tableClassName} {...tableProps} />
              </ResizableTableContainer>
            ) : (
              <Root {...tableProps} ref={ref} className={tableClassName} />
            )}
          </div>
        </div>
      </div>
    </TableContext.Provider>
  )
}

export function ColumnResizer({ className, ...props }: ColumnResizerProps) {
  return (
    <ColumnResizerPrimitive
      {...props}
      className={cn(
        "&[data-resizable-direction=left]:cursor-e-resize &[data-resizable-direction=right]:cursor-w-resize resizable-both:cursor-ew-resize [&[data-resizing]>div]:bg-primary absolute end-0 top-0 bottom-0 grid w-px touch-none place-content-center px-1",
        className
      )}
    >
      <div className="bg-border h-full w-px py-(--gutter-y)" />
    </ColumnResizerPrimitive>
  )
}

export function TableBody<T extends object>(props: TableBodyProps<T>) {
  return <TableBodyPrimitive data-slot="table-body" {...props} />
}

export type TableColumnProps = ColumnProps & Pick<HTMLAttributes<HTMLTableCellElement>, "role" | "aria-sort"> & {
  isResizable?: boolean
}

export function TableColumn({ isResizable = false, className, ...props }: TableColumnProps) {
  const { bleed } = useTableContext()
  return (
    <Column
      data-slot="table-column"
      {...props}
      className={cn(
        [
          "text-muted-foreground text-start font-medium",
          "allows-sorting:cursor-default dragging:cursor-grabbing relative outline-hidden",
          "px-4 py-(--gutter-y)",
          "first:ps-(--gutter,--spacing(2)) last:pe-(--gutter,--spacing(2))",
          !bleed && "sm:first:ps-1 sm:last:pe-1",
          isResizable && "truncate overflow-hidden",
        ],
        className
      )}
    >
      {(values) => (
        <div className="flex items-center gap-2 **:[svg]:shrink-0">
          {typeof props.children === "function" ? props.children(values) : props.children}
          {values.allowsSorting && (
            <span
              className={cn(
                "touch-target bg-secondary text-foreground grid size-[1.15rem] flex-none shrink-0 place-content-center rounded *:[svg]:size-3.5 *:[svg]:shrink-0 *:[svg]:transition-transform *:[svg]:duration-200",
                values.isHovered ? "bg-secondary-foreground/10" : ""
              )}
            >
              <ChevronDown
                className={values.sortDirection === "ascending" ? "rotate-180" : ""}
              />
            </span>
          )}
          {isResizable && <ColumnResizer />}
        </div>
      )}
    </Column>
  )
}

export interface TableHeaderProps<T extends object> extends HeaderProps<T> {
  ref?: Ref<HTMLTableSectionElement>
}

export function TableHeader<T extends object>({
  children,
  ref,
  columns,
  className,
  ...props
}: TableHeaderProps<T>) {
  const { bleed } = useTableContext()
  const { selectionBehavior, selectionMode, allowsDragging } = useTableOptions()
  return (
    <TableHeaderPrimitive
      ref={ref}
      data-slot="table-header"
      className={cn("border-b", className)}
      {...props}
    >
      {allowsDragging && (
        <Column
          data-slot="table-column"
          className={cn("w-0 max-w-8 px-4 first:ps-(--gutter,--spacing(2)) last:pe-(--gutter,--spacing(2))", !bleed && "sm:last:pe-1 sm:first:ps-1")}
        />
      )}
      {selectionBehavior === "toggle" && (
        <Column
          data-slot="table-column"
          className={cn("w-0 max-w-8 px-4 first:ps-(--gutter,--spacing(2)) last:pe-(--gutter,--spacing(2))", !bleed && "sm:last:pe-1 sm:first:ps-1")}
        >
          {selectionMode === "multiple" && <Checkbox slot="selection" />}
        </Column>
      )}
      <Collection items={columns}>{children}</Collection>
    </TableHeaderPrimitive>
  )
}

export type TableRowProps<T extends object> = RowProps<T> & Pick<HTMLAttributes<HTMLTableRowElement>, "role" | "aria-level" | "aria-posinset" | "aria-setsize" | "aria-expanded" | "aria-selected" | "onKeyDown" | "onFocus" | "tabIndex"> & {
  ref?: Ref<HTMLTableRowElement>
}

export function TableRow<T extends object>({
  children,
  className,
  columns,
  id,
  ref,
  ...props
}: TableRowProps<T>) {
  const { selectionBehavior, allowsDragging } = useTableOptions()
  return (
    <Row
      ref={ref}
      data-slot="table-row"
      id={id}
      {...props}
      className={composeRenderProps(
        className,
        (
          className,
          {
            isSelected,
            selectionMode,
            isFocusVisibleWithin,
            isDragging,
            isDisabled,
          }
        ) =>
          cn(
            "group relative cursor-default border-b text-muted-foreground outline-transparent ring-primary last:border-b-0",
            isDragging && "cursor-grabbing outline outline-primary",
            isSelected && "bg-(--table-selected-background) text-foreground hover:bg-(--table-selected-background)/50",
            (props.href || props.onAction || selectionMode === "multiple") &&
              "hover:bg-(--table-selected-background) hover:text-foreground",
            (props.href || props.onAction || selectionMode === "multiple") &&
              isFocusVisibleWithin &&
              "bg-(--table-selected-background)/50 selected:bg-(--table-selected-background)/50 text-foreground",
            isDisabled && "opacity-50",
            className
          )
      )}
    >
      {allowsDragging && (
        <TableCell className="cursor-grab ring-primary dragging:cursor-grabbing">
          <PrimitiveButton
            slot="drag"
            className="focus-visible:ring-ring grid place-content-center rounded-xs px-[calc(var(--gutter)/2)] outline-hidden focus-visible:ring"
          >
            <svg
              aria-hidden
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx={9} cy={12} r={1} />
              <circle cx={9} cy={5} r={1} />
              <circle cx={9} cy={19} r={1} />
              <circle cx={15} cy={12} r={1} />
              <circle cx={15} cy={5} r={1} />
              <circle cx={15} cy={19} r={1} />
            </svg>
          </PrimitiveButton>
        </TableCell>
      )}
      {selectionBehavior === "toggle" && (
        <TableCell>
          <Checkbox slot="selection" />
        </TableCell>
      )}
      <Collection items={columns}>{children}</Collection>
    </Row>
  )
}

export type TableCellProps = CellProps & Pick<HTMLAttributes<HTMLTableCellElement>, "role"> & {
  ref?: Ref<HTMLTableCellElement>
}
export function TableCell({ className, ref, ...props }: TableCellProps) {
  const { allowResize, bleed } = useTableContext()
  return (
    <Cell
      ref={ref}
      data-slot="table-cell"
      {...props}
      className={cn(
        cn(
          "group group-has-data-focus-visible-within:text-foreground px-4 py-(--gutter-y) align-middle outline-hidden first:ps-(--gutter,--spacing(2)) last:pe-(--gutter,--spacing(2))",
          !bleed && "sm:first:ps-1 sm:last:pe-1",
          allowResize && "truncate overflow-hidden"
        ),
        className
      )}
      style={(values) => ({
        ...(typeof props.style === "function" ? props.style(values) : props.style),
        ...(values.isTreeColumn
          ? { paddingInlineStart: 4 + (values.hasChildItems ? 0 : 24) + (values.level - 1) * 20 }
          : {}),
      })}
    >
      {composeRenderProps(
        props.children,
        (children, { hasChildItems, isTreeColumn, isExpanded, isDisabled }) => (
          <div className={isTreeColumn ? "flex items-center" : undefined}>
            {hasChildItems && isTreeColumn && (
              <PrimitiveButton
                slot="chevron"
                className={cn(
                  isDisabled && "opacity-50",
                  "text-foreground hover:bg-secondary mr-2 grid size-[1.15rem] flex-none shrink-0 place-content-center rounded"
                )}
              >
                <ChevronRight
                  className={cn(
                    "size-4 transition-transform duration-200",
                    isExpanded && "rotate-90"
                  )}
                />
              </PrimitiveButton>
            )}

            {children}
          </div>
        )
      )}
    </Cell>
  )
}

export function TableFooter<T extends object>({ className, ...props }: TableFooterProps<T>) {
  return <TableFooterPrimitive className={cn("**:font-semibold", className)} {...props} />
}

export function TableLoadMoreItem({ className, ...props }: React.ComponentProps<typeof TableLoadMoreItemPrimitive>) {
  return (
    <TableLoadMoreItemPrimitive
      data-slot="table-load-more-item"
      className={cn("text-muted-foreground text-center text-sm [&>td]:py-3", className)}
      {...props}
    />
  )
}
