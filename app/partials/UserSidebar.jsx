import React, { useEffect, useRef, useState } from "react";

import Link from 'next/link';
import SidebarLinkGroup from "./SidebarLinkGroup";

function UserSidebar({ sidebarOpen, setSidebarOpen }) {
    const location = {
        pathname: ['dashboard']
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
                className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-1 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
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
                    <a to="/" className="block mx-auto text-slate-200">

                        <img src="./logo.png" alt="logo" />
                    </a>
                </div>

                {/* Links */}
                <div className="space-y-8">
                    {/* Pages group */}
                    <div>
                        <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                            <span
                                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                                aria-hidden="true"
                            >
                                •••
                            </span>
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
                                            // onClick={(e) => {
                                            //     e.preventDefault();
                                            //     sidebarExpanded
                                            //         ? handleClick()
                                            //         : setSidebarExpanded(true);
                                            // }}
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
                            {/* Forms */}

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

                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M16.25 17.5C16.913 17.5 17.5489 17.2366 18.0178 16.7678C18.4866 16.2989 18.75 15.663 18.75 15V7.5C18.75 6.83696 18.4866 6.20107 18.0178 5.73223C17.5489 5.26339 16.913 5 16.25 5H11.7675C11.6018 4.99985 11.4429 4.93391 11.3258 4.81667L9.55833 3.05C9.38429 2.87574 9.17762 2.73748 8.95013 2.64311C8.72264 2.54874 8.47879 2.50011 8.2325 2.5H3.75C3.08696 2.5 2.45107 2.76339 1.98223 3.23223C1.51339 3.70107 1.25 4.33696 1.25 5V15C1.25 15.663 1.51339 16.2989 1.98223 16.7678C2.45107 17.2366 3.08696 17.5 3.75 17.5H16.25ZM10.625 8.75C10.625 8.58424 10.5592 8.42527 10.4419 8.30806C10.3247 8.19085 10.1658 8.125 10 8.125C9.83424 8.125 9.67527 8.19085 9.55806 8.30806C9.44085 8.42527 9.375 8.58424 9.375 8.75V10.625H7.5C7.33424 10.625 7.17527 10.6908 7.05806 10.8081C6.94085 10.9253 6.875 11.0842 6.875 11.25C6.875 11.4158 6.94085 11.5747 7.05806 11.6919C7.17527 11.8092 7.33424 11.875 7.5 11.875H9.375V13.75C9.375 13.9158 9.44085 14.0747 9.55806 14.1919C9.67527 14.3092 9.83424 14.375 10 14.375C10.1658 14.375 10.3247 14.3092 10.4419 14.1919C10.5592 14.0747 10.625 13.9158 10.625 13.75V11.875H12.5C12.6658 11.875 12.8247 11.8092 12.9419 11.6919C13.0592 11.5747 13.125 11.4158 13.125 11.25C13.125 11.0842 13.0592 10.9253 12.9419 10.8081C12.8247 10.6908 12.6658 10.625 12.5 10.625H10.625V8.75Z" fill="white" />
                                                        </svg>

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
                                                    <li className="mb-1 last:mb-0">
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
                                                                Mission List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/mission/create"
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