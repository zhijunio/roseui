"use client";

import { useState } from "react";

import { Computer, RefreshCw, Smartphone, Tablet, Tv } from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Button } from "@/components/ui/button";
import {
  Leaderboard,
  LeaderboardAction,
  LeaderboardContent,
  LeaderboardEnd,
  LeaderboardHeader,
  LeaderboardItem,
  LeaderboardStart,
  LeaderboardTitle,
} from "@/components/ui/leaderboard";

const pageViews = [
  { name: "Documentation", value: 1200 },
  { name: "Components", value: 980 },
  { name: "Themes", value: 760 },
  { name: "Colors", value: 430 },
  { name: "Icons", value: 150 },
];

const revenue = [
  { name: "United States", value: 30000 },
  { name: "Europe", value: 24500 },
  { name: "Asia Pacific", value: 19800 },
  { name: "Canada", value: 12400 },
  { name: "Latin America", value: 7600 },
];

const traffic = [
  { name: "Organic search", value: 30000 },
  { name: "Direct", value: 22000 },
  { name: "Referral", value: 18000 },
  { name: "Email", value: 12000 },
  { name: "Social", value: 8000 },
];

const devices = [
  { name: "Desktop", value: 48200, icon: Computer },
  { name: "Mobile", value: 36500, icon: Smartphone },
  { name: "Tablet", value: 12800, icon: Tablet },
  { name: "TV", value: 4100, icon: Tv },
];

function FormattedRows({
  items,
  maxValue,
  formatOptions,
  onAction,
}: {
  items: { name: string; value: number }[];
  maxValue: number;
  formatOptions?: Intl.NumberFormatOptions;
  onAction?: (name: string) => void;
}) {
  return items.map((item) => (
    <LeaderboardItem
      key={item.name}
      value={item.value}
      maxValue={maxValue}
      formatOptions={formatOptions}
      onAction={onAction ? () => onAction(item.name) : undefined}
    >
      {({ valueText }) => (
        <>
          <LeaderboardStart>{item.name}</LeaderboardStart>
          <LeaderboardEnd>{valueText}</LeaderboardEnd>
        </>
      )}
    </LeaderboardItem>
  ));
}

export function LeaderboardExamples() {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  return (
    <>
      <ComponentPreview title="Top pages" layout="stack">
        <Leaderboard className="w-full max-w-xl">
          <LeaderboardHeader>
            <LeaderboardTitle>Most visited</LeaderboardTitle>
          </LeaderboardHeader>
          <LeaderboardContent aria-label="Most visited pages">
            {pageViews.map((item) => (
              <LeaderboardItem key={item.name} value={item.value} maxValue={pageViews[0].value}>
                <LeaderboardStart>{item.name}</LeaderboardStart>
                <LeaderboardEnd>{item.value.toLocaleString()} visits</LeaderboardEnd>
              </LeaderboardItem>
            ))}
          </LeaderboardContent>
        </Leaderboard>
      </ComponentPreview>
      <ComponentPreview title="Currency" layout="stack">
        <Leaderboard className="w-full max-w-xl">
          <LeaderboardContent aria-label="Revenue by region">
            <FormattedRows
              items={revenue}
              maxValue={revenue[0].value}
              formatOptions={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
            />
          </LeaderboardContent>
        </Leaderboard>
      </ComponentPreview>
      <ComponentPreview title="Percentage" layout="stack">
        <Leaderboard className="w-full max-w-xl">
          <LeaderboardContent aria-label="Traffic sources">
            <FormattedRows
              items={traffic}
              maxValue={traffic.reduce((sum, item) => sum + item.value, 0)}
              formatOptions={{ style: "percent", maximumFractionDigits: 0 }}
            />
          </LeaderboardContent>
        </Leaderboard>
      </ComponentPreview>
      <ComponentPreview title="Interactive rows" layout="stack">
        <Leaderboard className="w-full max-w-xl gap-3">
          <p aria-live="polite" className="text-sm text-muted-foreground">
            {selectedPage ? `Selected ${selectedPage}` : "Choose a page"}
          </p>
          <LeaderboardContent aria-label="Choose a page">
            <FormattedRows
              items={pageViews.slice(0, 3)}
              maxValue={pageViews[0].value}
              formatOptions={{ notation: "compact" }}
              onAction={setSelectedPage}
            />
          </LeaderboardContent>
        </Leaderboard>
      </ComponentPreview>
      <ComponentPreview title="With icons" layout="stack">
        <Leaderboard className="w-full max-w-xl">
          <LeaderboardHeader>
            <LeaderboardTitle>Sessions by device</LeaderboardTitle>
          </LeaderboardHeader>
          <LeaderboardContent aria-label="Sessions by device">
            {devices.map(({ name, value, icon: Icon }) => (
              <LeaderboardItem
                key={name}
                value={value}
                maxValue={devices[0].value}
                formatOptions={{ notation: "compact" }}
              >
                {({ valueText }) => (
                  <>
                    <LeaderboardStart>
                      <span className="flex items-center gap-2">
                        <Icon aria-hidden="true" className="size-4" />
                        {name}
                      </span>
                    </LeaderboardStart>
                    <LeaderboardEnd>{valueText}</LeaderboardEnd>
                  </>
                )}
              </LeaderboardItem>
            ))}
          </LeaderboardContent>
        </Leaderboard>
      </ComponentPreview>
      <ComponentPreview title="Header action" layout="stack">
        <Leaderboard className="w-full max-w-xl">
          <LeaderboardHeader className="items-start">
            <LeaderboardTitle>Top revenue sources</LeaderboardTitle>
            <LeaderboardAction>
              <Button variant="outline" size="icon" aria-label="Refresh leaderboard">
                <RefreshCw aria-hidden="true" />
              </Button>
            </LeaderboardAction>
          </LeaderboardHeader>
          <LeaderboardContent aria-label="Revenue by region">
            <FormattedRows
              items={revenue.slice(0, 3)}
              maxValue={revenue[0].value}
              formatOptions={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
            />
          </LeaderboardContent>
        </Leaderboard>
      </ComponentPreview>
    </>
  );
}
