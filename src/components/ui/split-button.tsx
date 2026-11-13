"use client";

import { ChevronDown as IconChevronDown } from "lucide-react";

import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import {
  MenuTrigger,
  Menu,
  MenuItem,
} from "@/components/ui/menu";

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
      <Button onPress={onAction} isDisabled={disabled}>
        {label}
      </Button>
      <MenuTrigger>

          <Button
            variant="default"
            size="icon"
            aria-label={`${label} options`}
            aria-haspopup="menu"
            isDisabled={disabled}
          >
            <IconChevronDown aria-hidden="true" />
          </Button>

        <Menu placement="bottom end">
          {options.map((option) => (
            <MenuItem key={option.id} isDisabled={option.disabled} onAction={() => onOptionSelect(option)}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </MenuTrigger>
    </ButtonGroup>
  );
}
