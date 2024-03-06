
import { useState } from "react";
import DualListBox from "react-dual-listbox";
import 'react-dual-listbox/lib/react-dual-listbox.css';
import Select2 from "react-select2-wrapper";
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
        setCollapse(!collapse);
    };

    return (
        <>
            <div className={`collapsable-item ${collapse ? "active" : ""} `}>
                <div
                    className='collapsable-item__header collapse-trigger'
                    onClick={handleClick}
                >
                    <h3 className='collapsable-item__header-title'>
                        Vehicle and Driver Details
                    </h3>
                </div>
                <div className='collapsable-item__body'>
                    <div className='collapsable-item__body-row flex-start-spb'>
                        <div className='collapsable-item__body-col'>
                            <h3 className='collapsable-item__body-title'>
                                Driver
                            </h3>
                            <div className='form__field collapsable-item__field'>
                                <label
                                    htmlFor='agency-name'
                                    className='form__label'
                                >
                                    Agency Name
                                </label>
                                <div className='select-wrap'>
                                <Select2
                                    className='form-control'
                                    defaultValue='1'
                                    options={{
                                        placeholder: "Select",
                                    }}
                                    data={[
                                        { id: "1", text: "Option 1" },
                                        { id: "2", text: "Option 2" },
                                        { id: "3", text: "Option 3" },
                                        { id: "4", text: "Option 4" },
                                        { id: "5", text: "Option 5" },
                                    ]}
                                />
                            </div>
                            </div>

                            <div className='form__field collapsable-item__field'>
                                <label
                                    htmlFor='driver-name'
                                    className='form__label'
                                >
                                    Driver Name
                                </label>
                                <input
                                    type='text'
                                    className='form__input'
                                    id='driver-name'
                                />
                            </div>
                        </div>
                        <div className='collapsable-item__body-col'>
                            <h3 className='collapsable-item__body-title'>
                                Vehicle
                            </h3>
                            <div className='form__field collapsable-item__field'>
                                <label
                                    htmlFor='vehicle-registration'
                                    className='form__label'
                                >
                                    Vehicle Registration #
                                </label>
                                <div className='select-wrap'>
                                    <Select2
                                        className='form-control'
                                        defaultValue='1'
                                        options={{
                                            placeholder: "Select",
                                        }}
                                        data={[
                                            { id: "1", text: "Option 1" },
                                            { id: "2", text: "Option 2" },
                                            { id: "3", text: "Option 3" },
                                            { id: "4", text: "Option 4" },
                                            { id: "5", text: "Option 5" },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className='form__field collapsable-item__field'>
                                <label
                                    htmlFor='vehicle-type'
                                    className='form__label'
                                >
                                    Vehicle Type (Model)
                                </label>
                                <div className='select-wrap'>
                                    <Select2
                                        className='form-control'
                                        defaultValue='1'
                                        options={{
                                            placeholder: "Select",
                                        }}
                                        data={[
                                            { id: "1", text: "Option 1" },
                                            { id: "2", text: "Option 2" },
                                            { id: "3", text: "Option 3" },
                                            { id: "4", text: "Option 4" },
                                            { id: "5", text: "Option 5" },
                                        ]}
                                    />
                                </div>
                            </div>

                            <div className='form__field collapsable-item__field'>
                                <label htmlFor='dsc' className='form__label'>
                                    Vehcile Body Description
                                </label>
                                <input
                                    type='text'
                                    className='form__input'
                                    id='dsc'
                                />
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
    );
};

export default Collapsable2;
