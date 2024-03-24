import React, { useEffect, useRef, useState } from "react";

import { deleteCookie } from "cookies-next";
import Image from "next/image";
import Link from 'next/link';
import SidebarLinkGroup from "./SidebarLinkGroup";

function UserSidebar({ sidebarOpen, setSidebarOpen }) {
    const location = {
        pathname: ['dashboard']
    };

    const handleSignOut = () => {
        // Delete the admin token cookie
        deleteCookie('authToken');

        // Redirect to the admin login page
        window.location.href = '/login';
    };
    // const location = useLocation();
    const { pathname } = location;

    const trigger = useRef(null);
    const sidebar = useRef(null);
    const storedSidebarExpanded = 'false';
    if (typeof window !== 'undefined') {
        const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
    }

    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
    );

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    useEffect(() => {
        localStorage.setItem("sidebar-expanded", sidebarExpanded);
        if (sidebarExpanded) {
            document.querySelector("body").classList.add("sidebar-expanded");
        } else {
            document.querySelector("body").classList.remove("sidebar-expanded");
        }
    }, [sidebarExpanded]);

    return (
        <div>
            {/* Sidebar backdrop (mobile only) */}
            <div
                className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                aria-hidden="true"
            ></div>

            {/* Sidebar */}
            <div
                id="sidebar"
                ref={sidebar}
                className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-auto lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-1 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-70"
                    }`}
            >
                {/* Sidebar header */}
                <div className="flex justify-between mb-10 pr-3 sm:px-2">
                    {/* Close button */}
                    <button
                        ref={trigger}
                        className="lg:hidden text-slate-500 hover:text-slate-400"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-controls="sidebar"
                        aria-expanded={sidebarOpen}
                    >
                        <span className="sr-only">Close sidebar</span>
                        <svg
                            className="w-6 h-6 fill-current"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                        </svg>
                    </button>
                    {/* Logo */}
                    <Link href="/" className="block mx-auto text-slate-200 pt-3 nx-image" style={{ width: '150px' }}>
                        <Image
                            src={
                                '/uploads/logo.png'
                            }

                            blurDataURL={
                                '/uploads/logo.png'
                            }

                            width={150}
                            height={0}
                            alt='Image'
                            placeholder="blur"
                        />
                    </Link>
                </div>

                {/* Links */}
                <div className="space-y-8">
                    {/* Pages group */}
                    <div>
                        <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                            <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                Pages
                            </span>
                        </h3>
                        <ul className="mt-3 df-sidebar">
                            {/* Dashboard */}
                            <SidebarLinkGroup
                                activecondition={
                                    pathname === "/" || pathname.includes("dashboard")
                                }

                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <Link
                                                href="/admin/dashboard"
                                                className={`block text-slate-200 truncate transition duration-150 ${pathname === "/" || pathname.includes("dashboard")
                                                        ? "hover:text-slate-200"
                                                        : "hover:text-white"
                                                    }`}

                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">

                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9.55837 3.20084C9.67556 3.08379 9.83441 3.01805 10 3.01805C10.1657 3.01805 10.3245 3.08379 10.4417 3.20084L17.6834 10.4425C17.7411 10.5022 17.81 10.5498 17.8863 10.5825C17.9626 10.6152 18.0446 10.6324 18.1276 10.6331C18.2106 10.6338 18.2929 10.6179 18.3697 10.5864C18.4465 10.555 18.5162 10.5085 18.5749 10.4498C18.6335 10.3911 18.6799 10.3213 18.7113 10.2445C18.7427 10.1677 18.7585 10.0854 18.7577 10.0024C18.7569 9.91938 18.7397 9.83738 18.7069 9.76114C18.6741 9.68491 18.6264 9.61596 18.5667 9.55834L11.3259 2.31667C11.1518 2.14256 10.9451 2.00444 10.7176 1.91021C10.4901 1.81599 10.2463 1.76749 10 1.76749C9.7538 1.76749 9.50998 1.81599 9.2825 1.91021C9.05501 2.00444 8.84831 2.14256 8.6742 2.31667L1.43253 9.55834C1.37287 9.61602 1.32529 9.68501 1.29257 9.76127C1.25985 9.83754 1.24265 9.91956 1.24196 10.0026C1.24128 10.0855 1.25714 10.1678 1.2886 10.2446C1.32006 10.3214 1.3665 10.3912 1.42521 10.4498C1.48392 10.5085 1.55372 10.5549 1.63055 10.5863C1.70737 10.6176 1.78968 10.6334 1.87267 10.6327C1.95565 10.6319 2.03766 10.6146 2.11389 10.5818C2.19013 10.549 2.25907 10.5014 2.3167 10.4417L9.55837 3.20084Z" fill="white" />
                                                            <path d="M10 4.52667L16.7992 11.3258C16.8242 11.3508 16.8492 11.3742 16.875 11.3975V16.5625C16.875 17.425 16.175 18.125 15.3125 18.125H12.5C12.3342 18.125 12.1753 18.0592 12.0581 17.9419C11.9408 17.8247 11.875 17.6658 11.875 17.5V13.75C11.875 13.5842 11.8092 13.4253 11.6919 13.3081C11.5747 13.1909 11.4158 13.125 11.25 13.125H8.75C8.58424 13.125 8.42527 13.1909 8.30806 13.3081C8.19085 13.4253 8.125 13.5842 8.125 13.75V17.5C8.125 17.6658 8.05915 17.8247 7.94194 17.9419C7.82473 18.0592 7.66576 18.125 7.5 18.125H4.6875C4.2731 18.125 3.87567 17.9604 3.58265 17.6674C3.28962 17.3743 3.125 16.9769 3.125 16.5625V11.3975C3.15093 11.3743 3.17621 11.3504 3.20083 11.3258L10 4.52667Z" fill="white" />
                                                        </svg>

                                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Dashboard
                                                        </span>
                                                    </div>

                                                </div>
                                            </Link>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>

                            <SidebarLinkGroup
                                activecondition={pathname.includes("ecommerce")}
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-slate-200 truncate transition duration-150 ${pathname.includes("ecommerce")
                                                        ? "hover:text-slate-200"
                                                        : "hover:text-white"
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true);
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">

                                                    <svg width={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#ffffff" d="M41 7C31.6-2.3 16.4-2.3 7 7S-2.3 31.6 7 41l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L41 7zM599 7L527 79c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l72-72c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0zM7 505c9.4 9.4 24.6 9.4 33.9 0l72-72c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L7 471c-9.4 9.4-9.4 24.6 0 33.9zm592 0c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-72-72c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72zM320 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zM212.1 336c-2.7 7.5-4.1 15.6-4.1 24c0 13.3 10.7 24 24 24H408c13.3 0 24-10.7 24-24c0-8.4-1.4-16.5-4.1-24c-.5-1.4-1-2.7-1.6-4c-9.4-22.3-29.8-38.9-54.3-43c-3.9-.7-7.9-1-12-1H280c-4.1 0-8.1 .3-12 1c-.8 .1-1.7 .3-2.5 .5c-24.9 5.1-45.1 23-53.4 46.5zM175.8 224a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-26.5 32C119.9 256 96 279.9 96 309.3c0 14.7 11.9 26.7 26.7 26.7h56.1c8-34.1 32.8-61.7 65.2-73.6c-7.5-4.1-16.2-6.4-25.3-6.4H149.3zm368 80c14.7 0 26.7-11.9 26.7-26.7c0-29.5-23.9-53.3-53.3-53.3H421.3c-9.2 0-17.8 2.3-25.3 6.4c32.4 11.9 57.2 39.5 65.2 73.6h56.1zM464 224a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" /></svg>

                                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Mission
                                                        </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg
                                                            className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && "rotate-180"
                                                                }`}
                                                            viewBox="0 0 12 12"
                                                        >
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                                <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                                                    <li className="mb-1 last:mb-0" style={{paddingLeft: '0px'}}>
                                                        <Link
                                                            href="/admin/mission/mission-list"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Mission List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0" style={{paddingLeft: '0px'}}>
                                                        <Link
                                                            href="/admin/mission"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Mission Create
                                                            </span>
                                                        </Link>
                                                    </li>

                                                </ul>
                                            </div>
                                            {/* <div className="flex items-center justify-between">
                                                    <div className="flex items-center">

                                                    <svg width={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>

                                                        <span className="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                        <a
                                                            href="/login"
                                                            onClick={(e) => {
                                                            e.preventDefault();
                                                            handleSignOut();
                                                            }}
                                                        >
                                                            Log Out
                                                        </a>
                                                        </span>
                                                    </div>

                                                </div> */}
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>
                            <SidebarLinkGroup
                                activecondition={
                                    true
                                }

                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <Link
                                                href="/login"
                                                className={`block text-slate-200 truncate transition duration-150`}

                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleSignOut();
                                                        }}

                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">

                                                    <svg width={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>

                                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Logout
                                                        </span>
                                                    </div>

                                                </div>
                                            </Link>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserSidebar;