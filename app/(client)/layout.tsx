import React from "react";
import HeadHomeClient from "../Component/NavigationBar/HeadHomeClient";
import LoaderPage from "../Component/LoaderPage";

// app/(client)/layout.tsx
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center h-screen overflow-auto scroll-box">
      <LoaderPage />
      <HeadHomeClient />
      {children}
    </div>
  );
}
