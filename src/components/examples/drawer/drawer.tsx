"use client";

import { useState } from "react";

import { ComponentPreview } from "@/components/docs/component-preview";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

function DrawerExample({ direction }: { direction: "bottom" | "left" | "right" }) {
  const [open, setOpen] = useState(false);
  return (
    <Drawer direction={direction} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="capitalize">
          Open {direction} drawer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Workspace settings</DrawerTitle>
          <DrawerDescription>Manage the preferences for this workspace.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4 text-sm text-muted-foreground">Changes are saved to your workspace profile.</div>
        <DrawerFooter>
          <Button onPress={() => setOpen(false)}>Save changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function DrawerExamples() {
  return (
    <>
      <ComponentPreview title="Bottom Drawer" layout="field">
        <DrawerExample direction="bottom" />
      </ComponentPreview>
      <ComponentPreview title="Side Drawers" layout="field">
        <div className="flex flex-wrap gap-2">
          <DrawerExample direction="left" />
          <DrawerExample direction="right" />
        </div>
      </ComponentPreview>
    </>
  );
}
