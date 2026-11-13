"use client";

import { StandaloneAuthLayout } from "../../standalone-layout";
import { CenteredLoginExample } from "../sign-in";

export default function Page() {
  return (
    <StandaloneAuthLayout>
      <CenteredLoginExample />
    </StandaloneAuthLayout>
  );
}
