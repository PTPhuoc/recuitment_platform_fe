"use client";

import { CldImage } from "next-cloudinary";
import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import InputEmail from "@/app/Component/InputEmail";
import InputPassword from "@/app/Component/InputPassword";
import ButtonDefault from "@/app/Component/ButtonDefault";
import ButtonGoogle from "@/app/Component/ButtonGoogle";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setRole, setUser } from "@/app/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/app/store/store";

export default function page() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleLogin = async () => {
    try {
      const rs = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}auth/login/`,
        { ...loginValue },
        { withCredentials: true },
      );
      if (rs.data.status === "Success") {
        dispatch(setUser({ id: rs.data.user.id, email: rs.data.user.email }));
        dispatch(setRole(rs.data.role));
        router.push("/dashboard");
      } else {
        console.log(rs.data.message);
      }
      return rs.data.status;
    } catch (err: any) {
      console.log(
        `Error: ${err.response.statusText ?? "No response received"}`,
      );
      return err.response.statusText ?? "No response received";
    }
  };

  return (
    <div className="w-full h-screen max-xl:min-h-200 max-md:min-h-100 flex items-center justify-center">
      <div className="relative w-3/5 max-2xl:w-4/5 max-xl:w-[85%] max-lg:w-[90%] max-md:w-full h-[85%] max-xl:h-[90%] max-lg:[95%] max-md:h-full p-5 max-md:py-2 max-md:px-0 flex md:gap-5 rounded-xl max-md:rounded-none overflow-hidden max-lg:flex-wrap-reverse shadow-default">
        <CldImage
          src="https://res.cloudinary.com/dlorwajri/image/upload/v1783200942/background_login_xx3heb.webp"
          alt="Background_Login"
          loading="eager"
          className="absolute -z-1 object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          fill
        />
        <div className="flex-1 flex flex-col bg-white md:rounded-lg md:min-w-75 items-center justify-center gap-3 shadow-default">
          <h1 className="font-bold text-[40px]">Đăng nhập</h1>
          <InputEmail
            className="w-4/5 max-md:w-[90%] max-sm:w-[95%]"
            inValue={loginValue.email}
            isCheck={false}
            outValue={(value) => setLoginValue({ ...loginValue, email: value })}
          />
          <InputPassword
            className="w-4/5 max-md:w-[90%] max-sm:w-[95%]"
            inValue={loginValue.password}
            isCheck={false}
            outValue={(value) =>
              setLoginValue({ ...loginValue, password: value })
            }
          />
          <div className="w-4/5 max-md:w-[90%] max-sm:w-[95%] flex gap-5 items-center">
            <div className="flex items-center checkbox-wrapper-2">
              <input
                type="checkbox"
                className="sc-gJwTLC ikxBAC"
                onChange={() =>
                  setLoginValue({
                    ...loginValue,
                    remember: !loginValue.remember,
                  })
                }
              ></input>
            </div>
            <p>Ghi nhớ đăng nhập</p>
          </div>
          <ButtonDefault
            label="Xác nhận"
            className="rounded-md w-4/5 max-md:w-[90%] max-sm:w-[95%]"
            classDisabled="rounded-md w-4/5 max-md:w-[90%] max-sm:w-[95%]"
            classLoad="rounded-md w-4/5 max-md:w-[90%] max-sm:w-[95%]"
            disabled={!(loginValue.email && loginValue.password)}
            funsHandle={async () => {
              return await handleLogin();
            }}
          />
          <p>
            Bạn chưa có tài khoản.{" "}
            <Link
              href={"/signup"}
              className="font-bold text-dark-blue underline duration-200 ease-in hover:text-blue-default"
            >
              Đăng ký
            </Link>
          </p>
          <ButtonGoogle
            className="w-4/5 max-md:w-[90%] max-sm:w-[95%]"
            outValue={() => {}}
          />
          <div className="w-4/5 max-md:w-[90%] max-sm:w-[95%] h-1 rounded-full bg-dark-blue"></div>
          <Link
            className="flex justify-center items-center w-12 h-12 rounded-full text-white border-2 border-blue-default bg-blue-default duration-200 ease-in hover:text-blue-default hover:bg-white"
            href={"/"}
          >
            <CircleArrowLeft className="w-10 h-10" />
          </Link>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-5 max-lg:hidden md:min-w-50">
          <p className="w-full text-[70px] font-bold text-light-blue">FUJob</p>
          <div className="w-full h-1 rounded-full bg-light-blue"></div>
          <p className="w-full text-white text-[30px] text-justify">
            Chào mừng Quý đối tác trở lại với FUJob. Chúc bạn sớm tìm được những
            cộng sự xuất sắc cho doanh nghiệp.
          </p>
        </div>
      </div>
    </div>
  );
}
