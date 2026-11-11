"use client";
import { useState } from "react";

import { AvatarUpload } from "@/components/composite/avatar-upload";
import { ComponentPreview } from "@/components/examples/component-preview";

export function AvatarUploadExamples() {
  const [src, setSrc] = useState<string>();
  return (
    <ComponentPreview title="Workspace profile image" layout="panel">
      <AvatarUpload
        name="Taylor Morgan"
        src={src}
        onRemove={() => setSrc(undefined)}
        onUpload={async (_file, report) => {
          for (const value of [0.2, 0.55, 0.85, 1]) {
            await new Promise((resolve) => window.setTimeout(resolve, 260));
            report(value);
          }
          return undefined;
        }}
      />
    </ComponentPreview>
  );
}
