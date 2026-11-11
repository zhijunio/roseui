import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function demoAvatarUrl(seed: string | number): string {
  return `https://api.dicebear.com/10.x/micah/svg?seed=${encodeURIComponent(String(seed))}`;
}

export function getInitials(name: string, uppercase = false): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return uppercase ? initials.toUpperCase() : initials;
}
