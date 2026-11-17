"use client";

import { ChevronDown as IconChevronDown } from "lucide-react";

import { Menu, MenuItem, MenuTrigger } from "@/components/roseui/menu";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export type SplitButtonOption = {
  id: string;
  label: string;
  disabled?: boolean;
};

export function SplitButton({
  label,
  options,
  onAction,
  onOptionSelect,
  disabled = false,
}: {
  label: string;
  options: readonly SplitButtonOption[];
  onAction: () => void;
  onOptionSelect: (option: SplitButtonOption) => void;
  disabled?: boolean;
}) {
  return (
    <ButtonGroup aria-label={`${label} actions`}>
      <Button onClick={onAction} disabled={disabled}>
        {label}
      </Button>
      <MenuTrigger>
        <Button variant="default" size="icon" aria-label={`${label} options`} aria-haspopup="menu" disabled={disabled}>
          <IconChevronDown aria-hidden="true" />
        </Button>

        <Menu side="bottom" align="end">
          {options.map((option) => (
            <MenuItem key={option.id} disabled={option.disabled} onSelect={() => onOptionSelect(option)}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </MenuTrigger>
    </ButtonGroup>
  );
}
