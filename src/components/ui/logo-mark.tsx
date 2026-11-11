import { IconCloverFilled } from "@tabler/icons-react";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

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
        "grid shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground",
        className,
      )}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    >
      <IconCloverFilled style={{ width: iconSize, height: iconSize }} />
    </span>
  );
}
