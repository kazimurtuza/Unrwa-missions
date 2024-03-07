import {useEffect, useState} from "react";
import Select from 'react-select'
import axiosClient from "@/app/axiosClient";


const Collapsable1 = ({info,setInfo, item}) => {
    const [collapse, setCollapse] = useState(true);
    const [premiseTypeList, setPremiseTypeList] = useState([]);
    const [departureUmraheList, setDepartureUmrahList] = useState([]);
    const [arrivalUmraheList, setArrivalUmrahList] = useState([]);
    const [arrivalInstallationList, setarrivalInstallationList] = useState([]);
    const [departureInstallationList, setDepartureInstallationList] = useState([]);

    const handleClick = () => {
        setCollapse(!collapse)
    }
    const selectData = (selectedOption, {name}) => {
        setInfo(name, selectedOption.value); // Pass the input value to the parent component
    };
    const setdata = (e) => {
        const {name, value} = e.target;
        setInfo(name, value, item); // Pass the input value to the parent component
        console.log(info)
    };

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
                }));

                setarrivalInstallationList(updatedInstallatList);
                setDepartureInstallationList(updatedInstallatList);

            }
        } catch (error) {
            setarrivalInstallationList()
            setDepartureInstallationList()
        }
    };
    useEffect(() => {
        premisetypeList();
        setInstallation();
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
                                    type="time"
                                    name="departure_time"
                                    onChange={setdata}
                                    className="form__input"
                                    id="departure-time"
                                />
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
                                        <option value="0" selected hidden>
                                            Select
                                        </option>
                                        <option value="1">Umrah</option>
                                        <option value="0">Non Umrah</option>
                                    </select>
                                </div>
                            </div>
                            {info.departure_umrah_type==1?<div className="form__field collapsable-item__field">
                                <label htmlFor="premise-type" className="form__label">
                                    Premise Type
                                </label>
                                <div className="select-wrap">
                                    <Select
                                        name="departure_premise_type"
                                        options={premiseTypeList}
                                        id="focus-point"
                                        onChange={selectData}
                                        isSearchable
                                    >
                                    </Select>
                                </div>
                            </div>:''}
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="installation-name" className="form__label">
                                    Installation Name
                                </label>
                                <div className="select-wrap">
                                    {info.departure_umrah_type==1?
                                        <Select
                                            name="departure_umrah_id"
                                            options={arrivalInstallationList}
                                            id="focus-point"
                                            onChange={selectData}
                                            isSearchable
                                        >
                                        </Select>
                                        :<div className="select-wrap">
                                            <input type="text"  value={info.departure_installation_name} name="departure_installation_name"   onInput={setdata} className="form__input" id="latitude"/>
                                        </div>}
                                </div>
                            </div>
                            {info.departure_umrah_type==1?
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="building-code" className="form__label">
                                    Building Code
                                </label>
                                <input type="text" name="departure_building_code" value={info.departure_building_code} onInput={setdata} className="form__input" id="latitude"/>
                            </div>:""
                            }
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="longitude" className="form__label">
                                    Longitude
                                </label>
                                <input type="text" name="departure_longitude" value={info.departure_longitude} onInput={setdata} className="form__input" id="longitude"/>
                            </div>
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="latitude" className="form__label">
                                    Latitude
                                </label>
                                <input type="text" name="departure_latitude" value={info.departure_latitude} onInput={setdata} className="form__input" id="latitude"/>
                            </div>
                        </div>
                        <div className="collapsable-item__body-col">
                            <h3 className="collapsable-item__body-title">Arrival</h3>
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="arrival-time" className="form__label">
                                    Departure Time
                                </label>
                                <input type="time" className="form__input" id="arrival-time"/>
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
                                        <option value="1">Umrah</option>
                                        <option value="0">Non Umrah</option>
                                    </select>

                                </div>
                            </div>
                            {info.arrival_umrah_type==1?
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="premise-type2" className="form__label">
                                    Premise Type
                                </label>
                                <div className="select-wrap">
                                    <Select
                                        name="arrival_premise_type"
                                        options={premiseTypeList}
                                        id="focus-point"
                                        onChange={selectData}
                                        isSearchable
                                    >
                                    </Select>
                                </div>
                            </div>:''}

                            <div className="form__field collapsable-item__field">
                                <label htmlFor="installation-name2" className="form__label">
                                    Installation Name
                                </label>

                                <div className="select-wrap">
                                    {info.arrival_umrah_type==1?
                                        <Select
                                            name="arrival_umrah_id"
                                            options={arrivalInstallationList}
                                            // options={departureUmraheList}
                                            id="focus-point"
                                            onChange={selectData}
                                            isSearchable
                                        >
                                        </Select>
                                        :<div className="select-wrap">
                                            <input type="text" value={info.arrival_installation_name} name="arrival_installation_name"   onInput={setdata} className="form__input" id="latitude"/>
                                        </div>}
                                </div>


                            </div>
                            {info.arrival_umrah_type==1?
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="building-code2" className="form__label">
                                    Building Code
                                </label>
                                <div className="select-wrap">
                                    <input type="text" name="arrival_building_code" value={info.arrival_building_code} onInput={setdata} className="form__input" id="latitude"/>
                                </div>
                            </div>:""}
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="longitude2" className="form__label">
                                    Longitude
                                </label>
                                <input type="text" value={info.arrival_longitude}   name="arrival_longitude" onInput={setdata} className="form__input" id="longitude2"/>
                            </div>
                            <div className="form__field collapsable-item__field">
                                <label htmlFor="latitude2" className="form__label">
                                    Latitude
                                </label>
                                <input type="text" value={info.arrival_latitude}  name="arrival_latitude" onInput={setdata} className="form__input" id="latitude2"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Collapsable1;