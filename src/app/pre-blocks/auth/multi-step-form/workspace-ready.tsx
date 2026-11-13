import { IconCheck } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";

export function WorkspaceReady({ onStartAgain }: { onStartAgain: () => void }) {
  return (
    <div className="bg-muted/20 grid justify-items-center gap-3 rounded-xl border p-8 text-center shadow-sm">
      <span className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-full shadow-sm">
        <IconCheck aria-hidden="true" className="size-5" />
      </span>
      <h2 className="text-lg font-semibold tracking-tight">Workspace ready</h2>
      <Button type="button" variant="outline" onClick={onStartAgain}>
        Start again
      </Button>
    </div>
  );
}
