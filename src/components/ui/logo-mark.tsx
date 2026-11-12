import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

const BRAND_MARK_PATH =
  "M33.9 35.5 43 44.7a8.3 8.3 0 0 1 0 11.6 8.1 8.1 0 0 1-10.8.7l-.2-.2-.2.2a8.1 8.1 0 0 1-4.4 1.7h-.5a8.1 8.1 0 0 1-5.8-2.4 8.3 8.3 0 0 1 0-11.6l9.1-9.2a2.7 2.7 0 0 1 3.7 0m22.3-14.4a8.1 8.1 0 0 1 .7 10.8l-.2.2.2.2a8.1 8.1 0 0 1 1.7 4.4v.5a8.1 8.1 0 0 1-2.4 5.8 8.3 8.3 0 0 1-11.6 0l-9.2-9.1a2.7 2.7 0 0 1 0-3.7l9.2-9.1a8.3 8.3 0 0 1 11.6 0M19.7 21.1l9.2 9.1a2.7 2.7 0 0 1 0 3.7l-9.2 9.1a8.3 8.3 0 0 1-11.6 0 8.1 8.1 0 0 1-.7-10.8l.2-.2-.2-.2a8.1 8.1 0 0 1-1.7-4.4v-.5a8.1 8.1 0 0 1 2.4-5.8 8.3 8.3 0 0 1 11.6 0m17.8-15.8a8.1 8.1 0 0 1 5.8 2.4 8.3 8.3 0 0 1 0 11.6l-9.1 9.2a2.7 2.7 0 0 1-3.7 0l-9.1-9.2a8.3 8.3 0 0 1 0-11.6 8.1 8.1 0 0 1 10.8-.7l.2.2.2-.2a8.1 8.1 0 0 1 4.4-1.7z";

export type LogoMarkProps = {
  size?: number | string;
  iconSize?: number | string;
  className?: string;
  style?: CSSProperties;
};

export function LogoMark({
  size = 28,
  iconSize = "60%",
  className,
  style,
}: LogoMarkProps) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-[25%] bg-primary text-primary-foreground",
        className,
      )}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 64 64"
        style={{ width: iconSize, height: iconSize }}
      >
        <path fill="currentColor" d={BRAND_MARK_PATH} />
      </svg>
    </span>
  );
}
