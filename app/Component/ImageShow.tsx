"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../libs/utils";
import { ImageIcon } from "lucide-react";

type PageProps = {
  className?: string;
  classAll?: string;
  classImage?: string;
  link?: string;
  typeShape: "fixed" | "square" | "rectangle";
  alt: string;
  width?: number;
  height?: number;
};

// app/Component/ImageShow.tsx
export default function ImageShow({
  classAll,
  classImage,
  className,
  link,
  typeShape,
  alt,
  width,
  height,
}: PageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  useEffect(() => {
    if (!containerRef.current) return;
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        `relative ${!link && "flex"} rounded-2xl shadow-default overflow-hidden`,
        className,
        classAll,
      )}
      style={{
        width:
          width || typeShape === "square"
            ? containerHeight
            : typeShape === "rectangle"
              ? containerHeight * 2
              : "100%",
        height: height || "100%",
      }}
    >
      {link ? (
        <Image
          src={link}
          alt={alt}
          fill
          className={cn(`object-cover p-1`, classImage)}
        />
      ) : (
        <div className="flex flex-1 justify-center items-center">
          <ImageIcon className="w-10 h-10 text-zinc-300" />
        </div>
      )}
    </div>
  );
}
