import { useState } from "react";
import Collapsable2 from "./components/collapsable2";
const Step3 = ({data,vehicleStore}) => {
  const [items, setitems] = useState([{}]);
  const [vehicleList, setvehicleList] = useState(data);
  const handleChange = async (name, value, index_no) => {
    let isAdd = 1;
    const updatedvehicle_list = vehicleList.map((item, index) => {
      if (item.index_no === index_no) {
        isAdd = 0;
        return {...item, [name]: value};
      }
      return item;
    });

    if (isAdd) {
      let newData = [...vehicleList, {index_no: index_no, [name]: value}];
      vehicleStore(newData)
    }else{
      await setvehicleList(old=>updatedvehicle_list)
      vehicleStore(updatedvehicle_list)
    }
  };

  const handleClick = () => {
    setitems([...items, {}]);
  }

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14">

        {vehicleList.map((item,index) => <Collapsable2 info={item} setInfo={handleChange} item={index}/>)}

        <div className="collapsable-item__btn">
          <button type="button" className="add-btn" onClick={handleClick}>
            + Add New
          </button>
        </div>
    </div>
  );
};

export default Step3;
