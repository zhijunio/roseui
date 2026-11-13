"use client";

import { useState } from "react";

import { Collection, type Selection, useAsyncList, useDragAndDrop } from "react-aria-components";

import { ComponentPreview } from "@/components/docs/component-preview";
import {
  GridList,
  GridListDescription,
  GridListEmptyState,
  GridListHeader,
  GridListItem,
  GridListLabel,
  GridListLoadMoreItem,
  GridListSection,
  GridListSpacer,
  GridListStart,
} from "@/components/ui/grid-list";

const bands = [
  { id: "beatles", name: "The Beatles" },
  { id: "zeppelin", name: "Led Zeppelin" },
  { id: "floyd", name: "Pink Floyd" },
  { id: "queen", name: "Queen" },
  { id: "stones", name: "The Rolling Stones" },
];

const servers = [
  {
    id: "nyc",
    name: "NYC-1",
    address: "192.168.10.21",
    sites: [
      { id: "atlas", name: "Atlas blog", domain: "atlasblog.com", status: "Online" },
      { id: "northwind", name: "Northwind shop", domain: "northwind.shop", status: "Deploying" },
    ],
  },
  {
    id: "lon",
    name: "LON-1",
    address: "10.0.3.44",
    sites: [
      { id: "evergreen", name: "Evergreen health", domain: "evergreen.health", status: "Online" },
      { id: "glacier", name: "Glacier analytics", domain: "glacier.ai", status: "Maintenance" },
    ],
  },
];

const pagingBands = [
  ...bands,
  { id: "beach-boys", name: "The Beach Boys" },
  { id: "kinks", name: "The Kinks" },
  { id: "who", name: "The Who" },
  { id: "byrds", name: "The Byrds" },
  { id: "yardbirds", name: "The Yardbirds" },
  { id: "animals", name: "The Animals" },
];

function ControlledSelectionExample() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

  return (
    <div className="space-y-3">
      <GridList
        items={bands}
        aria-label="Choose favorite bands"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        {(item) => <GridListItem id={item.id}>{item.name}</GridListItem>}
      </GridList>
      <p role="status" aria-live="polite" className="text-muted-foreground text-sm">
        {selectedKeys === "all" ? "All bands selected" : `Selected: ${[...selectedKeys].join(", ") || "none"}`}
      </p>
    </div>
  );
}

function DragAndDropExample() {
  const [items, setItems] = useState(bands);
  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({
        "text/plain": items.find((item) => item.id === String(key))?.name ?? "",
      })),
    onReorder(event) {
      if (event.target.dropPosition !== "before" && event.target.dropPosition !== "after") return;

      const movingKeys = new Set([...event.keys].map(String));
      setItems((currentItems) => {
        const movingItems = currentItems.filter((item) => movingKeys.has(item.id));
        const remainingItems = currentItems.filter((item) => !movingKeys.has(item.id));
        const targetIndex = remainingItems.findIndex((item) => item.id === String(event.target.key));
        if (targetIndex < 0 || movingItems.length === 0) return currentItems;

        const insertIndex = targetIndex + (event.target.dropPosition === "after" ? 1 : 0);
        return [...remainingItems.slice(0, insertIndex), ...movingItems, ...remainingItems.slice(insertIndex)];
      });
    },
  });

  return (
    <GridList items={items} aria-label="Reorder bands" selectionMode="multiple" dragAndDropHooks={dragAndDropHooks}>
      {(item) => <GridListItem id={item.id}>{item.name}</GridListItem>}
    </GridList>
  );
}

function EmptyListExample() {
  const emptyItems: typeof bands = [];

  return (
    <GridList
      items={emptyItems}
      aria-label="Empty band list"
      selectionMode="multiple"
      renderEmptyState={() => <GridListEmptyState>No bands found</GridListEmptyState>}
    />
  );
}

function InfiniteScrollExample() {
  const list = useAsyncList<(typeof pagingBands)[number]>({
    async load({ cursor }) {
      const start = Number(cursor ?? 0);
      const end = start + 4;
      return {
        items: pagingBands.slice(start, end),
        cursor: end < pagingBands.length ? String(end) : undefined,
      };
    },
  });

  return (
    <div className="max-h-64 overflow-y-auto">
      <GridList selectionMode="multiple" aria-label="Browse bands">
        <Collection items={list.items}>{(item) => <GridListItem id={item.id}>{item.name}</GridListItem>}</Collection>
        <GridListLoadMoreItem onLoadMore={list.loadMore} isLoading={list.loadingState === "loadingMore"}>
          {list.loadingState === "loadingMore" ? "Loading…" : "Load more"}
        </GridListLoadMoreItem>
      </GridList>
    </div>
  );
}

export function GridListExamples() {
  return (
    <>
      <ComponentPreview title="Selection" layout="grid2">
        <GridList items={bands} aria-label="Choose a favorite band" selectionMode="single">
          {(item) => <GridListItem id={item.id}>{item.name}</GridListItem>}
        </GridList>
        <GridList items={bands} aria-label="Choose favorite bands" selectionMode="multiple">
          {(item) => <GridListItem id={item.id}>{item.name}</GridListItem>}
        </GridList>
        <ControlledSelectionExample />
      </ComponentPreview>

      <ComponentPreview title="Sections" layout="fullStack">
        <GridList items={servers} aria-label="Sites grouped by server" selectionMode="single">
          {(server) => (
            <GridListSection id={server.id}>
              <GridListHeader>
                <GridListStart>
                  <GridListLabel>{server.name}</GridListLabel>
                  <GridListDescription>{server.address}</GridListDescription>
                </GridListStart>
              </GridListHeader>
              <Collection items={server.sites}>
                {(site) => (
                  <GridListItem id={site.id} textValue={site.name}>
                    <GridListStart className="min-w-0 flex-1">
                      <GridListLabel>{site.name}</GridListLabel>
                      <GridListDescription>{site.domain}</GridListDescription>
                    </GridListStart>
                    <GridListSpacer />
                    <span className="text-muted-foreground text-xs">{site.status}</span>
                  </GridListItem>
                )}
              </Collection>
            </GridListSection>
          )}
        </GridList>
      </ComponentPreview>

      <ComponentPreview title="Drag and Drop">
        <DragAndDropExample />
      </ComponentPreview>

      <ComponentPreview title="Infinite Scroll">
        <InfiniteScrollExample />
      </ComponentPreview>

      <ComponentPreview title="States" layout="stack">
        <GridList items={bands} aria-label="Bands with unavailable items" selectionMode="multiple">
          {(item) => (
            <GridListItem id={item.id} isDisabled={item.id === "zeppelin" || item.id === "stones"}>
              {item.name}
            </GridListItem>
          )}
        </GridList>
        <EmptyListExample />
      </ComponentPreview>
    </>
  );
}
