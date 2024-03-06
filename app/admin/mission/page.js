"use client";
import {useState} from "react";

import Header from "@/app/partials/Header";
import Sidebar from "@/app/partials/Sidebar";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import "./steps.css";
import React from "react";

function Steps() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [data, setData] = useState({
        name: "",
        email: "",
        dob: "",
        gender: "male",
        address: "",
    });
    const [storeData, setStoreData] = useState({
        "leader": "",
        "agency": "",
        "mission_classification": "",
        "movement_date": "",
        "purpose": "",
        "remarks": "",
        "location_list": [{
            "index_no":0,
            "departure_premise_type": "",
            "departure_installation_name": "",
            "departure_time": "",
            "departure_latitude": "",
            "departure_longitude": "",
            "arrival_time": "",
            "arrival_premise_type": "",
            "arrival_installation_name": "",
            "arrival_latitude": "",
            "arrival_longitude": ""
        }],
        "vehicle_list": [{
            "mission": "",
            "vehicle": "",
            "driver": "",
            "agency": "",
            "staff": [{}]
        }]
    });


    const handleChange = (name, value) => {
        let update = {...storeData, [name]: value};
        setStoreData(update);
        console.log(storeData);
    };
    const locationStore = (value) => {
        let update = {...storeData, location_list: value};
        setStoreData(update);
    };

    const [activeTab, setActiveTab] = useState(0);

    const formElements = [
        <Step1 data={data} getdata={handleChange}/>,
        <Step2 data={storeData.location_list} locationSet={locationStore} />,

        <Step3 data={data} handleChange={handleChange}/>,
        <Step4 data={data} setData={setData}/>,
    ];

    return (

        <div className="flex h-screen overflow-hidden">

            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <main>
                    <div className="container mx-auto px-4 sm:px-8">
                        <div className="py-8">
                            <main>
                                <div className='px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto'>
                                    <div className='progress-container'>
                                        <div className='progress-bar' id='progress'></div>
                                        <div className='circle active '>1</div>
                                        <div className='circle'>2</div>
                                        <div className='circle'>3</div>
                                        <div className='circle'>4</div>
                                    </div>
                                    <div>{formElements[activeTab]}</div>
                                    <div
                                        className='flex flex-wrap gap-x-6 py-2.5 px-8  fixed bottom-0 right-[18px] justify-end w-[calc(100%-275px)] bg-white z-20 shadow-[0_-3px_3px_0_rgba(0,0,0,.05)]'>
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
                                            className={`px-4 py-2 rounded bg-black text-white transition duration-300 ${
                                                activeTab === formElements.length - 1
                                                    ? "hidden"
                                                    : "opacity-100 hover:shadow-[0_0_15px_0_rgba(0,0,0,.5)]"
                                                }`}
                                        >
                                            Next
                                        </button>
                                        {activeTab === formElements.length - 1 ? (
                                            <button
                                                className='px-4 py-2 rounded bg-black transition duration-300 text-white  hover:shadow-[0_0_15px_0_rgba(0,0,0,.5)]'
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
                </main>
            </div>
        </div>


    );
}

export default Steps;
