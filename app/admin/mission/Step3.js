import { useState } from "react";
import Collapsable2 from "./components/collapsable2";
const Step3 = (props) => {
  const [items, setitems] = useState([{}]);

  const handleClick = () => {
    setitems([...items, {}]);
  }

  return (
    <div className="w-full mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14">

        {items.map(item => <Collapsable2/>)}

        <div className="collapsable-item__btn">
          <button type="button" className="add-btn" onClick={handleClick}>
            + Add New
          </button>
        </div>
    </div>
  );
};

export default Step3;
