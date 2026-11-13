"use client";

import { StandaloneAuthLayout } from "../../standalone-layout";
import { PasswordSignInExample } from "../sign-in";

export default function Page() {
  return (
    <StandaloneAuthLayout>
      <PasswordSignInExample />
    </StandaloneAuthLayout>
  );
}
