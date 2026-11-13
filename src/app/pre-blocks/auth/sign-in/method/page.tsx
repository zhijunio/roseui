"use client";

import { StandaloneAuthLayout } from "../../standalone-layout";
import { MethodPickerExample, methodExample } from "../sign-in";

export default function Page() {
  return (
    <StandaloneAuthLayout>
      <MethodPickerExample example={methodExample} />
    </StandaloneAuthLayout>
  );
}
