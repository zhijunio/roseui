import type { ElementType } from "react";

import Link from "next/link";

import { IconChevronRight, IconComponents, IconHome, IconSlash, IconUserCircle } from "@tabler/icons-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ComponentPreview } from "@/examples/component-preview";

function BreadcrumbArrow() {
  return <BreadcrumbListExample divider="arrow" />;
}

const icons: Record<BreadcrumbIconName, ElementType> = {
  home: IconHome,
  kits: IconComponents,
  avatar: IconUserCircle,
};

type Divider = "arrow" | "slash" | "slash-icon";
function BreadcrumbListExample({ divider, examples }: { divider: Divider; examples?: BreadcrumbExampleItem[][] }) {
  const rows = examples ?? (divider === "slash-icon" ? breadcrumbIconExamples : breadcrumbExamples);
  return (
    <div className="flex w-full flex-col gap-5">
      {rows.map((items) => (
        <Breadcrumb key={items.map((item) => ("ellipsis" in item ? item.label : item.href)).join("|")}>
          <BreadcrumbList>
            {items.map((item, index) => {
              if ("ellipsis" in item) {
                return (
                  <span key={`ellipsis-${items.length}`} className="contents">
                    {index > 0 && (
                      <BreadcrumbSeparator>
                        {divider === "arrow" ? <IconChevronRight /> : divider === "slash-icon" ? <IconSlash /> : "/"}
                      </BreadcrumbSeparator>
                    )}
                    <BreadcrumbItem>
                      <BreadcrumbEllipsis />
                    </BreadcrumbItem>
                  </span>
                );
              }

              const Icon = icons[item.icon];
              const crumb = (
                <>
                  {divider === "slash-icon" && <Icon aria-hidden="true" className="size-4 shrink-0" />}
                  <span>{item.label}</span>
                </>
              );
              return (
                <span key={item.href} className="contents">
                  {index > 0 && (
                    <BreadcrumbSeparator>
                      {divider === "arrow" ? <IconChevronRight /> : divider === "slash-icon" ? <IconSlash /> : "/"}
                    </BreadcrumbSeparator>
                  )}
                  <BreadcrumbItem>
                    {index === items.length - 1 ? (
                      <BreadcrumbPage className="inline-flex items-center gap-1.5">{crumb}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={item.href} className="inline-flex items-center gap-1.5">
                          {crumb}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </span>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      ))}
    </div>
  );
}

type BreadcrumbIconName = "home" | "kits" | "avatar";

type BreadcrumbExampleItem = { label: string; href: string; icon: BreadcrumbIconName } | { label: "…"; ellipsis: true };

const breadcrumbExamples: BreadcrumbExampleItem[][] = [
  [
    { label: "Home", href: "/components/accordion", icon: "home" },
    { label: "UI Kits", href: "/components/button", icon: "kits" },
  ],
  [
    { label: "Home", href: "/components/accordion", icon: "home" },
    { label: "UI Kits", href: "/components/button", icon: "kits" },
    { label: "Avatar", href: "/components/avatar", icon: "avatar" },
  ],
];

const breadcrumbIconExamples = breadcrumbExamples;

const breadcrumbEllipsisExamples: BreadcrumbExampleItem[][] = [
  [
    { label: "Home", href: "/components/accordion", icon: "home" },
    { label: "…", ellipsis: true },
    { label: "Avatar", href: "/components/avatar", icon: "avatar" },
    { label: "Profile", href: "/components/button", icon: "avatar" },
  ],
];

function BreadcrumbSlash() {
  return <BreadcrumbListExample divider="slash" />;
}

function BreadcrumbSlashIcon() {
  return <BreadcrumbListExample divider="slash-icon" />;
}

function BreadcrumbWithAvatars() {
  return (
    <Breadcrumb className="w-full">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/components/button">Components</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/components/button" className="inline-flex items-center gap-2">
              <Avatar size="xs" aria-hidden="true">
                <AvatarFallback>DT</AvatarFallback>
              </Avatar>
              Design team
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="inline-flex items-center gap-2">
            <Avatar size="xs" aria-hidden="true">
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            Maya Chen
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function BreadcrumbWithEllipsis() {
  return <BreadcrumbListExample divider="arrow" examples={breadcrumbEllipsisExamples} />;
}

function BreadcrumbWithDropdown() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/components/button">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open breadcrumb menu">
                <BreadcrumbEllipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Themes</DropdownMenuItem>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/components/button">Components</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function BreadcrumbExamples() {
  return (
    <>
      <ComponentPreview
        title="Dividers"
        exampleLabels={["Chevron", "Slash", "Three levels with chevrons", "Three levels with slashes"]}
      >
        <BreadcrumbArrow />

        <BreadcrumbSlash />

        <BreadcrumbListExample
          divider="arrow"
          examples={[
            [
              { label: "Home", href: "/components/button", icon: "home" },
              { label: "UI", href: "/components/button", icon: "kits" },
              { label: "Buttons", href: "/components/button", icon: "avatar" },
            ],
          ]}
        />

        <BreadcrumbListExample
          divider="slash"
          examples={[
            [
              { label: "Organization", href: "/components/card", icon: "home" },
              { label: "Teams", href: "/components/card", icon: "kits" },
              { label: "Design", href: "/components/card", icon: "avatar" },
            ],
          ]}
        />
      </ComponentPreview>
      <ComponentPreview title="Icon" exampleLabels={["Icons throughout", "Icon home link"]}>
        <BreadcrumbSlashIcon />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  aria-label="Home"
                  href="/components/button"
                  className="inline-flex size-8 items-center justify-center rounded-md border p-0"
                >
                  <IconHome className="size-4" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/components/button">Components</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Buttons</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </ComponentPreview>
      <ComponentPreview title="Ellipsis" exampleLabels={["Long path", "Custom path"]}>
        <BreadcrumbWithEllipsis />

        <BreadcrumbListExample
          divider="arrow"
          examples={[
            [
              { label: "Workspace", href: "/components/card", icon: "home" },
              { label: "…", ellipsis: true },
              { label: "Current item", href: "/components/card", icon: "avatar" },
            ],
          ]}
        />
      </ComponentPreview>
      <ComponentPreview title="Menu">
        <BreadcrumbWithDropdown />
      </ComponentPreview>
      <ComponentPreview
        title="Content Variants"
        exampleLabels={["With avatars", "Project path", "Count badge", "Current item"]}
      >
        <BreadcrumbWithAvatars />

        <BreadcrumbListExample
          divider="arrow"
          examples={[
            [
              { label: "Workspace", href: "/components/card", icon: "home" },
              { label: "Projects", href: "/components/table", icon: "kits" },
              { label: "Overview", href: "/components/card", icon: "avatar" },
            ],
          ]}
        />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/components/card">Workspace</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/components/table">Members</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="inline-flex items-center gap-2">
                Invitations<span className="bg-muted rounded-full px-2 py-0.5 text-[10px]">4</span>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <BreadcrumbListExample
          divider="arrow"
          examples={[
            [
              { label: "Projects", href: "/components/card", icon: "home" },
              { label: "Website refresh", href: "/components/card", icon: "kits" },
              { label: "Design brief", href: "/components/card", icon: "avatar" },
            ],
          ]}
        />
      </ComponentPreview>
      <ComponentPreview title="Frame" exampleLabels={["Card frame", "Pill frame", "Pills by item"]}>
        <div className="bg-card w-full rounded-xl border p-4">
          <BreadcrumbListExample
            divider="arrow"
            examples={[
              [
                { label: "Workspace", href: "/components/card", icon: "home" },
                { label: "Billing", href: "/components/card", icon: "kits" },
                { label: "Invoices", href: "/components/card", icon: "avatar" },
              ],
            ]}
          />
          <p className="mt-4 border-t pt-4 text-sm font-medium">Invoice overview</p>
        </div>

        <div className="bg-muted/30 inline-flex rounded-full border p-2">
          <BreadcrumbListExample
            divider="slash"
            examples={[
              [
                { label: "Library", href: "/components/card", icon: "home" },
                { label: "Components", href: "/components/button", icon: "kits" },
                { label: "Buttons", href: "/components/button", icon: "avatar" },
              ],
            ]}
          />
        </div>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/components/button" className="bg-background rounded-md border px-2 py-1">
                  Components
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="bg-primary text-primary-foreground rounded-md px-2 py-1">
                Buttons
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </ComponentPreview>
    </>
  );
}
