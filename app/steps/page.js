"use client";
import { useState } from "react";

import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

function Steps() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [data, setData] = useState({
        name: "",
        email: "",
        dob: "",
        gender: "male",
        address: "",
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const [activeTab, setActiveTab] = useState(0)

    const formElements = [
        <Step1 data={data} handleChange={handleChange} />,
        <Step2 data={data} handleChange={handleChange} />,
        <Step3 data={data} setData={setData} />
    ]

    return (
        <div className='flex h-screen overflow-hidden'>
            {/* Sidebar */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Content area */}
            <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
                {/*  Site header */}
                <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <main>
                    <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
                        <div>{formElements[activeTab]}</div>
                        <div className='flex flex-wrap gap-x-6 mx-auto'>
                            <button
                                disabled={activeTab === 0 ? "disabled" : ""}
                                onClick={() => setActiveTab((prev) => prev - 1)}
                                className={`px-4 py-2 rounded-xl bg-blue-600 text-white ${
                                    activeTab === 0
                                        ? "opacity-50 bg-slate-600"
                                        : "opacity-100"
                                }`}
                            >
                                Back
                            </button>
                            <button
                                disabled={
                                    activeTab === formElements.length - 1
                                        ? "disabled"
                                        : ""
                                }

                                onClick={() => setActiveTab((prev) => prev + 1)}
                                className={`px-4 py-2 rounded-xl bg-blue-600 text-white ${
                                    activeTab === formElements.length - 1
                                        ? "opacity-50 bg-slate-600"
                                        : "opacity-100"
                                }`}
                            >
                                Next
                            </button>
                            {activeTab === formElements.length - 1 ? (
                                <button
                                    className='px-4 py-2 rounded-xl bg-blue-600 text-white'
                                    onClick={() => console.log(data)}
                                >
                                    Submit
                                </button>
                            ) : null}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Steps;
