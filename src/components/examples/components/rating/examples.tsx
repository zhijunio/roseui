"use client";
import { type FormEvent, useState } from "react";

import { IconHeart, IconStar } from "@tabler/icons-react";

import { Rating } from "@/components/composite/rating";
import { ComponentPreview } from "@/components/examples/component-preview";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const distribution = [
  { stars: 5, count: 124, percentage: 62 },
  { stars: 4, count: 45, percentage: 22 },
  { stars: 3, count: 18, percentage: 9 },
  { stars: 2, count: 8, percentage: 4 },
  { stars: 1, count: 5, percentage: 3 },
];

const reactions = [
  { value: 1, emoji: "😞", label: "Needs improvement" },
  { value: 2, emoji: "😕", label: "Below expectations" },
  { value: 3, emoji: "😐", label: "Meets expectations" },
  { value: 4, emoji: "😊", label: "Good" },
  { value: 5, emoji: "🤩", label: "Excellent" },
];

function EditableRatingExample() {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex flex-col items-center gap-3">
      <Rating rating={rating} editable onRatingChange={setRating} showValue />
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {rating > 0 ? `Your rating: ${rating.toFixed(1)} out of 5` : "Select a rating"}
      </p>
    </div>
  );
}

function HalfStarRatingExample() {
  const [rating, setRating] = useState(3.5);

  return (
    <div className="flex flex-col items-center gap-3">
      <Rating rating={rating} editable step={0.5} showValue onRatingChange={setRating} />
      <p className="text-sm text-muted-foreground" aria-live="polite">
        Use half-star increments · {rating.toFixed(1)} out of 5
      </p>
    </div>
  );
}

function UncontrolledRatingExample() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Rating defaultRating={2} editable showValue />
      <p className="text-sm text-muted-foreground">Choose a star to update this rating.</p>
    </div>
  );
}

function CustomRatingExample() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Rating rating={4.5} icon={<IconHeart />} color="warning" />
      <p className="text-xs text-muted-foreground">Heart icons with the warning color token</p>
    </div>
  );
}

function PerItemRatingExample() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Rating rating={3.5} icon={({ value }) => (value <= 2 ? <IconHeart /> : <IconStar />)} color="success" />
      <p className="text-xs text-muted-foreground">Custom icon by rating value</p>
    </div>
  );
}

function ReactionRatingExample() {
  const [selected, setSelected] = useState<number | null>(null);
  const reaction = reactions.find((item) => item.value === selected);

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-medium">How was the support response?</p>
      <div role="group" aria-label="Rate the support response" className="flex gap-2">
        {reactions.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-label={item.label}
            aria-pressed={selected === item.value}
            onClick={() => setSelected(item.value)}
            className="flex size-10 items-center justify-center rounded-lg border border-transparent text-2xl transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-pressed:bg-primary/10"
          >
            {item.emoji}
          </button>
        ))}
      </div>
      <p className="min-h-5 text-sm text-muted-foreground" aria-live="polite">
        {reaction?.label ?? "Choose a response"}
      </p>
    </div>
  );
}

export function RatingExamples() {
  const [reviewRating, setReviewRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  return (
    <>
      <ComponentPreview
        title="Read-only Values"
        span={2}
        layout="grid3"
        exampleLabels={["Whole value", "Fractional value", "Value with score"]}
      >
        <div className="min-w-0">
          <Rating rating={4} />
        </div>
        <div className="min-w-0">
          <Rating rating={3.5} />
        </div>
        <div className="min-w-0">
          <Rating rating={4.5} showValue />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Sizes" layout="grid3" exampleLabels={["Small", "Default", "Large"]}>
        <div className="min-w-0">
          <Rating rating={4} size="sm" />
        </div>
        <div className="min-w-0">
          <Rating rating={4} />
        </div>
        <div className="min-w-0">
          <Rating rating={4} size="lg" />
        </div>
      </ComponentPreview>
      <ComponentPreview
        title="Editable"
        span={2}
        layout="grid2"
        exampleLabels={["Controlled", "Uncontrolled", "Half-star steps", "Emoji feedback"]}
      >
        <div className="min-w-0">
          <EditableRatingExample />
        </div>
        <div className="min-w-0">
          <UncontrolledRatingExample />
        </div>
        <div className="min-w-0">
          <HalfStarRatingExample />
        </div>
        <div className="min-w-0">
          <ReactionRatingExample />
        </div>
      </ComponentPreview>
      <ComponentPreview
        title="Custom Icons and Color"
        span={2}
        layout="grid2"
        exampleLabels={["Custom icon", "Per-item icons"]}
      >
        <div className="min-w-0">
          <CustomRatingExample />
        </div>
        <div className="min-w-0">
          <PerItemRatingExample />
        </div>
      </ComponentPreview>
      <ComponentPreview title="Disabled" exampleLabels={["Disabled rating"]}>
        <Rating rating={3} editable disabled />
      </ComponentPreview>
      <ComponentPreview title="Review Summary" layout="panel">
        <div className="mx-auto w-full max-w-sm space-y-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl font-semibold tabular-nums">4.6</span>
            <Rating rating={4.6} size="sm" />
            <span className="text-xs text-muted-foreground">Based on 200 reviews</span>
          </div>
          <Separator />
          <div className="space-y-2">
            {distribution.map((row) => (
              <div key={row.stars} className="grid grid-cols-[1rem_minmax(0,1fr)_2rem] items-center gap-3 text-xs">
                <span className="text-right text-muted-foreground">{row.stars}</span>
                <Progress value={row.percentage} aria-label={`${row.stars} star reviews: ${row.percentage}%`} />
                <span className="text-right tabular-nums text-muted-foreground">{row.count}</span>
              </div>
            ))}
          </div>
        </div>
      </ComponentPreview>
      <ComponentPreview title="Review Form" layout="panel">
        <form
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setReviewSubmitted(true);
          }}
          className="mx-auto flex w-full max-w-md flex-col gap-4"
        >
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-sm font-semibold">Share product feedback</h2>
            <Rating
              rating={reviewRating}
              editable
              onRatingChange={(value) => {
                setReviewRating(value);
                setReviewSubmitted(false);
              }}
            />
            <p className="min-h-5 text-xs text-muted-foreground" aria-live="polite">
              {reviewRating === 0
                ? "Choose a rating to continue"
                : reviewRating <= 2
                  ? "Thanks for telling us what needs work"
                  : reviewRating <= 3
                    ? "Thanks for your feedback"
                    : "Glad this worked well for you"}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating-review">Review</Label>
            <Textarea
              id="rating-review"
              value={review}
              onChange={(event) => {
                setReview(event.currentTarget.value);
                setReviewSubmitted(false);
              }}
              placeholder="Share details with the product team"
              rows={3}
            />
          </div>
          <Button type="submit" size="sm" disabled={reviewRating === 0 || review.trim().length === 0}>
            Submit review
          </Button>
          <p role="status" className="min-h-5 text-center text-sm text-primary">
            {reviewSubmitted ? "Your review has been recorded." : ""}
          </p>
        </form>
      </ComponentPreview>
    </>
  );
}
