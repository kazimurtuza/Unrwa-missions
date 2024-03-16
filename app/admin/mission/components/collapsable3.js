import { useState } from "react";
const Collapsable3 = () => {
	const [collapse, setCollapse] = useState(true);

	const handleClick = () => {
		setCollapse(!collapse)
	}


	
	return(
		<>
		 <div className={`collapsable-item ${collapse ? "active": ""} `}>
          <div className="collapsable-item__header collapse-trigger" onClick={handleClick}>
            <h3 className="collapsable-item__header-title">Title</h3>
          </div>
          <div className="collapsable-item__body">
            <div className="collapsable-item__body-row flex-start-spb">
              <div className="collapsable-item__body-col">
                <h3 className="collapsable-item__body-title">Staff</h3>
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
                  <label htmlFor="staff-name" className="form__label">
                    Staff Name
                  </label>
                  <div className="select-wrap">
                    <select
                      className="form__select"
                      name="staff-name"
                      id="staff-name"
                    >
                      <option value="0" selected hidden>
                        Select
                      </option>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="collapsable-item__body-col">
                <h3 className="collapsable-item__body-title">Title</h3>
                <div className="collapsable-item__info">
                  <p>
                    <b>Phone</b>
                  </p>
                  <p>+00 223456789</p>
                </div>
                <div className="collapsable-item__info">
                  <p>
                    <b>Whatsapp</b>
                  </p>
                  <p>+00 22345665</p>
                </div>
                <div className="collapsable-item__info">
                  <p>
                    <b>Satellite Phone</b>
                  </p>
                  <p>+00 223456</p>
                </div>
                <div className="collapsable-item__info">
                  <p>
                    <b>Email Address</b>
                  </p>
                  <p>user@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
		</>
	)
}

export default Collapsable3;