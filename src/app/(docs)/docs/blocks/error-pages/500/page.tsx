import type { Metadata } from "next";

import { ServerErrorExample } from "@/examples/blocks/error-pages/500/500";

export const metadata: Metadata = {
  title: "Something went wrong",
  description: "An unexpected error occurred on our end.",
};

export default function ServerErrorPage() {
  return <ServerErrorExample />;
}
