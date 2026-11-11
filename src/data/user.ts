import { demoAvatarUrl } from "@/lib/utils";

export type User = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly avatar: string;
};

export const users = [
  {
    id: "alex",
    name: "Alex Morgan",
    email: "alex.morgan@roseui.com",
    avatar: demoAvatarUrl("Alex Morgan"),
  },
  {
    id: "sofia",
    name: "Sofia Rossi",
    email: "sofia.rossi@roseui.com",
    avatar: demoAvatarUrl("Sofia Rossi"),
  },
  {
    id: "marcus",
    name: "Marcus Chen",
    email: "marcus.chen@roseui.com",
    avatar: demoAvatarUrl("Marcus Chen"),
  },
  {
    id: "priya",
    name: "Priya Nair",
    email: "priya.nair@roseui.com",
    avatar: demoAvatarUrl("Priya Nair"),
  },
  {
    id: "daniel",
    name: "Daniel Weber",
    email: "daniel.weber@roseui.com",
    avatar: demoAvatarUrl("Daniel Weber"),
  },
  {
    id: "hannah",
    name: "Hannah Kim",
    email: "hannah.kim@roseui.com",
    avatar: demoAvatarUrl("Hannah Kim"),
  },
  {
    id: "emma",
    name: "Emma Carter",
    email: "emma.carter@roseui.com",
    avatar: demoAvatarUrl("Emma Carter"),
  },
  {
    id: "liam",
    name: "Liam Nguyen",
    email: "liam.nguyen@roseui.com",
    avatar: demoAvatarUrl("Liam Nguyen"),
  },
  {
    id: "olivia",
    name: "Olivia Patel",
    email: "olivia.patel@roseui.com",
    avatar: demoAvatarUrl("Olivia Patel"),
  },
  {
    id: "noah",
    name: "Noah Kim",
    email: "noah.kim@roseui.com",
    avatar: demoAvatarUrl("Noah Kim"),
  },
] as const satisfies readonly User[];

export const currentUser = users[0];

export function getUserByName(name: string): User | undefined {
  return users.find((user) => user.name === name);
}

export function getUserAvatar(name: string): string {
  return getUserByName(name)?.avatar ?? demoAvatarUrl(name);
}
