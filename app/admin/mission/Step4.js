import { useEffect, useState } from "react";
import Collapsable3 from "./components/collapsable3";
const Step4 = (props) => {
  const { data, setData } = props;

  const [items, setitems] = useState([<Collapsable3 key={5665}/>]);

  const handleClick = () => {
    setitems([...items, items[0]]);
  }

  const [fullAddress, setFullAddress] = useState({
    house: "",
    locality: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setFullAddress({
      ...fullAddress,
      [name]: value,
    });
  };

  useEffect(() => {
    const isDataEmpty = () => {
      for (const key in fullAddress) {
        if (fullAddress[key].trim() === "") {
          return true; // At least one property is empty
        }
      }

      return false; // All properties have values
    };
    if (!isDataEmpty()) {
      setData({
        ...data,
        address: fullAddress,
      });
    }
  }, [fullAddress]);

  return (
    <div className="w-full  mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14">

        {items.map(item => item)}

        <div className="collapsable-item__btn">
          <button type="button" className="add-btn"  onClick={handleClick}>
            + Add New
          </button>
        </div>
    </div>
  );
};

export default Step4;
