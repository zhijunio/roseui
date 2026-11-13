"use client";

import { StandaloneAuthLayout } from "../../standalone-layout";
import { EmailCodeExample } from "../two-factor-setup";

export default function Page() {
  return (
    <StandaloneAuthLayout>
      <EmailCodeExample />
    </StandaloneAuthLayout>
  );
}
