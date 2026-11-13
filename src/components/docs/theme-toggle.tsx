"use client";

import * as React from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Focusable } from "react-aria-components/Focusable";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <TooltipTrigger delay={0}>
      <Focusable>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={label}
          onPress={() => setTheme(isDark ? "light" : "dark")}
        >
          {isDark ? <Sun /> : <Moon />}
          <span className="sr-only">{label}</span>
        </Button>
      </Focusable>
      <Tooltip>{label}</Tooltip>
    </TooltipTrigger>
  );
}
