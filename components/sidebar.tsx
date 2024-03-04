import React from "react";
import SideBarRoutes from "./sidebar-main";

const SideBar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white dark:bg-background  shadow-sm">
      <div className="flex flex-col w-full pt-14">
        <SideBarRoutes />
      </div>
    </div>
  );
};

export default SideBar;
