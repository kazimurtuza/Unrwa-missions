"use client";
import Header from "@/app/partials/Header";
import Sidebar from "@/app/partials/Sidebar";
import UserSidebar from "@/app/partials/UserSidebar";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const authUserType=getCookie('authUserType');
  console.log(authUserType);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
  // This forces a rerender, so the date is rendered
  // the second time but not the first
  setHydrated(true);
}, []);
  if (!hydrated) {
  // Returns null on first render, so the client and server match
  return null;
}

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