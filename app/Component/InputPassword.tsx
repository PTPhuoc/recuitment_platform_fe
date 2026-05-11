"use client";

import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";

type InputProps = {
  className?: string;
  isCheck: boolean;
  message?: string;
  inValue: string;
  outValue: (value: string) => void;
};

function getPasswordError(password: string) {
  if (password.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự";
  if (!/[a-z]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ thường";
  if (!/[A-Z]/.test(password)) return "Mật khẩu phải có ít nhất 1 chữ hoa";
  if (!/[0-9]/.test(password)) return "Mật khẩu phải có ít nhất 1 số";
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
    return "Mật khẩu phải có ít nhất 1 ký tự đặc biệt";
  return "";
}

export default function InputPassword({
  className = "w-4/5",
  isCheck,
  message,
  inValue,
  outValue,
}: InputProps) {
  const [logMessage, setLogMessage] = useState(message);
  const [showPass, setShowPass] = useState(true);
  
  useEffect(() => {
    if (isCheck && inValue) {
      const timer = setTimeout(() => {
        setLogMessage(getPasswordError(inValue));
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
      <p className="bg-zinc-200 flex flex-3 rounded-l-md items-center justify-center">
        Password
      </p>
      <input
        type={showPass ? "password" : "text"}
        className="flex-6 outline-none p-2"
        value={inValue}
        onChange={(e) => outValue(e.target.value)}
      />
      <button
        className="flex-1 flex justify-center items-center cursor-pointer"
        onClick={() => setShowPass(!showPass)}
      >
        {showPass ? <Eye /> : <EyeClosed />}
      </button>
      <p
        className="absolute -translate-y-full text-red-500"
        hidden={!logMessage}
      >
        {logMessage}
      </p>
    </div>
  );
}
