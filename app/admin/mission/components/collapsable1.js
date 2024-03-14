import {useEffect, useState} from "react";
import Select from 'react-select'
import axiosClient from "@/app/axiosClient";

const Collapsable1 = ({info, setInfo, item, checkValidation}) => {
    const [collapse, setCollapse] = useState(true);
    const [premiseTypeList, setPremiseTypeList] = useState([]);
    const [departureUmrahInfo, setDepartureUmrahInfo] = useState();
    const [arrivalUmrahInfo, setArrivalUmrahInfo] = useState();
    const [arrivalInstallationList, setarrivalInstallationList] = useState([]);
    const [departureInstallationList, setDepartureInstallationList] = useState([]);


    const handleClick = () => {
        setCollapse(!collapse)
    }
    const selectData = async (selectedOption, {name}) => {
        if ("arrival_umrah_id" == name || "departure_umrah_id" == name) {
            var val = await selectedOption;
        } else {
            var val = await selectedOption.value;
        }
        await setInfo(name, val, item); // Pass the input value to the parent component

        if (name == 'arrival_premise_type') {

            setArrivalInstallation()
        }
        if (name == 'departure_premise_type') {
            setDepartureInstallation()
        }


    };
    const setdata = (e) => {

        const {name, value} = e.target;
        // if("departure_latitude"==name){
        //     setdiplet(old=>value)
        // }
        setInfo(name, value, item); // Pass the input value to the parent component


    };

    const customStyles = {
        color: 'red',
        fontSize: '16px',
        fontWeight: 'bold',
        // Add more styles as needed
    };

    let errorTxt = <p style={customStyles}>This field is required.</p>

    const premisetypeList = async () => {
        try {
            const {data} = await axiosClient.get('premise-type');
            if (data.success === true) {
                const updatedAgencyList = data.result.map(item => ({
                    value: item._id,
                    label: item.name,
                }));

                setPremiseTypeList(updatedAgencyList);
            }
        } catch (error) {
            setPremiseTypeList([]);
        }
    };
    const setInstallation = async () => {
        try {
            const {data} = await axiosClient.get('umrah');
            if (data.success === true) {
                const updatedInstallatList = data.result.map(item => ({
                    value: item._id,
                    label: item.installation_name,
                    info: {
                        longitude: item.longitude,
                        latitude: item.latitude,
                        building_code: item.building_code,
                    },
                }));

                setarrivalInstallationList(updatedInstallatList);
                setDepartureInstallationList(updatedInstallatList);

            }
        } catch (error) {
            setarrivalInstallationList()
            setDepartureInstallationList()
        }
    };

    const getSelectedData = async () => {
        setDepartureUmrahInfo()
        const selectedStaff = await staffList.find(option => option.value === storeData.leader)
        if (selectedStaff) {
            setAdminInfo(selectedStaff.list);
        }
    };

    async function setArrivalInstallation() {
        if (info.arrival_premise_type != null) {
            let url = `premise-type-wise-installation/${info.arrival_premise_type}`
            const {data} = await axiosClient.get(url);
            console.log(data);
            if (data.success === true) {
                const updatedInstallatList = data.result.map(item => ({
                    value: item._id,
                    label: item.installation_name,
                    info: {
                        longitude: item.longitude,
                        latitude: item.latitude,
                        building_code: item.building_code,
                    },
                }));

                setarrivalInstallationList(old => updatedInstallatList);
            }
        }
    }

    async function setDepartureInstallation() {
        if (info.departure_premise_type != null) {
            let url = `premise-type-wise-installation/${info.departure_premise_type}`
            const {data} = await axiosClient.get(url);
            if (data.success === true) {
                const updatedInstallatList = data.result.map(item => ({
                    value: item._id,
                    label: item.installation_name,
                    info: {
                        longitude: item.longitude,
                        latitude: item.latitude,
                        building_code: item.building_code,
                    },
                }));
                setDepartureInstallationList(old => updatedInstallatList);
            }
        }
    }


    useEffect(() => {
        premisetypeList();
        // setInstallation();
        setArrivalInstallation();
        setDepartureInstallation();
    }, []);

    return (
        <>
            <div className={`collapsable-item ${collapse ? "active" : ""} `}>
                <div className="collapsable-item__header collapse-trigger" onClick={handleClick}>
                    <h3 className="collapsable-item__header-title">Movement Stops {item + 1}</h3>
                </div>
                <div className="collapsable-item__body">
                    <div className="collapsable-item__body-row flex-start-spb">
                        <div className="collapsable-item__body-col">
                            <h3 className="collapsable-item__body-title">Departure</h3>
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="departure-time" className="form__label">
                                    Departure Time
                                </label>
                                <input
                                    type="datetime-local"
                                    name="departure_time"
                                    value={info.departure_time}
                                    onChange={setdata}
                                    className="form__input"
                                    id="departure-time"
                                />
                                {(checkValidation && info.departure_time == "") ? errorTxt : ""}
                            </div>
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="facility" className="form__label">
                                    Facility Ownership
                                </label>
                                <div className="select-wrap">
                                    <select
                                        className="form__select"
                                        name="departure_umrah_type"
                                        id="facility"
                                        value={info.departure_umrah_type}
                                        onChange={setdata}
                                    >
                                        <option value="1">UNRWA</option>
                                        <option value="0">NOT UNRWA</option>
                                    </select>
                                </div>
                            </div>
                            {info.departure_umrah_type == 1 ? <div className="form__field collapsable-item__field">
                                <label htmlFor="premise-type" className="form__label">
                                    Premise Type
                                </label>
                                <div className="select-wrap">
                                    <Select
                                        name="departure_premise_type"
                                        value={premiseTypeList.find(option => option.value === info.departure_premise_type)}
                                        options={premiseTypeList}
                                        id="focus-point"
                                        onChange={selectData}
                                        isSearchable
                                    >
                                    </Select>
                                    {(checkValidation && info.departure_premise_type == null) ? errorTxt : ""}
                                </div>
                            </div> : ''}
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="installation-name" className="form__label">
                                    Installation Name
                                </label>
                                <div className="select-wrap">
                                    {info.departure_umrah_type == 1 ?
                                        <>
                                            <Select
                                                name="departure_umrah_id"
                                                options={departureInstallationList}
                                                value={departureInstallationList.find(option => option.value === info.departure_umrah_id)}

                                                id="focus-point"
                                                onChange={selectData}
                                                isSearchable
                                            >
                                            </Select>
                                            {(checkValidation && info.departure_umrah_id == null) ? errorTxt : ""}
                                        </>
                                        : <div className="select-wrap">
                                            <input type="text" value={info.departure_installation_name}
                                                   name="departure_installation_name" onInput={setdata}
                                                   className="form__input" id="latitude"/>
                                            {(checkValidation && info.departure_installation_name == "") ? errorTxt : ""}
                                        </div>}
                                </div>
                            </div>
                            {info.departure_umrah_type == 1 ?
                                <div className="form__field collapsable-item__field">
                                    <label htmlFor="building-code" className="form__label">
                                        Building Code
                                    </label>

                                    <input type="text" name="departure_building_code"
                                           value={info.departure_building_code} onInput={setdata}
                                           className="form__input" id="latitude"/>
                                    {(checkValidation && info.departure_building_code == "") ? errorTxt : ""}
                                </div> : ""
                            }
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="longitude" className="form__label">
                                    Longitude
                                </label>
                                <input type="text" name="departure_longitude" value={info.departure_longitude}
                                       onInput={setdata} className="form__input" id="longitude"/>
                                {(checkValidation && info.departure_longitude == "") ? errorTxt : ""}
                            </div>
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="latitude" className="form__label">
                                    Latitude
                                </label>
                                <input type="text" name="departure_latitude" value={info.departure_latitude}
                                       onInput={setdata} className="form__input" id="latitude"/>
                                {(checkValidation && info.departure_latitude == "") ? errorTxt : ""}
                            </div>
                        </div>
                        <div className="collapsable-item__body-col">
                            <h3 className="collapsable-item__body-title">Arrival</h3>
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="arrival-time" className="form__label">
                                    Arrival Time
                                </label>
                                <input type="datetime-local" value={info.arrival_time} onChange={setdata}
                                       name='arrival_time'
                                       className="form__input" id="arrival-time"/>
                                {(checkValidation && info.arrival_time == "") ? errorTxt : ""}
                            </div>
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="facility2" className="form__label">
                                    Facility Ownership
                                </label>
                                <div className="select-wrap">
                                    <select
                                        className="form__select"
                                        name="arrival_umrah_type"
                                        value={info.arrival_umrah_type}
                                        id="facility2"
                                        onChange={setdata}
                                    >
                                        <option value="1">UNRWA</option>
                                        <option value="0">NOT UNRWA</option>
                                    </select>

                                </div>
                            </div>
                            {info.arrival_umrah_type == 1 ?
                                <div className="form__field collapsable-item__field">
                                    <label htmlFor="premise-type2" className="form__label">
                                        Premise Type
                                    </label>
                                    <div className="select-wrap">
                                        <Select
                                            name="arrival_premise_type"
                                            options={premiseTypeList}
                                            value={premiseTypeList.find(option => option.value === info.arrival_premise_type)}
                                            id="focus-point"
                                            onChange={selectData}
                                            isSearchable
                                        >
                                        </Select>
                                        {(checkValidation && info.arrival_premise_type == null) ? errorTxt : ""}
                                    </div>
                                </div> : ''}

                            <div className="form__field collapsable-item__field">
                                <label htmlFor="installation-name2" className="form__label">
                                    Installation Name
                                </label>

                                <div className="select-wrap">
                                    {info.arrival_umrah_type == 1 ? <>
                                            <Select
                                                name="arrival_umrah_id"
                                                options={arrivalInstallationList}
                                                value={arrivalInstallationList.find(option => option.value === info.arrival_umrah_id)}
                                                // options={departureUmraheList}
                                                id="focus-point"
                                                onChange={selectData}
                                                isSearchable
                                            >
                                            </Select>
                                            {(checkValidation && info.arrival_umrah_id == null) ? errorTxt : ""}
                                        </>
                                        : <div className="select-wrap">
                                            <input type="text" value={info.arrival_installation_name}
                                                   name="arrival_installation_name" onInput={setdata}
                                                   className="form__input" id="latitude"/>
                                            {(checkValidation && info.arrival_installation_name == "") ? errorTxt : ""}
                                        </div>}
                                </div>


                            </div>
                            {info.arrival_umrah_type == 1 ?
                                <div className="form__field collapsable-item__field">
                                    <label htmlFor="building-code2" className="form__label">
                                        Building Code
                                    </label>
                                    <div className="select-wrap">
                                        <input type="text" name="arrival_building_code"
                                               value={info.arrival_building_code} onInput={setdata}
                                               className="form__input" id="latitude"/>
                                        {(checkValidation && info.arrival_building_code == "") ? errorTxt : ""}
                                    </div>
                                </div> : ""}
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="longitude2" className="form__label">
                                    Longitude
                                </label>
                                <input type="text" value={info.arrival_longitude} name="arrival_longitude"
                                       onInput={setdata} className="form__input" id="longitude2"/>
                                {(checkValidation && info.arrival_longitude == "") ? errorTxt : ""}
                            </div>
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="latitude2" className="form__label">
                                    Latitude
                                </label>
                                <input type="text" value={info.arrival_latitude} name="arrival_latitude"
                                       onInput={setdata} className="form__input" id="latitude2"/>
                                {(checkValidation && info.arrival_latitude == "") ? errorTxt : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Collapsable1;