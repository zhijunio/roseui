"use client";

import { StandaloneAuthLayout } from "../../standalone-layout";
import { BackupCodesExample } from "../two-factor-setup";

export default function Page() {
  return (
    <StandaloneAuthLayout>
      <BackupCodesExample />
    </StandaloneAuthLayout>
  );
}
