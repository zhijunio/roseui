"use client";

import { IconChevronDown } from "@tabler/icons-react";

import { ButtonGroup } from "@/components/ui/composite-button-group";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            size="icon"
            aria-label={`${label} options`}
            aria-haspopup="menu"
            disabled={disabled}
          >
            <IconChevronDown aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {options.map((option) => (
            <DropdownMenuItem key={option.id} disabled={option.disabled} onSelect={() => onOptionSelect(option)}>
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
