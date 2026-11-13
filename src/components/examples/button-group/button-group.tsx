"use client";

import { type ReactNode, useState } from "react";

import {
  ArrowLeft as IconArrowLeft,
  ArrowRight as IconArrowRight,
  ChevronDown as IconChevronDown,
  Copy as IconCopy,
  Download as IconDownload,
  LayoutGrid as IconLayoutGrid,
  List as IconList,
  Minus as IconMinus,
  Pause as IconPlayerPause,
  Play as IconPlayerPlay,
  SkipBack as IconPlayerSkipBack,
  SkipForward as IconPlayerSkipForward,
  Plus as IconPlus,
  Search as IconSearch,
  Share as IconShare,
  Star as IconStar,
  ThumbsUp as IconThumbUp,
  X as IconX,
} from "lucide-react";

import { ComponentPreview, type ComponentPreviewLayout } from "@/components/docs/component-preview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupItem, ButtonGroupSeparator, ButtonGroupText } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Menu, MenuItem, MenuTrigger } from "@/components/ui/menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusDot } from "@/components/ui/status-dot";
import { demoAvatarUrl } from "@/lib/utils";

const users = [
  { id: "alex", name: "Alex Morgan", avatar: demoAvatarUrl("Alex Morgan") },
  { id: "sofia", name: "Sofia Rossi", avatar: demoAvatarUrl("Sofia Rossi") },
  { id: "marcus", name: "Marcus Chen", avatar: demoAvatarUrl("Marcus Chen") },
  { id: "priya", name: "Priya Nair", avatar: demoAvatarUrl("Priya Nair") },
  { id: "daniel", name: "Daniel Weber", avatar: demoAvatarUrl("Daniel Weber") },
  { id: "hannah", name: "Hannah Kim", avatar: demoAvatarUrl("Hannah Kim") },
  { id: "emma", name: "Emma Carter", avatar: demoAvatarUrl("Emma Carter") },
  { id: "liam", name: "Liam Nguyen", avatar: demoAvatarUrl("Liam Nguyen") },
  { id: "olivia", name: "Olivia Patel", avatar: demoAvatarUrl("Olivia Patel") },
  { id: "noah", name: "Noah Kim", avatar: demoAvatarUrl("Noah Kim") },
];

type ExampleSection = {
  title: string;
  description?: string;
  examples: number[];
  stack?: boolean;
  columns?: 2 | 3;
  layout?: ComponentPreviewLayout;
  span?: 1 | 2;
};

const sections: ExampleSection[] = [
  { title: "Basic", layout: "wide" as const, span: 2 as const, examples: [1, 6, 9, 22, 23, 31, 38, 58] },
  { title: "Orientation", layout: "wide" as const, span: 2 as const, examples: [13, 14] },
  {
    title: "Group with menu",
    layout: "wide" as const,
    span: 2 as const,
    examples: [4, 15, 18, 20, 21, 44, 48, 53, 57],
  },
  {
    title: "Group with text",
    layout: "wide" as const,
    span: 2 as const,
    examples: [3, 5, 7, 8, 28, 41, 45, 55, 56],
  },
  { title: "With field", layout: "wide" as const, span: 2 as const, examples: [2, 16, 26, 54] },
  {
    title: "Selection",
    layout: "wide" as const,
    span: 2 as const,
    examples: [10, 11, 12, 24, 25, 43],
  },
];

export function ButtonGroupExamples() {
  return (
    <>
      {sections.map((section) => {
        const renderExample = (example: number) => <ButtonGroupExample example={example} />;
        const isStack = section.stack === true;
        const layout = section.layout ?? (isStack ? "stack" : "inline");
        const columns = section.columns;
        const previewClassName =
          columns === 3
            ? "grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3"
            : columns === 2
              ? "grid items-stretch gap-4 sm:grid-cols-2"
              : isStack
                ? "flex-col flex-nowrap items-stretch gap-6"
                : undefined;
        return (
          <ComponentPreview
            key={section.title}
            title={section.title}
            span={section.span ?? 1}
            layout={layout}
            previewClassName={previewClassName}
          >
            {section.examples.map((example) => {
              const label = undefined;
              return (
                <div key={example} className={isStack ? "w-full min-w-0 space-y-2" : "min-w-0"}>
                  {isStack && label ? <p className="text-muted-foreground text-xs font-medium">{label}</p> : null}
                  {renderExample(example)}
                </div>
              );
            })}
          </ComponentPreview>
        );
      })}
    </>
  );
}

