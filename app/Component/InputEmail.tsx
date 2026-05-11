"use client";

import { useEffect, useState } from "react";

type InputProps = {
  className?: string;
  isCheck: boolean;
  message?: string;
  inValue: string;
  outValue: (value: string) => void;
};

function getEmailError(email: string) {
  const missing = !email.includes("@gmail.com");
  return missing ? "Trường này yêu cầu Email" : "";
}

export default function InputEmail({
  className = "w-4/5",
  isCheck,
  message,
  inValue,
  outValue,
}: InputProps) {
  const [logMessage, setLogMessage] = useState(message);

  useEffect(() => {
    if (isCheck && inValue) {
      const timer = setTimeout(() => {
        setLogMessage(getEmailError(inValue));
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setLogMessage("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [inValue]);

  return (
    <div
      className={
        "relative flex items-stretch border-2 border-mim-blue rounded-md " +
        className
      }
    >
      <p className="bg-zinc-200 rounded-l-md flex flex-3 items-center justify-center">
        Email
      </p>
      <input
        value={inValue}
        type="email"
        className="flex-7 outline-none p-2 rounded-r-md"
        onChange={(e) => outValue(e.target.value)}
      />
      <p
        className="absolute -translate-y-full text-red-500"
        hidden={!logMessage}
      >
        {logMessage}
      </p>
    </div>
  );
}
