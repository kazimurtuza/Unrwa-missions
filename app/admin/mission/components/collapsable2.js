import {useEffect, useState} from "react";
import DualListBox from "react-dual-listbox";
import 'react-dual-listbox/lib/react-dual-listbox.css';
import axiosClient from "@/app/axiosClient";
import Select from "react-select";


const carriList = [
    {value: "Passengers", label: "Passengers"},
    {value: "Fuel", label: "Fuel"},
    {value: "Medicine", label: "Medicine"},
    {value: "Food", label: "Food"},
    {value: "Mixed_Items", label: "Mixed Emergency Response Items"},

];

const customStyles = {
    color: 'red',
    fontSize: '16px',
    fontWeight: 'bold',
    // Add more styles as needed
};

let errorTxt = <p style={customStyles}>This field is required.</p>

const Collapsable2 = ({info, setInfo, item, checkValidation, vehicleStaff, vehicleStaffStore}) => {

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

    const selectData = async (selectedOption, {name}) => {
        // Pass the input value to the parent component
        var value = selectedOption.value;
        if (name == 'vehicle') {
            value = selectedOption;
        }
        if(name=='carri'){

            selectedOption.value = await selectedOption.map(item=>({agency_id:item.value,value:item.value,label:item.label}))
        }


        setInfo(name, value, item);
    };

    const agencyListSet = async () => {
        try {
            const {data} = await axiosClient.get('agency');
            if (data.success === true) {
                const updatedAgencyList = data.result.map(item => ({
                    value: item._id,
                    label: item.name,
                }));

                setAgencyList(updatedAgencyList);
            }
        } catch (error) {
            setAgencyList([]);
        }
    };

    const driverListSet = async () => {
        try {
            const {data} = await axiosClient.get('staff');
            if (data.success === true) {
                const updatedDriverList = data.result.filter(item => item && item.staff_role === "Driver")
                    .map(item => ({
                        value: item._id,
                        label: item.name,
                    }));

                console.log(updatedDriverList);

                setDriverList(updatedDriverList);
            }
        } catch (error) {
            setDriverList([]);
        }
    };

    const staffListSet = async () => {
        try {
            const {data} = await axiosClient.get('staff');
            if (data.success === true) {
                const updatedStaffList = data.result.map(item => ({
                    value: item._id,
                    label: item.name,
                    list: item,
                }));
                setStaffList(prevStaffList => [...updatedStaffList]);
            }
        } catch (error) {
            setStaffList([]);
        }
    };
    const vehicleListSet = async () => {
        try {
            const {data} = await axiosClient.get('vehicle');
            if (data.success === true) {
                const updatedVehicleList = data.result.map(item => ({
                    value: item._id,
                    label: item.registration_number,
                    list: item,
                }));
                setVehicleList(prevStaffList => [...updatedVehicleList]);
            }
        } catch (error) {
            setVehicleList([]);
        }
    };

    async function setSelectedVehicleInfo() {
        const seletVicleInfoData = await vehicleList.find(option => option.value === info.vehicle)

        if (seletVicleInfoData) {
            setseletVicleInfo(old => seletVicleInfoData.list);
        }
    }

    async function selectedStaffSet() {

        let selectedStaffList = await info.staff.map(item => item.staff_id);
        setSelected(old => selectedStaffList)
    }


    useEffect(() => {
        selectedStaffSet()
        agencyListSet();
        driverListSet();
        staffListSet();
        vehicleListSet();
        if (info.vehicle) {
            setSelectedVehicleInfo();
        }
    }, []);

    const handleClick = () => {
        setCollapse(!collapse)
    }

    const employeeSet = async (data) => {
        setSelected(data);
        // Map each item in the data array to an object with a key staff_id
        let value = await data.map((item) => ({
            staff_id: item
        }));
        let name = "staff"; // Assuming this is the name you want to use
        vehicleStaffStore(value, item); // You need to define 'item' somewhere in your code
    };

    return (
        <>
            <div className={`collapsable-item ${collapse ? "active" : ""} `}>
                <div className="collapsable-item__header collapse-trigger" onClick={handleClick}>
                    <h3 className="collapsable-item__header-title">
                        Vehicle and Driver Details
                    </h3>
                </div>
                <div className="collapsable-item__body">
                    <div className="collapsable-item__body-row flex-start-spb">
                        <div className="collapsable-item__body-col">
                            <h3 className="collapsable-item__body-title">Driver</h3>
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="agency-name" className="form__label">
                                    Agency Name
                                </label>
                                <div className="select-wrap">
                                    <Select
                                        name="agency"
                                        value={agencyList.find(option => option.value === info.agency)}
                                        options={agencyList}
                                        id="focus-point"
                                        onChange={selectData}
                                        isSearchable
                                    >
                                    </Select>
                                    {(checkValidation && info.agency == null) ? errorTxt : ""}
                                </div>
                            </div>

                            <div className="form__field collapsable-item__field">
                                <label htmlFor="driver-name" className="form__label">
                                    Driver Name
                                </label>
                                <Select
                                    name="driver"
                                    options={driverList}
                                    value={driverList.find(option => option.value === info.driver)}
                                    id="focus-point"
                                    onChange={selectData}
                                    isSearchable
                                >
                                </Select>
                                {(checkValidation && info.driver == null) ? errorTxt : ""}
                            </div>
                        </div>
                        <div className="collapsable-item__body-col">
                            <h3 className="collapsable-item__body-title">Vehicle</h3>
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="vehicle-registration" className="form__label">
                                    Vehicle Registration #
                                </label>
                                <div className="select-wrap">

                                    <Select
                                        name="vehicle"
                                        options={vehicleList}
                                        value={vehicleList.find(option => option.value === info.vehicle)}

                                        id="focus-point"
                                        onChange={selectData}
                                        isSearchable
                                    >
                                    </Select>
                                    {(checkValidation && info.vehicle == null) ? errorTxt : ""}
                                </div>
                            </div>
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="vehicle-type" className="form__label">
                                    Vehicle Type (Model)
                                </label>
                                <div className="select-wrap">

                                    <input type="text" value={info.vehicle_type} className="form__input" id="dsc"/>
                                </div>
                            </div>

                            <div className="form__field collapsable-item__field">
                                <label htmlFor="dsc" className="form__label">
                                    Vehicle Body Description
                                </label>
                                <input type="text" value={info.vehicle_body} className="form__input" id="dsc"/>
                            </div>
                            <div className="form__field">
                                <label htmlFor="agencies" className="form__label">
                                    What is being carried out
                                </label>
                                <div className="select-wrap">
                                    <Select
                                        name="carried"
                                        value={info.carried}
                                        isMulti
                                        options={carriList}
                                        onChange={selectData}
                                        className="basic-multi-select"
                                        isSearchable
                                    >
                                    </Select>
                                    {/*{(checkValidation && storeData.agency.length == 0) ? errorTxt: ""}*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='staff-list mt-4'>
                        <DualListBox
                            canFilter
                            selected={selected}
                            onChange={(newValue) => employeeSet(newValue)}
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
                        {(checkValidation && info.staff.length == 0) ? errorTxt : ""}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Collapsable2;