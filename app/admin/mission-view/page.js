"use client";

import {MissionPDF} from "@/app/admin/mission/components/missionPdf";
import {PDFDownloadLink} from '@react-pdf/renderer';
import {useRouter, useSearchParams} from "next/navigation";
import { join } from 'path';


import "./style.css";
import {useEffect, useState} from "react";
import axiosClient from "@/app/axiosClient";
import Select from "react-select";
import DualListBox from "react-dual-listbox";
import Link from "../mission/mission-list/page";

function MissionVIew() {
    const router = useRouter();
    const searchParames = useSearchParams();
    const mission_id = searchParames.get("id");
    const [mission, setMission] = useState()
    const [places, setplaces] = useState([])
    const [vehicles, setvehicles] = useState([])
    const options = [
        {value: "1", label: "Staff One"},
        {value: "2", label: "Staff Two"},
        {value: "3", label: "Staff Three"},
        {value: "4", label: "Staff Four"},
        {value: "5", label: "Staff Five"},
        {value: "6", label: "Staff Six"},
        {value: "7", label: "Staff Seven"},
    ];


    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = await mission_id;
                const url = `mission/${id}`

                const {data} = await axiosClient.get(url);
                if (data.success) {
                    setMission(data.result.mission);
                    setplaces(data.result.places);
                    setvehicles(data.result.vehicles);

                }
                console.log(data.result);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);


    let dataList={
        mission_id:mission_id,
        mission_classification_info:"",
        does_mission:"",
        unops_acu_status:"",
        unops_acu:"",
        cla:"",
        cla_decision:"",
        request_status:"",
        greenlight_recieve:"",
        admin_info_set:1,
    }

    const [adminData,setadminData]=useState(dataList);
    const setdata = (e) => {
        const {name, value} = e.target;
        setadminData(old=>  ({
            ...old, // Copy the previous state
            [name]: value // Update the property with the given name
        }))

    };

    const storeDate=async ()=>{
        const response = await axiosClient.post('mission-admin-update', adminData);
        console.log(response);
        if(response.data.success==true){
            alert('success fully updated');
        }
    }

    async function downloadPdf(){
        const {data} = await axiosClient.get('mission-pdf');
        const fileName = 'test.pdf'; // Name of the file in the public folder
        // Construct the URL to the file in the public folder
        const url = new URL(fileName, window.location.origin + '/');
        // Create a new anchor element
        const a = document.createElement('a');
        // Set the anchor's href attribute to the file path
        a.href = url;
        // Set the anchor's download attribute with the desired filename
        a.download = 'mission.pdf';
        // Append the anchor to the body
        document.body.appendChild(a);
        // Click the anchor to trigger the download
        a.click();
        // Remove the anchor from the body
        document.body.removeChild(a);
    }



    return (
        <div className='flex h-screen overflow-hidden'>
            <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
                <main>
                    <div className='container mx-auto px-4 sm:px-8'>
                        <div className='py-8'>
                            <main>
                                <div>
                                    <button onClick={downloadPdf}>download Pdf</button>
                                    {/*<PDFDownloadLink document={<MissionPDF missionId={'sdfsdfsdf'}/>}*/}
                                                     {/*fileName="example.pdf">*/}
                                        {/*{({blob, url, loading, error}) =>*/}
                                            {/*loading ? 'Loading document...' : 'Download PDF'*/}
                                        {/*}*/}
                                    {/*</PDFDownloadLink>*/}

                                </div>
                                <div className='px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto'>

                                    <div className='msv-block bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14'>
                                        <h2>Section heading</h2>

                                        <div className='form__info-box'>
                                            <h3 className='form__info-box__title'>
                                                Mission Focal Point Contact
                                                Details
                                            </h3>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Name</b>
                                                    </p>
                                                    <p>{mission && mission.leader.name}</p>
                                                </div>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Satellite Phone</b>
                                                    </p>
                                                    <p>{mission && mission.leader.statelite_phone}</p>
                                                </div>
                                            </div>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Phone</b>
                                                    </p>
                                                    <p>{mission && mission.leader.phone}</p>
                                                </div>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Email Address</b>
                                                    </p>
                                                    <p>
                                                        eb2@technovicinity.com
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Whatsapp</b>
                                                    </p>
                                                    <p>{mission && mission.leader.whatsup_number}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='msb-meta-wrap'>
                                            <div className='msb-meta'>
                                                <div className='msb-meta__item'>
                                                    <h4 className="form__info-box__title">Agencies</h4>
                                                    <ul className='meta-list'>
                                                        {mission && mission.agency.map(item => (
                                                            <li>{item.agency_id.name}</li>))}

                                                    </ul>
                                                </div>
                                                <div className='msb-meta__item'>
                                                    <h4 className="form__info-box__title">Movement Date</h4>
                                                    <p>{mission && mission.movement_date}</p>
                                                </div>
                                            </div>

                                            <div className='msb-meta'>
                                                <div className='msb-meta__item'>
                                                    <h4 className="form__info-box__title">Purpose</h4>
                                                    <p>{mission && mission.purpose}</p>
                                                </div>
                                                <div className='msb-meta__item'>
                                                    <h4 className="form__info-box__title">Remarks</h4>
                                                    <p><p>{mission && mission.remarks}</p></p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                    <div className='msv-block bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14'>
                                        <h2>Movement Stops</h2>
                                        {
                                            places && places.map(item => <div className='form__info-box'>
                                                <h3 className='form__info-box__title'>
                                                    Departure
                                                </h3>
                                                <div className='form__row flex-ctr-spb'>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Departure Time</b>
                                                        </p>
                                                        <p>{item.departure_time}</p>
                                                    </div>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Facility Ownership</b>
                                                        </p>
                                                        {item.departure_umrah_type == 0 ? <p>NOT UNRAW</p> : <p>UNRAW</p>}


                                                    </div>
                                                </div>
                                                <div className='form__row flex-ctr-spb'>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Premise Type</b>
                                                        </p>
                                                        {/*<p>{item.departure_time && item.departure_time}</p>*/}
                                                    </div>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Installation Name</b>
                                                        </p>
                                                        <p>
                                                            <p>{item.departure_installation_name}</p>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='form__row flex-ctr-spb'>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Building Code

                                                            </b>
                                                        </p>
                                                        <p>{item.arrival_building_code}</p>
                                                    </div>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Longitude
                                                            </b>
                                                        </p>
                                                        <p>{item.departure_longitude}</p>
                                                    </div>
                                                </div>
                                                <div className='form__row flex-ctr-spb'>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Latitude
                                                            </b>
                                                        </p>
                                                        <p>{item.departure_latitude}</p>
                                                    </div>
                                                </div>
                                                <h3 className='form__info-box__title has-divider'>
                                                    Arrival
                                                </h3>
                                                <div className='form__row flex-ctr-spb'>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Arrival Time</b>
                                                        </p>
                                                        <p>{item.arrival_time}</p>
                                                    </div>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Facility Ownership</b>
                                                        </p>
                                                        {item.arrival_umrah_type == 0 ? <p>NOT UNRAW</p> : <p>UNRAW</p>}
                                                    </div>
                                                </div>
                                                <div className='form__row flex-ctr-spb'>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Premise Type</b>
                                                        </p>
                                                        <p>One 5</p>
                                                    </div>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Installation Name</b>
                                                        </p>
                                                        <p>{item.arrival_installation_name}</p>
                                                    </div>
                                                </div>
                                                <div className='form__row flex-ctr-spb'>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Building Code</b>
                                                        </p>
                                                        <p>{item.arrival_building_code}</p>
                                                    </div>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Longitude
                                                            </b>
                                                        </p>
                                                        <p>{item.arrival_longitude}</p>
                                                    </div>
                                                </div>
                                                <div className='form__row flex-ctr-spb'>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Latitude</b>
                                                        </p>
                                                        <p>{item.arrival_latitude}</p>
                                                    </div>
                                                </div>
                                            </div>)
                                        }


                                    </div>


                                    <div className='msv-block bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14'>
                                        <h2>Vehicle and Driver Details</h2>
                                        {
                                            vehicles && vehicles.map(item => <div className='form__info-box'>
                                                <h3 className='form__info-box__title'>
                                                    Driver
                                                </h3>
                                                <div className='form__row flex-ctr-spb'>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Agency Name</b>
                                                        </p>
                                                        <p>{item.agency.name} </p>
                                                    </div>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Driver Name</b>
                                                        </p>
                                                        <p>{item.driver.name} </p>
                                                    </div>
                                                </div>

                                                <h3 className='form__info-box__title has-divider'>
                                                    Vehicle
                                                </h3>
                                                <div className='form__row flex-ctr-spb'>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Vehicle Registration #
                                                            </b>
                                                        </p>
                                                        <p>{item.vehicle.registration_number}</p>
                                                    </div>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Vehicle Type (Model)</b>
                                                        </p>
                                                        <p>{item.vehicle.vehicle_type}</p>
                                                    </div>
                                                </div>
                                                <div className='form__row flex-ctr-spb'>
                                                    <div className='form__col'>
                                                        <p>
                                                            <b>Vehicle Body Description</b>
                                                        </p>
                                                        <p>{item.vehicle.description}</p>
                                                    </div>
                                                </div>

                                                <h3 className='form__info-box__title has-divider'>
                                                    Staff
                                                </h3>

                                                <ul className="meta-list">
                                                    {
                                                        item.staff.map(item => <li>{item.staff_id.name}</li>)
                                                    }

                                                </ul>

                                            </div>)
                                        }


                                    </div>


                                    <div className='msv-block bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14'>
                                        <h2>Admin Mission Set</h2>

                                        {/*mission_classification:"",*/}
                                        {/*does_mission:"",*/}
                                        {/*unops_acu_status:"",*/}
                                        {/*unops_acu:"",*/}
                                        {/*cla:"",*/}
                                        {/*cls_decision:"",*/}
                                        {/*request_status:"",*/}
                                        {/*greenlight_recieve:"",*/}
                                        <div className="collapsable-item__body">
                                            <div className="collapsable-item__body-row flex-start-spb">
                                                <div className="collapsable-item__body-col">
                                                    <div className="form__field collapsable-item__field">
                                                        <label htmlFor="agency-name" className="form__label">
                                                            Mission Classification
                                                        </label>
                                                        <div className="select-wrap">
                                                            <select
                                                                className="form__select"
                                                                name="mission_classification_info"
                                                                id="facility"
                                                                value={adminData.mission_classification_info}
                                                                onChange={setdata}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="mrc">mrc</option>
                                                                <option value="mnr">mnr</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="form__field collapsable-item__field">
                                                        <label htmlFor="driver-name" className="form__label">
                                                            Does Mission Require a Greenlight
                                                        </label>
                                                        <select
                                                            className="form__select"
                                                            name="does_mission"
                                                            id="facility"
                                                            value={adminData.does_mission}
                                                            onChange={setdata}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="yes">Yes</option>
                                                            <option value="no">No</option>
                                                        </select>
                                                    </div>

                                                    <div className="form__field collapsable-item__field">
                                                        <label htmlFor="agency-name" className="form__label">
                                                            Unops acu status
                                                        </label>
                                                        <div className="select-wrap">
                                                            <select
                                                                className="form__select"
                                                                name="unops_acu_status"
                                                                id="facility"
                                                                value={adminData.unops_acu_status}
                                                                onChange={setdata}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Submitted to CLA">Submitted to CLA</option>
                                                                <option value="Recieved">Recieved</option>
                                                                <option value="Denied by CLA">Denied by CLA</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="form__field collapsable-item__field">
                                                        <label htmlFor="driver-name" className="form__label">
                                                            Unops ACU
                                                        </label>
                                                        <input type="text" value={adminData.unops_acu} onInput={setdata} name="unops_acu" className="form__input" id="dsc"/>
                                                        {/*{(checkValidation && info.driver == null) ? errorTxt: ""}*/}
                                                    </div>

                                                    <div className="form__field collapsable-item__field">
                                                        <label htmlFor="driver-name" className="form__label">
                                                            CLA
                                                        </label>
                                                        <input type="text" value={adminData.cla} onInput={setdata} name="cla" className="form__input" />
                                                        {/*{(checkValidation && info.driver == null) ? errorTxt: ""}*/}
                                                    </div>
                                                    <div className="form__field collapsable-item__field">
                                                        <label htmlFor="driver-name" className="form__label">
                                                                CLA Decision
                                                        </label>
                                                        <div className="select-wrap">
                                                            <select
                                                                className="form__select"
                                                                name="cla_decision"
                                                                id="facility"
                                                                value={adminData.cla_decision}
                                                                onChange={setdata}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="approved">Approved</option>
                                                                <option value="denied">Denied</option>
                                                            </select>
                                                        </div>
                                                        {/*{(checkValidation && info.driver == null) ? errorTxt: ""}*/}
                                                    </div>
                                                    <div className="form__field collapsable-item__field">
                                                        <label htmlFor="driver-name" className="form__label">
                                                            Request Status
                                                        </label>
                                                        <div className="select-wrap">
                                                            <select
                                                                className="form__select"
                                                                name="request_status"
                                                                id="facility"
                                                                value={adminData.request_status}
                                                                onChange={setdata}
                                                            >
                                                                <option value="">SELECT</option>
                                                                <option value="Request Recieved">Request Recieved</option>
                                                                <option value="Request submitted to CLA">Request submitted to CLA</option>
                                                                <option value="Mission Completed">Mission Completed</option>
                                                                <option value="Requestor Cancelled Request">Requestor Cancelled Request</option>
                                                                <option value="Mission Postponed">Mission Postponed</option>
                                                                <option value="Mission Pending">Mission Pending</option>
                                                                <option value="Mission Aborted">Mission Aborted</option>
                                                            </select>
                                                        </div>
                                                        {/*{(checkValidation && info.driver == null) ? errorTxt: ""}*/}
                                                    </div>
                                                    <div className="form__field collapsable-item__field">
                                                        <label htmlFor="driver-name" className="form__label">
                                                            greenlight_recieve
                                                        </label>
                                                        <input type="text"   onInput={setdata} value={adminData.greenlight_recieve} name="greenlight_recieve" className="form__input" />
                                                        {/*{(checkValidation && info.driver == null) ? errorTxt: ""}*/}
                                                    </div>
                                                </div>
                                            </div>

                                            <div><button  className="mt-4 px-4 py-2 mx-2 bg-green-500 text-white rounded" onClick={storeDate}>Submit</button></div>

                                        </div>
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

export default MissionVIew;
