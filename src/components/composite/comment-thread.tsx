"use client";

import { useId, useState } from "react";
import {
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconX,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  InputMention,
  type MentionOption,
  type MentionValue,
} from "@/components/composite/input-mention";
import { Reactions, type Reaction } from "@/components/composite/reactions";
import { cn } from "@/lib/utils";
import { getPersonAvatar } from "@/data/avatar-data";

export type ThreadAuthor = MentionOption;

export type ThreadComment = {
  id: string;
  authorId: string;
  body: MentionValue;
  createdAt: string;
  edited?: boolean;
  resolved?: boolean;
  reactions: Reaction[];
  replies: ThreadComment[];
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function updateCommentTree(
  comments: readonly ThreadComment[],
  id: string,
  update: (comment: ThreadComment) => ThreadComment,
): ThreadComment[] {
  return comments.map((comment) =>
    comment.id === id
      ? update(comment)
      : { ...comment, replies: updateCommentTree(comment.replies, id, update) },
  );
}

function removeCommentTree(
  comments: readonly ThreadComment[],
  id: string,
): ThreadComment[] {
  return comments
    .filter((comment) => comment.id !== id)
    .map((comment) => ({
      ...comment,
      replies: removeCommentTree(comment.replies, id),
    }));
}

function countComments(comments: readonly ThreadComment[]): number {
  return comments.reduce(
    (total, comment) => total + 1 + countComments(comment.replies),
    0,
  );
}

function formatCommentTime(date: Date, fallback: string) {
  if (Number.isNaN(date.valueOf())) return fallback;
  const elapsed = Math.max(0, Date.now() - date.valueOf());
  const minutes = Math.floor(elapsed / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function CommentComposer({
  id,
  value,
  people,
  placeholder,
  submitLabel,
  onChange,
  onSubmit,
  onCancel,
}: {
  id: string;
  value: MentionValue;
  people: readonly MentionOption[];
  placeholder: string;
  submitLabel: string;
  onChange: (value: MentionValue) => void;
  onSubmit: () => void;
  onCancel?: () => void;
}) {
  return (
    <div className="grid min-w-0 gap-3">
      <InputMention
        id={id}
        label={placeholder}
        value={value}
        onChange={onChange}
        people={[...people]}
        placeholder={placeholder}
        minRows={2}
        maxRows={6}
      />
      <div className="flex flex-wrap justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            <IconX />
            Cancel
          </Button>
        )}
        <Button
          type="button"
          size="sm"
          onClick={onSubmit}
          disabled={!value.text.trim()}
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}

export function CommentThread({
  authors,
  currentUserId,
  comments,
  defaultComments = [],
  onCommentsChange,
  label = "Comments",
  className,
}: {
  authors: readonly ThreadAuthor[];
  currentUserId: string;
  comments?: readonly ThreadComment[];
  defaultComments?: readonly ThreadComment[];
  onCommentsChange?: (comments: ThreadComment[]) => void;
  label?: string;
  className?: string;
}) {
  const generatedId = useId();
  const [internalComments, setInternalComments] = useState<ThreadComment[]>(
    () => [...defaultComments],
  );
  const [replyingTo, setReplyingTo] = useState<string | null | undefined>(
    undefined,
  );
  const [composerValue, setComposerValue] = useState<MentionValue>({
    text: "",
    mentions: [],
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<MentionValue>({
    text: "",
    mentions: [],
  });
  const [announcement, setAnnouncement] = useState("");
  const [threadResolved, setThreadResolved] = useState(false);
  const [collapsedReplies, setCollapsedReplies] = useState<
    Record<string, boolean>
  >({});
  const currentComments = comments ?? internalComments;
  const people = authors.map(({ id, name, description }) => ({
    id,
    name,
    description,
  }));

  function commit(next: ThreadComment[]) {
    if (comments === undefined) setInternalComments(next);
    onCommentsChange?.(next);
  }

  function addComment(targetId: string | null) {
    const text = composerValue.text.trim();
    if (!text) return;
    const nextComment: ThreadComment = {
      id: crypto.randomUUID(),
      authorId: currentUserId,
      body: composerValue,
      createdAt: new Date().toISOString(),
      reactions: [],
      replies: [],
    };
    const next =
      targetId === null
        ? [...currentComments, nextComment]
        : updateCommentTree(currentComments, targetId, (comment) => ({
            ...comment,
            replies: [...comment.replies, nextComment],
          }));
    commit(next);
    setComposerValue({ text: "", mentions: [] });
    setAnnouncement(targetId === null ? "Comment added." : "Reply added.");
  }

  function updateBody(id: string, body: MentionValue) {
    commit(
      updateCommentTree(currentComments, id, (comment) => ({
        ...comment,
        body,
        edited: true,
      })),
    );
    setEditingId(null);
    setAnnouncement("Comment updated.");
  }

  function removeComment(id: string) {
    commit(removeCommentTree(currentComments, id));
    setAnnouncement("Comment deleted.");
  }

  function setCommentReactions(id: string, reactions: Reaction[]) {
    commit(
      updateCommentTree(currentComments, id, (comment) => ({
        ...comment,
        reactions,
      })),
    );
  }

  function renderComment(comment: ThreadComment, depth = 0) {
    const author = authors.find((item) => item.id === comment.authorId);
    const authorName = author?.name ?? "Former member";
    const isEditing = editingId === comment.id;
    const canEdit = comment.authorId === currentUserId;
    const date = new Date(comment.createdAt);
    const hasReplies = comment.replies.length > 0;
    const repliesCollapsed = Boolean(collapsedReplies[comment.id]);
    return (
      <li
        key={comment.id}
        className={cn(
          "min-w-0",
          depth > 0 &&
            "relative ml-6 border-l border-border pl-3 sm:ml-8 sm:pl-4",
        )}
      >
        <article
          aria-label={`Comment by ${authorName}`}
          className="group flex min-w-0 gap-2.5 rounded-xl px-2.5 py-2.5 transition-colors hover:bg-muted/40"
        >
          <Avatar size="sm" aria-hidden="true" className="mt-0.5 shrink-0">
            <AvatarImage src={getPersonAvatar(authorName)} alt="" />
            <AvatarFallback>{initials(authorName)}</AvatarFallback>
          </Avatar>
          <div className="grid min-w-0 flex-1 gap-1">
            <header className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="truncate text-sm font-medium">{authorName}</span>
              {comment.authorId === currentUserId && (
                <span className="text-xs text-muted-foreground">You</span>
              )}
              <time
                className="text-xs text-muted-foreground"
                dateTime={comment.createdAt}
              >
                {formatCommentTime(date, comment.createdAt)}
              </time>
              {comment.edited && (
                <span className="text-xs text-muted-foreground">Edited</span>
              )}
              {comment.resolved && <Badge variant="outline">Resolved</Badge>}
            </header>
            {isEditing ? (
              <div className="grid min-w-0 gap-3">
                <InputMention
                  id={`${generatedId}-edit-${comment.id}`}
                  label="Edit comment"
                  value={editValue}
                  onChange={setEditValue}
                  people={people}
                  minRows={2}
                  maxRows={6}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingId(null)}
                  >
                    <IconX />
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => updateBody(comment.id, editValue)}
                    disabled={!editValue.text.trim()}
                  >
                    <IconCheck />
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <p className="whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground">
                {comment.body.text}
              </p>
            )}
            {!isEditing && (
              <>
                <div className="flex min-h-7 flex-wrap items-center gap-1">
                  <Reactions
                    label={`Reactions to ${authorName}'s comment`}
                    reactions={comment.reactions}
                    onReactionsChange={(reactions) =>
                      setCommentReactions(comment.id, reactions)
                    }
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-7 rounded-full px-2 text-xs text-muted-foreground sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                    onClick={() => {
                      setReplyingTo(comment.id);
                      setComposerValue({ text: "", mentions: [] });
                    }}
                  >
                    Reply
                  </Button>
                  {canEdit && (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="h-7 rounded-full px-2 text-xs text-muted-foreground sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                      onClick={() => {
                        setEditingId(comment.id);
                        setEditValue(comment.body);
                      }}
                    >
                      Edit
                    </Button>
                  )}
                  {canEdit && (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="h-7 rounded-full px-2 text-xs text-muted-foreground sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                      onClick={() => removeComment(comment.id)}
                    >
                      Delete
                    </Button>
                  )}
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-7 rounded-full px-2 text-xs text-muted-foreground sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
                    aria-pressed={Boolean(comment.resolved)}
                    onClick={() => {
                      commit(
                        updateCommentTree(
                          currentComments,
                          comment.id,
                          (item) => ({ ...item, resolved: !item.resolved }),
                        ),
                      );
                      setAnnouncement(
                        comment.resolved
                          ? "Comment reopened."
                          : "Comment resolved.",
                      );
                    }}
                  >
                    {comment.resolved ? "Reopen" : "Resolve"}
                  </Button>
                </div>
              </>
            )}
            {replyingTo === comment.id && (
              <div className="rounded-xl border border-border/70 bg-muted/30 p-2.5">
                <CommentComposer
                  id={`${generatedId}-reply-${comment.id}`}
                  value={composerValue}
                  people={people}
                  placeholder={`Reply to ${authorName}`}
                  submitLabel="Post reply"
                  onChange={setComposerValue}
                  onSubmit={() => addComment(comment.id)}
                  onCancel={() => setReplyingTo(undefined)}
                />
              </div>
            )}
          </div>
        </article>
        {hasReplies && (
          <>
            <button
              type="button"
              className="ml-8 inline-flex h-7 items-center gap-1 rounded-full px-2 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() =>
                setCollapsedReplies((current) => ({
                  ...current,
                  [comment.id]: !current[comment.id],
                }))
              }
              aria-expanded={!repliesCollapsed}
            >
              {repliesCollapsed ? (
                <IconChevronRight className="size-3.5" />
              ) : (
                <IconChevronDown className="size-3.5" />
              )}
              {repliesCollapsed
                ? `Show ${comment.replies.length} ${comment.replies.length === 1 ? "reply" : "replies"}`
                : "Hide replies"}
            </button>
            {!repliesCollapsed && (
              <ol className="grid min-w-0 gap-1">
                {comment.replies.map((reply) =>
                  renderComment(reply, depth + 1),
                )}
              </ol>
            )}
          </>
        )}
      </li>
    );
  }

  return (
    <section
      aria-label={label}
      data-slot="comment-thread"
      className={cn(
        "min-w-0 overflow-hidden rounded-xl border border-border bg-card text-card-foreground",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="grid min-w-0">
          <h3 className="truncate text-sm font-medium">{label}</h3>
          <span className="text-xs tabular-nums text-muted-foreground">
            {countComments(currentComments)}{" "}
            {countComments(currentComments) === 1 ? "comment" : "comments"}
          </span>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-8 shrink-0 rounded-full px-3 text-xs"
          onClick={() => setThreadResolved((resolved) => !resolved)}
        >
          <IconCheck className="text-emerald-600" />
          {threadResolved ? "Reopen" : "Resolve"}
        </Button>
      </header>
      {threadResolved ? (
        <div className="flex items-center gap-2 border-t px-4 py-4 text-sm text-muted-foreground">
          <IconCheck className="size-4 text-emerald-600" />
          Discussion resolved
        </div>
      ) : (
        <>
          <ol
            className="grid min-w-0 gap-1 px-2 pb-2"
            aria-label={`${label} list`}
          >
            {currentComments.map((comment) => renderComment(comment))}
          </ol>
          {!currentComments.length && (
            <p className="border-t px-4 py-4 text-sm text-muted-foreground">
              No comments yet. Start the discussion.
            </p>
          )}
          {replyingTo === undefined && (
            <div className="border-t bg-muted/20 p-3 sm:p-4">
              <CommentComposer
                id={`${generatedId}-new`}
                value={composerValue}
                people={people}
                placeholder="Reply, or @mention someone"
                submitLabel="Send"
                onChange={setComposerValue}
                onSubmit={() => addComment(null)}
              />
            </div>
          )}
        </>
      )}
      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>
    </section>
  );
}
