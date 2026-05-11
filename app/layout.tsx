import type { Metadata } from "next";
import { Smooch_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { PopupProvider } from "./Component/Popup";

const smoochSans = Smooch_Sans({
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FUJob",
  description: "All Recruitment in here",
};

// app/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${smoochSans.className} antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <PopupProvider>{children}</PopupProvider>
        </Providers>
      </body>
    </html>
  );
}
