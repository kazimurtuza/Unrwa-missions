import {useState} from "react";
import Collapsable2 from "./components/collapsable2";

const Step3 = ({data, vehicleStore,emptyVehicle,checkValidation,vehicleStaff}) => {
    const [items, setitems] = useState([{}]);
    const [vehicleList, setvehicleList] = useState(data);
    const handleChange = async (name, value, index_no) => {
        let isAdd = 1;

        const updatedvehicle_list = await vehicleList.map((item, index) => {
            if (item.index_no === index_no) {
                isAdd = 0;
                if (name == 'vehicle') {
                    return {
                        ...item, [name]: value.value,
                        vehicle_type: value.list.vehicle_type,
                        vehicle_body: value.list.description,
                    };
                } else {
                    return {...item, [name]: value};
                }

            }
            return item;
        });

        if (isAdd) {
            let newData = [...vehicleList, {index_no: index_no, [name]: value}];
            vehicleStore(newData)
        } else {
            console.log(updatedvehicle_list);
            await setvehicleList(old => updatedvehicle_list)
            vehicleStore(updatedvehicle_list)
        }
    };

    const handleClick = () => {
        let newdata = [...vehicleList, {...emptyVehicle,index_no: vehicleList.length,}];
        setvehicleList(newdata);
        vehicleStore(newdata);
    }

    return (
        <div className="w-full mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14">

            {vehicleList.map((item, index) => <Collapsable2 info={item} vehicleStaff={vehicleStaff} checkValidation={checkValidation} setInfo={handleChange} item={index}/>)}

            <div className="collapsable-item__btn">
                <button type="button" className="add-btn" onClick={handleClick}>
                    + Add New
                </button>
            </div>
        </div>
    );
};

export default Step3;
