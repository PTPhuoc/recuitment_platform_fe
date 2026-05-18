"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "../libs/utils";

type ImageProps = {
  className?: string;
  disabled?: boolean;
  link?: string | null;
  outValue: (image: File) => void;
};

export default function InputImage({
  className = "",
  disabled = false,
  link = null,
  outValue,
}: ImageProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputImage = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      outValue(file);
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div
      className={cn(
        "group relative flex justify-center items-center w-25 h-25 bg-white border-2 border-white shadow-default rounded-2xl overflow-hidden duration-200 ease-in hover:border-blue-default cursor-pointer",
        className,
      )}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputImage}
        onChange={handleFileChange}
        disabled={disabled}
      />
      {preview || link ? (
        <Image
          alt="abc"
          src={preview || link || ""}
          fill
          className="w-full h-full object-cover"
        />
      ) : (
        <ImageIcon className="w-10 h-10 text-zinc-300" />
      )}
      <button
        className="absolute w-full h-full bg-transparent"
        onClick={(e) => {
          e.stopPropagation();
          inputImage.current?.click();
        }}
        disabled={disabled}
      ></button>
    </div>
  );
}
