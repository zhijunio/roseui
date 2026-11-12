import { IconMapPinQuestion } from "@tabler/icons-react";

import { ErrorPage } from "@/examples/blocks/error-pages/error-page";

export function NotFoundExample() {
  return (
    <ErrorPage
      code="404"
      title="Page not found"
      description="The page you're looking for doesn't exist or may have been moved. Check the address, or head back to your dashboard to keep going."
      icon={<IconMapPinQuestion className="size-6" />}
    />
  );
}
