
const Step1 = (props) => {
    const {data,handleChange} = props
    return (
        <div className="max-w-xs md:max-w-lg mx-auto">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="inline-block relative w-64 mb-10">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                        Gender
                    </label>
                    <select className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='gender' value={data.gender} onChange={handleChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                        Dob
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="dob" type="date"  value={data.dob} onChange={handleChange} />
                </div>
            </form>
        </div>
    )
}

export default Step1