"use client";
import { type FormEvent, useState } from "react";

import { IconBulb, IconPencil } from "@tabler/icons-react";

import { ComponentPreview } from "@/components/examples/component-preview";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function TextareaExamples() {
  const [bio, setBio] = useState("Design engineer. I build dashboards for a living.");
  const [reply, setReply] = useState("");
  const [replyStatus, setReplyStatus] = useState("");

  function submitReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reply.trim()) return;

    setReplyStatus("Reply posted.");
    setReply("");
  }

  return (
    <>
      <ComponentPreview title="Textarea Sizes" span={2} layout="panel">
        <div className="grid w-full max-w-3xl gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="notes">Description</Label>
            <Textarea id="notes" rows={3} autoResize={false} placeholder="Tell us about this workspace" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="short-notes">Description</Label>
            <Textarea
              id="short-notes"
              size="sm"
              rows={3}
              autoResize={false}
              placeholder="Tell us about this workspace"
            />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Icon Adornments" span={2} layout="panel">
        <div className="grid w-full max-w-3xl gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="note-with-icon">Note</Label>
            <div className="relative">
              <IconPencil
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground"
              />
              <Textarea
                id="note-with-icon"
                rows={3}
                autoResize={false}
                className="pl-9"
                placeholder="Write a private note"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="idea-with-icon">Idea</Label>
            <div className="relative">
              <IconBulb
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-3 size-4 text-muted-foreground"
              />
              <Textarea
                id="idea-with-icon"
                rows={3}
                autoResize={false}
                className="pr-9"
                placeholder="Describe your idea"
              />
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Auto Resize">
        <div className="grid w-full max-w-md gap-2">
          <Label htmlFor="release-notes">Message</Label>
          <Textarea
            id="release-notes"
            rows={2}
            maxRows={8}
            autoResize
            placeholder="Write as much as you need"
            aria-describedby="release-notes-hint"
          />
          <p id="release-notes-hint" className="text-xs text-muted-foreground">
            The field grows to eight lines, then scrolls.
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Character Count">
        <div className="grid w-full max-w-md gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            rows={3}
            value={bio}
            maxLength={160}
            onChange={(event) => setBio(event.currentTarget.value)}
            placeholder="Write a short bio"
          />
          <div className="flex justify-between gap-4 text-xs text-muted-foreground">
            <span>Appears on your public profile.</span>
            <span className="shrink-0 tabular-nums">{bio.length}/160</span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Required Empty Field">
        <div className="grid w-full max-w-md gap-2">
          <Label htmlFor="cover-letter-empty">
            Cover letter{" "}
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
          </Label>
          <Textarea id="cover-letter-empty" rows={3} required placeholder="Why are you a good fit?" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Filled Field with Hint">
        <div className="grid w-full max-w-md gap-2">
          <Label htmlFor="cover-letter-filled">
            Cover letter{" "}
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
          </Label>
          <Textarea
            id="cover-letter-filled"
            rows={3}
            required
            defaultValue="I have shipped design systems for six years."
            aria-describedby="cover-letter-filled-hint"
          />
          <p id="cover-letter-filled-hint" className="text-xs text-muted-foreground">
            This is a hint about this field.
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Optional Notes">
        <div className="grid w-full max-w-md gap-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="optional-notes">Additional notes</Label>
            <span className="text-xs text-muted-foreground">Optional</span>
          </div>
          <Textarea
            id="optional-notes"
            rows={3}
            placeholder="Add details if they help"
            aria-describedby="optional-notes-hint"
          />
          <p id="optional-notes-hint" className="text-xs text-muted-foreground">
            Share context that may help the team review your request.
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Disabled Textarea">
        <div className="grid w-full max-w-md gap-2">
          <Label htmlFor="disabled-textarea">
            Cover letter{" "}
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
          </Label>
          <Textarea
            id="disabled-textarea"
            rows={3}
            required
            disabled
            placeholder="Why are you a good fit?"
            aria-describedby="disabled-textarea-hint"
          />
          <p id="disabled-textarea-hint" className="text-xs text-muted-foreground">
            This is a hint about this field.
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Invalid Textarea">
        <div className="grid w-full max-w-md gap-2">
          <Label htmlFor="invalid-textarea">
            Cover letter{" "}
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
          </Label>
          <Textarea
            id="invalid-textarea"
            rows={3}
            required
            aria-invalid
            defaultValue="Too short."
            aria-describedby="invalid-textarea-hint"
          />
          <p id="invalid-textarea-hint" className="text-xs text-destructive">
            Please write at least 200 characters.
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Read-only Textarea">
        <div className="grid w-full max-w-md gap-2">
          <Label htmlFor="published-summary">Published summary</Label>
          <Textarea
            id="published-summary"
            rows={3}
            readOnly
            defaultValue="This summary has been published and can no longer be edited."
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Reply Composer">
        <form className="grid w-full max-w-md gap-2" onSubmit={submitReply}>
          <Label htmlFor="textarea-reply">Reply</Label>
          <Textarea
            id="textarea-reply"
            rows={3}
            maxLength={500}
            required
            value={reply}
            onChange={(event) => setReply(event.currentTarget.value)}
            placeholder="Write your reply"
            aria-describedby="textarea-reply-hint textarea-reply-status"
          />
          <div className="flex items-center justify-between gap-3">
            <p id="textarea-reply-hint" className="text-xs text-muted-foreground">
              Up to 500 characters.
            </p>
            <Button type="submit" size="sm" disabled={!reply.trim()}>
              Post reply
            </Button>
          </div>
          <p
            id="textarea-reply-status"
            role="status"
            aria-live="polite"
            className="min-h-4 text-xs text-muted-foreground"
          >
            {replyStatus}
          </p>
        </form>
      </ComponentPreview>
    </>
  );
}
