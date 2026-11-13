"use client";

import { ComponentPreview } from "@/components/docs/component-preview";
import { GridList, GridListItem } from "@/components/ui/grid-list";
import { ListBox, ListBoxItem } from "@/components/ui/list-box";
import { ListLayout, Virtualizer } from "@/components/ui/virtualizer";

const records = Array.from({ length: 5000 }, (_, index) => ({
  id: String(index + 1),
  name: `Record ${index + 1}`,
  detail: `Virtualized list item ${index + 1}`,
}));

export function VirtualizerExamples() {
  return (
    <>
      <ComponentPreview title="Virtualized List Box" layout="panel">
        <Virtualizer layout={ListLayout} layoutOptions={{ rowSize: 40, gap: 4, padding: 4 }}>
          <ListBox
            aria-label="Select from 5,000 records"
            items={records}
            selectionMode="multiple"
            className="block h-96 min-w-60 overflow-y-auto p-0"
          >
            {(record) => (
              <ListBoxItem id={record.id} textValue={record.name} className="h-full min-h-0">
                <span className="flex min-w-0 flex-col">
                  <span>{record.name}</span>
                  <span className="text-xs text-muted-foreground">{record.detail}</span>
                </span>
              </ListBoxItem>
            )}
          </ListBox>
        </Virtualizer>
      </ComponentPreview>
      <ComponentPreview title="Virtualized Grid List" layout="panel">
        <Virtualizer layout={ListLayout} layoutOptions={{ rowSize: 44 }}>
          <GridList
            aria-label="Choose from 5,000 items"
            items={records}
            selectionMode="multiple"
            className="block h-96 min-w-60 overflow-y-auto"
          >
            {(record) => (
              <GridListItem id={record.id} className="h-full min-h-0 border-b">
                {record.name}
              </GridListItem>
            )}
          </GridList>
        </Virtualizer>
      </ComponentPreview>
    </>
  );
}
