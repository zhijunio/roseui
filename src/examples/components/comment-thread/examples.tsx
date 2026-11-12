"use client";

import * as React from "react";

import { CommentThread, type ThreadComment } from "@/components/ui/comment-thread";
import { ComponentPreview } from "@/examples/component-preview";

const authors = [
  { id: "mina", name: "Mina Patel", description: "Workspace admin" },
  { id: "riley", name: "Riley Park", description: "Operations lead" },
  { id: "jamie", name: "Jamie Chen", description: "Product manager" },
];

const firstText = "The access review is ready for a second pass from @Riley Park.";
const comments: ThreadComment[] = [
  {
    id: "comment-1",
    authorId: "riley",
    body: {
      text: firstText,
      mentions: [
        {
          kind: "person",
          id: "riley",
          label: "Riley Park",
          start: firstText.indexOf("@Riley Park"),
          end: firstText.indexOf("@Riley Park") + "@Riley Park".length,
        },
      ],
    },
    createdAt: "2026-11-10T08:42:00.000Z",
    reactions: [{ emoji: "👍", label: "Thumbs up", count: 2 }],
    replies: [
      {
        id: "comment-2",
        authorId: "mina",
        body: { text: "I checked the role changes and added the missing owner note.", mentions: [] },
        createdAt: "2026-11-10T09:05:00.000Z",
        reactions: [],
        replies: [],
      },
    ],
  },
];

export function CommentThreadExamples() {
  const [currentComments, setCurrentComments] = React.useState(comments);

  return (
    <div className="grid min-w-0 items-start gap-5 xl:grid-cols-2 [&>*]:min-w-0">
      <ComponentPreview title="Project review" layout="panel" span={2}>
        <div className="w-full max-w-3xl">
          <CommentThread
            authors={authors}
            currentUserId="mina"
            comments={currentComments}
            onCommentsChange={setCurrentComments}
            label="Project review comments"
          />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Empty discussion">
        <div className="w-full max-w-xl">
          <CommentThread authors={authors} currentUserId="jamie" label="Empty discussion" />
        </div>
      </ComponentPreview>
    </div>
  );
}
