import Select from 'react-select'
import {useEffect, useState} from "react";
import axiosClient from "@/app/axiosClient";

const Step1 = ({getdata}) => {
    // const { data, handleChange } = props;
    const selectData = (selectedOption, {name}) => {
        if(name=='leader'){
            setAdminInfo(selectedOption.list);
            console.log(selectedOption.list)
        }
        getdata(name, selectedOption.value); // Pass the input value to the parent component
    };
    const setdata = (e) => {
        const {name, value} = e.target;
        getdata(name, value); // Pass the input value to the parent component
    };

    const [staff, setStaff] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [agencyList, setAgencyList] = useState([]);
    const [adminInfo, setAdminInfo] = useState();

    const staffListSet = async () => {
        try {
            const {data} = await axiosClient.get('staff');
            if (data.success === true) {
                const updatedStaffList = data.result.map(item => ({
                    value: item._id,
                    label: item.name,
                    list:item,
                }));
                setStaffList(prevStaffList => [...updatedStaffList]);
            }
        } catch (error) {
            setStaffList([]);
        }
    };
    const agenciesSet = async () => {
        try {
            const {data} = await axiosClient.get('agency');
            if (data.success === true) {
                const updatedAgencyList = data.result.map(item => ({
                    value: item._id,
                    label: item.name,
                }));
                setAgencyList(prevStaffList => [...updatedAgencyList]);
            }
        } catch (error) {
            setAgencyList([]);
        }
    };

    useEffect(() => {
        staffListSet();
        agenciesSet();
    }, []);


    let options = [
        {value: "1", label: "one"},
        {value: "2", label: "two"}
    ];


    return (
        <div className=" w-full mx-auto">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14">

                <h2 className="form__title">Title</h2>
                <div className="form__fields">
                    <div className="form__row flex-start-spb">
                        <div className="form__field">
                            <label htmlFor="focus-point" className="form__label">
                                Mission Focal Point
                            </label>
                            <div className="">
                                <Select
                                    name="leader"
                                    options={staffList}
                                    id="focus-point"
                                    onChange={selectData}
                                    isSearchable
                                >
                                </Select>
                            </div>
                        </div>
                    </div>
                    {adminInfo?<div className="form__info-box">
                        <h3 className="form__info-box__title">
                            Mission Focal Point Contact Details
                        </h3>
                        <div className="form__row flex-ctr-spb">
                            <div className="form__col">
                                <p>
                                    <b>Name</b>
                                </p>
                                <p>{adminInfo.name}</p>
                            </div>
                            <div className="form__col">
                                <p>
                                    <b>Satellite Phone</b>
                                </p>
                                <p>{adminInfo.statelite_phone}</p>
                            </div>
                        </div>
                        <div className="form__row flex-ctr-spb">
                            <div className="form__col">
                                <p>
                                    <b>Phone</b>
                                </p>
                                <p>{adminInfo.phone}</p>
                            </div>
                            <div className="form__col">
                                <p>
                                    <b>Email Address</b>
                                </p>
                                <p>{adminInfo.user.email}</p>
                            </div>
                        </div>
                        <div className="form__row flex-ctr-spb">
                            <div className="form__col">
                                <p>
                                    <b>Whatsapp</b>
                                </p>
                                <p>{adminInfo.whatsup_number}</p>
                            </div>
                        </div>
                    </div>:''}

                    <div className="form__row flex-start-spb">
                        <div className="form__field">
                            <label htmlFor="agencies" className="form__label">
                                Agencies
                            </label>
                            <div className="select-wrap">
                                <Select
                                    name="agency"
                                    options={agencyList}
                                    onChange={selectData}
                                    isSearchable
                                >
                                </Select>
                            </div>
                        </div>
                        <div className="form__field">
                            <label htmlFor="date" className="form__label">
                                Movement Date
                            </label>
                            <div className="date-wrap">
                                <input type="date" onChange={setdata} name="movement_date" className="form__input"
                                       id="date" value=""/>
                            </div>
                        </div>
                    </div>
                    <div className="form__row flex-start-spb">
                        <div className="form__field">
                            <label htmlFor="purpose" className="form__label">
                                Purpose
                            </label>
                            <textarea
                                className="form__textarea"
                                name="purpose"
                                onChange={setdata}
                                id="purpose"
                            ></textarea>
                        </div>
                        <div className="form__field">
                            <label htmlFor="remarks" className="form__label">
                                Remarks
                            </label>
                            <textarea
                                className="form__textarea"
                                name="remarks"
                                onChange={setdata}
                                id="remarks"
                            ></textarea>
                        </div>
                    </div>
                    <div className="form__row flex-start-spb">
                        <div className="form__field">
                            <label htmlFor="classification" className="form__label">
                                Mission Classification
                            </label>
                            <div className="select-wrap">
                                <Select
                                    name="agency"
                                    options={agencyList}
                                    onChange={selectData}
                                    isSearchable
                                >
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Step1;
