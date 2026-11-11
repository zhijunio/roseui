import Link from "next/link";

import {
  IconArrowRight,
  IconChartBar,
  IconCircleCheck,
  IconCode,
  IconDatabase,
  IconFileText,
  IconGauge,
  IconLayoutDashboard,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { ComponentPreview } from "@/components/examples/component-preview";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const metadata = { title: "Navigation Menu" };

const resources = [
  {
    title: "Overview",
    description: "Track workspace health and recent activity.",
    href: "/components/card",
    icon: IconLayoutDashboard,
  },
  {
    title: "Members",
    description: "Manage roles and team access.",
    href: "/components/avatar",
    icon: IconUsers,
  },
  {
    title: "Usage reports",
    description: "Review usage trends and exports.",
    href: "/components/progress",
    icon: IconChartBar,
  },
];

export function NavigationMenuExamples() {
  return (
    <>
      <ComponentPreview title="Basic Navigation Menu" className="overflow-visible">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Workspace</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[min(20rem,calc(100vw-2rem))] gap-1">
                  <li>
                    <NavigationMenuLink href="/components/card">
                      <span className="font-medium">Workspace overview</span>
                      <span className="mt-1 block text-xs text-muted-foreground">Projects, members, and activity.</span>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="/components/notification">
                      <span className="font-medium">Notifications</span>
                      <span className="mt-1 block text-xs text-muted-foreground">Review recent workspace updates.</span>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/components/event-calendar" className="px-3 py-2">
                Calendar
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/components/dialog" className="px-3 py-2">
                Settings
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuIndicator />
        </NavigationMenu>
      </ComponentPreview>
      <ComponentPreview title="Grid Layout" className="overflow-visible">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Reports</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[min(27.5rem,calc(100vw-2rem))] gap-1 p-1 sm:grid-cols-2">
                  {resources.map(({ title, description, href, icon: Icon }) => (
                    <li key={title}>
                      <NavigationMenuLink href={href} className="h-full">
                        <span className="mb-2 flex size-8 items-center justify-center rounded-md bg-muted">
                          <Icon className="size-4" />
                        </span>
                        <span className="font-medium">{title}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{description}</span>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Admin tools</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[min(27.5rem,calc(100vw-2rem))] gap-1 p-1 sm:grid-cols-2">
                  <li>
                    <NavigationMenuLink href="/components/command">
                      <IconCode className="mb-2 size-4" />
                      <span className="block font-medium">Command center</span>
                      <span className="mt-1 block text-xs text-muted-foreground">Find actions and destinations.</span>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="/components/number-field">
                      <IconDatabase className="mb-2 size-4" />
                      <span className="block font-medium">Data controls</span>
                      <span className="mt-1 block text-xs text-muted-foreground">Configure data entry tools.</span>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </ComponentPreview>
      <ComponentPreview title="Icon Navigation Links" className="overflow-visible">
        <NavigationMenu>
          <NavigationMenuList>
            {[
              { label: "Analytics", href: "/components/progress", Icon: IconGauge },
              { label: "Reports", href: "/components/card", Icon: IconFileText },
              { label: "Settings", href: "/components/dialog", Icon: IconSettings },
            ].map(({ label, href, Icon }) => (
              <NavigationMenuItem key={label}>
                <NavigationMenuLink href={href} className="flex items-center gap-2 px-3 py-2">
                  <Icon className="size-4 text-muted-foreground" />
                  {label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </ComponentPreview>
      <ComponentPreview title="Resource Grid" className="overflow-visible">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[min(32.5rem,calc(100vw-2rem))] gap-3 p-3 sm:grid-cols-[1.1fr_1fr]">
                  <NavigationMenuLink href="/components/tooltip" className="rounded-lg bg-muted p-4">
                    <IconCircleCheck className="mb-3 size-5 text-primary" />
                    <span className="block font-semibold">Admin handbook</span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                      Best practices for secure, efficient workspace administration.
                    </span>
                  </NavigationMenuLink>
                  <ul className="grid gap-1">
                    {[
                      {
                        title: "API reference",
                        description: "Explore integration endpoints.",
                        href: "/components/command",
                      },
                      {
                        title: "Release notes",
                        description: "See what changed recently.",
                        href: "/components/notification",
                      },
                      {
                        title: "Support center",
                        description: "Get help from the team.",
                        href: "/components/dialog",
                      },
                    ].map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink href={item.href}>
                          <span className="font-medium">{item.title}</span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">{item.description}</span>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-3 sm:col-span-2">
                    <span className="text-sm text-muted-foreground">Need a hand getting started?</span>
                    <Button size="sm" asChild>
                      <Link href="/components/accordion">
                        Browse guides <IconArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </ComponentPreview>
    </>
  );
}
