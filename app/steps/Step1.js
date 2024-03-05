
const Step1 = (props) => {
  // const { data, handleChange } = props;

  return (
    <div className=" w-full mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14">
        {/* <div className="mb-10">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Username
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="name" type="text" placeholder="Username..." value={data.name} onChange={handleChange} />
          </div>
          <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="email" type="email" placeholder="Email..." value={data.email} onChange={handleChange} />
          </div> */}
{/*
<Select2
  multiple
  data={['bug', 'feature', 'documents', 'discussion']}
  options={
    {
      placeholder: 'search by tags',
    }
  }

/> */}

        <h2 className="form__title">Title</h2>
        <div className="form__fields">
          <div className="form__row flex-start-spb">
            <div className="form__field">
              <label htmlFor="focus-point" className="form__label">
                Mission Focal Point
              </label>
              <div className="select-wrap">
                <select
                  name="focus-point"
                  className="form__select"
                  id="focus-point"
                >
                  <option value="0" selected hidden>
                    Select
                  </option>
                  <option value="1">Option 01</option>
                  <option value="2">Option 02</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form__info-box">
            <h3 className="form__info-box__title">
              Mission Focal Point Contact Details
            </h3>
            <div className="form__row flex-ctr-spb">
              <div className="form__col">
                <p>
                  <b>Name</b>
                </p>
                <p>Joel Peris</p>
              </div>
              <div className="form__col">
                <p>
                  <b>Satellite Phone</b>
                </p>
                <p>+00 223456789</p>
              </div>
            </div>
            <div className="form__row flex-ctr-spb">
              <div className="form__col">
                <p>
                  <b>Phone</b>
                </p>
                <p>+00 223456789</p>
              </div>
              <div className="form__col">
                <p>
                  <b>Email Address</b>
                </p>
                <p>user@yourmai.com</p>
              </div>
            </div>
            <div className="form__row flex-ctr-spb">
              <div className="form__col">
                <p>
                  <b>Whatsapp</b>
                </p>
                <p>+00 223456789</p>
              </div>
            </div>
          </div>
          <div className="form__row flex-start-spb">
            <div className="form__field">
              <label htmlFor="agencies" className="form__label">
                Agencies
              </label>
              <div className="select-wrap">
                <select name="agencies" className="form__select" id="agencies">
                  <option value="0" selected hidden>
                    Select
                  </option>
                  <option value="1">Option 01</option>
                  <option value="2">Option 02</option>
                </select>
              </div>
            </div>
            <div className="form__field">
              <label htmlFor="date" className="form__label">
                Movement Date
              </label>
              <div className="date-wrap">
                <input type="date" className="form__input" id="date" value="" />
              </div>
            </div>
          </div>
          <div className="form__row flex-start-spb">
            <div className="form__field">
              <label htmlFor="classification" className="form__label">
                Mission Classification
              </label>
              <textarea
                className="form__textarea"
                name="classification"
                id="classification"
              ></textarea>
            </div>
            <div className="form__field">
              <label htmlFor="purpose" className="form__label">
                Purpose
              </label>
              <textarea
                className="form__textarea"
                name="purpose"
                id="purpose"
              ></textarea>
            </div>
          </div>
          <div className="form__row flex-start-spb">
            <div className="form__field">
              <label htmlFor="remarks" className="form__label">
                Remarks
              </label>
              <textarea
                className="form__textarea"
                name="remarks"
                id="remarks"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Step1;
