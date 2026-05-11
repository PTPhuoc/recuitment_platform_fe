"use client";

import { Menu, X } from "lucide-react";
import ButtonDefault from "./ButtonDefault";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { setLeftBar } from "../store/slices/webSlice";

export default function AdminBottomBar() {
  const dispatch = useDispatch<AppDispatch>();
  const webState = useSelector((state: RootState) => state.web);
  return (
    <div className="z-2 bottom-2 right-2 fixed flex items-center justify-center md:hidden h-10 w-10">
      <ButtonDefault
        className="w-full h-full rounded-full"
        disabled={false}
        icon={
          webState.isLeftBar ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )
        }
        funsHandle={() => {
          dispatch(setLeftBar(!webState.isLeftBar));
          return true;
        }}
      />
    </div>
  );
}
