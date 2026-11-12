"use client";

import * as React from "react";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type MentionKind = "person" | "channel";

export type Mention = {
  kind: MentionKind;
  id: string;
  label: string;
  start: number;
  end: number;
};

export type MentionValue = {
  text: string;
  mentions: Mention[];
};

export type MentionOption = {
  id: string;
  name: string;
  description?: string;
};

type InputMentionProps = {
  label: string;
  value?: MentionValue;
  defaultValue?: MentionValue;
  onChange?: (value: MentionValue) => void;
  onMentionAdd?: (mention: Mention) => void;
  people?: MentionOption[];
  channels?: MentionOption[];
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  minRows?: number;
  maxRows?: number;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  id?: string;
  className?: string;
};

type Trigger = {
  type: MentionKind;
  query: string;
  start: number;
  caret: number;
};

function findTrigger(text: string, caret: number): Trigger | null {
  const beforeCaret = text.slice(0, caret);
  const match = beforeCaret.match(/(^|\s|\(|\[|\{|["'“])([@#])([^\s@#]*)$/u);
  if (!match) return null;
  const start = caret - match[0].length + match[1].length;
  return {
    type: match[2] === "@" ? "person" : "channel",
    query: match[3],
    start,
    caret,
  };
}

function reconcileMentions(previousText: string, nextText: string, mentions: Mention[]) {
  let prefix = 0;
  while (prefix < previousText.length && prefix < nextText.length && previousText[prefix] === nextText[prefix])
    prefix += 1;
  let oldTail = previousText.length;
  let nextTail = nextText.length;
  while (oldTail > prefix && nextTail > prefix && previousText[oldTail - 1] === nextText[nextTail - 1]) {
    oldTail -= 1;
    nextTail -= 1;
  }
  const delta = nextTail - prefix - (oldTail - prefix);
  return mentions.flatMap((mention) => {
    if (mention.end <= prefix) return [mention];
    if (mention.start >= oldTail) return [{ ...mention, start: mention.start + delta, end: mention.end + delta }];
    return [];
  });
}

function InputMention({
  label,
  value,
  defaultValue = { text: "", mentions: [] },
  onChange,
  onMentionAdd,
  people = [],
  channels = [],
  description,
  placeholder = "Write a message…",
  disabled,
  minRows = 3,
  maxRows = 8,
  onKeyDown,
  id: providedId,
  className,
}: InputMentionProps) {
  const generatedId = React.useId();
  const id = providedId ?? generatedId;
  const descriptionId = `${id}-description`;
  const listId = `${id}-suggestions`;
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const pendingCaret = React.useRef<number | null>(null);
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [caret, setCaret] = React.useState(0);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [announcement, setAnnouncement] = React.useState("");
  const [dismissedTrigger, setDismissedTrigger] = React.useState<string | null>(null);
  const currentValue = value ?? internalValue;
  const trigger = findTrigger(currentValue.text, caret);
  const triggerKey = trigger ? `${trigger.type}:${trigger.start}:${trigger.caret}:${trigger.query}` : null;
  const activeTrigger = triggerKey && triggerKey !== dismissedTrigger ? trigger : null;
  const sourceOptions = activeTrigger?.type === "person" ? people : channels;
  const suggestions = activeTrigger
    ? sourceOptions.filter((option) =>
        `${option.name} ${option.description ?? ""}`
          .toLocaleLowerCase()
          .includes(activeTrigger.query.toLocaleLowerCase()),
      )
    : [];

  React.useEffect(() => {
    if (pendingCaret.current === null) return;
    const position = pendingCaret.current;
    pendingCaret.current = null;
    inputRef.current?.setSelectionRange(position, position);
    setCaret(position);
  });

  function emit(next: MentionValue) {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const nextText = event.currentTarget.value;
    const nextCaret = event.currentTarget.selectionStart;
    const nextMentions = reconcileMentions(currentValue.text, nextText, currentValue.mentions);
    emit({ text: nextText, mentions: nextMentions });
    setCaret(nextCaret);
    setActiveIndex(0);
    setAnnouncement("");
    setDismissedTrigger(null);
  }

  function choose(option: MentionOption) {
    if (!activeTrigger) return;
    const marker = activeTrigger.type === "person" ? "@" : "#";
    const inserted = `${marker}${option.name}`;
    const nextText = `${currentValue.text.slice(0, activeTrigger.start)}${inserted}${currentValue.text.slice(activeTrigger.caret)}`;
    const delta = inserted.length - (activeTrigger.caret - activeTrigger.start);
    const nextMentions = currentValue.mentions
      .filter((mention) => mention.end <= activeTrigger.start || mention.start >= activeTrigger.caret)
      .map((mention) =>
        mention.start >= activeTrigger.caret
          ? {
              ...mention,
              start: mention.start + delta,
              end: mention.end + delta,
            }
          : mention,
      );
    const mention: Mention = {
      kind: activeTrigger.type,
      id: option.id,
      label: option.name,
      start: activeTrigger.start,
      end: activeTrigger.start + inserted.length,
    };
    nextMentions.push(mention);
    nextMentions.sort((first, second) => first.start - second.start);
    pendingCaret.current = mention.end;
    emit({ text: nextText, mentions: nextMentions });
    setAnnouncement(`${option.name} added as a ${activeTrigger.type} mention.`);
    onMentionAdd?.(mention);
  }

  function removeMention(mention: Mention) {
    const nextText = `${currentValue.text.slice(0, mention.start)}${currentValue.text.slice(mention.end)}`;
    const removedLength = mention.end - mention.start;
    const nextMentions = currentValue.mentions
      .filter((item) => item !== mention)
      .map((item) =>
        item.start > mention.start
          ? {
              ...item,
              start: item.start - removedLength,
              end: item.end - removedLength,
            }
          : item,
      );
    pendingCaret.current = mention.start;
    emit({ text: nextText, mentions: nextMentions });
    setAnnouncement(`${mention.label} mention removed.`);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (activeTrigger && suggestions.length > 0 && event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % suggestions.length);
    } else if (activeTrigger && suggestions.length > 0 && event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + suggestions.length) % suggestions.length);
    } else if (activeTrigger && suggestions.length > 0 && (event.key === "Enter" || event.key === "Tab")) {
      event.preventDefault();
      choose(suggestions[activeIndex] ?? suggestions[0]);
    } else if (activeTrigger && event.key === "Escape") {
      setDismissedTrigger(triggerKey);
    } else if (event.currentTarget.selectionStart === event.currentTarget.selectionEnd) {
      const position = event.currentTarget.selectionStart;
      const backspaceMention =
        event.key === "Backspace" && currentValue.mentions.find((mention) => mention.end === position);
      const deleteMention =
        event.key === "Delete" && currentValue.mentions.find((mention) => mention.start === position);
      const adjacentMention = backspaceMention || deleteMention;
      if (adjacentMention) {
        event.preventDefault();
        removeMention(adjacentMention);
      } else if (event.key === "ArrowLeft") {
        const mention = currentValue.mentions.find((item) => item.end === position);
        if (mention) {
          event.preventDefault();
          inputRef.current?.setSelectionRange(mention.start, mention.start);
          setCaret(mention.start);
        }
      } else if (event.key === "ArrowRight") {
        const mention = currentValue.mentions.find((item) => item.start === position);
        if (mention) {
          event.preventDefault();
          inputRef.current?.setSelectionRange(mention.end, mention.end);
          setCaret(mention.end);
        }
      }
    }
    if (!event.defaultPrevented) onKeyDown?.(event);
  }

  function updateCaret(event: React.SyntheticEvent<HTMLTextAreaElement>) {
    setCaret(event.currentTarget.selectionStart);
  }

  const activeOptionId = suggestions[activeIndex] ? `${listId}-option-${activeIndex}` : undefined;

  return (
    <div className={cn("grid min-w-0 gap-2", className)}>
      <Label htmlFor={id} isDisabled={disabled}>
        {label}
      </Label>
      <div className="relative">
        <Textarea
          ref={inputRef}
          id={id}
          value={currentValue.text}
          disabled={disabled}
          placeholder={placeholder}
          rows={minRows}
          maxRows={maxRows}
          autoResize
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={Boolean(activeTrigger && suggestions.length > 0)}
          aria-controls={listId}
          aria-activedescendant={activeOptionId}
          aria-describedby={description ? descriptionId : undefined}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onKeyUp={updateCaret}
          onClick={updateCaret}
          onSelect={updateCaret}
        />
        {activeTrigger && suggestions.length > 0 && (
          <div className="absolute inset-x-0 bottom-0 z-20 translate-y-full overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
            <div
              id={listId}
              role="listbox"
              aria-label={activeTrigger.type === "person" ? "People" : "Channels"}
              className="max-h-52 overflow-y-auto"
            >
              {suggestions.map((option, index) => (
                <button
                  id={`${listId}-option-${index}`}
                  key={option.id}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choose(option)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-sm px-2 py-2 text-left text-sm outline-none",
                    index === activeIndex ? "bg-accent text-accent-foreground" : "hover:bg-accent/60",
                  )}
                >
                  <span
                    className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground"
                    aria-hidden="true"
                  >
                    {option.name
                      .split(/\s+/)
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{option.name}</span>
                  {option.description && (
                    <span className="truncate text-xs text-muted-foreground">{option.description}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {description && (
        <p id={descriptionId} className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
      <p role="status" aria-live="polite" className="sr-only">
        {activeTrigger
          ? `${suggestions.length} ${activeTrigger.type === "person" ? "people" : "channels"} available.`
          : announcement}
      </p>
    </div>
  );
}

export { InputMention, type InputMentionProps };
