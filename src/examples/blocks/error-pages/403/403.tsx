import { IconLock } from "@tabler/icons-react";

import { ErrorPage } from "@/examples/blocks/error-pages/error-page";

export function ForbiddenExample() {
  return (
    <ErrorPage
      code="403"
      title="Access denied"
      description="You don't have permission to view this page. If you believe this is a mistake, ask your workspace administrator to grant you access."
      icon={<IconLock className="size-6" />}
    />
  );
}
