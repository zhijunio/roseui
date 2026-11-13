"use client";

import { useState } from "react";

import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBold,
  IconDownload,
  IconItalic,
  IconRefresh,
  IconSettings,
  IconUnderline,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupItem, ButtonGroupSeparator } from "@/components/ui/composite-button-group";
import { Toolbar } from "@/components/ui/toolbar";
import { ComponentPreview } from "@/examples/component-preview";

function FormatActions() {
  return (
    <>
      <Button variant="ghost" size="icon-sm" aria-label="Undo">
        <IconArrowBackUp />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="Redo">
        <IconArrowForwardUp />
      </Button>
      <ButtonGroupSeparator aria-orientation="vertical" className="mx-1 h-6" />
      <Button variant="ghost" size="icon-sm" aria-label="Bold">
        <IconBold />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="Italic">
        <IconItalic />
      </Button>
      <Button variant="ghost" size="icon-sm" aria-label="Underline">
        <IconUnderline />
      </Button>
    </>
  );
}

export function ToolbarExamples() {
  const [reportStatus, setReportStatus] = useState("Report is up to date.");

  return (
    <>
      <ComponentPreview title="Horizontal">
        <Toolbar aria-label="Document formatting">
          <FormatActions />
        </Toolbar>
      </ComponentPreview>

      <ComponentPreview title="Vertical">
        <Toolbar aria-label="Text alignment" orientation="vertical" className="rounded-lg border border-border p-1">
          <Button variant="ghost" size="icon-sm" aria-label="Align left">
            <IconAlignLeft />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Align center">
            <IconAlignCenter />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="Align right">
            <IconAlignRight />
          </Button>
        </Toolbar>
      </ComponentPreview>

      <ComponentPreview title="Attached">
        <Toolbar aria-label="Document formatting" isAttached>
          <FormatActions />
        </Toolbar>
      </ComponentPreview>

      <ComponentPreview title="With Button Group">
        <Toolbar aria-label="Text formatting">
          <ButtonGroup aria-label="Text styles">
            <ButtonGroupItem variant="ghost" size="icon-sm" aria-label="Bold" selected>
              <IconBold />
            </ButtonGroupItem>
            <ButtonGroupItem variant="ghost" size="icon-sm" aria-label="Italic">
              <IconItalic />
            </ButtonGroupItem>
            <ButtonGroupItem variant="ghost" size="icon-sm" aria-label="Underline">
              <IconUnderline />
            </ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroupSeparator aria-orientation="vertical" className="mx-1 h-6" />
          <Button variant="ghost" size="icon-sm" aria-label="Align left">
            <IconAlignLeft />
          </Button>
        </Toolbar>
      </ComponentPreview>

      <ComponentPreview title="Responsive report actions" layout="wide">
        <div className="min-w-0 space-y-3">
          <Toolbar aria-label="Report actions" className="w-full flex-wrap rounded-lg border border-border p-1">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Refresh report"
              onClick={() => setReportStatus("Report refreshed.")}
            >
              <IconRefresh aria-hidden="true" />
              <span>Refresh</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Download report"
              onClick={() => setReportStatus("Report download started.")}
            >
              <IconDownload aria-hidden="true" />
              <span>Download</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Open report settings"
              onClick={() => setReportStatus("Report settings opened.")}
            >
              <IconSettings aria-hidden="true" />
              <span>Settings</span>
            </Button>
          </Toolbar>
          <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
            {reportStatus}
          </p>
        </div>
      </ComponentPreview>
    </>
  );
}
