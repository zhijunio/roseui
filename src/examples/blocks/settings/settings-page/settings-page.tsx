"use client";

import {
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { IconCheck, IconDeviceFloppy, IconKey, IconTrash, IconUpload } from "@tabler/icons-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getUserAvatar } from "@/data/user";
import { getInitials } from "@/lib/utils";

const sections = [
  { id: "profile", label: "Profile" },
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
  { id: "billing", label: "Billing" },
] as const;

type SectionId = (typeof sections)[number]["id"];
type Plan = "starter" | "growth" | "scale";
type Settings = {
  avatar: string;
  fullName: string;
  jobTitle: string;
  email: string;
  bio: string;
  timezone: string;
  language: string;
  emailUpdates: boolean;
  productNews: boolean;
  securityAlerts: boolean;
  weeklyDigest: boolean;
  twoFactor: boolean;
  plan: Plan;
};

const initialSettings: Settings = {
  avatar: "Emma Carter",
  fullName: "Emma Carter",
  jobTitle: "Product designer",
  email: "emma@northwind.studio",
  bio: "Designing calm, focused software for teams that ship.",
  timezone: "europe-lisbon",
  language: "en-us",
  emailUpdates: true,
  productNews: false,
  securityAlerts: true,
  weeklyDigest: true,
  twoFactor: true,
  plan: "growth",
};

function Field({
  label,
  description,
  htmlFor,
  children,
}: {
  label: string;
  description?: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {description ? <p className="text-muted-foreground text-xs leading-5">{description}</p> : null}
    </div>
  );
}

function ToggleRow({
  id,
  title,
  description,
  checked,
  onCheckedChange,
}: {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-4 first:pt-0 last:pb-0">
      <div className="min-w-0 space-y-1">
        <Label htmlFor={id} className="text-sm font-medium">
          {title}
        </Label>
        <p className="text-muted-foreground text-sm leading-6">{description}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} aria-label={title} />
    </div>
  );
}

