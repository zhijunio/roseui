import { IconAlertTriangle, IconReload } from "@tabler/icons-react";

import { ErrorState } from "@/components/composite/error-state";

export function ServerErrorExample() {
  return (
    <ErrorState
      code="500"
      title="Something went wrong on our end"
      description="An unexpected error occurred while processing your request. Our team has been notified -- please try again in a few moments."
      icon={IconAlertTriangle}
      secondaryHref="/blocks/error-pages/500"
      secondaryLabel="Try again"
      secondaryIcon={IconReload}
    />
  );
}