type GroupMenuProps = {
  label: string;
  options: { value: string; label: string }[];
  onSelect: (value: string, label: string) => void;
  iconOnly?: boolean;
};

function GroupMenu({ label, options, onSelect, iconOnly }: GroupMenuProps) {
  return (
    <MenuTrigger>
      <ButtonGroupItem variant="outline" size={iconOnly ? "icon" : "default"} aria-label={label}>
        {!iconOnly && label}
        <IconChevronDown aria-hidden />
      </ButtonGroupItem>

      <Menu>
        {options.map((option) => (
          <MenuItem key={option.value} onAction={() => onSelect(option.value, option.label)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </MenuTrigger>
  );
}

export function ButtonGroupExample({ example }: { example: number }) {
  const [selected, setSelected] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [secondary, setSecondary] = useState("");
  const [query, setQuery] = useState("");
  const [number, setNumber] = useState(example === 28 ? 60 : 1);
  const [pressed, setPressed] = useState(false);
  const [feedback, setFeedback] = useState("");
  const choose = (key: string, label: string) => {
    setSelected(key);
    setSelectedLabel(label);
    setFeedback(label);
  };
  const item = (key: string, label: string, icon?: ReactNode) => (
    <ButtonGroupItem key={key} variant="outline" onPress={() => setFeedback(label)}>
      {icon}
      {label}
    </ButtonGroupItem>
  );
  const labels: Record<number, string> = {
    1: "Two Buttons",
    2: "Button & Input",
    3: "Buttons & Badge",
    4: "Dropdown Menu",
    5: "Team Activity",
    6: "Icon Actions",
    7: "Status Indicator",
    8: "Like Counter",
    9: "Nested Groups",
    10: "Basic Pagination",
    11: "Split Pagination",
    12: "Text Alignment",
    13: "Vertical Orientation",
    14: "Vertical Tool Palette",
    15: "Star With Dropdown",
    16: "Search Filter Clear",
    18: "Git Split Button",
    20: "Search With Button",
    21: "File Name Menu",
    22: "Disabled Button",
    23: "Separated Buttons",
    24: "Dashboard Views",
    25: "Rating Scale",
    26: "User Selection",
    28: "Volume Control",
    31: "Share Caption",
    38: "Media Controls",
    41: "Model Selector",
    43: "Buy Sell Hold",
    44: "Pipeline Stage",
    45: "Environment Switcher",
    48: "Export Toolbar",
    53: "Publish Controls",
    54: "Service Selectors",
    55: "Payout Release",
    56: "File Attachment",
    57: "Agent Mode",
    58: "Full Width",
  };
  const label = labels[example];
  let content: ReactNode;
  let vertical = false;
  if ([10, 11].includes(example))
    content = (
      <>
        <ButtonGroupItem
          variant="outline"
          aria-label={"Previous"}
          isDisabled={number === 1}
          onPress={() => setNumber(number - 1)}
        >
          <IconArrowLeft aria-hidden />
          {example === 10 && "Previous"}
        </ButtonGroupItem>
        {example === 10 ? (
          [1, 2, 3].map((page) => (
            <ButtonGroupItem
              key={page}
              variant="outline"
              selected={number === page}
              aria-current={number === page ? "page" : undefined}
              onPress={() => setNumber(page)}
            >
              {page}
            </ButtonGroupItem>
          ))
        ) : (
          <ButtonGroupText aria-live="polite">{`Page ${number} of 3`}</ButtonGroupText>
        )}
        <ButtonGroupItem
          variant="outline"
          aria-label={"Next"}
          isDisabled={number === 3}
          onPress={() => setNumber(number + 1)}
        >
          {example === 10 && "Next"}
          <IconArrowRight aria-hidden />
        </ButtonGroupItem>
      </>
    );
  else if ([8, 15].includes(example))
    content = (
      <>
        <ButtonGroupItem variant="outline" selected={pressed} onPress={() => setPressed(!pressed)}>
          {example === 8 ? <IconThumbUp aria-hidden /> : <IconStar aria-hidden />}
          {example === 8 ? "Like" : "Star"}
        </ButtonGroupItem>
        <ButtonGroupText aria-live="polite">{1200 + (pressed ? 1 : 0)}</ButtonGroupText>
        {example === 15 && (
          <GroupMenu
            label={"More options"}
            iconOnly
            options={[
              { value: "watch", label: "Watch" },
              { value: "fork", label: "Fork" },
              { value: "share", label: "Share" },
            ]}
            onSelect={choose}
          />
        )}
      </>
    );
  else if (example === 28)
    content = (
      <>
        <ButtonGroupItem
          variant="outline"
          aria-label={"Decrease"}
          isDisabled={number <= 0}
          onPress={() => setNumber(Math.max(0, number - 10))}
        >
          <IconMinus aria-hidden />
        </ButtonGroupItem>
        <ButtonGroupText aria-live="polite">{`Volume ${number}%`}</ButtonGroupText>
        <ButtonGroupItem
          variant="outline"
          aria-label={"Increase"}
          isDisabled={number >= 100}
          onPress={() => setNumber(number + 10)}
        >
          <IconPlus aria-hidden />
        </ButtonGroupItem>
      </>
    );
  else if ([12, 24, 25, 41, 43, 45, 57].includes(example)) {
    const optionsForExample =
      example === 12
        ? [
            { value: "left", label: "Left" },
            { value: "center", label: "Center" },
            { value: "right", label: "Right" },
          ]
        : example === 24
          ? [
              { value: "grid", label: "Grid" },
              { value: "list", label: "List" },
            ]
          : example === 25
            ? ["1", "2", "3", "4", "5"].map((value) => ({ value, label: value }))
            : example === 41
              ? [
                  { value: "fast", label: "Fast" },
                  { value: "balanced", label: "Balanced" },
                  { value: "advanced", label: "Advanced" },
                ]
              : example === 43
                ? [
                    { value: "buy", label: "Buy" },
                    { value: "hold", label: "Hold" },
                    { value: "sell", label: "Sell" },
                  ]
                : example === 45
                  ? [
                      { value: "development", label: "Development" },
                      { value: "staging", label: "Staging" },
                      { value: "production", label: "Production" },
                    ]
                  : [
                      { value: "assist", label: "Assist" },
                      { value: "review", label: "Review" },
                      { value: "auto", label: "Auto" },
                    ];
    content = (
      <>
        {optionsForExample.map(({ value, label: optionLabel }, index) => (
          <ButtonGroupItem
            key={value}
            variant="outline"
            selected={(selected || optionsForExample[0].value) === value}
            onPress={() => {
              setSelected(value);
              setSelectedLabel(optionLabel);
            }}
          >
            {example === 24 && (index === 0 ? <IconLayoutGrid aria-hidden /> : <IconList aria-hidden />)}
            {optionLabel}
          </ButtonGroupItem>
        ))}
        {example === 45 && (
          <ButtonGroupText>
            <StatusDot color="success" />
            {"Live"}
          </ButtonGroupText>
        )}
        {example === 41 && <ButtonGroupText>{"Pro"}</ButtonGroupText>}
        {example === 57 && (
          <GroupMenu
            label={secondary || "10K credits"}
            options={["2K", "10K", "50K"].map((value) => ({ value, label: value }))}
            onSelect={(value) => setSecondary(value)}
          />
        )}
      </>
    );
  } else if ([2, 16, 20, 21].includes(example))
    content = (
      <>
        {example === 2 ? (
          item("search", "Search", <IconSearch aria-hidden />)
        ) : (
          <GroupMenu
            label={selected ? selectedLabel : "Filter"}
            options={[
              { value: "all", label: "All records" },
              { value: "recent", label: "Recent" },
              { value: "archived", label: "Archived" },
            ]}
            onSelect={choose}
          />
        )}
        <Input
          aria-label={"Search"}
          placeholder={"Search"}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="bg-background w-36 min-w-0 shadow-none focus-visible:ring-inset"
        />
        {[16, 20].includes(example) && (
          <ButtonGroupItem variant="outline" size="icon" aria-label={"Clear search"} onPress={() => setQuery("")}>
            <IconX aria-hidden />
          </ButtonGroupItem>
        )}
        {example === 21 && (
          <GroupMenu
            label={"Create"}
            options={[
              { value: "newFile", label: "New file" },
              { value: "newFolder", label: "New folder" },
            ]}
            onSelect={choose}
          />
        )}
      </>
    );
  else if ([9, 14].includes(example)) {
    vertical = example === 14;
    content = (
      <>
        <ButtonGroup orientation={vertical ? "vertical" : "horizontal"} aria-label={"Tools"}>
          {item("copy", "Copy", <IconCopy aria-hidden />)}
          {item("share", "Share", <IconShare aria-hidden />)}
        </ButtonGroup>
        <ButtonGroup aria-label={"Search"}>
          <Input
            aria-label={"Search"}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="bg-background w-32"
          />
          {item("send", "Send", <IconArrowRight aria-hidden />)}
        </ButtonGroup>
      </>
    );
  } else if (example === 13) {
    vertical = true;
    content = [
      { value: "components", label: "Components" },
      { value: "analytics", label: "Analytics" },
      { value: "settings", label: "Settings" },
      { value: "help", label: "Help" },
    ].map(({ value, label }) => (
      <ButtonGroupItem
        key={value}
        variant="outline"
        selected={(selected || "components") === value}
        onPress={() => {
          setSelected(value);
          setSelectedLabel(label);
        }}
      >
        {label}
      </ButtonGroupItem>
    ));
  } else if (example === 38)
    content = (
      <>
        <ButtonGroupItem variant="outline" size="icon" aria-label={"Previous"} onPress={() => setFeedback("Previous")}>
          <IconPlayerSkipBack aria-hidden />
        </ButtonGroupItem>
        <ButtonGroupItem
          variant="outline"
          size="icon"
          aria-label={pressed ? "Pause" : "Play"}
          selected={pressed}
          onPress={() => setPressed(!pressed)}
        >
          {pressed ? <IconPlayerPause aria-hidden /> : <IconPlayerPlay aria-hidden />}
        </ButtonGroupItem>
        <ButtonGroupItem variant="outline" size="icon" aria-label={"Next"} onPress={() => setFeedback("Next")}>
          <IconPlayerSkipForward aria-hidden />
        </ButtonGroupItem>
      </>
    );
  else if ([26, 54].includes(example)) {
    const fields =
      example === 54
        ? [
            ["api", "web"],
            ["development", "production"],
            ["v1", "v2"],
          ]
        : [users.map((person) => person.id)];
    content = (
      <>
        {example === 26 && <ButtonGroupText>{"Team"}</ButtonGroupText>}
        {fields.map((keys, index) => (
          <Select
            key={keys.join("-")}
            value={index === 0 ? selected : secondary}
            onValueChange={index === 0 ? setSelected : setSecondary}
          >
            <SelectTrigger
              aria-label={
                example === 26 ? "Member" : example === 54 ? ["Service", "Environment", "Version"][index] : "Option"
              }
              className="bg-background"
            >
              <SelectValue placeholder={"Choose"} />
            </SelectTrigger>
            <SelectContent>
              {keys.map((key) => (
                <SelectItem key={key} value={key}>
                  {example === 26 ? users.find((person) => person.id === key)?.name : key.startsWith("v") ? key : key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </>
    );
  } else if (example === 44) {
    const stageOptions = [
      { value: "plan", label: "Plan" },
      { value: "build", label: "Build" },
      { value: "review", label: "Review" },
      { value: "deploy", label: "Deploy" },
    ];
    content = (
      <>
        <ButtonGroupItem
          variant="outline"
          isDisabled={number === 0}
          aria-label={"Previous"}
          onPress={() => setNumber(number - 1)}
        >
          <IconArrowLeft aria-hidden />
        </ButtonGroupItem>
        <GroupMenu
          label={stageOptions[number].label}
          options={stageOptions}
          onSelect={(key) => setNumber(stageOptions.findIndex((item) => item.value === key))}
        />
        <ButtonGroupItem
          variant="outline"
          isDisabled={number === 3}
          aria-label={"Next"}
          onPress={() => setNumber(number + 1)}
        >
          <IconArrowRight aria-hidden />
        </ButtonGroupItem>
      </>
    );
  } else if (example === 5)
    content = (
      <>
        <ButtonGroupText>
          <Avatar size="xs">
            <AvatarImage src={users[0].avatar} alt="" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          {"Team"}
        </ButtonGroupText>
        <GroupMenu
          label={"Settings"}
          options={[
            { value: "members", label: "Manage members" },
            { value: "preferences", label: "Team preferences" },
            { value: "dashboard", label: "Dashboard" },
          ]}
          onSelect={choose}
        />
      </>
    );
  else if (example === 7)
    content = (
      <>
        <GroupMenu
          label={selected || "main"}
          options={["main", "develop", "feature/auth"].map((value) => ({ value, label: value }))}
          onSelect={(value) => setSelected(value)}
        />
        <ButtonGroupText>
          <StatusDot color="success" />
          {"Production"}
        </ButtonGroupText>
      </>
    );
  else if (example === 3)
    content = (
      <>
        {item("report", "Report")}
        <ButtonGroupText>
          <span className="bg-muted rounded px-2 text-xs">{"Save as draft"}</span>
        </ButtonGroupText>
        {item("edit", "Edit")}
      </>
    );
  else if (example === 6)
    content = [
      { key: "copy", icon: <IconCopy aria-hidden /> },
      { key: "share", icon: <IconShare aria-hidden /> },
      { key: "download", icon: <IconDownload aria-hidden /> },
    ].map(({ key, icon }) => (
      <ButtonGroupItem key={key} variant="outline" size="icon" aria-label={key} onPress={() => setFeedback(key)}>
        {icon}
      </ButtonGroupItem>
    ));
  else if ([22, 23].includes(example))
    content = (
      <>
        {item("files", "Files")}
        {example === 23 && <ButtonGroupSeparator />}
        {item("folder", "Folder")}
        <ButtonGroupItem variant="outline" isDisabled={example === 22}>
          {"Trash"}
        </ButtonGroupItem>
      </>
    );
  else if (example === 31)
    content = (
      <>
        <ButtonGroupItem onPress={() => setFeedback("Share")}>{"Share"}</ButtonGroupItem>
        {item("copy", "Copy", <IconCopy aria-hidden />)}
      </>
    );
  else if (example === 56)
    content = (
      <>
        <ButtonGroupText>roadmap.txt</ButtonGroupText>
        <a
          href="data:text/plain;charset=utf-8,RoseUI%20roadmap%0APlan%20Build%20Review"
          download="roadmap.txt"
          aria-label={"Download attachment"}
          data-slot="button"
          className={buttonVariants({ variant: "outline" })}
        >
          <IconDownload aria-hidden />
        </a>
      </>
    );
  else if (example === 58)
    content = (
      <>
        <ButtonGroupItem variant="outline" onPress={() => setFeedback("Cancelled")}>
          Cancel
        </ButtonGroupItem>
        <ButtonGroupItem onPress={() => setFeedback("Continued")}>Continue</ButtonGroupItem>
      </>
    );
  else {
    const configs: Record<
      number,
      { action: { label: string }; menu: { value: string; label: string }[]; before?: { key: string; label: string }[] }
    > = {
      1: { action: { label: "Open" }, menu: [], before: [{ key: "archive", label: "Archive" }] },
      4: {
        action: { label: "Update" },
        menu: [
          { value: "production", label: "Production" },
          { value: "staging", label: "Staging" },
          { value: "development", label: "Development" },
        ],
      },
      18: {
        action: { label: "Commit" },
        menu: [
          { value: "commitPush", label: "Commit and push" },
          { value: "commitSync", label: "Commit and sync" },
          { value: "amend", label: "Amend last commit" },
        ],
        before: [{ key: "branch", label: "Branch" }],
      },
      48: {
        action: { label: "Filter" },
        menu: [
          { value: "grid", label: "Grid" },
          { value: "list", label: "List" },
        ],
        before: [{ key: "export", label: "Export" }],
      },
      53: {
        action: { label: "Publish" },
        menu: [
          { value: "schedule", label: "Schedule" },
          { value: "draft", label: "Save as draft" },
          { value: "duplicate", label: "Duplicate" },
          { value: "history", label: "View history" },
          { value: "archive", label: "Archive" },
          { value: "delete", label: "Delete" },
        ],
        before: [{ key: "preview", label: "Preview" }],
      },
      55: {
        action: { label: "Release payout" },
        menu: [
          { value: "schedule", label: "Schedule" },
          { value: "destination", label: "Change destination" },
          { value: "export", label: "Export" },
          { value: "cancel", label: "Cancel" },
        ],
        before: [{ key: "hold", label: "Hold" }],
      },
    };
    const config = configs[example] ?? configs[1];
    content = (
      <>
        {example === 55 && <ButtonGroupText>$12,480</ButtonGroupText>}
        {config.before?.map(({ key, label }) => item(key, label))}
        <ButtonGroupItem variant="outline" onPress={() => setFeedback(config.action.label)}>
          {config.action.label}
        </ButtonGroupItem>
        {config.menu.length > 0 && (
          <GroupMenu iconOnly label={"More options"} options={config.menu} onSelect={choose} />
        )}
      </>
    );
  }
  return (
    <div className={`min-w-0 space-y-2 ${example === 58 ? "w-full" : ""}`}>
      <div className="max-w-full overflow-x-auto p-1">
        <ButtonGroup orientation={vertical ? "vertical" : "horizontal"} fullWidth={example === 58} aria-label={label}>
          {content}
        </ButtonGroup>
      </div>
      {feedback && (
        <p role="status" className="text-muted-foreground text-xs">
          {feedback}
        </p>
      )}
    </div>
  );
}
