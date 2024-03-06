"use client";
import Header from "@/app/partials/Header";
import Sidebar from "@/app/partials/Sidebar";
import { useState } from "react";

function AdminLayout({children}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

            {/* Content area */}
            <div className="relative flex flex-col flex-1">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;