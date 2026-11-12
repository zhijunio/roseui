import type { Metadata } from "next";

import { NotFoundExample } from "@/examples/blocks/error-pages/404/404";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found.",
};

export default function NotFoundExamplePage() {
  return <NotFoundExample />;
}
