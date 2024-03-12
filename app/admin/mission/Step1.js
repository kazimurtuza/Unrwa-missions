import Select from 'react-select'
import {useEffect, useState} from "react";
import axiosClient from "@/app/axiosClient";

const Step1 = ({getdata, storeData, staffList, agencyList, classification, checkValidation}) => {
    const selectData = async (selectedOption, {name}) => {
        if (name == 'leader') {
            setAdminInfo(selectedOption.list);
        }
        if(name=='agency'){

            selectedOption.value = await selectedOption.map(item=>({agency_id:item.value,value:item.value,label:item.label}))
        }
        getdata(name, selectedOption.value); // Pass the input value to the parent component
    };
    const setdata = (e) => {
        const {name, value} = e.target;
        getdata(name, value); // Pass the input value to the parent component
    };
    const [adminInfo, setAdminInfo] = useState();

    const getSelectedData = async () => {
        const selectedStaff = await staffList.find(option => option.value === storeData.leader)
        if (selectedStaff) {
            setAdminInfo(selectedStaff.list);
        }
    };

    useEffect(() => {
        getSelectedData();
    }, []);

    const customStyles = {
        color: 'red',
        fontSize: '16px',
        fontWeight: 'bold',
        // Add more styles as needed
    };

    let errorTxt = <p style={customStyles}>This field is required.</p>


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
                                Mission Leader
                            </label>
                            <div className="">
                                <Select
                                    name="leader"
                                    options={staffList}
                                    value={staffList.find(option => option.value === storeData.leader)}
                                    id="focus-point"
                                    onChange={selectData}
                                    isSearchable
                                >
                                </Select>
                                {(checkValidation && storeData.leader == null) ? errorTxt: ""}
                            </div>
                        </div>
                    </div>
                    {adminInfo ? <div className="form__info-box">
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
                    </div> : ''}

                    <div className="form__row flex-start-spb">
                        <div className="form__field">
                            <label htmlFor="agencies" className="form__label">
                                Agencies
                            </label>
                            <div className="select-wrap">
                                <Select
                                    name="agency"
                                    value={storeData.agency}
                                    isMulti
                                    options={agencyList}
                                    onChange={selectData}
                                    className="basic-multi-select"
                                    isSearchable
                                >
                                </Select>
                                {(checkValidation && storeData.agency.length == 0) ? errorTxt: ""}
                            </div>
                        </div>
                        <div className="form__field">
                            <label htmlFor="date" className="form__label">
                                Movement Date
                            </label>
                            <div className="date-wrap">
                                <input type="date" onChange={setdata} name="movement_date" className="form__input"
                                       id="date" value={storeData.movement_date}/>
                                {(checkValidation && storeData.movement_date == '') ? errorTxt: ""}
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
                            >{storeData.purpose}</textarea>
                            {(checkValidation && storeData.purpose == '') ? errorTxt: ""}
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
                            >{storeData.remarks}</textarea>
                            {(checkValidation && storeData.remarks == '') ? errorTxt: ""}
                        </div>
                    </div>
                    {/*<div className="form__row flex-start-spb">*/}
                    {/*    <div className="form__field">*/}
                    {/*        <label htmlFor="classification" className="form__label">*/}
                    {/*            Mission Classification*/}
                    {/*        </label>*/}
                    {/*        <div className="select-wrap">*/}
                    {/*            <Select*/}
                    {/*                name="mission_classification"*/}
                    {/*                options={classification}*/}
                    {/*                onChange={selectData}*/}
                    {/*                isSearchable*/}
                    {/*            >*/}
                    {/*            </Select>*/}
                    {/*            {(checkValidation && storeData.mission_classification == null) ? errorTxt: ""}*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default Step1;
