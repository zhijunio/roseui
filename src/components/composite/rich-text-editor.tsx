"use client";

import { useEffect, useMemo } from "react";
import StarterKit from "@tiptap/starter-kit";
import {
  EditorContent,
  useEditor,
  useEditorState,
  type Editor,
  type Extension,
  type JSONContent,
} from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBold,
  IconItalic,
  IconList,
  IconListNumbers,
  IconStrikethrough,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const noExtensions: Extension[] = [];

export type RichTextEditorChangeDetails = {
  html: string;
  text: string;
  isEmpty: boolean;
  characterCount: number;
  wordCount: number;
};

type RichTextEditorProps = {
  value?: JSONContent;
  defaultValue?: JSONContent | string;
  onValueChange?: (
    value: JSONContent,
    details: RichTextEditorChangeDetails,
  ) => void;
  placeholder?: string;
  label?: string;
  variant?: "default" | "secondary";
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  extensions?: Extension[];
  showToolbar?: boolean;
  showBubbleMenu?: boolean;
  renderToolbar?: (editor: Editor) => React.ReactNode;
  className?: string;
  contentClassName?: string;
};

function getTextStats(text: string) {
  const trimmed = text.trim();
  return {
    characterCount: text.length,
    wordCount: trimmed ? trimmed.split(/\s+/).length : 0,
  };
}

