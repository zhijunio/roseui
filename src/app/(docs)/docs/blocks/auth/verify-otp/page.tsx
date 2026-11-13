import type { Metadata } from "next";

import { VerifyOtpExample } from "@/examples/blocks/auth/verify-otp/verify-otp";

export const metadata: Metadata = { title: "Verify one-time password" };

export default function VerifyOtpPage() {
  return <VerifyOtpExample />;
}
