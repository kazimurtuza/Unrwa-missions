import axiosClient from "@/app/axiosClient";
import { useEffect, useState } from "react";
import DualListBox from "react-dual-listbox";
import "react-dual-listbox/lib/react-dual-listbox.css";
import Select from "react-select";

// const carriList = [
//     {value: "Passengers", label: "Passengers"},
//     {value: "Fuel", label: "Fuel"},
//     {value: "Medicine", label: "Medicine"},
//     {value: "Food", label: "Food"},
//     {value: "Mixed_Items", label: "Mixed Emergency Response Items"},
// ];

const customStyles = {
    color: "red",
    fontSize: "16px",
    fontWeight: "bold",
    // Add more styles as needed
};

let errorTxt = <p style={customStyles}>This field is required.</p>;

const Collapsable2 = ({
                          info,
                          setInfo,
                          item,
                          checkValidation,
                          vehicleStaff,
                          vehicleStaffStore,
                          prevehicleStaf,
                          updateVehicleStaf,
                      }) => {
    const setdata = (e) => {
        const {name, value} = e.target;
        setInfo(name, value, item); // Pass the input value to the parent component
    };

    const [agencyList, setAgencyList] = useState([]);
    const [driverList, setDriverList] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [vehicleList, setVehicleList] = useState([]);
    const [vehicleType, setvehicleType] = useState();
    const [vehicleDetails, setvehicleDetails] = useState();
    const [seletVicleInfo, setseletVicleInfo] = useState();
    const [collapse, setCollapse] = useState(true);
    const [selected, setSelected] = useState([]);
    const [driverInfo, setDriverInfo] = useState();
    const [carriList, setCarriList] = useState([]);

    const getDriverData = async () => {
        const selectedStaff = await driverList.find(option => option.value === info.driver)
        if (selectedStaff) {
            setDriverInfo(selectedStaff.list);
        }
    };

    const selectData = async (selectedOption, {name}) => {
        var value;
        value = selectedOption.value;
        // if(name==undefined){
        //     setSelected(selectedOption);
        //     // Map each item in the data array to an object with a key staff_id
        //      value = await selectedOption.map((item) => ({
        //         staff_id: item,
        //     }));
        //      // value=[{staff_id:"sdfkj"}]
        //      name = "staff";
        //      // console.log(value)
        //      // console.log(name)
        //     // return false;
        //     // return false;
        // }

        // console.log(selectedOption)

        // Pass the input value to the parent component

        if (name == 'driver') {
            setDriverInfo(selectedOption.list);
        }

        if (name == 'agency') {
            driverListSet(value);
        }

        if(name=='vehicle_agency'){
            vehicleListSet(value)
        }

        if (name == "vehicle") {
            value = selectedOption;
        }

        if (name == "carried") {
            value = selectedOption;
            // console.log("data carry")
            // console.log(selectedOption.value)
            // selectedOption = await selectedOption.map((item) => ({
            //     agency_id: item.value,
            //     value: item.value,
            //     label: item.label,
            // }));
            console.log(selectedOption);
        }

        setInfo(name, value, item);
    };

    const agencyListSet = async () => {
        try {
            const {data} = await axiosClient.get("agency");
            if (data.success === true) {
                const updatedAgencyList = data.result.map((item) => ({
                    value: item._id,
                    label: item.name,
                }));

                setAgencyList(updatedAgencyList);
            }
        } catch (error) {
            setAgencyList([]);
        }
    };

    const driverListSet = async (id) => {
        try {
            // const {data} = await axiosClient.get("staff");
            const driverLink = `agency-wise-driver/${id}`

            const {data} = await axiosClient.get(driverLink);
            if (data.success === true) {
                const updatedDriverList = data.result.map((item) => ({
                    value: item._id,
                    label: item.name,
                    list: item,
                }));

                setDriverList(updatedDriverList);
            }
        } catch (error) {
            setDriverList([]);
        }
    };

    const staffListSet = async () => {
        try {
            const {data} = await axiosClient.get("staff");
            if (data.success === true) {
                const updatedStaffList = data.result.map((item) => ({
                    value: item._id,
                    label: item.name,
                    list: item,
                }));
                setStaffList((prevStaffList) => [...updatedStaffList]);
            }
        } catch (error) {
            setStaffList([]);
        }
    };

    const carriedList = async () => {
        try {
            const {data} = await axiosClient.get("cargo");
            if (data.success === true) {
                const carriList = data.result.map((item) => ({
                    label: item.what_is_being_carried_out,
                    value: item.what_is_being_carried_out,
                }));
                setCarriList(carriList);
                // setStaffList((prevStaffList) => [...updatedStaffList]);
            }
        } catch (error) {
            setStaffList([]);
        }
    };
    const vehicleListSet = async (id) => {
        try {
            const vehicleLink = `agency-wise-vehicle/${id}`
            const {data} = await axiosClient.get(vehicleLink);
            if (data.success === true) {
                const updatedVehicleList = data.result.map((item) => ({
                    value: item._id,
                    label: item.vehicle_plate_number,
                    list: item,
                }));
                setVehicleList((prevStaffList) => [...updatedVehicleList]);
            }
        } catch (error) {
            setVehicleList([]);
        }
    };

    async function setSelectedVehicleInfo() {
        const seletVicleInfoData = await vehicleList.find(
            (option) => option.value === info.vehicle
        );

        if (seletVicleInfoData) {
            setseletVicleInfo((old) => seletVicleInfoData.list);
        }
    }

    async function selectedStaffSet() {
        console.log("pre data")
        console.log(prevehicleStaf.length)
        console.log("new pre data")

        if (prevehicleStaf.length > 0) {
            let save = prevehicleStaf[item];
            setSelected((old) => save);
        }

        // var save=prevehicleStaf?prevehicleStaf[item]:[];
        // // let selectedStaffList = await info.staff.map((item) => item.staff_id);
    }

    useEffect(() => {
        selectedStaffSet();
        agencyListSet();
        carriedList();
        // driverListSet();
        staffListSet();
        // vehicleListSet();
        getDriverData();
        if (info.vehicle) {
            setSelectedVehicleInfo();
        }

        if (info.agency) {
            driverListSet(info.agency);
        }

        if (info.vehicle) {
            vehicleListSet(info.vehicle_agency)
        }
    }, []);

    const handleClick = () => {
        setCollapse(!collapse);
    };

    const employeeSet = async (data) => {
        // updateVehicleStaf()
        setSelected(data);
        // // Map each item in the data array to an object with a key staff_id
        // let value = await data.map((item) => ({
        //     staff_id: item,
        // }));

        // console.log(value)
        // console.log('-----------------')

        // var  newData = await prevehicleStaf.map((info,index)=>{
        //     if(index==item){
        //         return data
        //     }
        // });
        // prevehicleStaf.map((info,index)=>{
        //     if(index==item){
        //         return data;
        //     }else{
        //         return info;
        //     }
        // })
        prevehicleStaf[item] = data;

        // console.log(prevehicleStaf)

        updateVehicleStaf(prevehicleStaf)
        // let name = "staff"; // Assuming this is the name you want to use
        // vehicleStaffStore(value, item); // You need to define 'item' somewhere in your code
    };

    return (
        <>
            <div className={`collapsable-item ${collapse ? "active" : ""} `}>
                <div
                    className='collapsable-item__header collapse-trigger'
                    onClick={handleClick}
                >
                    <h3 className='collapsable-item__header-title'>
                        Vehicle and Driver Details
                    </h3>
                </div>
                <div className='collapsable-item__body'>
                    <div className='collapsable-item__body-row flex-start-spb'>
                        <div className='collapsable-item__body-col'>
                            <h3 className='collapsable-item__body-title'>
                                Driver
                            </h3>
                            <div className='form__field collapsable-item__field'>
                                <label
                                    htmlFor='agency-name'
                                    className='form__label'
                                >
                                    Agency Name
                                </label>
                                <div className='select-wrap'>
                                    <Select
                                        name='agency'
                                        value={agencyList.find(
                                            (option) =>
                                                option.value === info.agency
                                        )}
                                        options={agencyList}
                                        id='focus-point'
                                        onChange={selectData}
                                        isSearchable
                                    ></Select>
                                    {checkValidation && info.agency == null
                                        ? errorTxt
                                        : ""}
                                </div>
                            </div>

                            <div className='form__field collapsable-item__field'>
                                <label
                                    htmlFor='driver-name'
                                    className='form__label'
                                >
                                    Driver Name
                                </label>
                                <Select
                                    name='driver'
                                    options={driverList}
                                    value={driverList.find(
                                        (option) => option.value === info.driver
                                    )}
                                    id='focus-point'
                                    onChange={selectData}
                                    isSearchable
                                ></Select>
                                {checkValidation && info.driver == null
                                    ? errorTxt
                                    : ""}
                            </div>

                            {driverInfo ? <div className='form__info-box'>
                                <h3 className='form__info-box__title'>
                                    Driver Information
                                </h3>
                                <div className='form__row flex-ctr-spb'>
                                    <div className='form__col'>
                                        <p>
                                            <b>Name</b>
                                        </p>
                                        <p>{driverInfo.name}</p>
                                    </div>
                                    <div className='form__col'>
                                        <p>
                                            <b>ID</b>
                                        </p>
                                        <p>{driverInfo.employee_id}</p>
                                    </div>
                                </div>
                                <div className='form__row flex-ctr-spb'>
                                    <div className='form__col'>
                                        <p>
                                            <b>Ooredoo Phone</b>
                                        </p>
                                        <p>{driverInfo.phone_number_one}</p>
                                    </div>
                                    <div className='form__col'>
                                        <p>
                                            <b>Jawwal Phone</b>
                                        </p>
                                        <p>{driverInfo.phone_number_two}</p>
                                    </div>
                                </div>
                                <div className='form__row flex-ctr-spb'>
                                    <div className='form__col'>
                                        <p>
                                            <b>Whatsapp</b>
                                        </p>
                                        <p>{driverInfo.whatsup_number}</p>
                                    </div>
                                </div>
                            </div> : ''}

                        </div>
                        <div className='collapsable-item__body-col'>
                            <h3 className='collapsable-item__body-title'>
                                Vehicle
                            </h3>

                            <div className='form__field collapsable-item__field'>
                                <label
                                    htmlFor='agency-name'
                                    className='form__label'
                                >
                                    Agency Name
                                </label>
                                <div className='select-wrap'>
                                    <Select
                                        name='vehicle_agency'
                                        value={agencyList.find(
                                            (option) =>
                                                option.value === info.vehicle_agency
                                        )}
                                        options={agencyList}
                                        id='focus-point'
                                        onChange={selectData}
                                        isSearchable
                                    ></Select>
                                    {checkValidation && info.agency == null
                                        ? errorTxt
                                        : ""}
                                </div>
                            </div>

                            <div className='form__field collapsable-item__field'>
                                <label
                                    htmlFor='vehicle-registration'
                                    className='form__label'
                                >
                                    Vehicle Plate Number
                                </label>
                                <div className='select-wrap'>
                                    <Select
                                        name='vehicle'
                                        options={vehicleList}
                                        value={vehicleList.find(
                                            (option) =>
                                                option.value === info.vehicle
                                        )}
                                        id='focus-point'
                                        onChange={selectData}
                                        isSearchable
                                    ></Select>
                                    {checkValidation && info.vehicle == null
                                        ? errorTxt
                                        : ""}
                                </div>
                            </div>
                            <div className='form__field collapsable-item__field'>
                                <label
                                    htmlFor='vehicle-type'
                                    className='form__label'
                                >
                                    Vehicle Type (Model)
                                </label>
                                <div className='select-wrap'>
                                    <input
                                        type='text'
                                        value={info.vehicle_type}
                                        className='form__input'
                                        id='dsc'
                                    />
                                </div>
                            </div>

                            <div className='form__field collapsable-item__field'>
                                <label htmlFor='dsc' className='form__label'>
                                    Vehicle Body Description
                                </label>
                                <input
                                    type='text'
                                    value={info.vehicle_body}
                                    className='form__input'
                                    id='dsc'
                                />
                            </div>
                            <div className='form__field' style={{width: '100%', maxWidth: '100%'}}>
                                <label
                                    htmlFor='agencies'
                                    className='form__label'
                                >
                                    What is being carried out
                                </label>
                                <div className='select-wrap'>
                                    <Select
                                        name='carried'
                                        value={info.carried}
                                        isMulti
                                        options={carriList}
                                        onChange={selectData}
                                        className='basic-multi-select'
                                        isSearchable
                                    ></Select>
                                    {/*{(checkValidation && storeData.agency.length == 0) ? errorTxt: ""}*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='staff-list mt-4'>
                        <DualListBox
                            canFilter
                            selected={selected}
                            onChange={employeeSet}
                            filterCallback={(
                                option,
                                filterInput,
                                {getOptionLabel}
                            ) => {
                                if (filterInput === "") {
                                    return true;
                                }

                                return new RegExp(filterInput, "i").test(
                                    getOptionLabel(option)
                                );
                            }}
                            options={staffList}
                        />
                        {checkValidation &&  prevehicleStaf[item].length==0
                            ? errorTxt
                            : ""}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Collapsable2;
