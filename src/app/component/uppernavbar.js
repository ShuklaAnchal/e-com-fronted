import React from "react";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { IoNotifications } from "react-icons/io5";

const uppernavbar = () => {
  return (
    <div
      className="w-full h-20 bg-[#8B5E3C] rounded-b-3xl flex flex-row justify-between px-10 items-center text-center
    text-[25px] font-semibold text-white
    "
    >
      <h3 className=" ">Category</h3>
      <div className="flex items-center gap-5">
        <IoNotifications className="font-semibold cursor-pointer" />
        <div className="text-start py-3">
            <h4>Anchal</h4>
            <h6 className="text-[15px]">Admin</h6>
        </div>
        <LiaSignOutAltSolid className="font-semibold cursor-pointer" />
      </div>
    </div>
  );
};

export default uppernavbar;
