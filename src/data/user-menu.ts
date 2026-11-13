import { createElement, type ReactNode } from "react";

import { CreditCard, type LucideIcon, MessageSquareDot, UserCircle } from "lucide-react";

export type UserMenuItem = {
  label: string;
  icon: LucideIcon;
};

export const userMenuItems = [
  { label: "Profile", icon: UserCircle },
  { label: "Billing", icon: CreditCard },
  { label: "Notifications", icon: MessageSquareDot },
] satisfies readonly UserMenuItem[];

export type ComponentUserMenuItem = {
  kind: "internal" | "external";
  label: string;
  href: string;
  icon: ReactNode;
};

export const userMenuDemoItems = [
  { kind: "internal", label: "Profile", href: "/profile", icon: createElement(UserCircle, { "aria-hidden": true }) },
  { kind: "internal", label: "Billing", href: "/billing", icon: createElement(CreditCard, { "aria-hidden": true }) },
  {
    kind: "external",
    label: "Project source",
    href: "https://github.com",
    icon: createElement(MessageSquareDot, { "aria-hidden": true }),
  },
] satisfies readonly ComponentUserMenuItem[];
