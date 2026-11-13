"use client"

import { Children, isValidElement, useMemo, useRef } from "react"
import { Autocomplete, useFilter } from "react-aria-components/Autocomplete"
import { ListBox } from "react-aria-components/ListBox"
import { Select, type SelectProps, SelectValue } from "react-aria-components/Select"
import { Tag, TagGroup, TagList } from "./tag-group"
import { PopoverPanel as Popover } from "./popover"
import { SearchField } from "react-aria-components/SearchField"
import { Input as SearchInput } from "react-aria-components/Input"
import { cn as cx } from "@/lib/utils"
import { Button } from "./button"
import { ListBoxItem } from "./list-box"

export interface OptionBase {
  id: string | number
  name: string
}

export interface MultiSelectProps<T extends OptionBase> extends Omit<
  SelectProps<T, "multiple">,
  "selectionMode" | "children"
> {
  placeholder?: string
  className?: string
  children?: React.ReactNode
  name?: string
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
}

export interface MultiSelectContentProps<T extends OptionBase> {
  items: Iterable<T>
  children: (item: T) => React.ReactNode
}

export function MultiSelectContent<T extends OptionBase>(_props: MultiSelectContentProps<T>) {
  return null
}

export function MultiSelect<T extends OptionBase>({
  placeholder = "No selected items",
  className,
  children,
  name,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  ...props
}: MultiSelectProps<T>) {
  const triggerRef = useRef<HTMLDivElement | null>(null)
  const { contains } = useFilter({ sensitivity: "base" })

  const { before, after, list } = useMemo(() => {
    const arr = Children.toArray(children)
    const content = arr.find(
      (child): child is React.ReactElement<MultiSelectContentProps<T>> =>
        isValidElement<MultiSelectContentProps<T>>(child) && child.type === MultiSelectContent,
    )
    if (!content) {
      return { before: arr, after: [], list: null as null | MultiSelectContentProps<T> }
    }
    const idx = arr.indexOf(content)
    return { before: arr.slice(0, idx), after: arr.slice(idx + 1), list: content.props }
  }, [children])

  return (
    <Select
      name={name}
      data-slot="control"
      className={cx("flex w-full min-w-0 flex-col gap-1.5", className)}
      selectionMode="multiple"
      {...props}
    >
      {before}
      {list && (
        <>
          <div
            data-slot="control"
            ref={triggerRef}
            className="flex min-h-9 w-full min-w-0 items-center gap-2 rounded-lg border border-input bg-(--control-bg,transparent) p-1 shadow-sm"
          >
            <SelectValue<T> className="min-w-0 flex-1">
              {({ selectedItems, state }) => (
                <TagGroup
                  aria-label="Selected items"
                  className="min-w-0"
                  onRemove={(keys) => {
                    if (Array.isArray(state.value)) {
                      state.setValue(state.value.filter((k) => !keys.has(k)))
                    }
                  }}
                >
                  <TagList
                    className="min-w-0"
                    items={selectedItems.filter((i) => i != null)}
                    renderEmptyState={() => (
                      <i className="ps-2 text-sm text-muted-foreground">{placeholder}</i>
                    )}
                  >
                    {(item) => <Tag className="rounded-md">{item.name}</Tag>}
                  </TagList>
                </TagGroup>
              )}
            </SelectValue>
            <Button
              variant="secondary"
              size="icon-xs"
              className="shrink-0 self-center rounded-[calc(var(--radius-lg)-(--spacing(1)))]"
            >
              <svg
                data-slot="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
          <Popover
            triggerRef={triggerRef}
            placement="bottom"
            className="flex w-full min-w-(--trigger-width) flex-col overflow-hidden *:data-[slot=popover-inner]:flex *:data-[slot=popover-inner]:flex-col *:data-[slot=popover-inner]:overflow-hidden"
          >
            <Autocomplete filter={contains}>
              <SearchField
                autoFocus
                className="rounded-none py-0.5 outline-hidden"
                value={searchValue}
                onChange={onSearchChange}
              >
                <SearchInput
                  className="border-none outline-hidden focus:ring-0"
                  placeholder={searchPlaceholder}
                />
              </SearchField>
              <ListBox
                className="grid min-h-0 w-full flex-1 grid-cols-[auto_1fr] gap-y-1 overflow-y-auto border-t p-1 outline-hidden *:[[role='group']+[role=group]]:mt-4 *:[[role='group']+[role=separator]]:mt-1"
                items={list.items}
              >
                {list.children}
              </ListBox>
            </Autocomplete>
          </Popover>
        </>
      )}
      {after}
    </Select>
  )
}

export const MultiSelectItem = ListBoxItem
