import { useState } from "react";
import Collapsable1 from "./components/collapsable1";

const Step1 = (props) => {
  // const { data, handleChange } = props;
  const [items, setitems] = useState([<Collapsable1/>]);
  
  const handleClick = () => {
    setitems([...items, items[0]]);
  }

  return (
    <div className="w-full mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14">

          {items.map(item => item)}

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
