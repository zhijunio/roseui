"use client";

import { useState } from "react";

import { ArrowUpRight as IconArrowUpRight, Check as IconCheck, Sparkles as IconSparkles } from "lucide-react";
import { toast } from "sonner";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Announcement } from "@/components/ui/announcement";
import { Button } from "@/components/ui/button";

export function AnnouncementExamples() {
  const [showDismissible, setShowDismissible] = useState(true);

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <ComponentPreview title="Custom icon" layout="panel">
        <div className="grid w-full gap-3 sm:grid-cols-2">
          <Announcement
            icon={<IconSparkles aria-hidden="true" className="size-5 shrink-0 text-primary" />}
            title="New features are here"
            description="Explore the latest improvements to your workspace."
          />
          <Announcement
            icon={<IconCheck aria-hidden="true" className="size-5 shrink-0 text-success" />}
            title="Changes saved"
            description="Your preferences have been updated."
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Action button" layout="panel">
        <div className="w-full max-w-lg">
          <Announcement
            icon={<IconSparkles aria-hidden="true" className="size-5 shrink-0 text-primary" />}
            title="A new update is available"
            description="See what changed in the latest release."
            actionLabel={
              <>
                View release notes
                <IconArrowUpRight aria-hidden="true" />
              </>
            }
            onAction={() => toast.success("Release notes opened")}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Dismissible" layout="panel">
        <div className="w-full max-w-lg">
          {showDismissible ? (
            <Announcement
              title="Your workspace is ready"
              description="Invite teammates when you’re ready to collaborate."
              dismissible
              onDismiss={() => setShowDismissible(false)}
            />
          ) : (
            <Button variant="outline" size="sm" onPress={() => setShowDismissible(true)}>
              Show announcement again
            </Button>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview title="Optional description" layout="panel">
        <div className="grid w-full gap-3 sm:grid-cols-2">
          <Announcement title="Welcome back" />
          <Announcement title="All caught up" description="There are no new updates." />
        </div>
      </ComponentPreview>
    </div>
  );
}
