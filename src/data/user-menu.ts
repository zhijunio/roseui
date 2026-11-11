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
