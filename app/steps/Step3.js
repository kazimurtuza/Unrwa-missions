import { useEffect, useState } from 'react';

const Step3 = (props) => {
    const { data,setData } = props

    const [fullAddress, setFullAddress] = useState({
        house: "",
        locality: "",
        city: "",
        state: "",
        zip: "",
    })

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
        if(!isDataEmpty()) {
            setData({
                ...data,
                address:fullAddress
            })
        }
    }, [fullAddress])

    return (
        <form className="w-full max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="house-no">
                        House no.
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="house" type="text" placeholder="house no." value={fullAddress.house} onChange={handleAddressChange} />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="locality">
                        Locality
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="locality" type="text" placeholder="locality" value={fullAddress.locality} onChange={handleAddressChange} />
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
                        City
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="city" type="text" placeholder="city" value={fullAddress.city} onChange={handleAddressChange} />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="state">
                        State
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="state" type="text" placeholder="state" value={fullAddress.state} onChange={handleAddressChange} />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="zip">
                        Zip
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="zip" type="text" placeholder="zip code" value={fullAddress.zip} onChange={handleAddressChange} />
                </div>
            </div>
        </form>
    )
}

export default Step3