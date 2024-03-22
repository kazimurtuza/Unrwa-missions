import {useState,useEffect} from "react";
import Collapsable2 from "./components/collapsable2";

const Step3 = ({data, vehicleStore, emptyVehicle, checkValidation, vehicleStaff, vehicleStaffStore,prevehicleStaf,updateVehicleStaf}) => {
    const [vehicleList, setvehicleList] = useState();

    async function fetchData() {
        try {
            const result = await data.vehicle_list; // Fetch vehicle list asynchronously
            setvehicleList(result); // Set data after fetching
        } catch (error) {
            console.error("Error fetching vehicle list:", error);
        }
    }

    useEffect(() => {
        fetchData(); // Call fetchData when component mounts
    }, []);




    const handleChange = async (name, value, index_no) => {
        console.log("ooooooo")
        console.log(data)
        console.log("ooooooo")
        // let isAdd = 1;
        const updatedvehicle_list = await vehicleList && vehicleList.map((item, index) => {
            if (item.index_no === index_no) {
                // isAdd = 0;
                if (name == 'vehicle') {
                    return {
                        ...item, [name]: value.value,
                        vehicle_type: value.list.vehicle_type,
                        vehicle_body: value.list.description,
                    };
                }
                // if (name == 'staff') {
                //     return item.staff = value;
                // } else {
                    return {...item, [name]: value};
                // }

            }
            return item;
        });

        // if (isAdd) {
        //     let newData = [...vehicleList, {index_no: index_no, [name]: value}];
        //     vehicleStore(newData)
        // } else {
        console.log(updatedvehicle_list);
        await setvehicleList(old => updatedvehicle_list)
        vehicleStore(updatedvehicle_list)
        // }
    };

    const handleClick = () => {
        let newdata = [...vehicleList, {...emptyVehicle, index_no: vehicleList.length,}];
        setvehicleList(newdata);
        vehicleStore(newdata);

       let newStaf=[...prevehicleStaf,[]]
        updateVehicleStaf(newStaf);
    }

    return (
        <div className="w-full mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14">

            {vehicleList && vehicleList.map((item, index) => <Collapsable2 info={item} vehicleStaff={vehicleStaff}
                                                            checkValidation={checkValidation} setInfo={handleChange}
                                                            item={index} vehicleStaffStore={vehicleStaffStore} prevehicleStaf={prevehicleStaf}
                                                                           updateVehicleStaf={updateVehicleStaf}/>)}

            <div className="collapsable-item__btn">
                <button type="button" className="add-btn" onClick={handleClick}>
                    + Add New
                </button>
            </div>
        </div>
    );
};

export default Step3;
