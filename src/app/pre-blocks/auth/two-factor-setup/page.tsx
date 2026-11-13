"use client";

import { StandaloneAuthLayout } from "../standalone-layout";
import { TotpSetupExample } from "./two-factor-setup";

export default function Page() {
  return (
    <StandaloneAuthLayout>
      <TotpSetupExample />
    </StandaloneAuthLayout>
  );
}
