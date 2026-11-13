import {
  AlignCenter as IconAlignCenter,
  AlignJustify as IconAlignJustified,
  AlignLeft as IconAlignLeft,
  AlignRight as IconAlignRight,
  ArrowDown as IconArrowDown,
  ArrowUp as IconArrowUp,
  Bell as IconBell,
  Bluetooth as IconBluetooth,
  Bold as IconBold,
  Grid3x3 as IconGrid3x3,
  Italic as IconItalic,
  LayoutGrid as IconLayoutGrid,
  List as IconList,
  Mail as IconMail,
  MessageSquare as IconMessage,
  Moon as IconMoon,
  Plane as IconPlane,
  Underline as IconUnderline,
  Wifi as IconWifi,
} from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Badge } from "@/components/ui/badge";
import { BrandIcon } from "@/components/ui/brand-icon";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const metadata = { title: "Toggle Group" };

export function ToggleGroupExamples() {
  return (
    <>
      <ComponentPreview title="Selection">
        <ToggleGroup selectionMode="multiple" defaultSelectedKeys={["bold"]} spacing={1} aria-label="Text formatting">
          <ToggleGroupItem id="bold" aria-label="Toggle bold">
            <IconBold />
          </ToggleGroupItem>
          <ToggleGroupItem id="italic" aria-label="Toggle italic">
            <IconItalic />
          </ToggleGroupItem>
          <ToggleGroupItem id="underline" aria-label="Toggle underline">
            <IconUnderline />
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          selectionMode="single"
          defaultSelectedKeys={["all"]}
          variant="outline"
          aria-label="Filter activity"
        >
          <ToggleGroupItem id="all">All activity</ToggleGroupItem>
          <ToggleGroupItem id="mentions">Mentions</ToggleGroupItem>
          <ToggleGroupItem id="assigned">Assigned to me</ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          selectionMode="single"
          defaultSelectedKeys={["active"]}
          variant="outline"
          size="sm"
          aria-label="Filter tasks"
        >
          <ToggleGroupItem id="all">All</ToggleGroupItem>
          <ToggleGroupItem id="active">Active</ToggleGroupItem>
          <ToggleGroupItem id="completed">Completed</ToggleGroupItem>
          <ToggleGroupItem id="archived">Archived</ToggleGroupItem>
        </ToggleGroup>
      </ComponentPreview>
      <ComponentPreview title="States" layout="stack">
        <ToggleGroup
          selectionMode="single"
          isDisabled
          defaultSelectedKeys={["active"]}
          variant="outline"
          aria-label="Disabled task filter"
        >
          <ToggleGroupItem id="all">All</ToggleGroupItem>
          <ToggleGroupItem id="active">Active</ToggleGroupItem>
          <ToggleGroupItem id="completed">Completed</ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup selectionMode="single" defaultSelectedKeys={["list"]} variant="outline" aria-label="View options">
          <ToggleGroupItem id="list">
            <IconList />
            List
          </ToggleGroupItem>
          <ToggleGroupItem id="grid" isDisabled>
            <IconLayoutGrid />
            Grid unavailable
          </ToggleGroupItem>
          <ToggleGroupItem id="board">
            <IconGrid3x3 />
            Board
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="w-full max-w-lg">
          <ToggleGroup
            selectionMode="single"
            defaultSelectedKeys={["overview"]}
            variant="outline"
            fullWidth
            aria-label="Workspace section"
          >
            <ToggleGroupItem id="overview">Overview</ToggleGroupItem>
            <ToggleGroupItem id="members">Members</ToggleGroupItem>
            <ToggleGroupItem id="activity">Activity</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Sizing" layout="stack">
        <div className="flex flex-wrap items-center gap-4">
          <ToggleGroup
            selectionMode="single"
            defaultSelectedKeys={["overview"]}
            size="sm"
            variant="outline"
            aria-label="Compact view"
          >
            <ToggleGroupItem id="overview">Overview</ToggleGroupItem>
            <ToggleGroupItem id="members">Members</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup
            selectionMode="single"
            defaultSelectedKeys={["overview"]}
            size="default"
            variant="outline"
            aria-label="Standard view"
          >
            <ToggleGroupItem id="overview">Overview</ToggleGroupItem>
            <ToggleGroupItem id="members">Members</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup
            selectionMode="single"
            defaultSelectedKeys={["overview"]}
            size="lg"
            variant="outline"
            aria-label="Large view"
          >
            <ToggleGroupItem id="overview">Overview</ToggleGroupItem>
            <ToggleGroupItem id="members">Members</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <ToggleGroup
            selectionMode="single"
            defaultSelectedKeys={["day"]}
            variant="outline"
            spacing={0}
            aria-label="Compact period"
          >
            <ToggleGroupItem id="day">Day</ToggleGroupItem>
            <ToggleGroupItem id="week">Week</ToggleGroupItem>
            <ToggleGroupItem id="month">Month</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup
            selectionMode="single"
            defaultSelectedKeys={["week"]}
            variant="outline"
            spacing={3}
            aria-label="Spaced period"
          >
            <ToggleGroupItem id="day">Day</ToggleGroupItem>
            <ToggleGroupItem id="week">Week</ToggleGroupItem>
            <ToggleGroupItem id="month">Month</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Orientation" layout="grid2">
        <ToggleGroup
          selectionMode="multiple"
          orientation="vertical"
          variant="outline"
          spacing={1}
          aria-label="Text formatting"
        >
          <ToggleGroupItem id="bold" aria-label="Bold">
            <IconBold />
          </ToggleGroupItem>
          <ToggleGroupItem id="italic" aria-label="Italic">
            <IconItalic />
          </ToggleGroupItem>
          <ToggleGroupItem id="underline" aria-label="Underline">
            <IconUnderline />
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup selectionMode="multiple" orientation="vertical" spacing={1} aria-label="Connectivity settings">
          <ToggleGroupItem className="w-full justify-start" id="wifi" aria-label="Wi-Fi">
            <IconWifi />
            Wi-Fi enabled
          </ToggleGroupItem>
          <ToggleGroupItem className="w-full justify-start" id="bluetooth" aria-label="Bluetooth">
            <IconBluetooth />
            Bluetooth enabled
          </ToggleGroupItem>
          <ToggleGroupItem className="w-full justify-start" id="airplane" aria-label="Maintenance mode">
            <IconPlane />
            Maintenance mode
          </ToggleGroupItem>
          <ToggleGroupItem className="w-full justify-start" id="alerts" aria-label="Alerts">
            <IconBell />
            Alerts enabled
          </ToggleGroupItem>
        </ToggleGroup>
      </ComponentPreview>
      <ComponentPreview title="Use Cases" layout="stack">
        <ToggleGroup selectionMode="single" defaultSelectedKeys={["left"]} spacing={1} aria-label="Text alignment">
          <ToggleGroupItem id="left" aria-label="Align left">
            <IconAlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem id="center" aria-label="Align center">
            <IconAlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem id="right" aria-label="Align right">
            <IconAlignRight />
          </ToggleGroupItem>
          <ToggleGroupItem id="justify" aria-label="Justify">
            <IconAlignJustified />
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup selectionMode="single" defaultSelectedKeys={["list"]} variant="outline" aria-label="Choose view">
          <ToggleGroupItem id="list" aria-label="List view">
            <IconList />
            List
          </ToggleGroupItem>
          <ToggleGroupItem id="grid" aria-label="Grid view">
            <IconLayoutGrid />
            Grid
          </ToggleGroupItem>
          <ToggleGroupItem id="board" aria-label="Board view">
            <IconGrid3x3 />
            Board
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          selectionMode="single"
          defaultSelectedKeys={["light"]}
          variant="outline"
          aria-label="Theme preference"
        >
          <ToggleGroupItem id="light">Light</ToggleGroupItem>
          <ToggleGroupItem id="dark">
            <IconMoon />
            Dark
          </ToggleGroupItem>
          <ToggleGroupItem id="system">System</ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          selectionMode="single"
          defaultSelectedKeys={["medium"]}
          size="sm"
          variant="outline"
          aria-label="Font size"
        >
          <ToggleGroupItem id="small">Small</ToggleGroupItem>
          <ToggleGroupItem id="medium">Medium</ToggleGroupItem>
          <ToggleGroupItem id="large">Large</ToggleGroupItem>
          <ToggleGroupItem id="extra-large">XL</ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          selectionMode="single"
          defaultSelectedKeys={["24h"]}
          size="sm"
          variant="outline"
          aria-label="Chart time range"
        >
          <ToggleGroupItem id="1h">1H</ToggleGroupItem>
          <ToggleGroupItem id="6h">6H</ToggleGroupItem>
          <ToggleGroupItem id="24h">24H</ToggleGroupItem>
          <ToggleGroupItem id="7d">7D</ToggleGroupItem>
          <ToggleGroupItem id="30d">30D</ToggleGroupItem>
          <ToggleGroupItem id="all">All</ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          selectionMode="multiple"
          defaultSelectedKeys={["email", "push"]}
          variant="outline"
          spacing={1}
          aria-label="Notification channels"
        >
          <ToggleGroupItem id="email" aria-label="Email notifications">
            <IconMail />
            Email
          </ToggleGroupItem>
          <ToggleGroupItem id="sms" aria-label="SMS notifications">
            <IconMessage />
            SMS
          </ToggleGroupItem>
          <ToggleGroupItem id="push" aria-label="Push notifications">
            <IconBell />
            Push
          </ToggleGroupItem>
          <ToggleGroupItem id="chat" aria-label="Team chat notifications">
            <BrandIcon name="slack" />
            Chat
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          selectionMode="single"
          defaultSelectedKeys={["2"]}
          variant="outline"
          aria-label="Dashboard column count"
        >
          {[1, 2, 3, 4].map((count) => (
            <ToggleGroupItem key={count} id={String(count)} aria-label={`${count} columns`}>
              <IconGrid3x3 />
              {count}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <ToggleGroup
          selectionMode="single"
          defaultSelectedKeys={["ascending"]}
          variant="outline"
          size="sm"
          aria-label="Sort direction"
        >
          <ToggleGroupItem id="ascending">
            <IconArrowUp />
            Ascending
          </ToggleGroupItem>
          <ToggleGroupItem id="descending">
            <IconArrowDown />
            Descending
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          selectionMode="single"
          defaultSelectedKeys={["annual"]}
          variant="outline"
          size="lg"
          aria-label="Billing period"
        >
          <ToggleGroupItem id="monthly">Monthly</ToggleGroupItem>
          <ToggleGroupItem id="annual">
            Annual <Badge variant="secondary">Save 20%</Badge>
          </ToggleGroupItem>
        </ToggleGroup>
      </ComponentPreview>
    </>
  );
}
