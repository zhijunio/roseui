import { IconServerBolt } from "@tabler/icons-react";

import { ErrorState } from "@/components/composite/error-state";

export function ServiceUnavailableExample() {
  return (
    <ErrorState
      code="503"
      title="Service temporarily unavailable"
      description="We're carrying out some maintenance or handling heavy load right now. The service will be back shortly -- please check back in a few minutes."
      icon={IconServerBolt}
    />
  );
}
