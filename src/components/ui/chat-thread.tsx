"use client";

import { type FormEvent, type KeyboardEvent, useEffect, useId, useRef, useState } from "react";

import { IconInfoCircle, IconPaperclip, IconRefresh, IconSend, IconX } from "@tabler/icons-react";

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/composite-attachment";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { InputMention, type MentionOption, type MentionValue } from "@/components/ui/input-mention";
import { Message, MessageAvatar, MessageContent, MessageFooter, MessageHeader } from "@/components/ui/composite-message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
} from "@/components/ui/composite-message-scroller";
import { type Reaction, Reactions } from "@/components/ui/reactions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bubble, BubbleContent, bubbleVariantClass } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { getUserAvatar } from "@/data/user";
import { cn } from "@/lib/utils";

export type ChatParticipant = MentionOption;
export type ChatAttachment = { id: string; name: string; size: number };
export type ChatMessage = {
  id: string;
  authorId: string;
  text: string;
  createdAt: string;
  status: "sending" | "sent" | "failed";
  attachments: ChatAttachment[];
  reactions: Reaction[];
};
export type ChatDraft = { text: string; files: File[] };

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function dayKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function formatDay(date: Date) {
  const today = new Date();
  if (dayKey(today) === dayKey(date)) return "Today";
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (dayKey(yesterday) === dayKey(date)) return "Yesterday";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(date);
}

