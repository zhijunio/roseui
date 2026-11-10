"use client";

import { useState } from "react";
import { IconAdjustments, IconCheck, IconCookie } from "@tabler/icons-react";

import { ComponentPreview } from "@/components/composite/component-preview";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

function ConsentBanner() {
  const [open, setOpen] = useState(true);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  if (!open) return <div className="flex items-center gap-2 text-sm text-muted-foreground"><IconCheck className="size-4 text-primary" />Preferences saved</div>;
  return <><div className="w-full max-w-2xl rounded-xl border bg-card p-4 shadow-sm sm:p-5"><div className="flex gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted"><IconCookie className="size-5" /></span><div className="min-w-0 flex-1"><p className="font-medium">Privacy preferences</p><p className="mt-1 text-sm leading-6 text-muted-foreground">Choose which optional services can help improve this workspace.</p><div className="mt-4 flex flex-wrap gap-2"><Button size="sm" onClick={() => setOpen(false)}>Allow optional</Button><Button size="sm" variant="outline" onClick={() => setOpen(false)}>Only required</Button><Button size="sm" variant="ghost" onClick={() => setSettings(true)}><IconAdjustments />Manage</Button></div></div></div></div><Dialog open={settings} onOpenChange={setSettings}><DialogContent><DialogHeader><DialogTitle>Privacy settings</DialogTitle><DialogDescription>Required storage is always on. Optional services can be changed here.</DialogDescription></DialogHeader><div className="grid gap-4"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-medium">Required</p><p className="text-xs text-muted-foreground">Keeps the application secure.</p></div><Switch checked disabled aria-label="Required storage" /></div><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-medium">Usage insights</p><p className="text-xs text-muted-foreground">Helps us understand feature usage.</p></div><Switch checked={analytics} onCheckedChange={setAnalytics} aria-label="Usage insights" /></div></div><DialogFooter><Button onClick={() => { setSettings(false); setOpen(false); }}>Save preferences</Button></DialogFooter></DialogContent></Dialog></>;
}

export function CookieConsentExamples() { return <><ComponentPreview previewId="cookie-consent-01" title="Consent banner" layout="field"><ConsentBanner /></ComponentPreview><ComponentPreview previewId="cookie-consent-02" title="Preference control" layout="field"><Button variant="outline" size="sm"><IconAdjustments />Privacy settings</Button></ComponentPreview></>; }
