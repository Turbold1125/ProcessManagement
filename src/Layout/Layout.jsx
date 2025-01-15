import React from "react";
import { Outlet } from "react-router-dom";
import NavMenu from "../Layout/NavigationBar";

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Navigation Menu */}
      <NavMenu />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
