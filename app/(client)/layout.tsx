import React from "react";
import HeadHomeClient from "../Component/NavigationBar/HeadHomeClient";
import LoaderPage from "../Component/LoaderPage";
import Footer from "./Footer";

// app/(client)/layout.tsx
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:gap-5 gap-2 items-center h-screen overflow-auto scroll-box">
      <LoaderPage />
      <div className="flex flex-col w-full min-w-0">
        <HeadHomeClient />
        {children}
      </div>
      <Footer />
    </div>
  );
}
