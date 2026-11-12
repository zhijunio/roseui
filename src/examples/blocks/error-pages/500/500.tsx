import { IconAlertTriangle, IconReload } from "@tabler/icons-react";

import { ErrorPage } from "@/examples/blocks/error-pages/error-page";

export function ServerErrorExample() {
  return (
    <ErrorPage
      code="500"
      title="Something went wrong on our end"
      description="An unexpected error occurred while processing your request. Our team has been notified -- please try again in a few moments."
      icon={<IconAlertTriangle className="size-6" />}
      secondaryHref="/blocks/error-pages/500"
      secondaryLabel="Try again"
      secondaryIcon={<IconReload className="size-4" />}
    />
  );
}
