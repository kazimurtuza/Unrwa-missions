
import { useState } from "react";
import DualListBox from "react-dual-listbox";
import 'react-dual-listbox/lib/react-dual-listbox.css';

const options = [
  { value: "1", label: "Staff One" },
  { value: "2", label: "Staff Two" },
  { value: "3", label: "Staff Three" },
  { value: "4", label: "Staff Four" },
  { value: "5", label: "Staff Five" },
  { value: "6", label: "Staff Six" },
  { value: "7", label: "Staff Seven" },
];

const Collapsable2 = () => {
	const [collapse, setCollapse] = useState(true);
  const [selected, setSelected] = useState([]);
	const handleClick = () => {
		setCollapse(!collapse)
	}

	return(
		<>
		<div className={`collapsable-item ${collapse ? "active": ""} `}>
          <div className="collapsable-item__header collapse-trigger" onClick={handleClick}>
            <h3 className="collapsable-item__header-title">
              Vehicle and Driver Details
            </h3>
          </div>
          <div className="collapsable-item__body">
            <div className="collapsable-item__body-row flex-start-spb">
              <div className="collapsable-item__body-col">
                <h3 className="collapsable-item__body-title">Driver</h3>
                <div className="form__field collapsable-item__field">
                  <label htmlFor="agency-name" className="form__label">
                    Agency Name
                  </label>
                  <div className="select-wrap">
                    <select
                      className="form__select"
                      name="facility"
                      id="agency-name"
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
                  <label htmlFor="driver-name" className="form__label">
                    Driver Name
                  </label>
                  <input type="text" className="form__input" id="driver-name" />
                </div>
              </div>
              <div className="collapsable-item__body-col">
                <h3 className="collapsable-item__body-title">Vehicle</h3>
                <div className="form__field collapsable-item__field">
                  <label htmlFor="vehicle-registration" className="form__label">
                    Vehicle Registration #
                  </label>
                  <div className="select-wrap">
                    <select
                      className="form__select"
                      name="vehicle-registration"
                      id="vehicle-registration"
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
                  <label htmlFor="vehicle-type" className="form__label">
                    Vehicle Type (Model)
                  </label>
                  <div className="select-wrap">
                    <select
                      className="form__select"
                      name="vehicle-type"
                      id="vehicle-type"
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
                  <label htmlFor="dsc" className="form__label">
                    Vehcile Body Description
                  </label>
                  <input type="text" className="form__input" id="dsc" />
                </div>
              </div>
            </div>
          </div>

          <div className='staff-list mt-4'>
                    <DualListBox
                        canFilter
                        selected={selected}
                        onChange={(newValue) => setSelected(newValue)}
                        filterCallback={(
                            option,
                            filterInput,
                            { getOptionLabel }
                        ) => {
                            if (filterInput === "") {
                                return true;
                            }

                            return new RegExp(filterInput, "i").test(
                                getOptionLabel(option)
                            );
                        }}
                        options={options}
                    />
                </div>
        </div>
		</>
	)
}

export default Collapsable2;