import { SignInExamples } from "@/examples/blocks/auth/sign-in/sign-in";
import { PageHeader } from "@/examples/page-header";

export const metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Sign In" />
      <SignInExamples />
    </div>
  );
}
