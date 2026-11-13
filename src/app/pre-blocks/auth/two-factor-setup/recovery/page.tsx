"use client";

import { StandaloneAuthLayout } from "../../standalone-layout";
import { RecoveryPhraseExample } from "../two-factor-setup";

export default function Page() {
  return (
    <StandaloneAuthLayout>
      <RecoveryPhraseExample />
    </StandaloneAuthLayout>
  );
}
