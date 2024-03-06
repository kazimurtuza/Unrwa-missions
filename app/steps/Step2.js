import { useState } from "react";
import Collapsable1 from "./components/collapsable1";

const Step1 = (props) => {
  // const { data, handleChange } = props;
  const [items, setitems] = useState([{}]);

  const handleClick = () => {
    setitems([...items, {}]);
  }

  return (
    <div className="w-full mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14">

          {items.map(item => <Collapsable1/>)}

          <div className="collapsable-item__btn">
            <button type="button" className="add-btn" onClick={handleClick}>
              + Add New
            </button>
          </div>
      </form>
    </div>
  );
};

export default Step1;
