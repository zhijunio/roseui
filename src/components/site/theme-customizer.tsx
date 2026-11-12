"use client";

import * as React from "react";

import { Palette } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  CONTENT_LAYOUT_OPTIONS,
  DEFAULT_THEME_MODE,
  FONT_OPTIONS,
  isContentLayout,
  isFont,
  isNavbarStyle,
  isSidebarCollapsible,
  isSidebarVariant,
  isThemeColor,
  isThemeMode,
  NAVBAR_STYLE_OPTIONS,
  SIDEBAR_COLLAPSIBLE_OPTIONS,
  SIDEBAR_VARIANT_OPTIONS,
  THEME_COLOR_OPTIONS,
  THEME_MODE_OPTIONS,
} from "@/data/theme";
import { cn } from "@/lib/utils";

import { useThemePreferences } from "./theme-preferences";

export function ThemeCustomizer() {
  const { theme, setTheme } = useTheme();
  const { preferences, resetPreferences, setPreference } = useThemePreferences();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const themeMode = mounted && isThemeMode(theme) ? theme : DEFAULT_THEME_MODE;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" size="icon-sm" aria-label="Open layout and theme preferences">
          <Palette />
          <span className="sr-only">Customize theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="flex flex-col gap-5">
          <div className="space-y-1.5">
            <h4 className="text-sm leading-none font-medium">Preferences</h4>
          </div>

          <div className="space-y-3 [&_[data-slot=toggle-group-item]]:flex-1 [&_[data-slot=toggle-group-item]]:text-xs [&_[data-slot=toggle-group]]:w-full">
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Theme color</Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
                {THEME_COLOR_OPTIONS.map((color) => {
                  const isSelected = preferences.themeColor === color.value;

                  return (
                    <button
                      key={color.value}
                      type="button"
                      aria-label={`Theme color: ${color.label}`}
                      aria-pressed={isSelected}
                      onClick={() => {
                        if (isThemeColor(color.value)) setPreference("themeColor", color.value);
                      }}
                      className={cn(
                        "flex items-center gap-2 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors",
                        isSelected
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground hover:bg-accent",
                      )}
                    >
                      <span
                        className="border-foreground/15 size-4 shrink-0 rounded-full border"
                        style={{ backgroundColor: color.swatch }}
                      />
                      <span className="truncate">{color.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <PreferenceToggle
              label="Theme mode"
              value={themeMode}
              options={THEME_MODE_OPTIONS}
              onValueChange={(value) => {
                if (isThemeMode(value)) setTheme(value);
              }}
            />
            <PreferenceToggle
              label="Font"
              value={preferences.font}
              options={FONT_OPTIONS}
              layout="grid"
              onValueChange={(value) => {
                if (isFont(value)) setPreference("font", value);
              }}
            />
            <PreferenceToggle
              label="Page layout"
              value={preferences.contentLayout}
              options={CONTENT_LAYOUT_OPTIONS}
              onValueChange={(value) => {
                if (isContentLayout(value)) setPreference("contentLayout", value);
              }}
            />
            <PreferenceToggle
              label="Navbar behavior"
              value={preferences.navbarStyle}
              options={NAVBAR_STYLE_OPTIONS}
              onValueChange={(value) => {
                if (isNavbarStyle(value)) setPreference("navbarStyle", value);
              }}
            />
            <PreferenceToggle
              label="Sidebar style"
              value={preferences.sidebarVariant}
              options={SIDEBAR_VARIANT_OPTIONS}
              onValueChange={(value) => {
                if (isSidebarVariant(value)) setPreference("sidebarVariant", value);
              }}
            />
            <PreferenceToggle
              label="Sidebar collapse"
              value={preferences.sidebarCollapsible}
              options={SIDEBAR_COLLAPSIBLE_OPTIONS}
              onValueChange={(value) => {
                if (isSidebarCollapsible(value)) setPreference("sidebarCollapsible", value);
              }}
            />

            <Button type="button" size="sm" variant="outline" className="w-full text-xs" onClick={resetPreferences}>
              Restore defaults
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function PreferenceToggle<T extends string>({
  label,
  options,
  value,
  layout = "segmented",
  onValueChange,
}: {
  label: string;
  options: readonly { label: string; value: T }[];
  value: T;
  layout?: "segmented" | "grid";
  onValueChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium">{label}</Label>
      <ToggleGroup
        type="single"
        size="sm"
        spacing={layout === "grid" ? 1 : 0}
        variant="outline"
        value={value}
        onValueChange={onValueChange}
        className={cn(layout === "grid" && "grid grid-cols-2 gap-1")}
      >
        {options.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value} aria-label={`${label}: ${option.label}`}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
