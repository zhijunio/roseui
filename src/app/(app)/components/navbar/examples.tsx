"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ComponentPreview } from "@/components/composite/component-preview";
import { Button } from "@/components/ui/button";
import { Navbar, NavbarBrand, NavbarContent, NavbarHeader, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarSpacer, NavbarToggle } from "@/components/ui/navbar";

function Brand() {
  return <NavbarBrand><Link href="/components/button" className="flex items-center gap-2"><span aria-hidden="true" className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">N</span><span>Northstar</span></Link></NavbarBrand>;
}

function ScrollableNavbarExample() {
  const scrollRef = useRef<HTMLDivElement>(null);
  return <div ref={scrollRef} className="h-60 w-full overflow-y-auto rounded-xl border bg-muted/10">
    <Navbar position="sticky" hideOnScroll parentRef={scrollRef} aria-label="Scrolling navigation" className="border-b">
      <NavbarHeader><Brand /><NavbarSpacer /><NavbarContent><NavbarItem href="/components/button">Overview</NavbarItem><NavbarItem href="/components/command">Activity</NavbarItem></NavbarContent></NavbarHeader>
    </Navbar>
    <div className="grid gap-3 p-4 text-sm text-muted-foreground"><p>Scroll this panel down to hide the navigation, then scroll upward to reveal it.</p><div className="h-24 rounded-lg border bg-background p-3">Workspace overview</div><div className="h-24 rounded-lg border bg-background p-3">Recent activity</div><div className="h-24 rounded-lg border bg-background p-3">Project updates</div></div>
  </div>;
}

export function NavbarExamples() {
  const [open, setOpen] = useState(false);
  return <>
    <ComponentPreview previewId="navbar-01" title="Default Navigation">
      <Navbar position="static" aria-label="Main navigation" className="w-full rounded-xl border">
        <NavbarHeader className="gap-2 px-3 sm:px-3"><Brand /><NavbarSpacer />
          <NavbarContent className="gap-0"><NavbarItem href="/components/button" isCurrent>Components</NavbarItem><NavbarItem href="/blocks/app-layout/sidebar-navigation">Patterns</NavbarItem></NavbarContent>
          <Button asChild size="sm" className="ml-1"><Link href="/components/button">Start</Link></Button>
        </NavbarHeader>
      </Navbar>
    </ComponentPreview>

    <ComponentPreview previewId="navbar-02" title="Sizes">
      <div className="grid w-full gap-3">
        {(["sm", "md", "lg"] as const).map((size) => <Navbar key={size} position="static" size={size} aria-label={`${size} navigation`} className="w-full rounded-lg border"><NavbarHeader><Brand /><NavbarSpacer /><NavbarContent><NavbarItem href="/components/button">Home</NavbarItem><NavbarItem href="/components/command">Explore</NavbarItem></NavbarContent></NavbarHeader></Navbar>)}
      </div>
    </ComponentPreview>

    <ComponentPreview previewId="navbar-03" title="Position">
      <div className="grid w-full gap-3">
        {(["static", "sticky", "floating"] as const).map((position) => <Navbar key={position} position={position} aria-label={`${position} navigation`} className="w-full border"><NavbarHeader><Brand /><NavbarSpacer /><NavbarContent><NavbarItem href="/components/button">Home</NavbarItem><NavbarItem href="/components/command">Command</NavbarItem></NavbarContent></NavbarHeader></Navbar>)}
      </div>
    </ComponentPreview>

    <ComponentPreview previewId="navbar-04" title="Hide on Scroll" >
      <ScrollableNavbarExample />
    </ComponentPreview>

    <ComponentPreview previewId="navbar-05" title="Mobile Menu" >
      <Navbar position="static" menuOpen={open} onMenuOpenChange={setOpen} aria-label="Mobile navigation preview" className="w-full rounded-xl border">
        <NavbarHeader><Brand /><NavbarSpacer /><NavbarToggle /></NavbarHeader>
        <NavbarMenu><NavbarMenuItem href="/components/button">Components</NavbarMenuItem><NavbarMenuItem href="/blocks/app-layout/sidebar-navigation">Patterns</NavbarMenuItem><NavbarMenuItem href="/components/command">Resources</NavbarMenuItem></NavbarMenu>
      </Navbar>
    </ComponentPreview>
  </>;
}
