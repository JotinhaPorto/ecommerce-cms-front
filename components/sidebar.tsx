import React from "react";
import SideBarRoutes from "./sidebar-main";
import Image from "next/image";
import logo from "../public/fenix.jpg";

const SideBar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="flex flex-col w-full pt-14">
        <SideBarRoutes />
      </div>
    </div>
  );
};

export default SideBar;
