"use client";

import { useState } from "react";

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
  type Selection,
} from "@/components/roseui/grid-list";

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
  const [draggedId, setDraggedId] = useState<string | null>(null);
  function moveItem(targetId: string) {
    if (!draggedId || draggedId === targetId) return;
    setItems((current) => {
      const from = current.findIndex((item) => item.id === draggedId);
      const to = current.findIndex((item) => item.id === targetId);
      if (from < 0 || to < 0) return current;
      const next = [...current];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }
  return (
    <GridList items={items} aria-label="Reorder bands" selectionMode="multiple">
      {(item) => (
        <GridListItem
          id={item.id}
          draggable
          onDragStart={(event) => {
            setDraggedId(item.id);
            event.dataTransfer.effectAllowed = "move";
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            moveItem(item.id);
            setDraggedId(null);
          }}
          onDragEnd={() => setDraggedId(null)}
        >
          {item.name}
        </GridListItem>
      )}
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
  const [visibleCount, setVisibleCount] = useState(4);
  const visibleItems = pagingBands.slice(0, visibleCount);

  return (
    <div className="max-h-64 overflow-y-auto">
      <GridList selectionMode="multiple" aria-label="Browse bands">
        {visibleItems.map((item) => (
          <GridListItem key={item.id} id={item.id}>
            {item.name}
          </GridListItem>
        ))}
        <GridListLoadMoreItem
          onLoadMore={() => setVisibleCount((count) => Math.min(pagingBands.length, count + 4))}
          disabled={visibleCount >= pagingBands.length}
        >
          {visibleCount >= pagingBands.length ? "All bands loaded" : "Load more"}
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
              {server.sites.map((site) => (
                <GridListItem key={site.id} id={site.id} textValue={site.name}>
                  <GridListStart className="min-w-0 flex-1">
                    <GridListLabel>{site.name}</GridListLabel>
                    <GridListDescription>{site.domain}</GridListDescription>
                  </GridListStart>
                  <GridListSpacer />
                  <span className="text-muted-foreground text-xs">{site.status}</span>
                </GridListItem>
              ))}
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
            <GridListItem id={item.id} disabled={item.id === "zeppelin" || item.id === "stones"}>
              {item.name}
            </GridListItem>
          )}
        </GridList>
        <EmptyListExample />
      </ComponentPreview>
    </>
  );
}
