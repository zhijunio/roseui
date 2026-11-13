"use client";

import type { ReactNode } from "react";

import { PanelsTopLeft as IconComponents, Home as IconHome, UserCircle as IconUserCircle } from "lucide-react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumb";

type BreadcrumbExampleItem = { id: string; label: string; href: string; icon?: ReactNode; textValue?: string };
type BreadcrumbExample = { title: string; separator: "chevron" | "slash"; items: BreadcrumbExampleItem[] };

const examples: BreadcrumbExample[] = [
  {
    title: "Default",
    separator: "chevron" as const,
    items: [
      { id: "home", label: "Home", href: "/", icon: <IconHome aria-hidden="true" /> },
      {
        id: "components",
        label: "Components",
        href: "/docs/components/buttons/button",
        icon: <IconComponents aria-hidden="true" />,
      },
      {
        id: "avatar",
        label: "Avatar",
        href: "/docs/components/media/avatar",
        icon: <IconUserCircle aria-hidden="true" />,
      },
    ],
  },
  {
    title: "Slash separator",
    separator: "slash" as const,
    items: [
      { id: "home", label: "Home", href: "/" },
      { id: "components", label: "Components", href: "/docs/components/buttons/button" },
      { id: "buttons", label: "Buttons", href: "/docs/components/buttons/button" },
    ],
  },
  {
    title: "Long path",
    separator: "chevron" as const,
    items: [
      { id: "home", label: "Home", href: "/", textValue: "Home" },
      { id: "more", label: "…", href: "/docs/components/forms/field", textValue: "More pages" },
      { id: "forms", label: "Forms", href: "/docs/components/forms/field" },
      { id: "input", label: "Input", href: "/docs/components/forms/input" },
    ],
  },
];

export function BreadcrumbExamples() {
  return (
    <div className="grid gap-6">
      {examples.map((example) => (
        <ComponentPreview key={example.title} title={example.title}>
          <Breadcrumbs aria-label="Breadcrumb" items={example.items} separator={example.separator}>
            {(item) => (
              <Breadcrumb key={item.id} href={item.href} textValue={item.textValue ?? item.label}>
                {"icon" in item ? (
                  <span className="inline-flex items-center gap-1.5">
                    {item.icon}
                    {item.label}
                  </span>
                ) : (
                  item.label
                )}
              </Breadcrumb>
            )}
          </Breadcrumbs>
        </ComponentPreview>
      ))}
    </div>
  );
}
