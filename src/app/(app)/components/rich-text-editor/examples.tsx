"use client";

import { useState } from "react";
import type { JSONContent } from "@tiptap/core";

import { ComponentPreview } from "@/components/composite/component-preview";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/composite/rich-text-editor";

const launchBrief: JSONContent = {
  type: "doc",
  content: [
    { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Launch brief" }] },
    { type: "paragraph", content: [{ type: "text", text: "A shared workspace for planning and delivering product updates." }] },
    { type: "bulletList", content: [
      { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Confirm launch messaging" }] }] },
      { type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "Share the preview with early users" }] }] },
    ] },
  ],
};

function ControlledEditorExample() {
  const [value, setValue] = useState<JSONContent>(launchBrief);
  const [changeSummary, setChangeSummary] = useState("No edits yet.");

  return (
    <div className="grid w-full gap-3">
      <RichTextEditor
        label="Controlled launch brief"
        value={value}
        onValueChange={(nextValue, details) => {
          setValue(nextValue);
          setChangeSummary(`${details.wordCount} words · ${details.characterCount} characters`);
        }}
      />
      <p aria-live="polite" className="text-xs text-muted">{changeSummary}</p>
    </div>
  );
}

function CustomToolbarExample() {
  return (
    <RichTextEditor
      label="Editor with custom toolbar"
      defaultValue="<p>Use the custom action to insert a short note.</p>"
      renderToolbar={(editor) => (
        <div role="toolbar" aria-label="Custom editor actions" className="flex items-center gap-2 px-3 py-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => editor.chain().focus().insertContent("Reviewed by the team. ").run()}
          >
            Insert review note
          </Button>
        </div>
      )}
    />
  );
}

export function RichTextEditorExamples() {
  return (
    <>
      <ComponentPreview previewId="rich-text-editor-01" title="Default Editor" layout="panel" span={2}>
        <RichTextEditor
          label="Launch notes"
          defaultValue="<h2>Launch notes</h2><p>Write and format a short update for your team.</p>"
          placeholder="Start writing..."
        />
      </ComponentPreview>

      <ComponentPreview previewId="rich-text-editor-02" title="Controlled JSON"  layout="panel" span={2}>
        <ControlledEditorExample />
      </ComponentPreview>

      <ComponentPreview previewId="rich-text-editor-03" title="Placeholder and Character Limit"  layout="panel">
        <RichTextEditor
          label="Short note"
          defaultValue=""
          placeholder="Add a note for the project..."
          maxLength={240}
        />
      </ComponentPreview>

      <ComponentPreview previewId="rich-text-editor-04" title="Bubble Toolbar"  layout="panel">
        <RichTextEditor
          label="Text with selection toolbar"
          defaultValue="<p>Select a few words to format them in place.</p>"
          showBubbleMenu
        />
      </ComponentPreview>

      <ComponentPreview previewId="rich-text-editor-05" title="Disabled and Read Only" layout="grid2" span={2}>
        <div className="grid w-full gap-2">
          <p className="text-sm font-medium">Disabled</p>
          <RichTextEditor label="Disabled saved note" disabled defaultValue="<p>This editor is unavailable.</p>" />
        </div>
        <div className="grid w-full gap-2">
          <p className="text-sm font-medium">Read only</p>
          <RichTextEditor label="Read-only policy" readOnly defaultValue="<p>This content can be read and focused, but not changed.</p>" />
        </div>
      </ComponentPreview>

      <ComponentPreview previewId="rich-text-editor-06" title="Secondary Surface"  layout="panel">
        <RichTextEditor
          label="Editor on a secondary surface"
          variant="secondary"
          defaultValue="<p>Editor content on a nested surface.</p>"
        />
      </ComponentPreview>

      <ComponentPreview previewId="rich-text-editor-07" title="Custom Toolbar"  layout="panel">
        <CustomToolbarExample />
      </ComponentPreview>
    </>
  );
}
