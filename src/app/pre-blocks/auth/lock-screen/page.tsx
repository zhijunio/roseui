import Link from "next/link";

import { ArrowRight as IconArrowRight, Lock as IconLock } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button-variants";
import { PasswordField } from "@/components/ui/password-field";
import { currentUser } from "@/data/user";
import { getInitials } from "@/lib/utils";

export function LockScreenExample() {
  const initials = getInitials(currentUser.name, true);

  return (
    <div className="mx-auto w-full max-w-md px-1 py-2 sm:px-2">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <Avatar className="size-20">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <span className="border-background bg-primary text-primary-foreground absolute -right-1 -bottom-1 flex size-7 items-center justify-center rounded-full border-4">
            <IconLock aria-hidden="true" className="size-3.5" />
          </span>
        </div>
        <div className="space-y-1.5">
          <p className="font-medium">{currentUser.name}</p>
          <h2 className="text-2xl font-semibold tracking-tight">Your session is locked</h2>
        </div>
      </div>
      <form className="mt-6 space-y-4">
        <PasswordField
          id="lock-password"
          label="Password"
          defaultValue="password"
          autoComplete="current-password"
          autoFocus
        />
        <Link href="/docs/components/navigation/accordion" className={buttonVariants({ className: "w-full" })}>
          Unlock
          <IconArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </form>
      <p className="text-muted-foreground mt-4 text-center text-sm">
        Not you?{" "}
        <Link href="/docs/blocks/auth/sign-in" className="text-foreground font-medium hover:underline">
          Sign in as a different user
        </Link>
      </p>
    </div>
  );
}

export default function Page() {
  return (
    <main className="flex min-h-dvh items-center justify-center p-6">
      <LockScreenExample />
    </main>
  );
}
