import {useState, useEffect} from "react";
import Collapsable1 from "./components/collapsable1";


const Step1 = ({data, locationSet,checkValidation,emptyLocation}) => {


    const [locationList, setLocationList] = useState(data);
    const handleChange = async (name, value, index_no) => {
        let isAdd = 1;
        const updatedLocationList = await locationList.map((item, index) => {
            if (item.index_no === index_no) {
                isAdd = 0;
                if ("arrival_umrah_id" == name || "departure_umrah_id" == name) {
                    var exten = 'departure_umrah_id' == name ? 'departure' : 'arrival';
                    let lon = value.info.longitude;
                    let lat = value.info.latitude;
                    let code = value.info.building_code;
                    return {
                        ...item, [name]: value.value,
                        [exten + "_latitude"]: lat,
                        [exten + "_longitude"]: lon,
                        [exten + "_building_code"]: code
                    };
                } else if ('departure_umrah_type' == name || 'arrival_umrah_type' == name) {
                    if (value == 0) {
                        var exten = 'departure_umrah_type' == name ? 'departure' : 'arrival';
                        return {
                            ...item, [name]: value,
                            [exten + "_umrah_id"]: null,
                            [exten + "_latitude"]: '',
                            [exten + "_longitude"]: '',
                            [exten + "_building_code"]: '',
                            [exten + "_premise_type"]: null
                        };
                    } else {
                        return {...item, [name]: value};
                    }
                } else {
                    return {...item, [name]: value};
                }

            }
            return item;
        });

        if (isAdd) {
            let newData = [...locationList, {index_no: index_no, [name]: value}];
            locationSet(newData)
        } else {
            await setLocationList(old => updatedLocationList)
            locationSet(updatedLocationList)
        }
    };
    // const { data, handleChange } = props;
    const handleClick = () => {
        let newdata = [...locationList, {...emptyLocation,index_no: locationList.length,}];
        setLocationList(newdata);
        locationSet(newdata);


    }

    return (
        <div className="w-full mx-auto">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14">

                {locationList.map((item, index) => <Collapsable1 info={item} checkValidation={checkValidation} setInfo={handleChange} item={index}/>)}

                <div className="collapsable-item__btn">
                    <button type="button" className="add-btn" onClick={handleClick}>
                        + Add New
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step1;
