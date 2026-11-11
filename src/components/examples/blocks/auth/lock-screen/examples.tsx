import Link from "next/link";

import { IconArrowRight, IconLock } from "@tabler/icons-react";

import { PasswordField } from "@/components/composite/password-field";
import { ComponentPreview } from "@/components/examples/component-preview";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/data/user";
import { getInitials } from "@/lib/utils";

export function LockScreenExample() {
  const initials = getInitials(currentUser.name, true);
  const firstName = currentUser.name.split(" ")[0];

  return (
    <ComponentPreview title="Unlock session" layout="fullBleed" span={2}>
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
            <p className="text-muted-foreground text-sm">
              Welcome back, {firstName}. Enter your password to unlock and pick up where you left off.
            </p>
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
          <Button asChild className="w-full">
            <Link href="/components/accordion">
              Unlock
              <IconArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
        </form>
        <p className="text-muted-foreground mt-4 text-center text-sm">
          Not you?{" "}
          <Link href="/blocks/auth/sign-in" className="text-foreground font-medium hover:underline">
            Sign in as a different user
          </Link>
        </p>
      </div>
    </ComponentPreview>
  );
}
