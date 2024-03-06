import { useState } from "react";
import Select2 from "react-select2-wrapper";
const Collapsable1 = () => {
    const [collapse, setCollapse] = useState(true);

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
                        Movement Stops
                    </h3>
                </div>
                <div className='collapsable-item__body'>
                    <div className='collapsable-item__body-row flex-start-spb'>
                        <div className='collapsable-item__body-col'>
                            <h3 className='collapsable-item__body-title'>
                                Departure
                            </h3>
                            <div className='form__field collapsable-item__field'>
                                <label
                                    htmlFor='facility'
                                    className='form__label'
                                >
                                    Facility Ownership
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
                                    htmlFor='departure-time'
                                    className='form__label'
                                >
                                    Departure Time
                                </label>
                                <input
                                    type='time'
                                    className='form__input'
                                    id='departure-time'
                                />
                            </div>

                            <div className='form__field collapsable-item__field'>
                                <label
                                    htmlFor='premise-type'
                                    className='form__label'
                                >
                                    Premise Type
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
                                    htmlFor='installation-name'
                                    className='form__label'
                                >
                                    Installation Name
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
                                    htmlFor='building-code'
                                    className='form__label'
                                >
                                    Building Code
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
                                    htmlFor='longitude'
                                    className='form__label'
                                >
                                    Longitude
                                </label>
                                <input
                                    type='text'
                                    className='form__input'
                                    id='longitude'
                                />
                            </div>
                            <div className='form__field collapsable-item__field'>
                                <label
                                    htmlFor='latitude'
                                    className='form__label'
                                >
                                    Latitude
                                </label>
                                <input
                                    type='text'
                                    className='form__input'
                                    id='latitude'
                                />
                            </div>
                        </div>
                        <div className='collapsable-item__body-col'>
                            <h3 className='collapsable-item__body-title'>
                                Arrival
                            </h3>

                            <div className='form__field collapsable-item__field'>
                            <label
                                htmlFor='facility2'
                                className='form__label'
                            >
                                Facility Ownership
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
                                    htmlFor='arrival-time'
                                    className='form__label'
                                >
                                Arrival Time
                                </label>
                                <input
                                    type='time'
                                    className='form__input'
                                    id='arrival-time'
                                />
                            </div>

                            <div className='form__field collapsable-item__field'>
                                <label
                                    htmlFor='premise-type2'
                                    className='form__label'
                                >
                                    Premise Type
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
                                    htmlFor='installation-name2'
                                    className='form__label'
                                >
                                    Installation Name
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
                                    htmlFor='building-code2'
                                    className='form__label'
                                >
                                    Building Code
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
                                    htmlFor='longitude2'
                                    className='form__label'
                                >
                                    Longitude
                                </label>
                                <input
                                    type='text'
                                    className='form__input'
                                    id='longitude2'
                                />
                            </div>
                            <div className='form__field collapsable-item__field'>
                                <label
                                    htmlFor='latitude2'
                                    className='form__label'
                                >
                                    Latitude
                                </label>
                                <input
                                    type='text'
                                    className='form__input'
                                    id='latitude2'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Collapsable1;
