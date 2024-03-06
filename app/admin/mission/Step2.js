import {useState,useEffect} from "react";
import Collapsable1 from "./components/collapsable1";


const Step1 = ({data,locationSet}) => {

    const [locationList, setLocationList] = useState(data);

    // useEffect(() => {
    //     setLocationList(data)
    // }, [locationList])

    const handleChange = (name, value, index_no) => {
        let isAdd = 1;
        locationList.map((item, index) => {
            if (item.index_no === index_no) {
                item = {...item, [name]: value};
                isAdd = 0;
            }
        })

        if (isAdd) {
            let newdata = [...locationList, {index_no: index_no, [name]: value}];
            locationSet(newdata)
        }

        locationSet(locationList);

        // let update = {...storeData, [name]: value};
        // setStoreData(update);
        // console.log(storeData);
    };

    // const { data, handleChange } = props;
    const [items, setitems] = useState([1]);

    const handleClick = () => {
        // setitems([...items, items[0]]);
        let newdata = [...locationList, {index_no: locationList.length}];
        setLocationList(newdata);
        locationSet(newdata);
    }

    return (
        <div className="w-full mx-auto">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14">

                {locationList.map((item, index) => <Collapsable1 setInfo={handleChange} item={index}/>)}

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
