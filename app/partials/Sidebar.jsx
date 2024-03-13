import React, { useEffect, useRef, useState } from "react";

import Link from 'next/link';
import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
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
                className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
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
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.0001 5.625C9.99988 4.94166 10.1598 4.26779 10.4669 3.65737C10.7741 3.04696 11.2199 2.51698 11.7688 2.1099C12.3176 1.70282 12.9542 1.42997 13.6275 1.3132C14.3007 1.19644 14.992 1.239 15.6459 1.4375C15.7492 1.4688 15.8427 1.52635 15.9172 1.60454C15.9917 1.68272 16.0446 1.77887 16.0709 1.88361C16.0972 1.98835 16.0959 2.09811 16.0671 2.20219C16.0383 2.30627 15.9831 2.40112 15.9067 2.4775L13.1401 5.24333C13.1926 5.63916 13.3701 6.02166 13.6742 6.32583C13.9784 6.63 14.3609 6.8075 14.7576 6.85916L17.5226 4.09333C17.5989 4.01699 17.6938 3.96174 17.7979 3.93297C17.9019 3.90419 18.0117 3.90287 18.1164 3.92914C18.2212 3.95541 18.3173 4.00837 18.3955 4.08286C18.4737 4.15734 18.5312 4.25082 18.5626 4.35416C18.7702 5.03821 18.8071 5.76272 18.67 6.46433C18.5329 7.16593 18.2259 7.82324 17.776 8.37876C17.326 8.93428 16.7468 9.37108 16.089 9.65095C15.4312 9.93082 14.7148 10.0452 14.0026 9.98416C13.1542 9.9125 12.4442 10.0675 12.0784 10.5125L6.12005 17.75C5.87609 18.0448 5.57325 18.2854 5.23092 18.4564C4.8886 18.6274 4.51434 18.7251 4.1321 18.7431C3.74987 18.7611 3.36808 18.6991 3.0112 18.561C2.65431 18.423 2.33018 18.2119 2.05957 17.9414C1.78896 17.6708 1.57783 17.3467 1.4397 16.9899C1.30157 16.633 1.23948 16.2512 1.25741 15.869C1.27534 15.4868 1.3729 15.1125 1.54383 14.7701C1.71476 14.4278 1.9553 14.1249 2.25005 13.8808L9.48672 7.92166C9.93089 7.555 10.0867 6.84583 10.0151 5.9975C10.0049 5.87359 9.99985 5.74932 10.0001 5.625ZM3.43089 15.9375C3.43089 15.7717 3.49673 15.6128 3.61394 15.4956C3.73115 15.3783 3.89013 15.3125 4.05589 15.3125H4.06255C4.22831 15.3125 4.38728 15.3783 4.50449 15.4956C4.6217 15.6128 4.68755 15.7717 4.68755 15.9375V15.9442C4.68755 16.1099 4.6217 16.2689 4.50449 16.3861C4.38728 16.5033 4.22831 16.5692 4.06255 16.5692H4.05589C3.89013 16.5692 3.73115 16.5033 3.61394 16.3861C3.49673 16.2689 3.43089 16.1099 3.43089 15.9442V15.9375Z" fill="white" />
                                                            <path d="M8.39668 7.2L6.56252 5.36666V4.06166C6.56251 3.95376 6.53457 3.8477 6.48141 3.7538C6.42826 3.6599 6.3517 3.58136 6.25918 3.52583L3.13418 1.65083C3.01466 1.57918 2.87462 1.54953 2.73632 1.56659C2.59801 1.58365 2.46938 1.64645 2.37085 1.745L1.74585 2.37C1.6473 2.46852 1.58451 2.59716 1.56745 2.73546C1.55039 2.87377 1.58003 3.01381 1.65168 3.13333L3.52668 6.25833C3.58222 6.35084 3.66075 6.4274 3.75465 6.48056C3.84855 6.53372 3.95462 6.56166 4.06252 6.56166H5.36585L7.08418 8.28L8.39668 7.19916V7.2Z" fill="white" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.4634 14.4408L13.9492 17.9258C14.2104 18.187 14.5204 18.3942 14.8617 18.5355C15.2029 18.6769 15.5686 18.7496 15.938 18.7496C16.3073 18.7496 16.673 18.6769 17.0143 18.5355C17.3555 18.3942 17.6655 18.187 17.9267 17.9258C18.1879 17.6647 18.395 17.3546 18.5364 17.0134C18.6777 16.6722 18.7505 16.3064 18.7505 15.9371C18.7505 15.5677 18.6777 15.202 18.5364 14.8608C18.395 14.5196 18.1879 14.2095 17.9267 13.9483L15.1717 11.1942C14.7494 11.254 14.3217 11.2661 13.8967 11.23C13.5684 11.2017 13.3284 11.225 13.1742 11.265C13.1254 11.2753 13.0785 11.293 13.035 11.3175L10.4634 14.4408ZM13.3084 13.3075C13.4256 13.1905 13.5844 13.1247 13.75 13.1247C13.9157 13.1247 14.0745 13.1905 14.1917 13.3075L15.7542 14.8708C15.8156 14.9281 15.8649 14.9971 15.899 15.0737C15.9332 15.1504 15.9516 15.2331 15.953 15.3171C15.9545 15.401 15.9391 15.4843 15.9076 15.5622C15.8762 15.64 15.8294 15.7107 15.7701 15.77C15.7107 15.8294 15.64 15.8762 15.5622 15.9076C15.4844 15.939 15.401 15.9545 15.3171 15.953C15.2332 15.9515 15.1504 15.9331 15.0738 15.899C14.9971 15.8648 14.9281 15.8156 14.8709 15.7542L13.3084 14.1917C13.1913 14.0745 13.1256 13.9156 13.1256 13.75C13.1256 13.5844 13.1913 13.4255 13.3084 13.3083V13.3075Z" fill="white" />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Mission Requests
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

                                                <ul className={`mt-1 ${!open && "hidden"}`}>

                                                    <li className="mb-1 last:mb-0 menu-legend">
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Staff
                                                            </span>

                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/staff/create"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Staff Create
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/staff"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Staff List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0 menu-legend">
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                User Info
                                                            </span>

                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/user"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                user
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0 menu-legend">
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Agency
                                                            </span>

                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/agency/create"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Agency Create
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/agency"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Agency List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0 menu-legend">
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Mision Cluster
                                                            </span>

                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/mission-cluster/create"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Cluster Create
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/mission-cluster"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Cluster List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0 menu-legend">
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Mission Classification
                                                            </span>

                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/mission-classification/create"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Classification Create
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/mission-classification"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Classification List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0 menu-legend">
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Country
                                                            </span>

                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/country"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Country List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/country/create"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Country Create
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0 menu-legend">
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Vehicle
                                                            </span>

                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/vehicle"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Vehicle List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/vehicle/create"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Vehicle Create
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="mb-1 last:mb-0 menu-legend">
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Mission
                                                            </span>

                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="admin/mission/mission-list"
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

                                                    <li className="mb-1 last:mb-0 menu-legend">
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Unrwa
                                                            </span>

                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/umrah"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Unrwa List
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/umrah/create"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Unrwa
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/premise-type"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Premise Type
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/premise-type/create"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Premise Type
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="mb-1 last:mb-0 menu-legend">
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Setting
                                                            </span>

                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/setting"
                                                            className={({ isActive }) =>
                                                                "text-slate-200 block transition duration-150 truncate " +
                                                                (isActive
                                                                    ? "text-indigo-500"
                                                                    : "text-slate-400 hover:text-slate-200")
                                                            }

                                                        >
                                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Setting
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

export default Sidebar;