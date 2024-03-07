import {useState,useEffect} from "react";
import Collapsable1 from "./components/collapsable1";


const Step1 = ({data,locationSet}) => {




    const [locationList, setLocationList] = useState(data);
    const handleChange = async (name, value, index_no) => {
        let isAdd = 1;
        const updatedLocationList = locationList.map((item, index) => {
            if (item.index_no === index_no) {
                isAdd = 0;
                return {...item, [name]: value};
            }
            return item;
        });

        if (isAdd) {
            let newData = [...locationList, {index_no: index_no, [name]: value}];
            locationSet(newData)
        }else{
            await setLocationList(old=>updatedLocationList)
            locationSet(updatedLocationList)
        }
    };
    // const { data, handleChange } = props;
    const handleClick = () => {
        let newdata = [...locationList, {index_no: locationList.length,}];
        setLocationList(newdata);
        locationSet(newdata);
    }

    return (
        <div className="w-full mx-auto">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14">

                {locationList.map((item, index) => <Collapsable1 info={item} setInfo={handleChange} item={index}/>)}

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
