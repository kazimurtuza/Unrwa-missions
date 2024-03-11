"use client";
import Header from "@/app/partials/Header";
import Sidebar from "@/app/partials/Sidebar";
import UserSidebar from "@/app/partials/UserSidebar";
import * as jose from "jose";
import { getCookie } from "cookies-next";
import { useState } from "react";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const authUserType=getCookie('authUserType');
  console.log(authUserType);
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {authUserType == 'admin' && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}

      {authUserType !== 'admin' && <UserSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
  
      {/* Content area */}
      <div className="relative flex flex-col flex-1">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;