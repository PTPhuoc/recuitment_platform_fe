"use client";

import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import Loader from "./Loader";
import { useEffect } from "react";
import { cn } from "../libs/utils";

type ButtonValue = {
  className?: string;
  outValue: (user: any) => void;
};

export default function ButtonGoogle({ className, outValue }: ButtonValue) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      outValue(session.user);
    }
  }, [session]);

  return (
    <button
      className={cn(
        "flex items-center justify-center rounded-md shadow-default gap-5 py-1 border-2 border-white hover:shadow-none hover:border-light-blue duration-200 ease-in",
        className,
      )}
      onClick={() => signIn("google")}
      disabled={status === "loading"}
    >
      {status === "loading" ? (
        <Loader />
      ) : (
        <>
          <Image
            width={30}
            height={30}
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/40px-Google_%22G%22_logo.svg.png?_=20230822192911"
            }
            alt="Google icon"
          />
          <p>Đăng nhập với Google</p>
        </>
      )}
    </button>
  );
}
