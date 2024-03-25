import React, { useEffect, useRef, useState } from "react";

import { deleteCookie } from "cookies-next";
import Image from "next/image";
import Link from 'next/link';
import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
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
    const storedSidebarExpanded = false;

    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === true
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

    const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        // This forces a rerender, so the date is rendered
        // the second time but not the first
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    return (
        <div>
            {/* Sidebar backdrop (mobile only) */}
            <div
                className={`fixed inset-0 bg-slate-900 bg-opacity-30 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                aria-hidden="true"
                style={{ zIndex: 999999 }}
            ></div>

            {/* Sidebar */}
            <div
                id="sidebar"
                ref={sidebar}
                className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-auto lg:overflow-y-auto no-scrollbar lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-1 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-70"
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

                            width={150}
                            height={0}
                            alt='Image'
                        />
                    </Link>
                </div>

                {/* Links */}
                <div className="space-y-8">
                    {/* Pages group */}
                    <div>
                        <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                            <span className="lg:sidebar-expanded:block 2xl:block">
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

                                                        <svg width="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9.55837 3.20084C9.67556 3.08379 9.83441 3.01805 10 3.01805C10.1657 3.01805 10.3245 3.08379 10.4417 3.20084L17.6834 10.4425C17.7411 10.5022 17.81 10.5498 17.8863 10.5825C17.9626 10.6152 18.0446 10.6324 18.1276 10.6331C18.2106 10.6338 18.2929 10.6179 18.3697 10.5864C18.4465 10.555 18.5162 10.5085 18.5749 10.4498C18.6335 10.3911 18.6799 10.3213 18.7113 10.2445C18.7427 10.1677 18.7585 10.0854 18.7577 10.0024C18.7569 9.91938 18.7397 9.83738 18.7069 9.76114C18.6741 9.68491 18.6264 9.61596 18.5667 9.55834L11.3259 2.31667C11.1518 2.14256 10.9451 2.00444 10.7176 1.91021C10.4901 1.81599 10.2463 1.76749 10 1.76749C9.7538 1.76749 9.50998 1.81599 9.2825 1.91021C9.05501 2.00444 8.84831 2.14256 8.6742 2.31667L1.43253 9.55834C1.37287 9.61602 1.32529 9.68501 1.29257 9.76127C1.25985 9.83754 1.24265 9.91956 1.24196 10.0026C1.24128 10.0855 1.25714 10.1678 1.2886 10.2446C1.32006 10.3214 1.3665 10.3912 1.42521 10.4498C1.48392 10.5085 1.55372 10.5549 1.63055 10.5863C1.70737 10.6176 1.78968 10.6334 1.87267 10.6327C1.95565 10.6319 2.03766 10.6146 2.11389 10.5818C2.19013 10.549 2.25907 10.5014 2.3167 10.4417L9.55837 3.20084Z" fill="white" />
                                                            <path d="M10 4.52667L16.7992 11.3258C16.8242 11.3508 16.8492 11.3742 16.875 11.3975V16.5625C16.875 17.425 16.175 18.125 15.3125 18.125H12.5C12.3342 18.125 12.1753 18.0592 12.0581 17.9419C11.9408 17.8247 11.875 17.6658 11.875 17.5V13.75C11.875 13.5842 11.8092 13.4253 11.6919 13.3081C11.5747 13.1909 11.4158 13.125 11.25 13.125H8.75C8.58424 13.125 8.42527 13.1909 8.30806 13.3081C8.19085 13.4253 8.125 13.5842 8.125 13.75V17.5C8.125 17.6658 8.05915 17.8247 7.94194 17.9419C7.82473 18.0592 7.66576 18.125 7.5 18.125H4.6875C4.2731 18.125 3.87567 17.9604 3.58265 17.6674C3.28962 17.3743 3.125 16.9769 3.125 16.5625V11.3975C3.15093 11.3743 3.17621 11.3504 3.20083 11.3258L10 4.52667Z" fill="white" />
                                                        </svg>

                                                        <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
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
                                            <Link
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
                                                        <span className="text-sm font-medium ml-3 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
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
                                            </Link>

                                            <div className="lg:sidebar-expanded:block 2xl:block pl-5">

                                                <ul className={`mt-1 ${!open && "hidden"}`}>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/mission"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Mission
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/mission/mission-list"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Mission List
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
                                            <Link
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
                                                        <svg width="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.0001 5.625C9.99988 4.94166 10.1598 4.26779 10.4669 3.65737C10.7741 3.04696 11.2199 2.51698 11.7688 2.1099C12.3176 1.70282 12.9542 1.42997 13.6275 1.3132C14.3007 1.19644 14.992 1.239 15.6459 1.4375C15.7492 1.4688 15.8427 1.52635 15.9172 1.60454C15.9917 1.68272 16.0446 1.77887 16.0709 1.88361C16.0972 1.98835 16.0959 2.09811 16.0671 2.20219C16.0383 2.30627 15.9831 2.40112 15.9067 2.4775L13.1401 5.24333C13.1926 5.63916 13.3701 6.02166 13.6742 6.32583C13.9784 6.63 14.3609 6.8075 14.7576 6.85916L17.5226 4.09333C17.5989 4.01699 17.6938 3.96174 17.7979 3.93297C17.9019 3.90419 18.0117 3.90287 18.1164 3.92914C18.2212 3.95541 18.3173 4.00837 18.3955 4.08286C18.4737 4.15734 18.5312 4.25082 18.5626 4.35416C18.7702 5.03821 18.8071 5.76272 18.67 6.46433C18.5329 7.16593 18.2259 7.82324 17.776 8.37876C17.326 8.93428 16.7468 9.37108 16.089 9.65095C15.4312 9.93082 14.7148 10.0452 14.0026 9.98416C13.1542 9.9125 12.4442 10.0675 12.0784 10.5125L6.12005 17.75C5.87609 18.0448 5.57325 18.2854 5.23092 18.4564C4.8886 18.6274 4.51434 18.7251 4.1321 18.7431C3.74987 18.7611 3.36808 18.6991 3.0112 18.561C2.65431 18.423 2.33018 18.2119 2.05957 17.9414C1.78896 17.6708 1.57783 17.3467 1.4397 16.9899C1.30157 16.633 1.23948 16.2512 1.25741 15.869C1.27534 15.4868 1.3729 15.1125 1.54383 14.7701C1.71476 14.4278 1.9553 14.1249 2.25005 13.8808L9.48672 7.92166C9.93089 7.555 10.0867 6.84583 10.0151 5.9975C10.0049 5.87359 9.99985 5.74932 10.0001 5.625ZM3.43089 15.9375C3.43089 15.7717 3.49673 15.6128 3.61394 15.4956C3.73115 15.3783 3.89013 15.3125 4.05589 15.3125H4.06255C4.22831 15.3125 4.38728 15.3783 4.50449 15.4956C4.6217 15.6128 4.68755 15.7717 4.68755 15.9375V15.9442C4.68755 16.1099 4.6217 16.2689 4.50449 16.3861C4.38728 16.5033 4.22831 16.5692 4.06255 16.5692H4.05589C3.89013 16.5692 3.73115 16.5033 3.61394 16.3861C3.49673 16.2689 3.43089 16.1099 3.43089 15.9442V15.9375Z" fill="white" />
                                                            <path d="M8.39668 7.2L6.56252 5.36666V4.06166C6.56251 3.95376 6.53457 3.8477 6.48141 3.7538C6.42826 3.6599 6.3517 3.58136 6.25918 3.52583L3.13418 1.65083C3.01466 1.57918 2.87462 1.54953 2.73632 1.56659C2.59801 1.58365 2.46938 1.64645 2.37085 1.745L1.74585 2.37C1.6473 2.46852 1.58451 2.59716 1.56745 2.73546C1.55039 2.87377 1.58003 3.01381 1.65168 3.13333L3.52668 6.25833C3.58222 6.35084 3.66075 6.4274 3.75465 6.48056C3.84855 6.53372 3.95462 6.56166 4.06252 6.56166H5.36585L7.08418 8.28L8.39668 7.19916V7.2Z" fill="white" />
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M10.4634 14.4408L13.9492 17.9258C14.2104 18.187 14.5204 18.3942 14.8617 18.5355C15.2029 18.6769 15.5686 18.7496 15.938 18.7496C16.3073 18.7496 16.673 18.6769 17.0143 18.5355C17.3555 18.3942 17.6655 18.187 17.9267 17.9258C18.1879 17.6647 18.395 17.3546 18.5364 17.0134C18.6777 16.6722 18.7505 16.3064 18.7505 15.9371C18.7505 15.5677 18.6777 15.202 18.5364 14.8608C18.395 14.5196 18.1879 14.2095 17.9267 13.9483L15.1717 11.1942C14.7494 11.254 14.3217 11.2661 13.8967 11.23C13.5684 11.2017 13.3284 11.225 13.1742 11.265C13.1254 11.2753 13.0785 11.293 13.035 11.3175L10.4634 14.4408ZM13.3084 13.3075C13.4256 13.1905 13.5844 13.1247 13.75 13.1247C13.9157 13.1247 14.0745 13.1905 14.1917 13.3075L15.7542 14.8708C15.8156 14.9281 15.8649 14.9971 15.899 15.0737C15.9332 15.1504 15.9516 15.2331 15.953 15.3171C15.9545 15.401 15.9391 15.4843 15.9076 15.5622C15.8762 15.64 15.8294 15.7107 15.7701 15.77C15.7107 15.8294 15.64 15.8762 15.5622 15.9076C15.4844 15.939 15.401 15.9545 15.3171 15.953C15.2332 15.9515 15.1504 15.9331 15.0738 15.899C14.9971 15.8648 14.9281 15.8156 14.8709 15.7542L13.3084 14.1917C13.1913 14.0745 13.1256 13.9156 13.1256 13.75C13.1256 13.5844 13.1913 13.4255 13.3084 13.3083V13.3075Z" fill="white" />
                                                        </svg>
                                                        <span className="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Manage Reference Data
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
                                            </Link>

                                            <div className="lg:sidebar-expanded:block 2xl:block">

                                                <ul className={`mt-1 ${!open && "hidden"} has-legend`}>

                                                    <li className="mb-1 last:mb-0 menu-legend">
                                                        <svg width="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#ffffff" d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3V245.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V389.2C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416V394.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3V261.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V405.2c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112z" /></svg>
                                                        <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Staff
                                                        </span>

                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/staff/create"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Staff
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/staff"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Staff List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    {/* <li className="mb-1 last:mb-0 menu-legend">
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
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
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                user
                                                            </span>
                                                        </Link>
                                                    </li> */}

                                                    <li className="mb-1 last:mb-0 menu-legend">
                                                        <svg width={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M186.1 343.3c-9.7 9.7-9.7 25.3 0 34.9 9.7 9.7 25.3 9.7 34.9 0L378.2 221.1c19.3-19.3 50.6-19.3 69.9 0s19.3 50.6 0 69.9L294 445.1c19.3 19.3 50.5 19.3 69.8 0l0 0 119.3-119.2c38.6-38.6 38.6-101.1 0-139.7-38.6-38.6-101.2-38.6-139.7 0l-157.2 157.2zm244.5-104.8c-9.7-9.7-25.3-9.7-34.9 0l-157.2 157.2c-19.3 19.3-50.5 19.3-69.8 .1l-.1-.1c-9.6-9.6-25.3-9.7-34.9 0l0 0c-9.7 9.6-9.7 25.3 0 34.9l0 0c38.6 38.6 101.1 38.6 139.7 0l157.2-157.2c9.7-9.7 9.7-25.3 0-34.9zm-262 87.3l157.2-157.2c9.6-9.7 9.6-25.3 0-34.9-9.6-9.6-25.3-9.6-34.9 0L133.7 290.9c-19.3 19.3-50.6 19.3-69.9 0l0 0c-19.3-19.3-19.3-50.5 0-69.8l0 0L218 66.9c-19.3-19.3-50.6-19.3-69.9 0l0 0L28.9 186.1c-38.6 38.6-38.6 101.1 0 139.7 38.6 38.6 101.1 38.6 139.7 0zm-87.3-52.4c9.6 9.6 25.3 9.6 34.9 0l157.2-157.2c19.3-19.3 50.6-19.3 69.8 0l0 0c9.7 9.7 25.3 9.7 34.9 0 9.7-9.7 9.7-25.3 0-34.9-38.6-38.6-101.1-38.6-139.7 0L81.3 238.5c-9.7 9.6-9.7 25.3 0 34.9h0z" /></svg>
                                                        <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Agency
                                                        </span>

                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/agency/create"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Agency
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/agency"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Agency List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0 menu-legend">
                                                        <svg width={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#ffffff" d="M41 7C31.6-2.3 16.4-2.3 7 7S-2.3 31.6 7 41l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L41 7zM599 7L527 79c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l72-72c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0zM7 505c9.4 9.4 24.6 9.4 33.9 0l72-72c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L7 471c-9.4 9.4-9.4 24.6 0 33.9zm592 0c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-72-72c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l72 72zM320 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zM212.1 336c-2.7 7.5-4.1 15.6-4.1 24c0 13.3 10.7 24 24 24H408c13.3 0 24-10.7 24-24c0-8.4-1.4-16.5-4.1-24c-.5-1.4-1-2.7-1.6-4c-9.4-22.3-29.8-38.9-54.3-43c-3.9-.7-7.9-1-12-1H280c-4.1 0-8.1 .3-12 1c-.8 .1-1.7 .3-2.5 .5c-24.9 5.1-45.1 23-53.4 46.5zM175.8 224a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-26.5 32C119.9 256 96 279.9 96 309.3c0 14.7 11.9 26.7 26.7 26.7h56.1c8-34.1 32.8-61.7 65.2-73.6c-7.5-4.1-16.2-6.4-25.3-6.4H149.3zm368 80c14.7 0 26.7-11.9 26.7-26.7c0-29.5-23.9-53.3-53.3-53.3H421.3c-9.2 0-17.8 2.3-25.3 6.4c32.4 11.9 57.2 39.5 65.2 73.6h56.1zM464 224a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" /></svg>
                                                        <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Mission Cluster
                                                        </span>

                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/mission-cluster/create"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Cluster
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/mission-cluster"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Cluster List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0 menu-legend">
                                                        <svg width={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M80 104a24 24 0 1 0 0-48 24 24 0 1 0 0 48zm80-24c0 32.8-19.7 61-48 73.3v87.8c18.8-10.9 40.7-17.1 64-17.1h96c35.3 0 64-28.7 64-64v-6.7C307.7 141 288 112.8 288 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3V160c0 70.7-57.3 128-128 128H176c-35.3 0-64 28.7-64 64v6.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V352 153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80zm232 0a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM80 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" /></svg>
                                                        <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Mission Classification
                                                        </span>

                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/mission-classification/create"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Classification
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/mission-classification"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Classification List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0 menu-legend">
                                                        <svg width={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#ffffff" d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z" /></svg>
                                                        <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Country
                                                        </span>

                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/country/create"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Country
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/country"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Country List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0 menu-legend">
                                                        <svg width={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#ffffff" d="M112 0C85.5 0 64 21.5 64 48V96H16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 272c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 48c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 240c8.8 0 16 7.2 16 16s-7.2 16-16 16H64 16c-8.8 0-16 7.2-16 16s7.2 16 16 16H64 208c8.8 0 16 7.2 16 16s-7.2 16-16 16H64V416c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H112zM544 237.3V256H416V160h50.7L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" /></svg>
                                                        <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Vehicle
                                                        </span>

                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/vehicle/create"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Vehicle
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/vehicle"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Vehicle List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0 menu-legend">
                                                        <svg width={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
                                                        <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Facilities
                                                        </span>

                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/facilities/create"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Facility
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/facilities"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Facilities List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/premise-type/create"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Premise Type
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/premise-type"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Premise Type List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/department/create"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Department
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/department"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Department List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/acu_status/create"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create UNOPS
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/acu_status"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                UNOPS List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    {/* <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/request_status/create"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Request Status
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/request_status"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Request Status List
                                                            </span>
                                                        </Link>
                                                    </li> */}

                                                    {/* <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/cla_list/create"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create CLA List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/cla_list"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                CLA List
                                                            </span>
                                                        </Link>
                                                    </li> */}

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/area/create"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Area
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/area"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Area List
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/sub-area/create"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Sub Area
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/sub-area"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Sub Area List
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    {/* <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/coordinate-decision/create"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Coordinate Decision
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/coordinate-decision"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Coordinate Decision List
                                                            </span>
                                                        </Link>
                                                    </li> */}

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/cargo/create"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create Cargo
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/cargo"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Cargo List
                                                            </span>
                                                        </Link>
                                                    </li>
                                                    {/* <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/general_status/create"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                Create General Status
                                                            </span>
                                                        </Link>
                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/general_status"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                General Status List
                                                            </span>
                                                        </Link>
                                                    </li> */}

                                                    <li className="mb-1 last:mb-0 menu-legend">
                                                        <svg width={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" /></svg>
                                                        <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Setting
                                                        </span>

                                                    </li>

                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/admin/setting"

                                                        >
                                                            <span className="text-sm font-medium  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
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

                            <SidebarLinkGroup
                                activecondition={
                                    pathname === "/" || pathname.includes("dashboard")
                                }

                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <Link
                                                href="/login"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleSignOut();
                                                }}
                                                className={`block text-slate-200 truncate transition duration-150`}

                                            >

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">

                                                        <svg width={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg>

                                                        <span className="text-sm font-medium ml-3  lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                            Log Out
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

export default Sidebar;