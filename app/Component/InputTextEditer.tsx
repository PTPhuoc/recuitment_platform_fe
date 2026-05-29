"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { BoldIcon, Italic, List, ListOrdered } from "lucide-react";
import { cn } from "../libs/utils";

type InputProps = {
  className?: string;
  classLabel?: string;
  classDisable?: string;
  classAll?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  lable?: string;
  outValue: (value: Record<string, any>) => void;
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
      outValue(json);
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  const Toolbar = () => (
    <div className="p-1 flex items-center gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`w-7 h-7 flex justify-center items-center rounded-lg ${
          editor.isActive("bold")
            ? "text-white bg-blue-default"
            : "text-blue-default bg-white"
        } cursor-pointer duration-200 ease-in`}
        type="button"
      >
        <BoldIcon className="h-5 w-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`w-7 h-7 flex justify-center items-center rounded-lg ${
          editor.isActive("italic")
            ? "text-white font-bold bg-blue-default"
            : "text-blue-default bg-white"
        } cursor-pointer duration-200 ease-in`}
        type="button"
      >
        <Italic className="h-5 w-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`w-7 h-7 flex justify-center items-center rounded-lg ${
          editor.isActive("bulletList")
            ? "text-white font-bold bg-blue-default"
            : "text-blue-default bg-white"
        } cursor-pointer duration-200 ease-in`}
        type="button"
      >
        <List className="h-5 w-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`w-7 h-7 flex justify-center items-center rounded-lg ${
          editor.isActive("orderedList")
            ? "text-white font-bold bg-blue-default"
            : "text-blue-default bg-white"
        } cursor-pointer duration-200 ease-in`}
        type="button"
      >
        <ListOrdered className="h-5 w-5" />
      </button>
    </div>
  );

  return (
    <div
      className={
        disabled
          ? cn(
              "flex flex-col p-1 bg-white border-2 border-zinc-300 rounded-2xl shadow-default",
              classDisable,
              classAll,
            )
          : cn(
              "flex flex-col p-1 bg-white border-2 border-blue-default rounded-2xl shadow-default",
              className,
              classAll,
            )
      }
    >
      <div className="flex gap-2 items-center">
        <div
          className={cn(
            `flex w-30 items-center gap-2 px-2 rounded-xl font-bold shrink-0 ${disabled ? "bg-zinc-300 text-white" : "bg-light-blue text-blue-default"}`,
            classLabel,
            classAll,
          )}
        >
          {lable && <p className="flex-1 text-center">{lable}</p>}
        </div>
        <Toolbar />
      </div>
      <EditorContent
        editor={editor}
        className="flex-1 p-1 overflow-auto max-h-70 min-h-50 scroll-box"
        placeholder={placeholder}
        disabled={disabled}
        onClick={() => editor.chain().focus().run()}
      />
    </div>
  );
}
