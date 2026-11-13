import type { Metadata } from "next";

import { ServiceUnavailableExample } from "@/examples/blocks/error-pages/503/503";

export const metadata: Metadata = {
  title: "Service unavailable",
  description: "The service is temporarily unavailable.",
};

export default function ServiceUnavailablePage() {
  return <ServiceUnavailableExample />;
}
