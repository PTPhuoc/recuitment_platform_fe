import { cookies } from "next/headers";
import LayoutPage from "./LayoutPage";
import { fetchWithCookie } from "../libs/utils";

type LayoutValue = {
  children: React.ReactNode;
};

// app/(admin)/layout.tsx
export default async function AdminLayout({ children }: LayoutValue) {
  const cookie = await cookies();
  const user = await fetchWithCookie({
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}account/info/`,
    cookie: cookie.toString(),
    attribute: "user",
  });
  return <LayoutPage user={user} children={children} />;
}
