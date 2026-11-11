import type { Metadata } from "next";

import { VerifyOtpExample } from "@/components/examples/blocks/auth/verify-otp/examples";

export const metadata: Metadata = { title: "Verify one-time password" };

export default function VerifyOtpPage() {
  return <VerifyOtpExample />;
}