function formatTime(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function AttachmentList({ attachments }: { attachments: readonly ChatAttachment[] }) {
  if (!attachments.length) return null;
  return (
    <ul className="grid min-w-0 gap-1.5" aria-label="Message attachments">
      {attachments.map((attachment) => (
        <Attachment key={attachment.id} size="sm" className="w-full max-w-sm border-border/70 bg-background/60">
          <AttachmentMedia>
            <IconPaperclip aria-hidden="true" />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{attachment.name}</AttachmentTitle>
            <AttachmentDescription>{Math.max(1, Math.round(attachment.size / 1024))} KB</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      ))}
    </ul>
  );
}

export function ChatThread({
  participants,
  currentUserId,
  messages,
  defaultMessages = [],
  typingParticipantIds = [],
  readBy = {},
  onMessagesChange,
  onSend,
  onRetry,
  label = "Conversation",
  accept,
  className,
}: {
  participants: readonly ChatParticipant[];
  currentUserId: string;
  messages?: readonly ChatMessage[];
  defaultMessages?: readonly ChatMessage[];
  typingParticipantIds?: readonly string[];
  readBy?: Readonly<Record<string, string>>;
  onMessagesChange?: (messages: ChatMessage[]) => void;
  onSend?: (draft: ChatDraft) => void | Promise<void>;
  onRetry?: (message: ChatMessage, draft: ChatDraft) => void | Promise<void>;
  label?: string;
  accept?: string;
  className?: string;
}) {
  const id = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const failedDrafts = useRef(new Map<string, ChatDraft>());
  const [internalMessages, setInternalMessages] = useState<ChatMessage[]>(() => [...defaultMessages]);
  const [draftValue, setDraftValue] = useState<MentionValue>({
    text: "",
    mentions: [],
  });
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const currentMessages = messages ?? internalMessages;
  const messagesRef = useRef<readonly ChatMessage[]>(currentMessages);
  useEffect(() => {
    messagesRef.current = currentMessages;
  }, [currentMessages]);
  const people = participants.map(({ id: personId, name, description }) => ({
    id: personId,
    name,
    description,
  }));
  const typingNames = typingParticipantIds
    .filter((personId) => personId !== currentUserId)
    .map((personId) => participants.find((person) => person.id === personId)?.name)
    .filter((name): name is string => Boolean(name));

  function commit(next: ChatMessage[]) {
    messagesRef.current = next;
    if (messages === undefined) setInternalMessages(next);
    onMessagesChange?.(next);
  }

  function updateMessage(id: string, update: (message: ChatMessage) => ChatMessage) {
    commit(messagesRef.current.map((message) => (message.id === id ? update(message) : message)));
  }

  function updateReactions(id: string, reactions: Reaction[]) {
    updateMessage(id, (message) => ({ ...message, reactions }));
  }

  async function deliver(message: ChatMessage, body: ChatDraft, retrying = false) {
    const id = message.id;
    setSending(true);
    updateMessage(id, (item) => ({ ...item, status: "sending" }));
    setAnnouncement("Sending message.");
    try {
      if (retrying && onRetry) await onRetry(message, body);
      else await onSend?.(body);
      updateMessage(id, (item) => ({ ...item, status: "sent" }));
      failedDrafts.current.delete(id);
      setDraftValue({ text: "", mentions: [] });
      setFiles([]);
      setAnnouncement("Message sent.");
    } catch {
      updateMessage(id, (item) => ({ ...item, status: "failed" }));
      setAnnouncement("Message could not be sent. The draft is ready to retry.");
    } finally {
      setSending(false);
    }
  }

  function submit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (sending) return;
    const text = draftValue.text.trim();
    if (!text && !files.length) return;
    const createdAt = new Date().toISOString();
    const messageId = crypto.randomUUID();
    const body = { text, files: [...files] };
    const outgoing: ChatMessage = {
      id: messageId,
      authorId: currentUserId,
      text,
      createdAt,
      status: "sending",
      attachments: body.files.map((file, index) => ({
        id: `${messageId}-${index}`,
        name: file.name,
        size: file.size,
      })),
      reactions: [],
    };
    failedDrafts.current.set(messageId, body);
    commit([...currentMessages, outgoing]);
    void deliver(outgoing, body);
  }

  async function retry(message: ChatMessage) {
    const body = failedDrafts.current.get(message.id);
    if (!body || sending) return;
    await deliver(message, body, true);
  }

  function handleComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.nativeEvent.isComposing || event.keyCode === 229) return;
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  function addFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.currentTarget.files ?? []);
    if (selected.length) setFiles((current) => [...current, ...selected]);
    event.currentTarget.value = "";
  }

  function getReaders(messageId: string) {
    return participants.filter((person) => person.id !== currentUserId && readBy[person.id] === messageId);
  }

  return (
    <section
      data-slot="chat-thread"
      aria-label={label}
      className={cn(
        "flex min-h-[34rem] min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        className,
      )}
    >
      <header className="flex min-w-0 items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <AvatarGroup aria-hidden="true" className="shrink-0">
            {participants.slice(0, 3).map((person) => (
              <Avatar key={person.id} size="sm">
                <AvatarImage src={getUserAvatar(person.name)} alt="" />
                <AvatarFallback>{initials(person.name)}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold">{label}</h2>
            <p className="truncate text-xs text-muted-foreground">
              {participants.length} {participants.length === 1 ? "member" : "members"}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            aria-label="Conversation details"
            aria-expanded={detailsOpen}
            title="Conversation details"
            onClick={() => setDetailsOpen((open) => !open)}
          >
            <IconInfoCircle />
          </Button>
        </div>
      </header>
      {detailsOpen && (
        <div className="border-b border-border bg-muted/30 px-4 py-3 sm:px-5">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Participants</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {participants.map((person) => (
              <li key={person.id} className="flex items-center gap-2 text-sm">
                <Avatar size="xs">
                  <AvatarImage src={getUserAvatar(person.name)} alt="" />
                  <AvatarFallback>{initials(person.name)}</AvatarFallback>
                </Avatar>
                <span>{person.name}</span>
                {person.description && <span className="text-xs text-muted-foreground">{person.description}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
      <MessageScroller className="flex-1">
        <MessageScrollerViewport
          aria-label={label}
          className="max-h-[34rem] min-h-[22rem] px-4 py-5 sm:px-5"
          aria-live="polite"
        >
          <MessageScrollerContent className="gap-4">
            {currentMessages.map((message, index) => {
              const author = participants.find((person) => person.id === message.authorId);
              const authorName = author?.name ?? "Former member";
              const own = message.authorId === currentUserId;
              const timestamp = new Date(message.createdAt);
              const dateLabel = Number.isNaN(timestamp.valueOf()) ? "Earlier" : formatDay(timestamp);
              const previousMessage = currentMessages[index - 1];
              const previousTimestamp = previousMessage ? new Date(previousMessage.createdAt) : undefined;
              const previousDate =
                previousTimestamp && Number.isFinite(previousTimestamp.valueOf()) ? formatDay(previousTimestamp) : "";
              const dayChanged = dateLabel !== previousDate;
              const grouped =
                previousMessage?.authorId === message.authorId &&
                Number.isFinite(timestamp.valueOf()) &&
                Boolean(previousTimestamp && Number.isFinite(previousTimestamp.valueOf())) &&
                Boolean(previousTimestamp && timestamp.valueOf() - previousTimestamp.valueOf() >= 0) &&
                Boolean(previousTimestamp && timestamp.valueOf() - previousTimestamp.valueOf() <= 5 * 60 * 1000) &&
                !dayChanged;
              const readers = own ? getReaders(message.id) : [];
              const timeLabel = Number.isNaN(timestamp.valueOf()) ? message.createdAt : formatTime(timestamp);
              return (
                <MessageScrollerItem key={message.id} messageId={message.id} className="grid gap-1.5">
                  {dayChanged && (
                    <div className="flex items-center gap-3 py-1">
                      <span className="h-px flex-1 bg-border" />
                      <span className="text-xs text-muted-foreground">{dateLabel}</span>
                      <span className="h-px flex-1 bg-border" />
                    </div>
                  )}
                  <Message
                    align={own ? "end" : "start"}
                    aria-label={`${authorName}, ${timeLabel}`}
                    className="items-end gap-2"
                  >
                    <MessageAvatar className={cn(grouped && "invisible")}>
                      <Avatar size="sm">
                        <AvatarImage src={getUserAvatar(authorName)} alt="" />
                        <AvatarFallback>{initials(authorName)}</AvatarFallback>
                      </Avatar>
                    </MessageAvatar>
                    <MessageContent className={cn("min-w-0 gap-1", own && "items-end")}>
                      {!grouped && (
                        <MessageHeader className={cn("gap-2 px-1 text-xs text-muted-foreground", own && "justify-end")}>
                          <span className="font-medium text-foreground">{own ? "You" : authorName}</span>
                          <time dateTime={message.createdAt}>{timeLabel}</time>
                        </MessageHeader>
                      )}
                      <Bubble
                        align={own ? "end" : "start"}
                        variant={own ? "default" : "muted"}
                        aria-label={`${authorName}: ${message.text || "Attachment"}`}
                      >
                        <BubbleContent
                          className={cn(
                            bubbleVariantClass(own ? "default" : "muted"),
                            "max-w-[min(38rem,80vw)]",
                            grouped && "rounded-t-lg",
                          )}
                        >
                          {message.text && <p className="whitespace-pre-wrap break-words">{message.text}</p>}
                          <AttachmentList attachments={message.attachments} />
                        </BubbleContent>
                      </Bubble>
                      <MessageFooter className={cn("w-full flex-wrap gap-2 px-1", own && "justify-end")}>
                        <Reactions
                          label={`Reactions to ${authorName}'s message`}
                          reactions={message.reactions}
                          onReactionsChange={(reactions) => updateReactions(message.id, reactions)}
                          className="opacity-0 transition-opacity group-hover/message:opacity-100 focus-within:opacity-100"
                        />
                        {own && message.status === "sending" && (
                          <span className="text-xs text-muted-foreground" role="status">
                            Sending
                          </span>
                        )}
                        {own && message.status === "sent" && (
                          <span className="text-xs text-muted-foreground">Sent</span>
                        )}
                        {own && message.status === "failed" && (
                          <span className="flex flex-wrap items-center gap-2 text-xs text-destructive" role="alert">
                            Not sent
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => void retry(message)}
                              disabled={sending}
                            >
                              <IconRefresh />
                              Retry
                            </Button>
                          </span>
                        )}
                        {readers.length > 0 && (
                          <span className="flex items-center gap-2 text-xs text-muted-foreground">
                            Read by {readers.map((person) => person.name).join(", ")}
                            <AvatarGroup aria-hidden="true">
                              {readers.map((person) => (
                                <Avatar key={person.id} size="xs">
                                  <AvatarImage src={getUserAvatar(person.name)} alt="" />
                                  <AvatarFallback>{initials(person.name)}</AvatarFallback>
                                </Avatar>
                              ))}
                            </AvatarGroup>
                          </span>
                        )}
                      </MessageFooter>
                    </MessageContent>
                  </Message>
                </MessageScrollerItem>
              );
            })}
            {typingNames.length > 0 && (
              <p className="flex items-center gap-2 px-10 text-xs text-muted-foreground" role="status">
                <span
                  className="size-1.5 animate-pulse rounded-full bg-primary motion-reduce:animate-none"
                  aria-hidden="true"
                />
                {typingNames.join(", ")} {typingNames.length === 1 ? "is" : "are"} typing
              </p>
            )}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton direction="end" className="bottom-3" />
      </MessageScroller>
      <form onSubmit={submit} className="grid gap-2 border-t border-border p-3 sm:p-4">
        <InputMention
          id={`${id}-composer`}
          label="Message"
          value={draftValue}
          onChange={setDraftValue}
          onKeyDown={handleComposerKeyDown}
          people={people}
          placeholder="Write a message"
          description=""
          minRows={2}
          maxRows={6}
          disabled={sending}
          className="[&>label]:sr-only [&>p]:hidden"
        />
        {files.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Files to attach">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${file.lastModified}-${index}`}
                className="flex max-w-full items-center gap-1 rounded-lg border border-border bg-muted/60 px-2 py-1 text-xs"
              >
                <IconPaperclip className="size-3.5 shrink-0" />
                <span className="max-w-56 truncate">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))}
                >
                  <IconX />
                </Button>
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <input
            ref={fileInputRef}
            id={`${id}-attachments`}
            className="sr-only"
            type="file"
            multiple
            accept={accept}
            onChange={addFiles}
            disabled={sending}
          />
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              disabled={sending}
              aria-label="Attach files"
              title="Attach files"
              onClick={() => fileInputRef.current?.click()}
            >
              <IconPaperclip />
            </Button>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Enter to send · Shift+Enter for a new line
            </span>
          </div>
          <Button
            type="submit"
            size="icon-sm"
            disabled={sending || (!draftValue.text.trim() && !files.length)}
            aria-label={sending ? "Sending message" : "Send message"}
            title={sending ? "Sending message" : "Send message"}
          >
            <IconSend />
          </Button>
        </div>
      </form>
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </section>
  );
}
