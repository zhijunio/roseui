import { IconServerBolt } from "@tabler/icons-react";

import { ErrorPage } from "@/examples/blocks/error-pages/error-page";

export function ServiceUnavailableExample() {
  return (
    <ErrorPage
      code="503"
      title="Service temporarily unavailable"
      description="We're carrying out some maintenance or handling heavy load right now. The service will be back shortly -- please check back in a few minutes."
      icon={<IconServerBolt className="size-6" />}
    />
  );
}
