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
                                                            Staff
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

                                                </ul>
                                            </div>
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
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.0001 5.625C9.99988 4.94166 10.1598 4.26779 10.4669 3.65737C10.7741 3.04696 11.2199 2.51698 11.7688 2.1099C12.3176 1.70282 12.9542 1.42997 13.6275 1.3132C14.3007 1.19644 14.992 1.239 15.6459 1.4375C15.7492 1.4688 15.8427 1.52635 15.9172 1.60454C15.9917 1.68272 16.0446 1.77887 16.0709 1.88361C16.0972 1.98835 16.0959 2.09811 16.0671 2.20219C16.0383 2.30627 15.9831 2.40112 15.9067 2.4775L13.1401 5.24333C13.1926 5.63916 13.3701 6.02166 13.6742 6.32583C13.9784 6.63 14.3609 6.8075 14.7576 6.85916L17.5226 4.09333C17.5989 4.01699 17.6938 3.96174 17.7979 3.93297C17.9019 3.90419 18.0117 3.90287 18.1164 3.92914C18.2212 3.95541 18.3173 4.00837 18.3955 4.08286C18.4737 4.15734 18.5312 4.25082 18.5626 4.35416C18.7702 5.03821 18.8071 5.76272 18.67 6.46433C18.5329 7.16593 18.2259 7.82324 17.776 8.37876C17.326 8.93428 16.7468 9.37108 16.089 9.65095C15.4312 9.93082 14.7148 10.0452 14.0026 9.98416C13.1542 9.9125 12.4442 10.0675 12.0784 10.5125L6.12005 17.75C5.87609 18.0448 5.57325 18.2854 5.23092 18.4564C4.8886 18.6274 4.51434 18.7251 4.1321 18.7431C3.74987 18.7611 3.36808 18.6991 3.0112 18.561C2.65431 18.423 2.33018 18.2119 2.05957 17.9414C1.78896 17.6708 1.57783 17.3467 1.4397 16.9899C1.30157 16.633 1.23948 16.2512 1.25741 15.869C1.27534 15.4868 1.3729 15.1125 1.54383 14.7701C1.71476 14.4278 1.9553 14.1249 2.25005 13.8808L9.48672 7.92166C9.93089 7.555 10.0867 6.84583 10.0151 5.9975C10.0049 5.87359 9.99985 5.74932 10.0001 5.625ZM3.43089 15.9375C3.43089 15.7717 3.49673 15.6128 3.61394 15.4956C3.73115 15.3783 3.89013 15.3125 4.05589 15.3125H4.06255C4.22831 15.3125 4.38728 15.3783 4.50449 15.4956C4.6217 15.6128 4.68755 15.7717 4.68755 15.9375V15.9442C4.68755 16.1099 4.6217 16.2689 4.50449 16.3861C4.38728 16.5033 4.22831 16.5692 4.06255 16.5692H4.05589C3.89013 16.5692 3.73115 16.5033 3.61394 16.3861C3.49673 16.2689 3.43089 16.1099 3.43089 15.9442V15.9375Z" fill="white" />
                                                            <path d="M8.39668 7.2L6.56252 5.36666V4.06166C6.56251 3.95376 6.53457 3.8477 6.48141 3.7538C6.42826 3.6599 6.3517 3.58136 6.25918 3.52583L3.13418 1.65083C3.01466 1.57918 2.87462 1.54953 2.73632 1.56659C2.59801 1.58365 2.46938 1.64645 2.37085 1.745L1.74585 2.37C1.6473 2.46852 1.58451 2.59716 1.56745 2.73546C1.55039 2.87377 1.58003 3.01381 1.65168 3.13333L3.52668 6.25833C3.58222 6.35084 3.66075 6.4274 3.75465 6.48056C3.84855 6.53372 3.95462 6.56166 4.06252 6.56166H5.36585L7.08418 8.28L8.39668 7.19916V7.2Z" fill="white" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.4634 14.4408L13.9492 17.9258C14.2104 18.187 14.5204 18.3942 14.8617 18.5355C15.2029 18.6769 15.5686 18.7496 15.938 18.7496C16.3073 18.7496 16.673 18.6769 17.0143 18.5355C17.3555 18.3942 17.6655 18.187 17.9267 17.9258C18.1879 17.6647 18.395 17.3546 18.5364 17.0134C18.6777 16.6722 18.7505 16.3064 18.7505 15.9371C18.7505 15.5677 18.6777 15.202 18.5364 14.8608C18.395 14.5196 18.1879 14.2095 17.9267 13.9483L15.1717 11.1942C14.7494 11.254 14.3217 11.2661 13.8967 11.23C13.5684 11.2017 13.3284 11.225 13.1742 11.265C13.1254 11.2753 13.0785 11.293 13.035 11.3175L10.4634 14.4408ZM13.3084 13.3075C13.4256 13.1905 13.5844 13.1247 13.75 13.1247C13.9157 13.1247 14.0745 13.1905 14.1917 13.3075L15.7542 14.8708C15.8156 14.9281 15.8649 14.9971 15.899 15.0737C15.9332 15.1504 15.9516 15.2331 15.953 15.3171C15.9545 15.401 15.9391 15.4843 15.9076 15.5622C15.8762 15.64 15.8294 15.7107 15.7701 15.77C15.7107 15.8294 15.64 15.8762 15.5622 15.9076C15.4844 15.939 15.401 15.9545 15.3171 15.953C15.2332 15.9515 15.1504 15.9331 15.0738 15.899C14.9971 15.8648 14.9281 15.8156 14.8709 15.7542L13.3084 14.1917C13.1913 14.0745 13.1256 13.9156 13.1256 13.75C13.1256 13.5844 13.1913 13.4255 13.3084 13.3083V13.3075Z" fill="white" />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            User Info
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

                                                </ul>
                                            </div>
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

                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.0001 5.625C9.99988 4.94166 10.1598 4.26779 10.4669 3.65737C10.7741 3.04696 11.2199 2.51698 11.7688 2.1099C12.3176 1.70282 12.9542 1.42997 13.6275 1.3132C14.3007 1.19644 14.992 1.239 15.6459 1.4375C15.7492 1.4688 15.8427 1.52635 15.9172 1.60454C15.9917 1.68272 16.0446 1.77887 16.0709 1.88361C16.0972 1.98835 16.0959 2.09811 16.0671 2.20219C16.0383 2.30627 15.9831 2.40112 15.9067 2.4775L13.1401 5.24333C13.1926 5.63916 13.3701 6.02166 13.6742 6.32583C13.9784 6.63 14.3609 6.8075 14.7576 6.85916L17.5226 4.09333C17.5989 4.01699 17.6938 3.96174 17.7979 3.93297C17.9019 3.90419 18.0117 3.90287 18.1164 3.92914C18.2212 3.95541 18.3173 4.00837 18.3955 4.08286C18.4737 4.15734 18.5312 4.25082 18.5626 4.35416C18.7702 5.03821 18.8071 5.76272 18.67 6.46433C18.5329 7.16593 18.2259 7.82324 17.776 8.37876C17.326 8.93428 16.7468 9.37108 16.089 9.65095C15.4312 9.93082 14.7148 10.0452 14.0026 9.98416C13.1542 9.9125 12.4442 10.0675 12.0784 10.5125L6.12005 17.75C5.87609 18.0448 5.57325 18.2854 5.23092 18.4564C4.8886 18.6274 4.51434 18.7251 4.1321 18.7431C3.74987 18.7611 3.36808 18.6991 3.0112 18.561C2.65431 18.423 2.33018 18.2119 2.05957 17.9414C1.78896 17.6708 1.57783 17.3467 1.4397 16.9899C1.30157 16.633 1.23948 16.2512 1.25741 15.869C1.27534 15.4868 1.3729 15.1125 1.54383 14.7701C1.71476 14.4278 1.9553 14.1249 2.25005 13.8808L9.48672 7.92166C9.93089 7.555 10.0867 6.84583 10.0151 5.9975C10.0049 5.87359 9.99985 5.74932 10.0001 5.625ZM3.43089 15.9375C3.43089 15.7717 3.49673 15.6128 3.61394 15.4956C3.73115 15.3783 3.89013 15.3125 4.05589 15.3125H4.06255C4.22831 15.3125 4.38728 15.3783 4.50449 15.4956C4.6217 15.6128 4.68755 15.7717 4.68755 15.9375V15.9442C4.68755 16.1099 4.6217 16.2689 4.50449 16.3861C4.38728 16.5033 4.22831 16.5692 4.06255 16.5692H4.05589C3.89013 16.5692 3.73115 16.5033 3.61394 16.3861C3.49673 16.2689 3.43089 16.1099 3.43089 15.9442V15.9375Z" fill="white" />
                                                            <path d="M8.39668 7.2L6.56252 5.36666V4.06166C6.56251 3.95376 6.53457 3.8477 6.48141 3.7538C6.42826 3.6599 6.3517 3.58136 6.25918 3.52583L3.13418 1.65083C3.01466 1.57918 2.87462 1.54953 2.73632 1.56659C2.59801 1.58365 2.46938 1.64645 2.37085 1.745L1.74585 2.37C1.6473 2.46852 1.58451 2.59716 1.56745 2.73546C1.55039 2.87377 1.58003 3.01381 1.65168 3.13333L3.52668 6.25833C3.58222 6.35084 3.66075 6.4274 3.75465 6.48056C3.84855 6.53372 3.95462 6.56166 4.06252 6.56166H5.36585L7.08418 8.28L8.39668 7.19916V7.2Z" fill="white" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.4634 14.4408L13.9492 17.9258C14.2104 18.187 14.5204 18.3942 14.8617 18.5355C15.2029 18.6769 15.5686 18.7496 15.938 18.7496C16.3073 18.7496 16.673 18.6769 17.0143 18.5355C17.3555 18.3942 17.6655 18.187 17.9267 17.9258C18.1879 17.6647 18.395 17.3546 18.5364 17.0134C18.6777 16.6722 18.7505 16.3064 18.7505 15.9371C18.7505 15.5677 18.6777 15.202 18.5364 14.8608C18.395 14.5196 18.1879 14.2095 17.9267 13.9483L15.1717 11.1942C14.7494 11.254 14.3217 11.2661 13.8967 11.23C13.5684 11.2017 13.3284 11.225 13.1742 11.265C13.1254 11.2753 13.0785 11.293 13.035 11.3175L10.4634 14.4408ZM13.3084 13.3075C13.4256 13.1905 13.5844 13.1247 13.75 13.1247C13.9157 13.1247 14.0745 13.1905 14.1917 13.3075L15.7542 14.8708C15.8156 14.9281 15.8649 14.9971 15.899 15.0737C15.9332 15.1504 15.9516 15.2331 15.953 15.3171C15.9545 15.401 15.9391 15.4843 15.9076 15.5622C15.8762 15.64 15.8294 15.7107 15.7701 15.77C15.7107 15.8294 15.64 15.8762 15.5622 15.9076C15.4844 15.939 15.401 15.9545 15.3171 15.953C15.2332 15.9515 15.1504 15.9331 15.0738 15.899C14.9971 15.8648 14.9281 15.8156 14.8709 15.7542L13.3084 14.1917C13.1913 14.0745 13.1256 13.9156 13.1256 13.75C13.1256 13.5844 13.1913 13.4255 13.3084 13.3083V13.3075Z" fill="white" />
                                                        </svg>

                                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Agency
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

                                                </ul>
                                            </div>
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

                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.0001 5.625C9.99988 4.94166 10.1598 4.26779 10.4669 3.65737C10.7741 3.04696 11.2199 2.51698 11.7688 2.1099C12.3176 1.70282 12.9542 1.42997 13.6275 1.3132C14.3007 1.19644 14.992 1.239 15.6459 1.4375C15.7492 1.4688 15.8427 1.52635 15.9172 1.60454C15.9917 1.68272 16.0446 1.77887 16.0709 1.88361C16.0972 1.98835 16.0959 2.09811 16.0671 2.20219C16.0383 2.30627 15.9831 2.40112 15.9067 2.4775L13.1401 5.24333C13.1926 5.63916 13.3701 6.02166 13.6742 6.32583C13.9784 6.63 14.3609 6.8075 14.7576 6.85916L17.5226 4.09333C17.5989 4.01699 17.6938 3.96174 17.7979 3.93297C17.9019 3.90419 18.0117 3.90287 18.1164 3.92914C18.2212 3.95541 18.3173 4.00837 18.3955 4.08286C18.4737 4.15734 18.5312 4.25082 18.5626 4.35416C18.7702 5.03821 18.8071 5.76272 18.67 6.46433C18.5329 7.16593 18.2259 7.82324 17.776 8.37876C17.326 8.93428 16.7468 9.37108 16.089 9.65095C15.4312 9.93082 14.7148 10.0452 14.0026 9.98416C13.1542 9.9125 12.4442 10.0675 12.0784 10.5125L6.12005 17.75C5.87609 18.0448 5.57325 18.2854 5.23092 18.4564C4.8886 18.6274 4.51434 18.7251 4.1321 18.7431C3.74987 18.7611 3.36808 18.6991 3.0112 18.561C2.65431 18.423 2.33018 18.2119 2.05957 17.9414C1.78896 17.6708 1.57783 17.3467 1.4397 16.9899C1.30157 16.633 1.23948 16.2512 1.25741 15.869C1.27534 15.4868 1.3729 15.1125 1.54383 14.7701C1.71476 14.4278 1.9553 14.1249 2.25005 13.8808L9.48672 7.92166C9.93089 7.555 10.0867 6.84583 10.0151 5.9975C10.0049 5.87359 9.99985 5.74932 10.0001 5.625ZM3.43089 15.9375C3.43089 15.7717 3.49673 15.6128 3.61394 15.4956C3.73115 15.3783 3.89013 15.3125 4.05589 15.3125H4.06255C4.22831 15.3125 4.38728 15.3783 4.50449 15.4956C4.6217 15.6128 4.68755 15.7717 4.68755 15.9375V15.9442C4.68755 16.1099 4.6217 16.2689 4.50449 16.3861C4.38728 16.5033 4.22831 16.5692 4.06255 16.5692H4.05589C3.89013 16.5692 3.73115 16.5033 3.61394 16.3861C3.49673 16.2689 3.43089 16.1099 3.43089 15.9442V15.9375Z" fill="white" />
                                                            <path d="M8.39668 7.2L6.56252 5.36666V4.06166C6.56251 3.95376 6.53457 3.8477 6.48141 3.7538C6.42826 3.6599 6.3517 3.58136 6.25918 3.52583L3.13418 1.65083C3.01466 1.57918 2.87462 1.54953 2.73632 1.56659C2.59801 1.58365 2.46938 1.64645 2.37085 1.745L1.74585 2.37C1.6473 2.46852 1.58451 2.59716 1.56745 2.73546C1.55039 2.87377 1.58003 3.01381 1.65168 3.13333L3.52668 6.25833C3.58222 6.35084 3.66075 6.4274 3.75465 6.48056C3.84855 6.53372 3.95462 6.56166 4.06252 6.56166H5.36585L7.08418 8.28L8.39668 7.19916V7.2Z" fill="white" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.4634 14.4408L13.9492 17.9258C14.2104 18.187 14.5204 18.3942 14.8617 18.5355C15.2029 18.6769 15.5686 18.7496 15.938 18.7496C16.3073 18.7496 16.673 18.6769 17.0143 18.5355C17.3555 18.3942 17.6655 18.187 17.9267 17.9258C18.1879 17.6647 18.395 17.3546 18.5364 17.0134C18.6777 16.6722 18.7505 16.3064 18.7505 15.9371C18.7505 15.5677 18.6777 15.202 18.5364 14.8608C18.395 14.5196 18.1879 14.2095 17.9267 13.9483L15.1717 11.1942C14.7494 11.254 14.3217 11.2661 13.8967 11.23C13.5684 11.2017 13.3284 11.225 13.1742 11.265C13.1254 11.2753 13.0785 11.293 13.035 11.3175L10.4634 14.4408ZM13.3084 13.3075C13.4256 13.1905 13.5844 13.1247 13.75 13.1247C13.9157 13.1247 14.0745 13.1905 14.1917 13.3075L15.7542 14.8708C15.8156 14.9281 15.8649 14.9971 15.899 15.0737C15.9332 15.1504 15.9516 15.2331 15.953 15.3171C15.9545 15.401 15.9391 15.4843 15.9076 15.5622C15.8762 15.64 15.8294 15.7107 15.7701 15.77C15.7107 15.8294 15.64 15.8762 15.5622 15.9076C15.4844 15.939 15.401 15.9545 15.3171 15.953C15.2332 15.9515 15.1504 15.9331 15.0738 15.899C14.9971 15.8648 14.9281 15.8156 14.8709 15.7542L13.3084 14.1917C13.1913 14.0745 13.1256 13.9156 13.1256 13.75C13.1256 13.5844 13.1913 13.4255 13.3084 13.3083V13.3075Z" fill="white" />
                                                        </svg>

                                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Mision Cluster
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

                                                </ul>
                                            </div>
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

                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.0001 5.625C9.99988 4.94166 10.1598 4.26779 10.4669 3.65737C10.7741 3.04696 11.2199 2.51698 11.7688 2.1099C12.3176 1.70282 12.9542 1.42997 13.6275 1.3132C14.3007 1.19644 14.992 1.239 15.6459 1.4375C15.7492 1.4688 15.8427 1.52635 15.9172 1.60454C15.9917 1.68272 16.0446 1.77887 16.0709 1.88361C16.0972 1.98835 16.0959 2.09811 16.0671 2.20219C16.0383 2.30627 15.9831 2.40112 15.9067 2.4775L13.1401 5.24333C13.1926 5.63916 13.3701 6.02166 13.6742 6.32583C13.9784 6.63 14.3609 6.8075 14.7576 6.85916L17.5226 4.09333C17.5989 4.01699 17.6938 3.96174 17.7979 3.93297C17.9019 3.90419 18.0117 3.90287 18.1164 3.92914C18.2212 3.95541 18.3173 4.00837 18.3955 4.08286C18.4737 4.15734 18.5312 4.25082 18.5626 4.35416C18.7702 5.03821 18.8071 5.76272 18.67 6.46433C18.5329 7.16593 18.2259 7.82324 17.776 8.37876C17.326 8.93428 16.7468 9.37108 16.089 9.65095C15.4312 9.93082 14.7148 10.0452 14.0026 9.98416C13.1542 9.9125 12.4442 10.0675 12.0784 10.5125L6.12005 17.75C5.87609 18.0448 5.57325 18.2854 5.23092 18.4564C4.8886 18.6274 4.51434 18.7251 4.1321 18.7431C3.74987 18.7611 3.36808 18.6991 3.0112 18.561C2.65431 18.423 2.33018 18.2119 2.05957 17.9414C1.78896 17.6708 1.57783 17.3467 1.4397 16.9899C1.30157 16.633 1.23948 16.2512 1.25741 15.869C1.27534 15.4868 1.3729 15.1125 1.54383 14.7701C1.71476 14.4278 1.9553 14.1249 2.25005 13.8808L9.48672 7.92166C9.93089 7.555 10.0867 6.84583 10.0151 5.9975C10.0049 5.87359 9.99985 5.74932 10.0001 5.625ZM3.43089 15.9375C3.43089 15.7717 3.49673 15.6128 3.61394 15.4956C3.73115 15.3783 3.89013 15.3125 4.05589 15.3125H4.06255C4.22831 15.3125 4.38728 15.3783 4.50449 15.4956C4.6217 15.6128 4.68755 15.7717 4.68755 15.9375V15.9442C4.68755 16.1099 4.6217 16.2689 4.50449 16.3861C4.38728 16.5033 4.22831 16.5692 4.06255 16.5692H4.05589C3.89013 16.5692 3.73115 16.5033 3.61394 16.3861C3.49673 16.2689 3.43089 16.1099 3.43089 15.9442V15.9375Z" fill="white" />
                                                            <path d="M8.39668 7.2L6.56252 5.36666V4.06166C6.56251 3.95376 6.53457 3.8477 6.48141 3.7538C6.42826 3.6599 6.3517 3.58136 6.25918 3.52583L3.13418 1.65083C3.01466 1.57918 2.87462 1.54953 2.73632 1.56659C2.59801 1.58365 2.46938 1.64645 2.37085 1.745L1.74585 2.37C1.6473 2.46852 1.58451 2.59716 1.56745 2.73546C1.55039 2.87377 1.58003 3.01381 1.65168 3.13333L3.52668 6.25833C3.58222 6.35084 3.66075 6.4274 3.75465 6.48056C3.84855 6.53372 3.95462 6.56166 4.06252 6.56166H5.36585L7.08418 8.28L8.39668 7.19916V7.2Z" fill="white" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.4634 14.4408L13.9492 17.9258C14.2104 18.187 14.5204 18.3942 14.8617 18.5355C15.2029 18.6769 15.5686 18.7496 15.938 18.7496C16.3073 18.7496 16.673 18.6769 17.0143 18.5355C17.3555 18.3942 17.6655 18.187 17.9267 17.9258C18.1879 17.6647 18.395 17.3546 18.5364 17.0134C18.6777 16.6722 18.7505 16.3064 18.7505 15.9371C18.7505 15.5677 18.6777 15.202 18.5364 14.8608C18.395 14.5196 18.1879 14.2095 17.9267 13.9483L15.1717 11.1942C14.7494 11.254 14.3217 11.2661 13.8967 11.23C13.5684 11.2017 13.3284 11.225 13.1742 11.265C13.1254 11.2753 13.0785 11.293 13.035 11.3175L10.4634 14.4408ZM13.3084 13.3075C13.4256 13.1905 13.5844 13.1247 13.75 13.1247C13.9157 13.1247 14.0745 13.1905 14.1917 13.3075L15.7542 14.8708C15.8156 14.9281 15.8649 14.9971 15.899 15.0737C15.9332 15.1504 15.9516 15.2331 15.953 15.3171C15.9545 15.401 15.9391 15.4843 15.9076 15.5622C15.8762 15.64 15.8294 15.7107 15.7701 15.77C15.7107 15.8294 15.64 15.8762 15.5622 15.9076C15.4844 15.939 15.401 15.9545 15.3171 15.953C15.2332 15.9515 15.1504 15.9331 15.0738 15.899C14.9971 15.8648 14.9281 15.8156 14.8709 15.7542L13.3084 14.1917C13.1913 14.0745 13.1256 13.9156 13.1256 13.75C13.1256 13.5844 13.1913 13.4255 13.3084 13.3083V13.3075Z" fill="white" />
                                                        </svg>

                                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Mission Classification
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

                                                </ul>
                                            </div>
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
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.0001 5.625C9.99988 4.94166 10.1598 4.26779 10.4669 3.65737C10.7741 3.04696 11.2199 2.51698 11.7688 2.1099C12.3176 1.70282 12.9542 1.42997 13.6275 1.3132C14.3007 1.19644 14.992 1.239 15.6459 1.4375C15.7492 1.4688 15.8427 1.52635 15.9172 1.60454C15.9917 1.68272 16.0446 1.77887 16.0709 1.88361C16.0972 1.98835 16.0959 2.09811 16.0671 2.20219C16.0383 2.30627 15.9831 2.40112 15.9067 2.4775L13.1401 5.24333C13.1926 5.63916 13.3701 6.02166 13.6742 6.32583C13.9784 6.63 14.3609 6.8075 14.7576 6.85916L17.5226 4.09333C17.5989 4.01699 17.6938 3.96174 17.7979 3.93297C17.9019 3.90419 18.0117 3.90287 18.1164 3.92914C18.2212 3.95541 18.3173 4.00837 18.3955 4.08286C18.4737 4.15734 18.5312 4.25082 18.5626 4.35416C18.7702 5.03821 18.8071 5.76272 18.67 6.46433C18.5329 7.16593 18.2259 7.82324 17.776 8.37876C17.326 8.93428 16.7468 9.37108 16.089 9.65095C15.4312 9.93082 14.7148 10.0452 14.0026 9.98416C13.1542 9.9125 12.4442 10.0675 12.0784 10.5125L6.12005 17.75C5.87609 18.0448 5.57325 18.2854 5.23092 18.4564C4.8886 18.6274 4.51434 18.7251 4.1321 18.7431C3.74987 18.7611 3.36808 18.6991 3.0112 18.561C2.65431 18.423 2.33018 18.2119 2.05957 17.9414C1.78896 17.6708 1.57783 17.3467 1.4397 16.9899C1.30157 16.633 1.23948 16.2512 1.25741 15.869C1.27534 15.4868 1.3729 15.1125 1.54383 14.7701C1.71476 14.4278 1.9553 14.1249 2.25005 13.8808L9.48672 7.92166C9.93089 7.555 10.0867 6.84583 10.0151 5.9975C10.0049 5.87359 9.99985 5.74932 10.0001 5.625ZM3.43089 15.9375C3.43089 15.7717 3.49673 15.6128 3.61394 15.4956C3.73115 15.3783 3.89013 15.3125 4.05589 15.3125H4.06255C4.22831 15.3125 4.38728 15.3783 4.50449 15.4956C4.6217 15.6128 4.68755 15.7717 4.68755 15.9375V15.9442C4.68755 16.1099 4.6217 16.2689 4.50449 16.3861C4.38728 16.5033 4.22831 16.5692 4.06255 16.5692H4.05589C3.89013 16.5692 3.73115 16.5033 3.61394 16.3861C3.49673 16.2689 3.43089 16.1099 3.43089 15.9442V15.9375Z" fill="white" />
                                                            <path d="M8.39668 7.2L6.56252 5.36666V4.06166C6.56251 3.95376 6.53457 3.8477 6.48141 3.7538C6.42826 3.6599 6.3517 3.58136 6.25918 3.52583L3.13418 1.65083C3.01466 1.57918 2.87462 1.54953 2.73632 1.56659C2.59801 1.58365 2.46938 1.64645 2.37085 1.745L1.74585 2.37C1.6473 2.46852 1.58451 2.59716 1.56745 2.73546C1.55039 2.87377 1.58003 3.01381 1.65168 3.13333L3.52668 6.25833C3.58222 6.35084 3.66075 6.4274 3.75465 6.48056C3.84855 6.53372 3.95462 6.56166 4.06252 6.56166H5.36585L7.08418 8.28L8.39668 7.19916V7.2Z" fill="white" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.4634 14.4408L13.9492 17.9258C14.2104 18.187 14.5204 18.3942 14.8617 18.5355C15.2029 18.6769 15.5686 18.7496 15.938 18.7496C16.3073 18.7496 16.673 18.6769 17.0143 18.5355C17.3555 18.3942 17.6655 18.187 17.9267 17.9258C18.1879 17.6647 18.395 17.3546 18.5364 17.0134C18.6777 16.6722 18.7505 16.3064 18.7505 15.9371C18.7505 15.5677 18.6777 15.202 18.5364 14.8608C18.395 14.5196 18.1879 14.2095 17.9267 13.9483L15.1717 11.1942C14.7494 11.254 14.3217 11.2661 13.8967 11.23C13.5684 11.2017 13.3284 11.225 13.1742 11.265C13.1254 11.2753 13.0785 11.293 13.035 11.3175L10.4634 14.4408ZM13.3084 13.3075C13.4256 13.1905 13.5844 13.1247 13.75 13.1247C13.9157 13.1247 14.0745 13.1905 14.1917 13.3075L15.7542 14.8708C15.8156 14.9281 15.8649 14.9971 15.899 15.0737C15.9332 15.1504 15.9516 15.2331 15.953 15.3171C15.9545 15.401 15.9391 15.4843 15.9076 15.5622C15.8762 15.64 15.8294 15.7107 15.7701 15.77C15.7107 15.8294 15.64 15.8762 15.5622 15.9076C15.4844 15.939 15.401 15.9545 15.3171 15.953C15.2332 15.9515 15.1504 15.9331 15.0738 15.899C14.9971 15.8648 14.9281 15.8156 14.8709 15.7542L13.3084 14.1917C13.1913 14.0745 13.1256 13.9156 13.1256 13.75C13.1256 13.5844 13.1913 13.4255 13.3084 13.3083V13.3075Z" fill="white" />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Country
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

                                                </ul>
                                            </div>
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
                                                        {/* <svg
                                                            className="shrink-0 h-6 w-6"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                className={`fill-current ${
                                                                    pathname.includes("ecommerce")
                                                                        ? "text-indigo-300"
                                                                        : "text-slate-400"
                                                                }`}
                                                                d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                                                            />
                                                            <path
                                                                className={`fill-current ${
                                                                    pathname.includes("ecommerce")
                                                                        ? "text-indigo-600"
                                                                        : "text-slate-700"
                                                                }`}
                                                                d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                                                            />
                                                            <path
                                                                className={`fill-current ${
                                                                    pathname.includes("ecommerce")
                                                                        ? "text-indigo-500"
                                                                        : "text-slate-600"
                                                                }`}
                                                                d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                                                            />
                                                        </svg> */}

                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.8125 3.75C1.94917 3.75 1.25 4.45 1.25 5.3125V11.25H11.25V5.3125C11.25 4.44917 10.55 3.75 9.6875 3.75H2.8125ZM11.25 12.5H1.25V14.6875C1.25 15.55 1.95 16.25 2.8125 16.25H3.125C3.125 15.587 3.38839 14.9511 3.85723 14.4822C4.32607 14.0134 4.96196 13.75 5.625 13.75C6.28804 13.75 6.92393 14.0134 7.39277 14.4822C7.86161 14.9511 8.125 15.587 8.125 16.25H10.625C10.7908 16.25 10.9497 16.1842 11.0669 16.0669C11.1842 15.9497 11.25 15.7908 11.25 15.625V12.5Z" fill="white" />
                                                            <path d="M6.875 16.25C6.875 15.9185 6.7433 15.6005 6.50888 15.3661C6.27446 15.1317 5.95652 15 5.625 15C5.29348 15 4.97554 15.1317 4.74112 15.3661C4.5067 15.6005 4.375 15.9185 4.375 16.25C4.375 16.5815 4.5067 16.8995 4.74112 17.1339C4.97554 17.3683 5.29348 17.5 5.625 17.5C5.95652 17.5 6.27446 17.3683 6.50888 17.1339C6.7433 16.8995 6.875 16.5815 6.875 16.25ZM13.125 5.625C12.9592 5.625 12.8003 5.69085 12.6831 5.80806C12.5658 5.92527 12.5 6.08424 12.5 6.25V15.625C12.5 15.6975 12.5125 15.7667 12.535 15.8317C12.6389 15.216 12.9694 14.6614 13.4615 14.2771C13.9536 13.8928 14.5718 13.7066 15.1943 13.7551C15.8168 13.8035 16.3986 14.0832 16.8253 14.5391C17.252 14.9949 17.4927 15.594 17.5 16.2183C18.2108 16.0725 18.7683 15.4392 18.72 14.6492C18.5336 11.5978 17.4518 8.66909 15.61 6.22917C15.4665 6.0405 15.2812 5.88773 15.0686 5.78288C14.856 5.67804 14.622 5.62399 14.385 5.625H13.125Z" fill="white" />
                                                            <path d="M16.25 16.25C16.25 15.9185 16.1183 15.6005 15.8839 15.3661C15.6495 15.1317 15.3315 15 15 15C14.6685 15 14.3505 15.1317 14.1161 15.3661C13.8817 15.6005 13.75 15.9185 13.75 16.25C13.75 16.5815 13.8817 16.8995 14.1161 17.1339C14.3505 17.3683 14.6685 17.5 15 17.5C15.3315 17.5 15.6495 17.3683 15.8839 17.1339C16.1183 16.8995 16.25 16.5815 16.25 16.25Z" fill="white" />
                                                        </svg>

                                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Vehicle
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

                                                </ul>
                                            </div>
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
                                                        <svg
                                                            className="shrink-0 h-6 w-6"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                className={`fill-current ${pathname.includes("ecommerce")
                                                                        ? "text-indigo-300"
                                                                        : "text-slate-400"
                                                                    }`}
                                                                d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                                                            />
                                                            <path
                                                                className={`fill-current ${pathname.includes("ecommerce")
                                                                        ? "text-indigo-600"
                                                                        : "text-slate-700"
                                                                    }`}
                                                                d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                                                            />
                                                            <path
                                                                className={`fill-current ${pathname.includes("ecommerce")
                                                                        ? "text-indigo-500"
                                                                        : "text-slate-600"
                                                                    }`}
                                                                d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                                                            />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Unrwa
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

                                                </ul>
                                            </div>
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
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.0001 5.625C9.99988 4.94166 10.1598 4.26779 10.4669 3.65737C10.7741 3.04696 11.2199 2.51698 11.7688 2.1099C12.3176 1.70282 12.9542 1.42997 13.6275 1.3132C14.3007 1.19644 14.992 1.239 15.6459 1.4375C15.7492 1.4688 15.8427 1.52635 15.9172 1.60454C15.9917 1.68272 16.0446 1.77887 16.0709 1.88361C16.0972 1.98835 16.0959 2.09811 16.0671 2.20219C16.0383 2.30627 15.9831 2.40112 15.9067 2.4775L13.1401 5.24333C13.1926 5.63916 13.3701 6.02166 13.6742 6.32583C13.9784 6.63 14.3609 6.8075 14.7576 6.85916L17.5226 4.09333C17.5989 4.01699 17.6938 3.96174 17.7979 3.93297C17.9019 3.90419 18.0117 3.90287 18.1164 3.92914C18.2212 3.95541 18.3173 4.00837 18.3955 4.08286C18.4737 4.15734 18.5312 4.25082 18.5626 4.35416C18.7702 5.03821 18.8071 5.76272 18.67 6.46433C18.5329 7.16593 18.2259 7.82324 17.776 8.37876C17.326 8.93428 16.7468 9.37108 16.089 9.65095C15.4312 9.93082 14.7148 10.0452 14.0026 9.98416C13.1542 9.9125 12.4442 10.0675 12.0784 10.5125L6.12005 17.75C5.87609 18.0448 5.57325 18.2854 5.23092 18.4564C4.8886 18.6274 4.51434 18.7251 4.1321 18.7431C3.74987 18.7611 3.36808 18.6991 3.0112 18.561C2.65431 18.423 2.33018 18.2119 2.05957 17.9414C1.78896 17.6708 1.57783 17.3467 1.4397 16.9899C1.30157 16.633 1.23948 16.2512 1.25741 15.869C1.27534 15.4868 1.3729 15.1125 1.54383 14.7701C1.71476 14.4278 1.9553 14.1249 2.25005 13.8808L9.48672 7.92166C9.93089 7.555 10.0867 6.84583 10.0151 5.9975C10.0049 5.87359 9.99985 5.74932 10.0001 5.625ZM3.43089 15.9375C3.43089 15.7717 3.49673 15.6128 3.61394 15.4956C3.73115 15.3783 3.89013 15.3125 4.05589 15.3125H4.06255C4.22831 15.3125 4.38728 15.3783 4.50449 15.4956C4.6217 15.6128 4.68755 15.7717 4.68755 15.9375V15.9442C4.68755 16.1099 4.6217 16.2689 4.50449 16.3861C4.38728 16.5033 4.22831 16.5692 4.06255 16.5692H4.05589C3.89013 16.5692 3.73115 16.5033 3.61394 16.3861C3.49673 16.2689 3.43089 16.1099 3.43089 15.9442V15.9375Z" fill="white" />
                                                            <path d="M8.39668 7.2L6.56252 5.36666V4.06166C6.56251 3.95376 6.53457 3.8477 6.48141 3.7538C6.42826 3.6599 6.3517 3.58136 6.25918 3.52583L3.13418 1.65083C3.01466 1.57918 2.87462 1.54953 2.73632 1.56659C2.59801 1.58365 2.46938 1.64645 2.37085 1.745L1.74585 2.37C1.6473 2.46852 1.58451 2.59716 1.56745 2.73546C1.55039 2.87377 1.58003 3.01381 1.65168 3.13333L3.52668 6.25833C3.58222 6.35084 3.66075 6.4274 3.75465 6.48056C3.84855 6.53372 3.95462 6.56166 4.06252 6.56166H5.36585L7.08418 8.28L8.39668 7.19916V7.2Z" fill="white" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.4634 14.4408L13.9492 17.9258C14.2104 18.187 14.5204 18.3942 14.8617 18.5355C15.2029 18.6769 15.5686 18.7496 15.938 18.7496C16.3073 18.7496 16.673 18.6769 17.0143 18.5355C17.3555 18.3942 17.6655 18.187 17.9267 17.9258C18.1879 17.6647 18.395 17.3546 18.5364 17.0134C18.6777 16.6722 18.7505 16.3064 18.7505 15.9371C18.7505 15.5677 18.6777 15.202 18.5364 14.8608C18.395 14.5196 18.1879 14.2095 17.9267 13.9483L15.1717 11.1942C14.7494 11.254 14.3217 11.2661 13.8967 11.23C13.5684 11.2017 13.3284 11.225 13.1742 11.265C13.1254 11.2753 13.0785 11.293 13.035 11.3175L10.4634 14.4408ZM13.3084 13.3075C13.4256 13.1905 13.5844 13.1247 13.75 13.1247C13.9157 13.1247 14.0745 13.1905 14.1917 13.3075L15.7542 14.8708C15.8156 14.9281 15.8649 14.9971 15.899 15.0737C15.9332 15.1504 15.9516 15.2331 15.953 15.3171C15.9545 15.401 15.9391 15.4843 15.9076 15.5622C15.8762 15.64 15.8294 15.7107 15.7701 15.77C15.7107 15.8294 15.64 15.8762 15.5622 15.9076C15.4844 15.939 15.401 15.9545 15.3171 15.953C15.2332 15.9515 15.1504 15.9331 15.0738 15.899C14.9971 15.8648 14.9281 15.8156 14.8709 15.7542L13.3084 14.1917C13.1913 14.0745 13.1256 13.9156 13.1256 13.75C13.1256 13.5844 13.1913 13.4255 13.3084 13.3083V13.3075Z" fill="white" />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Setting
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