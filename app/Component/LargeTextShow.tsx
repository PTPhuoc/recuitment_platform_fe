"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// app/Component/LargeTextShow.tsx
export default function LargeTextShow({
  content,
}: {
  content: Record<string, any>;
}) {
  const cleanContent = (content: Record<string, any>) => {
    if (!content || !content.content) return content;
    const lastNode = content.content[content.content.length - 1];
    if (lastNode?.type === "paragraph" && !lastNode.content) {
      return { ...content, content: content.content.slice(0, -1) };
    }
    return content;
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: cleanContent(content),
    editable: false,
    immediatelyRender: false,
  });

  if (!editor)
    return (
      <div className="flex flex-col gap-3 w-full min-h-50 animate-pulse">
        <div className="h-4 w-full rounded bg-zinc-300"></div>
        <div className="h-4 w-5/6 rounded bg-zinc-200"></div>
        <div className="h-4 w-3/4 rounded bg-zinc-300"></div>
        <div className="h-4 w-full rounded bg-zinc-300"></div>
        <div className="h-4 w-5/6 rounded bg-zinc-200"></div>
        <div className="h-4 w-5/6 rounded bg-zinc-300"></div>
        <div className="h-4 w-3/4 rounded bg-zinc-200"></div>
        <div className="h-4 w-full rounded bg-zinc-300"></div>
      </div>
    );

  return <EditorContent editor={editor} className="prose max-w-none" />;
}
