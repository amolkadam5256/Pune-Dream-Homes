import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <TopHeader />
        <main className="flex-1 p-6 overflow-x-hidden overflow-y-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
