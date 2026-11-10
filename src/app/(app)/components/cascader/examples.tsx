"use client";

import { ComponentPreview } from "@/components/composite/component-preview";
import { Button } from "@/components/ui/button";
import { Cascader, CascaderPanel, type CascaderNode } from "@/components/composite/cascader";
import { IconUser, IconBuilding, IconCheck } from "@tabler/icons-react";
import { useMemo, useState } from "react";

export function CascaderExamples() {
  const [selected, setSelected] = useState<string[][]>([]);
  const [multi, setMulti] = useState<string[][]>([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [locale, setLocale] = useState<"en" | "zh">("en");
  const [asyncOptions, setAsyncOptions] = useState<CascaderNode[]>([{ value: "regions", label: "Regions", hasChildren: true }]);
  const [lazySelected, setLazySelected] = useState<string[][]>([]);
  const many = useMemo(
    () => Array.from({ length: 2500 }, (_, index) => ({ value: `team-${index}`, label: `Team ${String(index + 1).padStart(4, "0")}` })),
    [],
  );

  const localizedOptions: CascaderNode[] =
    locale === "zh"
      ? [{ value: "sales", label: "销售", children: [{ value: "apac", label: "亚太区" }, { value: "emea", label: "欧洲中东非洲" }] }]
      : options;

  return (
    <>
      <ComponentPreview previewId="cascader-01" title="Default Cascader" layout="panel">
        <Cascader options={options} aria-label="Choose a team" />
      </ComponentPreview>

      <ComponentPreview previewId="cascader-02" title="Column Panels" layout="wide" span={2}>
        <Cascader options={options} mode="columns" />
      </ComponentPreview>

      <ComponentPreview previewId="cascader-03" title="Tree Layout"  layout="wide" span={2}>
        <Cascader options={options} mode="tree" multiple />
      </ComponentPreview>

      <ComponentPreview previewId="cascader-04" title="Deep Search"  layout="panel">
        <Cascader options={options} searchScope="deep" searchable searchPlaceholder="Search teams and departments..." />
      </ComponentPreview>

      <ComponentPreview previewId="cascader-05" title="Global Search"  layout="panel">
        <Cascader options={options} searchScope="global" searchable />
      </ComponentPreview>

      <ComponentPreview previewId="cascader-06" title="Selection Limit"  layout="panel">
        <div className="grid gap-2">
          <Cascader options={options} multiple maxSelections={2} selectedPaths={multi} onSelectionChange={setMulti} />
          <p className="text-xs text-muted-foreground">
            Choose up to two teams. {multi.length}/2 selected.
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="cascader-07" title="Multiple with Summary" layout="panel">
        <div className="grid gap-3">
          <Cascader options={options} multiple selectedPaths={multi} onSelectionChange={setMulti} />
          <div className="flex flex-wrap gap-1">
            {multi.map((path) => (
              <span key={path.join("/")} className="rounded-full bg-muted px-2 py-1 text-xs">
                {path.join(" / ")}
              </span>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="cascader-08" title="Tree Multi-Select" layout="wide" span={2}>
        <Cascader options={options} mode="tree" multiple selectedPaths={multi} onSelectionChange={setMulti} />
      </ComponentPreview>

      <ComponentPreview previewId="cascader-09" title="Custom Options" layout="panel">
        <Cascader
          options={roles}
          renderOption={(node) => (
            <span className="flex min-w-0 flex-1 items-center gap-2">
              <span className="grid size-7 place-items-center rounded-full bg-muted">
                <IconUser className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block">{node.label}</span>
                {node.description && <span className="block truncate text-xs text-muted-foreground">{node.description}</span>}
              </span>
              {node.badge && <span className="text-[10px] text-muted-foreground">{node.badge}</span>}
            </span>
          )}
        />
      </ComponentPreview>

      <ComponentPreview previewId="cascader-10" title="Path Value Display" layout="panel">
        <Cascader options={options} defaultSelectedPaths={[["engineering", "platform", "api"]]} valueDisplay="path" />
      </ComponentPreview>

      <ComponentPreview previewId="cascader-11" title="Leaf Value Display" layout="panel">
        <Cascader options={options} defaultSelectedPaths={[["engineering", "platform", "api"]]} valueDisplay="leaf" />
      </ComponentPreview>

      <ComponentPreview previewId="cascader-12" title="Count Value Display" layout="panel">
        <Cascader
          options={options}
          defaultSelectedPaths={[["engineering", "platform", "api"]]}
          valueDisplay="count"
          collapsePath="start"
        />
      </ComponentPreview>

      <ComponentPreview previewId="cascader-13" title="Panel Footer" layout="panel">
        <Cascader
          options={options}
          footer={
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Browse all teams</span>
              <Button size="sm" variant="outline">
                Manage teams
              </Button>
            </div>
          }
        />
      </ComponentPreview>

      <ComponentPreview previewId="cascader-14" title="Role Badges" layout="panel">
        <Cascader options={roles} />
      </ComponentPreview>

      <ComponentPreview previewId="cascader-15" title="Status Tones" layout="panel">
        <Cascader options={statusOptions} />
      </ComponentPreview>

      <ComponentPreview previewId="cascader-16" title="Icons and Badges" layout="panel">
        <Cascader options={healthOptions} />
      </ComponentPreview>

      <ComponentPreview previewId="cascader-17" title="Inline Panel" layout="wide" span={2}>
        <CascaderPanel options={options} selectedPath={selected[0]} onSelect={(path) => setSelected([path])} />
      </ComponentPreview>

      <ComponentPreview previewId="cascader-18" title="Flat Parent Links"  layout="panel">
        <Cascader options={flatOptions} placeholder="Choose a sales region..." />
      </ComponentPreview>

      <ComponentPreview previewId="cascader-19" title="Controlled Open State" layout="panel">
        <div className="grid gap-2">
          <Cascader
            options={options}
            open={isOpen}
            onOpenChange={setIsOpen}
            query={query}
            onQueryChange={setQuery}
            selectedPaths={selected}
            onSelectionChange={setSelected}
          />
          <p className="text-xs text-muted-foreground">
            Open: {String(isOpen)} · Search: {query || "empty"} · Value: {selected[0]?.join(" / ") || "none"}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="cascader-20" title="Localized Labels"  layout="panel">
        <div className="grid gap-2">
          <div className="flex gap-2">
            <Button size="sm" variant={locale === "en" ? "default" : "outline"} onClick={() => setLocale("en")}>
              English
            </Button>
            <Button size="sm" variant={locale === "zh" ? "default" : "outline"} onClick={() => setLocale("zh")}>
              简体中文
            </Button>
          </div>
          <Cascader
            options={localizedOptions}
            placeholder={locale === "zh" ? "选择团队…" : "Choose a team…"}
            searchPlaceholder={locale === "zh" ? "搜索团队…" : "Search teams…"}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="cascader-21" title="Form Field" layout="panel">
        <form className="grid gap-3" onSubmit={(event) => event.preventDefault()}>
          <label className="grid gap-2 text-sm">
            Team assignment
            <Cascader options={options} name="team" placeholder="Select a team for this user..." />
          </label>
          <Button type="submit" size="sm">
            Save assignment
          </Button>
        </form>
      </ComponentPreview>

      <ComponentPreview previewId="cascader-22" title="Async Children"  layout="panel">
        <div className="grid gap-2">
          <Cascader
            options={asyncOptions}
            selectedPaths={lazySelected}
            onSelectionChange={setLazySelected}
            onLoadChildren={async () => {
              await new Promise((resolve) => setTimeout(resolve, 250));
              const children = [
                {
                  value: "na",
                  label: "North America",
                  children: [
                    { value: "us", label: "United States" },
                    { value: "ca", label: "Canada" },
                  ],
                },
                {
                  value: "eu",
                  label: "Europe",
                  children: [
                    { value: "de", label: "Germany" },
                    { value: "uk", label: "United Kingdom" },
                  ],
                },
              ];
              setAsyncOptions([{ value: "regions", label: "Regions", children }]);
              return children;
            }}
          />
          <span className="text-xs text-muted-foreground">Children load when a region is opened.</span>
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="cascader-23" title="Virtualized List"  layout="wide" span={2}>
        <Cascader options={[{ value: "teams", label: "All teams", children: many }]} virtualize searchable searchScope="level" />
      </ComponentPreview>
    </>
  );
}



export const options: CascaderNode[] = [
  {
    value: "engineering",
    label: "Engineering",
    children: [
      {
        value: "platform",
        label: "Platform",
        children: [
          { value: "api", label: "API team" },
          { value: "infra", label: "Infrastructure" },
        ],
      },
      {
        value: "product",
        label: "Product",
        children: [
          { value: "web", label: "Web app" },
          { value: "mobile", label: "Mobile" },
        ],
      },
    ],
  },
  {
    value: "operations",
    label: "Operations",
    children: [
      { value: "support", label: "Customer support" },
      { value: "finance", label: "Finance" },
    ],
  },
  {
    value: "design",
    label: "Design",
    children: [
      { value: "brand", label: "Brand" },
      { value: "research", label: "Research" },
    ],
  },
];



export const roles: CascaderNode[] = [
  {
    value: "workspace",
    label: "Workspace",
    children: [
      {
        value: "admin",
        label: "Administrator",
        description: "Manage members and settings",
        badge: "Full access",
        tone: "success",
      },
      { value: "editor", label: "Editor", description: "Create and update content", badge: "Standard" },
      {
        value: "viewer",
        label: "Viewer",
        description: "Read-only access",
        disabled: true,
        badge: "Restricted",
      },
    ],
  },
];



export const flatOptions: CascaderNode[] = [
  { value: "north", label: "North America", parentId: null },
  { value: "us", label: "United States", parentId: "north" },
  { value: "ca", label: "Canada", parentId: "north" },
  { value: "west", label: "West", parentId: "us" },
  { value: "east", label: "East", parentId: "us" },
  { value: "ny", label: "New York", parentId: "east" },
  { value: "sf", label: "San Francisco", parentId: "west" },
];



export const statusOptions: CascaderNode[] = [
  { value: "active", label: "Production", badge: "Active", tone: "success" },
  { value: "review", label: "In review", badge: "Review", tone: "warning" },
  { value: "paused", label: "Paused", badge: "Blocked", tone: "destructive" },
];



export const healthOptions: CascaderNode[] = [
  {
    value: "healthy",
    label: "Healthy services",
    icon: <IconCheck className="size-4 text-primary" />,
    children: [
      { value: "api", label: "Public API", badge: "99.99%", tone: "success" },
      { value: "worker", label: "Workers", badge: "99.95%", tone: "success" },
    ],
  },
  {
    value: "watch",
    label: "Needs attention",
    icon: <IconBuilding className="size-4 text-muted-foreground" />,
    children: [{ value: "queue", label: "Job queue", badge: "Delayed", tone: "warning" }],
  },
];
