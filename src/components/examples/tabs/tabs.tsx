"use client";

import { IconChartPie, IconFileText, IconHome, IconSettings } from "@tabler/icons-react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentPreview } from "@/examples/component-preview";

const tabs = [
  { value: "overview", label: "Overview", Icon: IconHome },
  { value: "analytics", label: "Analytics", Icon: IconChartPie },
  { value: "reports", label: "Reports", Icon: IconFileText },
  { value: "settings", label: "Settings", Icon: IconSettings },
];

function TabPanels({ variant = "default" }: { variant?: "default" | "line" | "pill" }) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList aria-label="Workspace sections" variant={variant}>
        {tabs.map(({ value, label, Icon }) => (
          <TabsTrigger key={value} value={value}>
            <Icon />
            {label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(({ value, label }) => (
        <TabsContent key={value} value={value} className="mt-3">
          <Card>
            <CardContent className="py-4">
              <h3 className="font-medium">{label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Review {label.toLowerCase()} information for your workspace.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export function TabsExamples() {
  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <ComponentPreview title="Default Tabs">
        <TabPanels />
      </ComponentPreview>
      <ComponentPreview title="Line Tabs">
        <TabPanels variant="line" />
      </ComponentPreview>
      <ComponentPreview title="Pill Tabs">
        <TabPanels variant="pill" />
      </ComponentPreview>
      <ComponentPreview title="Vertical Settings">
        <Tabs defaultValue="profile" orientation="vertical" className="w-full flex-row gap-4">
          <TabsList aria-label="Settings sections" variant="line" className="h-auto items-stretch">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <div className="min-w-0 flex-1">
            {["profile", "security", "notifications"].map((value) => (
              <TabsContent key={value} value={value}>
                <Card>
                  <CardContent className="py-4 text-sm capitalize">Manage {value} preferences.</CardContent>
                </Card>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </ComponentPreview>
      <ComponentPreview title="Disabled Tab">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList aria-label="Project sections">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="billing" disabled>
              Billing
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-3 text-sm text-muted-foreground">
            Review the project summary and current status.
          </TabsContent>
          <TabsContent value="activity" className="mt-3 text-sm text-muted-foreground">
            Review recent project updates.
          </TabsContent>
        </Tabs>
      </ComponentPreview>
    </div>
  );
}
