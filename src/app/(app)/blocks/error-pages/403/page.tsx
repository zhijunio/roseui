import type { Metadata } from "next";

import { ForbiddenExample } from "@/components/examples/blocks/error-pages/403/examples";

export const metadata: Metadata = {
  title: "Access denied",
  description: "You don't have permission to view this page.",
};

export default function ForbiddenPage() {
  return <ForbiddenExample />;
}