export function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [savedSettings, setSavedSettings] = useState<Settings>(initialSettings);
  const [activeSection, setActiveSection] = useState<SectionId>("profile");
  const [status, setStatus] = useState("All changes saved");
  const reduced = useReducedMotion();
  const sectionRefs = useRef<Partial<Record<SectionId, HTMLElement>>>({});
  const navRefs = useRef<Partial<Record<SectionId, HTMLButtonElement>>>({});
  const paneRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const changedFields = useMemo(
    () => (Object.keys(settings) as Array<keyof Settings>).filter((key) => settings[key] !== savedSettings[key]),
    [savedSettings, settings],
  );
  const hasChanges = changedFields.length > 0;

  function update<K extends keyof Settings>(key: K, value: Settings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
    setStatus("Unsaved changes");
  }

  function selectSection(id: SectionId, focus = false) {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    if (focus) window.requestAnimationFrame(() => navRefs.current[id]?.focus());
  }

  function moveSection(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const direction =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (event.key === "Home") {
      event.preventDefault();
      selectSection(sections[0].id, true);
    } else if (event.key === "End") {
      event.preventDefault();
      selectSection(sections[sections.length - 1].id, true);
    } else if (direction) {
      event.preventDefault();
      selectSection(sections[(index + direction + sections.length) % sections.length].id, true);
    }
  }

  const save = useCallback(() => {
    setSavedSettings(settings);
    setStatus("Changes saved");
  }, [settings]);

  function discard() {
    setSettings(savedSettings);
    setStatus("Changes reverted");
  }

  function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    if (file) update("avatar", file.name.slice(0, 2).toUpperCase());
  }

  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        if (hasChanges) save();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasChanges, save]);

  useEffect(() => {
    const root = paneRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]?.target.id;
        if (visible === "profile" || visible === "notifications" || visible === "security" || visible === "billing")
          setActiveSection(visible);
      },
      { root, threshold: [0.25, 0.55, 0.8] },
    );
    sections.forEach(({ id }) => {
      const node = sectionRefs.current[id];
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="settings-title"
      className="border-border bg-card mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border shadow-sm"
    >
      <div className="border-border bg-muted/20 border-b px-5 pt-4 pb-2 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <h1 id="settings-title" className="text-base font-medium tracking-tight">
            Settings
          </h1>
          <Avatar className="size-10">
            <AvatarImage src={getUserAvatar(settings.avatar)} alt={settings.fullName} />
            <AvatarFallback>{getInitials(settings.fullName, true)}</AvatarFallback>
          </Avatar>
        </div>
        <nav aria-label="Settings sections" className="mt-3 min-w-0">
          <ul className="flex gap-1 overflow-x-auto">
            {sections.map((section, index) => {
              const active = activeSection === section.id;
              return (
                <li key={section.id} className="min-w-max">
                  <button
                    ref={(node) => {
                      navRefs.current[section.id] = node ?? undefined;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls={section.id}
                    tabIndex={active ? 0 : -1}
                    onClick={() => selectSection(section.id)}
                    onKeyDown={(event) => moveSection(event, index)}
                    className="text-muted-foreground hover:text-foreground focus-visible:ring-ring relative flex h-8 items-center rounded-lg px-3 text-[14px] leading-[1.4] transition-colors outline-none focus-visible:ring-2"
                  >
                    {active ? (
                      <motion.span
                        layoutId="settings-nav-highlight"
                        className="border-border bg-background absolute inset-0 rounded-lg border shadow-sm"
                        aria-hidden="true"
                      />
                    ) : null}
                    <span className="relative z-10">{section.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <section
        ref={paneRef}
        aria-labelledby={`${activeSection}-heading`}
        className="max-h-[680px] min-w-0 overflow-y-auto"
      >
        <div
          ref={(node) => {
            sectionRefs.current.profile = node ?? undefined;
          }}
          id="profile"
          role="tabpanel"
          className="scroll-mt-4 p-5 sm:p-8"
          aria-labelledby="profile-heading"
        >
          <header className="space-y-1">
            <h2 id="profile-heading" tabIndex={-1} className="text-base font-medium tracking-tight">
              Profile
            </h2>
            <p className="text-muted-foreground text-[14px] leading-[1.4]">
              How you appear to teammates across Northwind.
            </p>
          </header>
          <div className="mt-6 flex flex-wrap items-center gap-4 max-[460px]:flex-col max-[460px]:items-start">
            <Avatar className="size-16 shrink-0">
              <AvatarImage src={getUserAvatar(settings.avatar)} alt={settings.fullName} />
              <AvatarFallback className="text-xl">{getInitials(settings.fullName, true)}</AvatarFallback>
            </Avatar>
            <div>
              <strong className="block text-[14px] font-medium">{settings.fullName}</strong>
              <span className="text-muted-foreground mt-1 block text-[14px] leading-[1.4]">
                {settings.jobTitle} · Northwind Studio
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  className="rounded-full text-[14px]"
                  size="sm"
                  variant="secondary"
                  onClick={() => fileRef.current?.click()}
                >
                  <IconUpload className="size-3.5" />
                  Change photo
                </Button>
                <Button
                  className="rounded-full text-[14px]"
                  size="sm"
                  variant="ghost"
                  disabled={settings.avatar === initialSettings.avatar}
                  onClick={() => update("avatar", initialSettings.avatar)}
                >
                  <IconTrash className="size-3.5" />
                  Remove
                </Button>
              </div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="sr-only"
              onChange={upload}
            />
          </div>
          <div className="mt-7 grid gap-5">
            <Field label="Full name" htmlFor="settings-name">
              <Input
                className="rounded-full px-4 text-[14px]"
                id="settings-name"
                autoComplete="name"
                value={settings.fullName}
                onChange={(event) => update("fullName", event.currentTarget.value)}
              />
            </Field>
            <Field label="Job title" htmlFor="settings-job-title">
              <Input
                className="rounded-full px-4 text-[14px]"
                id="settings-job-title"
                autoComplete="organization-title"
                value={settings.jobTitle}
                onChange={(event) => update("jobTitle", event.currentTarget.value)}
              />
            </Field>
            <Field label="Email" htmlFor="settings-email">
              <Input
                className="rounded-full px-4 text-[14px]"
                id="settings-email"
                type="email"
                autoComplete="email"
                value={settings.email}
                onChange={(event) => update("email", event.currentTarget.value)}
              />
            </Field>
            <Field label="Bio" htmlFor="settings-bio">
              <Textarea
                className="rounded-2xl px-4 text-[14px]"
                id="settings-bio"
                rows={3}
                value={settings.bio}
                onChange={(event) => update("bio", event.currentTarget.value)}
              />
            </Field>
            <Field label="Time zone" htmlFor="settings-timezone">
              <Select value={settings.timezone} onValueChange={(value) => update("timezone", value)}>
                <SelectTrigger id="settings-timezone" className="w-full rounded-full px-4 text-[14px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="europe-lisbon">Lisbon (GMT+1)</SelectItem>
                  <SelectItem value="america-los-angeles">Pacific Time</SelectItem>
                  <SelectItem value="america-new-york">Eastern Time</SelectItem>
                  <SelectItem value="asia-shanghai">Shanghai</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Language" htmlFor="settings-language">
              <Select value={settings.language} onValueChange={(value) => update("language", value)}>
                <SelectTrigger id="settings-language" className="w-full rounded-full px-4 text-[14px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-us">English (US)</SelectItem>
                  <SelectItem value="en-gb">English (UK)</SelectItem>
                  <SelectItem value="zh-cn">简体中文</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </div>

        <Separator />
        <div
          ref={(node) => {
            sectionRefs.current.notifications = node ?? undefined;
          }}
          id="notifications"
          role="tabpanel"
          className="scroll-mt-4 p-5 sm:p-8"
          aria-labelledby="notifications-heading"
        >
          <header className="space-y-1">
            <h2 id="notifications-heading" tabIndex={-1} className="text-base font-medium tracking-tight">
              Notifications
            </h2>
            <p className="text-muted-foreground text-[14px] leading-[1.4]">Choose what reaches your inbox.</p>
          </header>
          <div className="mt-6 divide-y">
            <ToggleRow
              id="email-updates"
              title="Workspace updates"
              description="Receive activity and collaboration updates by email."
              checked={settings.emailUpdates}
              onCheckedChange={(value) => update("emailUpdates", value)}
            />
            <ToggleRow
              id="product-news"
              title="Product news"
              description="Occasional updates about new features and improvements."
              checked={settings.productNews}
              onCheckedChange={(value) => update("productNews", value)}
            />
            <ToggleRow
              id="security-alerts"
              title="Security alerts"
              description="Get notified about sign-ins and important account changes."
              checked={settings.securityAlerts}
              onCheckedChange={(value) => update("securityAlerts", value)}
            />
            <ToggleRow
              id="weekly-digest"
              title="Weekly digest"
              description="A summary of your workspace activity every Monday."
              checked={settings.weeklyDigest}
              onCheckedChange={(value) => update("weeklyDigest", value)}
            />
          </div>
        </div>

        <Separator />
        <div
          ref={(node) => {
            sectionRefs.current.security = node ?? undefined;
          }}
          id="security"
          role="tabpanel"
          className="scroll-mt-4 p-5 sm:p-8"
          aria-labelledby="security-heading"
        >
          <header className="space-y-1">
            <h2 id="security-heading" tabIndex={-1} className="text-base font-medium tracking-tight">
              Security
            </h2>
            <p className="text-muted-foreground text-[14px] leading-[1.4]">Keep your account protected.</p>
          </header>
          <div className="mt-6 divide-y">
            <div className="flex items-center justify-between gap-4 py-4">
              <div className="flex min-w-0 items-start gap-3">
                <IconKey className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Password</p>
                  <p className="text-muted-foreground mt-1 text-sm">Last changed 3 months ago.</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Change password
              </Button>
            </div>
            <ToggleRow
              id="two-factor"
              title="Two-factor authentication"
              description="Add another layer of protection with an authenticator app."
              checked={settings.twoFactor}
              onCheckedChange={(value) => update("twoFactor", value)}
            />
            <div className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-sm font-medium">Active sessions</p>
                <p className="text-muted-foreground mt-1 text-sm">2 devices are currently signed in.</p>
              </div>
              <Button variant="outline" size="sm">
                Review sessions
              </Button>
            </div>
          </div>
        </div>

        <Separator />
        <div
          ref={(node) => {
            sectionRefs.current.billing = node ?? undefined;
          }}
          id="billing"
          role="tabpanel"
          className="scroll-mt-4 p-5 sm:p-8"
          aria-labelledby="billing-heading"
        >
          <header className="space-y-1">
            <h2 id="billing-heading" tabIndex={-1} className="text-base font-medium tracking-tight">
              Billing
            </h2>
            <p className="text-muted-foreground text-[14px] leading-[1.4]">Manage your plan and payment details.</p>
          </header>
          <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_12rem] sm:items-end">
            <div className="border-border bg-muted/30 rounded-lg border p-4">
              <p className="text-sm font-medium">Current plan</p>
              <p className="text-muted-foreground mt-1 text-sm">Growth plan for your workspace.</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="settings-plan">Plan</Label>
              <Select
                value={settings.plan}
                onValueChange={(value) => {
                  if (value === "starter" || value === "growth" || value === "scale") update("plan", value);
                }}
              >
                <SelectTrigger id="settings-plan" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">Starter</SelectItem>
                  <SelectItem value="growth">Growth</SelectItem>
                  <SelectItem value="scale">Scale</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="border-border mt-5 flex items-center justify-between gap-3 rounded-lg border p-4">
            <div>
              <p className="text-sm font-medium">Visa ending in 4242</p>
              <p className="text-muted-foreground mt-1 text-xs">Expires 09 / 27</p>
            </div>
            <Button variant="outline" size="sm">
              Update payment method
            </Button>
          </div>
        </div>
      </section>
      <div aria-live="polite" className="sr-only">
        {status}
      </div>
      <AnimatePresence initial={false}>
        {hasChanges ? (
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.2 }}
            className="fixed inset-x-4 bottom-4 z-20 mx-auto max-w-3xl sm:inset-x-6"
          >
            <div className="border-border bg-card/95 flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3 shadow-lg backdrop-blur-sm sm:px-4">
              <span className="flex items-center gap-2 text-sm">
                <IconDeviceFloppy className="text-accent-strong size-4" />
                <span>
                  <span className="font-medium">Unsaved changes</span>
                  <span className="text-muted-foreground ml-1 max-[460px]:hidden">
                    {changedFields.length} field{changedFields.length === 1 ? "" : "s"} changed
                  </span>
                </span>
              </span>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" onClick={discard}>
                  Discard
                </Button>
                <Button size="sm" onClick={save}>
                  <IconCheck className="size-4" />
                  Save changes
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
