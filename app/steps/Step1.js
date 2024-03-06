import Select2 from "react-select2-wrapper";

const Step1 = (props) => {
    // const { data, handleChange } = props;

    return (
        <div className=' w-full mx-auto'>
            <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14'>
                <h2 className='form__title'>Title</h2>
                <div className='form__fields'>
                    <div className='form__row flex-start-spb'>
                        <div className='form__field'>
                            <label
                                htmlFor='focus-point'
                                className='form__label'
                            >
                                Mission Focal Point
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
                    </div>
                    <div className='form__info-box'>
                        <h3 className='form__info-box__title'>
                            Mission Focal Point Contact Details
                        </h3>
                        <div className='form__row flex-ctr-spb'>
                            <div className='form__col'>
                                <p>
                                    <b>Name</b>
                                </p>
                                <p>Joel Peris</p>
                            </div>
                            <div className='form__col'>
                                <p>
                                    <b>Satellite Phone</b>
                                </p>
                                <p>+00 223456789</p>
                            </div>
                        </div>
                        <div className='form__row flex-ctr-spb'>
                            <div className='form__col'>
                                <p>
                                    <b>Phone</b>
                                </p>
                                <p>+00 223456789</p>
                            </div>
                            <div className='form__col'>
                                <p>
                                    <b>Email Address</b>
                                </p>
                                <p>user@yourmai.com</p>
                            </div>
                        </div>
                        <div className='form__row flex-ctr-spb'>
                            <div className='form__col'>
                                <p>
                                    <b>Whatsapp</b>
                                </p>
                                <p>+00 223456789</p>
                            </div>
                        </div>
                    </div>
                    <div className='form__row flex-start-spb'>
                        <div className='form__field'>
                            <label htmlFor='agencies' className='form__label'>
                                Agencies
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
                        <div className='form__field'>
                            <label htmlFor='date' className='form__label'>
                                Movement Date
                            </label>
                            <div className='date-wrap'>
                                <input
                                    type='date'
                                    className='form__input'
                                    id='date'
                                    value=''
                                />
                            </div>
                        </div>
                    </div>
                    <div className='form__row flex-start-spb'>
                        <div className='form__field'>
                            <label htmlFor='purpose' className='form__label'>
                                Purpose
                            </label>
                            <textarea
                                className='form__textarea'
                                name='purpose'
                                id='purpose'
                            ></textarea>
                        </div>

                        <div className='form__field'>
                            <label htmlFor='remarks' className='form__label'>
                                Remarks
                            </label>
                            <textarea
                                className='form__textarea'
                                name='remarks'
                                id='remarks'
                            ></textarea>
                        </div>
                    </div>
                    <div className='form__row flex-start-spb'>
                        <div className='form__field'>
                            <label
                                htmlFor='classification'
                                className='form__label'
                            >
                                Mission Cluster
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
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Step1;
