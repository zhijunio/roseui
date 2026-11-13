"use client";

import { createContext, useContext, type ReactNode } from "react";
import { Button } from "react-aria-components/Button";
import type {
  TreeItemContentProps,
  TreeItemContentRenderProps,
  TreeItemProps,
  TreeProps,
} from "react-aria-components/Tree";
import {
  Tree as TreePrimitive,
  TreeItem as TreeItemPrimitive,
  TreeItemContent,
} from "react-aria-components/Tree";
import { useDragAndDrop } from "react-aria-components/useDragAndDrop";
import { ChevronRight as IconChevronRight, Minus as IconMinus, Plus as IconPlus } from "lucide-react";

import { Checkbox, CheckboxField } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type TreeVisualOptions = {
  size: "sm" | "default" | "lg";
  showGuides: boolean | "hover";
  expanderStyle: "chevron" | "plus-minus";
  reduceMotion: boolean;
};

const TreeVisualContext = createContext<TreeVisualOptions>({
  size: "default",
  showGuides: true,
  expanderStyle: "chevron",
  reduceMotion: false,
});

export type TreeMove = {
  sourceId: string;
  targetId: string;
  position: "before" | "after" | "inside";
};

export type RoseTreeProps = {
  size?: TreeVisualOptions["size"];
  showGuides?: TreeVisualOptions["showGuides"];
  expanderStyle?: TreeVisualOptions["expanderStyle"];
  reduceMotion?: boolean;
  emptyState?: ReactNode;
  onItemMove?: (move: TreeMove) => void;
};

export function Tree<T extends object>({
  className,
  size = "default",
  showGuides = true,
  expanderStyle = "chevron",
  reduceMotion = false,
  emptyState = "No items.",
  onItemMove,
  dragAndDropHooks,
  ...props
}: TreeProps<T> & RoseTreeProps) {
  const localDragAndDrop = useDragAndDrop<T>({
    getItems: (keys) => [...keys].map((key) => ({ "text/plain": String(key) })),
    onMove: (event) => {
      const position = event.target.dropPosition === "on" ? "inside" : event.target.dropPosition;
      for (const sourceKey of event.keys) {
        onItemMove?.({ sourceId: String(sourceKey), targetId: String(event.target.key), position });
      }
    },
  });

  return (
    <TreeVisualContext.Provider value={{ size, showGuides, expanderStyle, reduceMotion }}>
      <TreePrimitive
        className={cn(
          "flex cursor-default flex-col gap-y-2 overflow-auto outline-none forced-color-adjust-none",
          "[--tree-active-bg:var(--color-primary-subtle)] [--tree-active-foreground:var(--color-primary-subtle-foreground)]",
          className,
        )}
        dragAndDropHooks={dragAndDropHooks ?? (onItemMove ? localDragAndDrop.dragAndDropHooks : undefined)}
        renderEmptyState={() => emptyState}
        {...props}
      />
    </TreeVisualContext.Provider>
  );
}

export function TreeItem<T extends object>({ className, ...props }: TreeItemProps<T>) {
  const { size } = useContext(TreeVisualContext);
  return (
    <TreeItemPrimitive
      className={cn(
        "group/tree-item relative flex shrink-0 select-none rounded-lg px-2 pe-2 focus:outline-none",
        size === "sm" ? "py-1 text-xs" : size === "lg" ? "py-2.5 text-base" : "py-1.5",
        "focus:bg-(--tree-active-bg) focus:text-(--tree-active-foreground) focus:**:[.text-muted-foreground]:text-(--tree-active-foreground)",
        "**:data-[slot=avatar]:*:size-6 **:data-[slot=avatar]:size-6 sm:**:data-[slot=avatar]:*:size-5 sm:**:data-[slot=avatar]:size-5",
        "**:[svg]:size-5 **:[svg]:shrink-0 sm:**:[svg]:size-4 **:[svg:not([data-slot=check-indicator]):not([data-slot=chevron])]:me-1",
        "disabled:opacity-50 forced-colors:text-[GrayText]",
        "href" in props ? "cursor-pointer" : "cursor-default",
        className,
      )}
      {...props}
    />
  );
}

export interface TreeContentProps extends TreeItemContentProps {
  className?: string;
}

export function TreeContent({ className, children, ...props }: TreeContentProps) {
  const { showGuides, reduceMotion } = useContext(TreeVisualContext);
  return (
    <TreeItemContent {...props}>
      {(values) => (
        <div className={cn("relative flex w-full min-w-0 items-center gap-x-1 truncate text-sm", className)}>
          {values.allowsDragging && <Button className="sr-only" slot="drag" />}
          {values.selectionMode === "multiple" && values.selectionBehavior === "toggle" && (
            <CheckboxField className="gap-x-0" slot="selection">
              <Checkbox className="col-span-1" />
            </CheckboxField>
          )}
          <div
            className={cn(
              "relative w-[calc(calc(var(--tree-item-level)-1)*(--spacing(5)))] shrink-0",
              !showGuides && "before:hidden",
              showGuides === "hover" && "before:opacity-0 group-hover/tree-item:before:opacity-100",
              "before:absolute before:inset-0 before:-ms-1 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-item-level)-1px),var(--border)_calc(var(--tree-item-level)-1px),var(--border)_calc(var(--tree-item-level)))]",
            )}
          />
          {values.hasChildItems ? (
            <TreeIndicator
              values={{ isDisabled: values.isDisabled, isExpanded: values.isExpanded }}
              reduceMotion={reduceMotion}
            />
          ) : (
            <span aria-hidden className="block w-5 shrink-0" />
          )}
          {typeof children === "function" ? children(values) : children}
        </div>
      )}
    </TreeItemContent>
  );
}

export function TreeIndicator({
  values,
  reduceMotion = false,
  expanderStyle,
}: {
  values: Pick<TreeItemContentRenderProps, "isDisabled" | "isExpanded">;
  reduceMotion?: boolean;
  expanderStyle?: TreeVisualOptions["expanderStyle"];
}) {
  const visual = useContext(TreeVisualContext);
  const style = expanderStyle ?? visual.expanderStyle;
  const Icon = style === "plus-minus" ? (values.isExpanded ? IconMinus : IconPlus) : IconChevronRight;
  return (
    <Button
      slot="chevron"
      isDisabled={values.isDisabled}
      className={cn("shrink-0 text-muted-foreground hover:text-foreground", values.isExpanded && "text-foreground")}
    >
      <Icon
        data-slot="chevron"
        aria-hidden="true"
        className={cn(
          "size-5 sm:size-4",
          !reduceMotion && !visual.reduceMotion && "transition-transform duration-200 ease-in-out",
          style === "chevron" && values.isExpanded && "rotate-90",
        )}
      />
    </Button>
  );
}

export type { TreeItemProps, TreeProps };
