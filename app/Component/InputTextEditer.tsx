"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useState, useEffect } from "react";

type InputProps = {
  className?: string;
  classLabel?: string;
  classDisable?: string;
  classAll?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  lable?: string;
  outValue: (value: string) => void;
};

export default function InputTextEditer({
  className,
  classLabel,
  classDisable,
  classAll,
  disabled = false,
  placeholder,
  value = "",
  lable,
  outValue,
}: InputProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-500 underline", target: "_blank" },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      outValue(JSON.stringify(json));
    },
    immediatelyRender: false,
  });
  if (!editor) return null;

  const Toolbar = () => (
    <div className="border-b p-2 flex gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1 rounded ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
        type="button"
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1 rounded ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
        type="button"
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1 rounded ${editor.isActive("bulletList") ? "bg-gray-200" : ""}`}
        type="button"
      >
        Bullet List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1 rounded ${editor.isActive("orderedList") ? "bg-gray-200" : ""}`}
        type="button"
      >
        Numbered List
      </button>
      <button
        onClick={() => {
          const url = window.prompt("Enter URL:");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
        className={`p-1 rounded ${editor.isActive("link") ? "bg-gray-200" : ""}`}
        type="button"
      >
        Link
      </button>
    </div>
  );
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <Toolbar />
      <EditorContent editor={editor} className="p-3 min-h-37.5" />
    </div>
  );
}
