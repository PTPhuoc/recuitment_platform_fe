"use client";

import axios from "axios";
import ListAccountPage from "./ListAccountPage";
import { useState } from "react";
import { usePopup } from "@/app/Component/Popup";
import { formatDate } from "date-fns";

type AccountValue = {
  count: 1;
  next: string | null;
  previous: string | null;
  results: Array<{
    id: string;
    email: string;
    phone_number: string;
    role: "admin" | "employer" | "candidate";
    status: "active" | "ban";
    date_created: string;
  }>;
  status: string;
} | null;

export default function page() {
  const [listSearch, setListSearch] = useState<AccountValue>(null);
  const popup = usePopup();

  const getAccounts = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}account/many_search/`, {
        withCredentials: true,
      })
      .then((rs) => {
        if (rs.data.status === "Success") setListSearch(rs.data);
        else console.log(rs.data.message);
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = async (
    email: string,
    role: string,
    status: string,
    dateCreated: Date | "",
  ) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}account/many_search/?role=${role}&email=${email}&status=${status}&dateCreated=${dateCreated ? formatDate(dateCreated, "dd/MM/yyyy") : ""}`,
        { withCredentials: true },
      );
      if (response.data.status === "Success") {setListSearch(response.data);
      return response.data.status;}
    } catch (err: any) {
      console.log(`Error: ${err.response.statusText ?? "No response received"}`);
      return err.response.statusText ?? "No response received"
    }
  };

  const handleDelete = async (message: string) => {
    const isConfirm = await popup({
      isOpen: true,
      message: `Bạn có chắc muốn xóa ${message}`,
      title: "Xóa tài khoản",
      typeSubmit: "YrN",
      handleFuns: () =>
        new Promise((resolve) => {
          const time = setTimeout(() => {
            resolve(true);
          }, 1000);
          return () => clearTimeout(time);
        }),
    });
    return isConfirm;
  };

  return (
    <ListAccountPage
      listSearch={listSearch}
      setListSearch={setListSearch}
      getAccounts={getAccounts}
      handleSearch={handleSearch}
      handleDelete={handleDelete}
    />
  );
}
