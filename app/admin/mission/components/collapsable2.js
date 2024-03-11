import {useEffect, useState} from "react";
import DualListBox from "react-dual-listbox";
import 'react-dual-listbox/lib/react-dual-listbox.css';
import axiosClient from "@/app/axiosClient";
import Select from "react-select";

const options = [
    {value: "1", label: "Staff One"},
    {value: "2", label: "Staff Two"},
    {value: "3", label: "Staff Three"},
    {value: "4", label: "Staff Four"},
    {value: "5", label: "Staff Five"},
    {value: "6", label: "Staff Six"},
    {value: "7", label: "Staff Seven"},
];

const customStyles = {
    color: 'red',
    fontSize: '16px',
    fontWeight: 'bold',
    // Add more styles as needed
};

let errorTxt = <p style={customStyles}>This field is required.</p>

const Collapsable2 = ({info, setInfo, item,checkValidation}) => {

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

    const selectData = (selectedOption, {name}) => {
        // Pass the input value to the parent component
        var value=selectedOption.value;
        if(name=='vehicle'){
             value=selectedOption;
        }
        setInfo(name,value,item);
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
            const {data} = await axiosClient.get('driver');
            if (data.success === true) {
                const updatedDriverList = data.result.map(item => ({
                    value: item._id,
                    label: item.name,
                }));

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
    async function setSelectedVehicleInfo(){
        const seletVicleInfoData = await  vehicleList.find(option => option.value === info.vehicle)

        if (seletVicleInfoData) {
            console.log(seletVicleInfoData.list);
            setseletVicleInfo(old=>seletVicleInfoData.list);
        }
    }


    useEffect(() => {
        agencyListSet();
        driverListSet();
        staffListSet();
        vehicleListSet();
        if(info.vehicle){
            setSelectedVehicleInfo();
        }
    }, []);


    const [collapse, setCollapse] = useState(true);
    const [selected, setSelected] = useState([]);
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
        setInfo(name, value, item); // You need to define 'item' somewhere in your code
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
                                    {(checkValidation && info.agency == null) ? errorTxt: ""}
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
                                {(checkValidation && info.driver == null) ? errorTxt: ""}
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
                                    {(checkValidation && info.vehicle == null) ? errorTxt: ""}
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
                    {(checkValidation && info.staff.length == 0) ? errorTxt: ""}
                </div>
            </div>
        </>
    )
}

export default Collapsable2;