function ToolbarButton({
  editor,
  label,
  active = false,
  onClick,
  children,
}: {
  editor: Editor;
  label: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant={active ? "secondary" : "ghost"}
      size="icon-sm"
      aria-label={label}
      title={label}
      disabled={!editor.isEditable}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function DefaultToolbar({ editor }: { editor: Editor }) {
  return (
    <div
      role="toolbar"
      aria-label="Text formatting"
      className="flex min-w-0 items-center gap-0.5 overflow-x-auto px-2 py-1.5"
    >
      <ToolbarButton
        editor={editor}
        label="Undo"
        onClick={() => editor.chain().focus().undo().run()}
      >
        <IconArrowBackUp />
      </ToolbarButton>
      <ToolbarButton
        editor={editor}
        label="Redo"
        onClick={() => editor.chain().focus().redo().run()}
      >
        <IconArrowForwardUp />
      </ToolbarButton>
      <Separator orientation="vertical" className="mx-1 h-6" />
      <ToolbarButton
        editor={editor}
        label="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <IconBold />
      </ToolbarButton>
      <ToolbarButton
        editor={editor}
        label="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <IconItalic />
      </ToolbarButton>
      <ToolbarButton
        editor={editor}
        label="Strikethrough"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <IconStrikethrough />
      </ToolbarButton>
      <Separator orientation="vertical" className="mx-1 h-6" />
      <ToolbarButton
        editor={editor}
        label="Bulleted list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <IconList />
      </ToolbarButton>
      <ToolbarButton
        editor={editor}
        label="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <IconListNumbers />
      </ToolbarButton>
    </div>
  );
}

function RichTextEditor({
  value,
  defaultValue = "",
  onValueChange,
  placeholder = "Start writing...",
  label = "Rich text editor",
  variant = "default",
  disabled = false,
  readOnly = false,
  maxLength,
  extensions = noExtensions,
  showToolbar = true,
  showBubbleMenu = false,
  renderToolbar,
  className,
  contentClassName,
}: RichTextEditorProps) {
  const editorExtensions = useMemo(
    () => [
      StarterKit.configure({ link: { openOnClick: false } }),
      ...extensions,
    ],
    [extensions],
  );
  const editor = useEditor(
    {
      extensions: editorExtensions,
      content: value ?? defaultValue,
      editable: !disabled && !readOnly,
      immediatelyRender: false,
      editorProps: {
        attributes: {
          class:
            "min-h-48 px-4 py-3 text-sm leading-6 outline-none [&_h1]:my-3 [&_h1]:text-xl [&_h1]:font-semibold [&_h2]:my-3 [&_h2]:text-lg [&_h2]:font-semibold [&_h3]:my-2 [&_h3]:font-medium [&_p]:my-2 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground",
          role: "textbox",
          "aria-label": label,
          "aria-multiline": "true",
          ...(readOnly ? { "aria-readonly": "true" } : {}),
          ...(disabled ? { "aria-disabled": "true" } : {}),
          tabindex: disabled ? "-1" : "0",
        },
        handleTextInput:
          maxLength === undefined
            ? undefined
            : (view, from, to, text) => {
                const currentLength = view.state.doc.textBetween(
                  0,
                  view.state.doc.content.size,
                  "\n",
                ).length;
                const selectedLength = view.state.doc.textBetween(
                  from,
                  to,
                  "\n",
                ).length;
                return currentLength - selectedLength + text.length > maxLength;
              },
        handlePaste:
          maxLength === undefined
            ? undefined
            : (view, _event, slice) => {
                const currentLength = view.state.doc.textBetween(
                  0,
                  view.state.doc.content.size,
                  "\n",
                ).length;
                const selected = view.state.selection;
                const selectedLength = view.state.doc.textBetween(
                  selected.from,
                  selected.to,
                  "\n",
                ).length;
                const pastedText = slice.content.textBetween(
                  0,
                  slice.content.size,
                  "\n",
                );
                return (
                  currentLength - selectedLength + pastedText.length > maxLength
                );
              },
      },
      onUpdate: ({ editor: currentEditor }) => {
        const text = currentEditor.getText();
        onValueChange?.(currentEditor.getJSON(), {
          html: currentEditor.getHTML(),
          text,
          isEmpty: currentEditor.isEmpty,
          ...getTextStats(text),
        });
      },
    },
    [editorExtensions],
  );

  const externalValue = value === undefined ? undefined : JSON.stringify(value);
  const editorState = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => {
      const text = currentEditor?.getText() ?? "";
      return {
        isEmpty: currentEditor?.isEmpty ?? true,
        ...getTextStats(text),
      };
    },
  });

  useEffect(() => {
    if (!editor || externalValue === undefined || value === undefined) return;
    if (JSON.stringify(editor.getJSON()) !== externalValue) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, externalValue, value]);

  useEffect(() => {
    editor?.setEditable(!disabled && !readOnly);
  }, [editor, disabled, readOnly]);

  const currentStats = editorState ?? {
    isEmpty: true,
    characterCount: 0,
    wordCount: 0,
  };
  const overLimit =
    maxLength !== undefined && currentStats.characterCount > maxLength;

  return (
    <div
      data-slot="rich-text-editor"
      data-variant={variant}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      className={cn(
        "min-w-0 overflow-hidden rounded-xl border border-border bg-card",
        variant === "secondary" && "bg-muted shadow-none",
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      {showToolbar && (
        <div className="border-b border-border">
          {editor ? (
            renderToolbar ? (
              renderToolbar(editor)
            ) : (
              <DefaultToolbar editor={editor} />
            )
          ) : (
            <div className="h-11" />
          )}
        </div>
      )}
      <div className={cn("relative", contentClassName)}>
        {currentStats.isEmpty && placeholder && !disabled && !readOnly && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-3 text-sm text-muted-foreground"
          >
            {placeholder}
          </span>
        )}
        <EditorContent editor={editor} />
        {editor && showBubbleMenu && !disabled && !readOnly && (
          <BubbleMenu
            editor={editor}
            className="flex items-center gap-0.5 rounded-lg border border-border bg-popover p-1 shadow-md"
          >
            <ToolbarButton
              editor={editor}
              label="Bold"
              active={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <IconBold />
            </ToolbarButton>
            <ToolbarButton
              editor={editor}
              label="Italic"
              active={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <IconItalic />
            </ToolbarButton>
          </BubbleMenu>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border px-3 py-2 text-xs text-muted-foreground">
        <span>
          {readOnly ? "Read only" : disabled ? "Disabled" : "Rich text"}
        </span>
        <output
          aria-label={`${currentStats.characterCount} characters and ${currentStats.wordCount} words`}
          className={cn("tabular-nums", overLimit && "text-destructive")}
        >
          {currentStats.characterCount} characters · {currentStats.wordCount}{" "}
          words{maxLength !== undefined ? ` · ${maxLength} max` : ""}
        </output>
      </div>
    </div>
  );
}

export { RichTextEditor };
