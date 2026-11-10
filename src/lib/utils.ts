import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Return a stable face avatar for component examples. */
export function demoAvatarUrl(seed: string | number) {
  return `https://api.dicebear.com/10.x/micah/svg?seed=${encodeURIComponent(String(seed))}`
}

export function getInitials(name: string, uppercase = false): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)

  return uppercase ? initials.toUpperCase() : initials
}
