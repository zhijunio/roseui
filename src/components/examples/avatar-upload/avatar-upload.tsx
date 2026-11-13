"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { AvatarUpload } from "@/components/ui/avatar-upload";

const wait = (duration: number) => new Promise((resolve) => window.setTimeout(resolve, duration));

async function simulateUpload(report: (progress: number) => void) {
  for (const progress of [0.2, 0.55, 0.85, 1]) {
    await wait(260);
    report(progress);
  }
}

function NewProfileImageExample() {
  const [src, setSrc] = useState<string>();

  return (
    <AvatarUpload
      name="Taylor Morgan"
      src={src}
      onRemove={() => setSrc(undefined)}
      onUpload={async (_file, report) => {
        await simulateUpload(report);
      }}
    />
  );
}

function ExistingProfileImageExample() {
  const [src, setSrc] = useState<string | undefined>("https://api.dicebear.com/9.x/avataaars/svg?seed=Alex%20Morgan");

  return (
    <AvatarUpload
      name="Alex Morgan"
      src={src}
      onRemove={() => setSrc(undefined)}
      onUpload={async (_file, report) => {
        await simulateUpload(report);
        return "https://api.dicebear.com/9.x/avataaars/svg?seed=Alex%20Morgan";
      }}
    />
  );
}

function FailedUploadExample() {
  const [src, setSrc] = useState<string | undefined>("https://api.dicebear.com/9.x/avataaars/svg?seed=Sofia%20Rossi");

  return (
    <AvatarUpload
      name="Sofia Rossi"
      src={src}
      onRemove={() => setSrc(undefined)}
      onUpload={async (_file, report) => {
        await wait(350);
        report(0.55);
        throw new Error("Upload failed. Check your connection and try again.");
      }}
    />
  );
}

export function AvatarUploadExamples() {
  return (
    <>
      <ComponentPreview title="Empty State and Upload" layout="panel">
        <NewProfileImageExample />
      </ComponentPreview>
      <ComponentPreview title="Existing Image and Replacement" layout="panel">
        <ExistingProfileImageExample />
      </ComponentPreview>
      <ComponentPreview title="Upload Failure State" layout="panel">
        <FailedUploadExample />
      </ComponentPreview>
      <ComponentPreview title="Disabled" layout="panel">
        <AvatarUpload name="Jordan Lee" src="https://api.dicebear.com/9.x/avataaars/svg?seed=Jordan%20Lee" onUpload={async () => {}} disabled />
      </ComponentPreview>
    </>
  );
}
