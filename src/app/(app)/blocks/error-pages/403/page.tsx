import type { Metadata } from "next";

import { ForbiddenExample } from "@/examples/blocks/error-pages/403/403";

export const metadata: Metadata = {
  title: "Access denied",
  description: "You don't have permission to view this page.",
};

export default function ForbiddenPage() {
  return <ForbiddenExample />;
}
