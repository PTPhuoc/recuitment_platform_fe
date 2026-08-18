import { generateHTML } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// app/Component/LargeTextShow.tsx
export default function LargeTextShow({ content }: { content: any }) {
  const html = generateHTML(content, [StarterKit]);

  return (
    <div
      className="rendered-content max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
