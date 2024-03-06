"use client";
import { useState } from "react";

import "react-select2-wrapper/css/select2.css";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import "./steps.css";

function Steps() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [data, setData] = useState({
        name: "",
        email: "",
        dob: "",
        gender: "male",
        address: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const [activeTab, setActiveTab] = useState(0);

    const formElements = [
        <Step1 data={data} handleChange={handleChange} />,
        <Step2 data={data} handleChange={handleChange} />,

        <Step3 data={data} setData={setData} />,
        // <Step4 data={data} setData={setData} />,
    ];

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
                    <div className='px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto'>
                    <div className='progress-container'>
                      <div className='progress-bar' id='progress'></div>
                      <div className={`circle ${activeTab>-1 ? 'active' : ''} `}>1</div>
                      <div className={`circle ${activeTab>0 ? 'active' : ''} `}>2</div>
                      <div className={`circle ${activeTab>1 ? 'active' : ''} `}>3</div>
                    </div>
                        <div>{formElements[activeTab]}</div>
                        <div className='flex flex-wrap gap-x-6 py-2.5 px-8  fixed bottom-0 right-[18px] justify-end w-[calc(100%-275px)] bg-white z-20 shadow-[0_-3px_3px_0_rgba(0,0,0,.05)]'>
                            <button
                                disabled={activeTab === 0 ? "disabled" : ""}
                                onClick={() => setActiveTab((prev) => prev - 1)}
                                className={`px-4 py-2 rounded border border-[#333333] bg-transparent text-black transition duration-300 ${
                                    activeTab === 0
                                        ? "opacity-30"
                                        : "opacity-100 hover:shadow-[0_0_15px_0_rgba(0,0,0,.3)]"
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
                                className={`px-4 py-2 rounded bg-main text-white transition duration-300 ${
                                    activeTab === formElements.length - 1
                                        ? "hidden"
                                        : "opacity-100 hover:shadow-[0_0_15px_0_rgba(0,0,0,.5)]"
                                }`}
                            >
                                Next
                            </button>
                            {activeTab === formElements.length - 1 ? (
                                <button
                                    className='px-4 py-2 rounded bg-main transition duration-300 text-white  hover:shadow-[0_0_15px_0_rgba(0,0,0,.5)]'
                                    onClick={() => console.log(data)}
                                >
                                    Save
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
