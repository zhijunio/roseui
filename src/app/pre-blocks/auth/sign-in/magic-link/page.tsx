"use client";

import { StandaloneAuthLayout } from "../../standalone-layout";
import { MagicLinkExample } from "../sign-in";

export default function Page() {
  return (
    <StandaloneAuthLayout>
      <MagicLinkExample />
    </StandaloneAuthLayout>
  );
}
