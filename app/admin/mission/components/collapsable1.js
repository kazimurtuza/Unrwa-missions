import { useState } from "react";

const Collapsable1 = ({setInfo,item}) => {
	const [collapse, setCollapse] = useState(true);

	const handleClick = () => {
		setCollapse(!collapse)
	}

  const setdata = (e) => {
    const { name, value } = e.target;
    setInfo(name,value,item); // Pass the input value to the parent component
  };

return (
	    <>
		  <div className={`collapsable-item ${collapse ? "active": ""} `}>
            <div className="collapsable-item__header collapse-trigger" onClick={handleClick}>
              <h3 className="collapsable-item__header-title">Movement Stops {item+1}</h3>
            </div>
            <div className="collapsable-item__body">
              <div className="collapsable-item__body-row flex-start-spb">
                <div className="collapsable-item__body-col">
                  <h3 className="collapsable-item__body-title">Departure</h3>
                  <div className="form__field collapsable-item__field">
                    <label htmlFor="departure-time" className="form__label">
                      Departure Time
                    </label>
                    <input
                      type="time"
                      className="form__input"
                      id="departure-time"
                    />
                  </div>
                  <div className="form__field collapsable-item__field">
                    <label htmlFor="facility" className="form__label">
                      Facility Ownership
                    </label>
                    <div className="select-wrap">
                      <select
                        className="form__select"
                        name="facility"
                        id="facility"
                        onChange={setdata}
                      >
                        <option value="0" selected hidden>
                          Select
                        </option>
                        <option value="1">Umrah</option>
                        <option value="2">Non Umrah</option>
                      </select>
                    </div>
                  </div>
                  <div className="form__field collapsable-item__field">
                    <label htmlFor="premise-type" className="form__label">
                      Premise Type
                    </label>
                    <div className="select-wrap">
                      <select
                        className="form__select"
                        name="facility"
                        id="premise-type"
                        onChange={setdata}
                      >
                        <option value="0"  selected hidden>
                          Select
                        </option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                      </select>
                    </div>
                  </div>
                  <div className="form__field collapsable-item__field">
                    <label htmlFor="installation-name" className="form__label">
                      Installation Name
                    </label>
                    <div className="select-wrap">
                      <select
                        className="form__select"
                        name="facility"
                        id="installation-name"
                      >
                        <option value="0" selected hidden>
                          Select
                        </option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                      </select>
                    </div>
                  </div>
                  <div className="form__field collapsable-item__field">
                    <label htmlFor="building-code" className="form__label">
                      Building Code
                    </label>
                    <div className="select-wrap">
                      <select
                        className="form__select"
                        name="facility"
                        id="building-code"
                      >
                        <option value="0" selected hidden>
                          Select
                        </option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                      </select>
                    </div>
                  </div>
                  <div className="form__field collapsable-item__field">
                    <label htmlFor="longitude" className="form__label">
                      Longitude
                    </label>
                    <input type="text" className="form__input" id="longitude" />
                  </div>
                  <div className="form__field collapsable-item__field">
                    <label htmlFor="latitude" className="form__label">
                      Latitude
                    </label>
                    <input type="text" className="form__input" id="latitude" />
                  </div>
                </div>
                <div className="collapsable-item__body-col">
                  <h3 className="collapsable-item__body-title">Arrival</h3>
                  <div className="form__field collapsable-item__field">
                    <label htmlFor="arrival-time" className="form__label">
                      Departure Time
                    </label>
                    <input type="time" className="form__input" id="arrival-time" />
                  </div>
                  <div className="form__field collapsable-item__field">
                    <label htmlFor="facility2" className="form__label">
                      Facility Ownership
                    </label>
                    <div className="select-wrap">
                      <select
                        className="form__select"
                        name="facility"
                        id="facility2"
                      >
                        <option value="0" selected hidden>
                          Select
                        </option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                      </select>
                    </div>
                  </div>
                  <div className="form__field collapsable-item__field">
                    <label htmlFor="premise-type2" className="form__label">
                      Premise Type
                    </label>
                    <div className="select-wrap">
                      <select
                        className="form__select"
                        name="facility"
                        id="premise-type2"
                      >
                        <option value="0" selected hidden>
                          Select
                        </option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                      </select>
                    </div>
                  </div>
                  <div className="form__field collapsable-item__field">
                    <label htmlFor="installation-name2" className="form__label">
                      Installation Name
                    </label>
                    <div className="select-wrap">
                      <select
                        className="form__select"
                        name="facility"
                        id="installation-name2"
                      >
                        <option value="0" selected hidden>
                          Select
                        </option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                      </select>
                    </div>
                  </div>
                  <div className="form__field collapsable-item__field">
                    <label htmlFor="building-code2" className="form__label">
                      Building Code
                    </label>
                    <div className="select-wrap">
                      <select
                        className="form__select"
                        name="facility"
                        id="building-code2"
                      >
                        <option value="0" selected hidden>
                          Select
                        </option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                      </select>
                    </div>
                  </div>
                  <div className="form__field collapsable-item__field">
                    <label htmlFor="longitude2" className="form__label">
                      Longitude
                    </label>
                    <input type="text" className="form__input" id="longitude2" />
                  </div>
                  <div className="form__field collapsable-item__field">
                    <label htmlFor="latitude2" className="form__label">
                      Latitude
                    </label>
                    <input type="text" className="form__input" id="latitude2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
		</>
	);
};

export default Collapsable1;