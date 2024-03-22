"use client";

import axiosClient from "@/app/axiosClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

function UmraCreate() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [country, setCountryList] = useState([]);
    const [countryId, setCountryId] = useState([]);
    const [premiseType, setPremiseTypeList] = useState([]);
    const [premiseTypeId, setPremiseTypeId] = useState([]);
    const [locationAreaList, setLocationAreaList] = useState("");
    const [locationArea, setLocationArea] = useState("");
    const [subArea, setSubArea] = useState("");
    const [subAreaList, setSubAreaList] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [buildingCode, setBuildingCode] = useState("");
    const [department, setDepartment] = useState("");
    const [ownership, setOwenership] = useState("");
    const [clsDataList, setClsDataList] = useState("");
    const [clsList, setClsList] = useState("");
    const [departmentList, setDepartmentList] = useState("");
    const [des, setDes] = useState("");

    //success message
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosClient.get("area");
                setLocationAreaList(data.result);
                console.log(data.result);
            } catch (error) {
                console.error("Error fetching agencies:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosClient.get("sub_area");
                setSubAreaList("");
                setSubAreaList(data.result);
                console.log(data.result);
            } catch (error) {
                console.error("Error fetching agencies:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosClient.get("cla_list");
                setClsDataList(data.result);
                console.log(data.result);
            } catch (error) {
                console.error("Error fetching agencies:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosClient.get("department");
                setDepartmentList(data.result);
                console.log(data.result);
            } catch (error) {
                console.error("Error fetching agencies:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    const handleNameChange = (value) => {
        setName(value);
    };

    const handleCountryIdChange = (value) => {
        setCountryId(value);
    };

    const handleLocaltionAreaChange = (value) => {
        setLocationArea(value);
    };

    const handleSubAreaChange = (value) => {
        setSubArea(value);
    };

    const handleLatitudeChange = (value) => {
        setLatitude(value);
    };

    const handleLongitudeChange = (value) => {
        setLongitude(value);
    };

    const handleBuildingCodeChange = (value) => {
        setBuildingCode(value);
    };

    const handleDepartmentChange = (value) => {
        setDepartment(value);
    };

    const handleOwnershipChange = (value) => {
        setOwenership(value);
    };

    const handleClsListChange = (value) => {
        setClsList(value);
    };

    const handleDesChange = (value) => {
        setDes(value);
    };

    const handlePremiseTypeIdChange = (value) => {
        setPremiseTypeId(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosClient.get("country");
                setCountryList(data.result);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosClient.get("premise-type");
                setPremiseTypeList(data.result);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        // Prepare data for API request
        const postData = {
            premise_type: premiseTypeId,
            country: countryId,
            location_area: locationArea,
            sub_area: subArea,
            longitude: latitude,
            latitude: longitude,
            installation_name: name,
            building_code: buildingCode,
            department: department,
            ownership: ownership,
            cls_list: clsList,
            des: des,
        };

        try {
            const response = await axiosClient.post("umrah", postData);
            // Check if the response contains data
            console.log(response);
            if (response && response.data) {
                if (response.data.success == true) {
                    setSuccessMessage("Facilities Create Successfully");
                    setName("");
                    setCountryId("");
                    setPremiseTypeId("");
                    setDepartment("");
                    setClsList("");
                    setLatitude("");
                    setLongitude("");
                    setDes("");
                    setErrorMessage("");
                    setOwenership("");
                    setSubArea("");
                    setLocationArea("");
                    Swal.fire({
                        title: 'success',
                        text: 'Successfully Created',
                        icon: 'success',
                        // confirmButtonText: 'Cool'
                      })
                    router.push("../facilities", { scroll: false });
                } else {
                    if (response.data.msg) {
                        setErrorMessage(response.data.msg);
                    } else {
                        //   const allErrors = extractErrors(response.data.error.errors);
                        //   const errorMessageString = allErrors.join(', '); // Join errors into a single string
                        setErrorMessage(response.data.error);
                    }
                }
            } else {
                console.error("Response does not contain data:", response);
            }
        } catch (error) {
            console.error("Error during API call:", error);
        }
    };

    return (
        <div className='flex h-screen overflow-hidden'>
            {/* Sidebar */}

            {/* Content area */}
            <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
                <main>
                    <div className='px-4 sm:px-6 lg:px-8 py-8 w-full'>
                        <div className='font-sans antialiased bg-grey-lightest'>
                            {/* Content */}

                            <form
                                action='#'
                                className='w-full bg-grey-lightest'
                                style={{ paddingTop: "4rem" }}
                                onSubmit={handleSubmit}
                            >
                                <div className='container mx-auto py-8'>
                                    <div className='w-5/6 mx-auto bg-white rounded shadow'>
                                        <div className='p-8'>
                                            <p className='text-2xl text-black font-bold'>
                                                Facilities Create
                                            </p>
                                            <br></br>
                                            {successMessage && (
                                                <div
                                                    className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4'
                                                    role='alert'
                                                >
                                                    <strong className='font-bold'>
                                                        Success!
                                                    </strong>
                                                    <span className='block sm:inline'>
                                                        {successMessage}
                                                    </span>
                                                </div>
                                            )}

                                            {errorMessage && (
                                                <div
                                                    className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4'
                                                    role='alert'
                                                >
                                                    <strong className='font-bold'>
                                                        Error!
                                                    </strong>
                                                    <span className='block sm:inline'>
                                                        {errorMessage}
                                                    </span>
                                                </div>
                                            )}
                                              <div className="f-row-wrap">
                                              <div className="f-col">
                                            <div className='mb-4'>
                                                <label className='block text-grey-darker text-sm font-bold mb-2'>
                                                    Country
                                                </label>
                                                <select
                                                    className='appearance-none border rounded w-full py-2 px-3  text-grey-darker'
                                                    value={countryId}
                                                    required
                                                    onChange={(e) =>
                                                        handleCountryIdChange(
                                                            e.target.value
                                                        )
                                                    }

                                                >
                                                    <option
                                                        value=''
                                                        disabled
                                                        hidden
                                                    >
                                                        Select Country
                                                    </option>
                                                    {Array.isArray(country) &&
                                                        country.map((val) => (
                                                            <option
                                                                key={val.id}
                                                                value={val._id}
                                                            >
                                                                {val.name}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                            <div className='mb-4'>
                                                <label className='block text-grey-darker text-sm font-bold mb-2'>
                                                    Premise Type
                                                </label>
                                                <select
                                                    className='appearance-none border rounded w-full py-2 px-3  text-grey-darker'
                                                    value={premiseTypeId}
                                                    required
                                                    onChange={(e) =>
                                                        handlePremiseTypeIdChange(
                                                            e.target.value
                                                        )
                                                    }

                                                >
                                                    <option
                                                        value=''
                                                        disabled
                                                        hidden
                                                    >
                                                        Select Premise Type
                                                    </option>
                                                    {Array.isArray(
                                                        premiseType
                                                    ) &&
                                                        premiseType.map(
                                                            (val) => (
                                                                <option
                                                                    key={val.id}
                                                                    value={
                                                                        val._id
                                                                    }

                                                                >
                                                                    {val.name}
                                                                </option>
                                                            )
                                                        )}
                                                </select>
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Installation Name
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='text'
                                                    required
                                                    placeholder='Enter your installation name'
                                                    value={name}
                                                    onChange={(e) =>
                                                        handleNameChange(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Location Area
                                                </label>
                                                <select
                                                    className='appearance-none border rounded w-full py-2 px-3  text-grey-darker'
                                                    value={locationArea}
                                                    required
                                                    onChange={(e) =>
                                                        handleLocaltionAreaChange(
                                                            e.target.value
                                                        )
                                                    }

                                                >
                                                    <option
                                                        value=''
                                                        disabled
                                                        hidden
                                                    >
                                                        Select Location Area
                                                    </option>
                                                    {Array.isArray(
                                                        locationAreaList
                                                    ) &&
                                                        locationAreaList.map(
                                                            (val) => (
                                                                <option
                                                                    key={val.id}
                                                                    value={
                                                                        val._id
                                                                    }

                                                                >
                                                                    {val.name}
                                                                </option>
                                                            )
                                                        )}
                                                </select>
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Sub Area
                                                </label>
                                                <select
                                                    className='appearance-none border rounded w-full py-2 px-3  text-grey-darker'
                                                    value={subArea}
                                                    required
                                                    onChange={(e) =>
                                                        handleSubAreaChange(
                                                            e.target.value
                                                        )
                                                    }

                                                >
                                                    <option
                                                        value=''
                                                        disabled
                                                        hidden
                                                    >
                                                        Select Sub Area
                                                    </option>
                                                    {Array.isArray(
                                                        subAreaList
                                                    ) &&
                                                        subAreaList.map(
                                                            (val) => (
                                                                <option
                                                                    key={val.id}
                                                                    value={
                                                                        val._id
                                                                    }

                                                                >
                                                                    {val.name}
                                                                </option>
                                                            )
                                                        )}
                                                </select>
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Latitude
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='text'
                                                    required
                                                    placeholder='Enter your latitude'
                                                    value={latitude}
                                                    onChange={(e) =>
                                                        handleLatitudeChange(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>
                                            </div>
                                            <div className="f-col">
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Longitude
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='text'
                                                    placeholder='Enter your longitude'
                                                    value={longitude}
                                                    required
                                                    onChange={(e) =>
                                                        handleLongitudeChange(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Building Code
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='text'
                                                    required
                                                    placeholder='Enter your building code'
                                                    value={buildingCode}
                                                    onChange={(e) =>
                                                        handleBuildingCodeChange(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Department
                                                </label>
                                                <select
                                                    className='appearance-none border rounded w-full py-2 px-3  text-grey-darker'
                                                    value={department}
                                                    required
                                                    onChange={(e) =>
                                                        handleDepartmentChange(
                                                            e.target.value
                                                        )
                                                    }

                                                >
                                                    <option
                                                        value=''
                                                        disabled
                                                        hidden
                                                    >
                                                        Select Department
                                                    </option>
                                                    {Array.isArray(
                                                        departmentList
                                                    ) &&
                                                        departmentList.map(
                                                            (val) => (
                                                                <option
                                                                    key={val.id}
                                                                    value={
                                                                        val._id
                                                                    }

                                                                >
                                                                    {val.name}
                                                                </option>
                                                            )
                                                        )}
                                                </select>
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Ownership
                                                </label>
                                                <select
                                                    className='appearance-none border rounded w-full py-2 px-3  text-grey-darker'
                                                    value={ownership}
                                                    required
                                                    onChange={(e) =>
                                                        handleOwnershipChange(
                                                            e.target.value
                                                        )
                                                    }

                                                >
                                                    <option
                                                        value=''
                                                        disabled
                                                        hidden
                                                    >
                                                        Select One
                                                    </option>
                                                    <option value=' Education'>
                                                        Deir balah
                                                    </option>
                                                    <option value='Rented'>
                                                        Rented
                                                    </option>
                                                    <option value='Rented-Gov'>
                                                        Rented-Gov
                                                    </option>
                                                    <option value='UNRWA Owned'>
                                                        UNRWA Owned
                                                    </option>
                                                </select>
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    CLA List
                                                </label>
                                                <select
                                                    className='appearance-none border rounded w-full py-2 px-3  text-grey-darker'
                                                    value={clsList}
                                                    required
                                                    onChange={(e) =>
                                                        handleClsListChange(
                                                            e.target.value
                                                        )
                                                    }

                                                >
                                                    <option
                                                        value=''
                                                        disabled
                                                        hidden
                                                    >
                                                        Select CLA
                                                    </option>
                                                    <option value='Approved'>
                                                        Approved
                                                    </option>
                                                    <option value='Partially Approved'>
                                                        Partially Approved
                                                    </option>
                                                    <option value='Denied'>
                                                        Denied
                                                    </option>
                                                </select>
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    DES List
                                                </label>
                                                <select
                                                    className='appearance-none border rounded w-full py-2 px-3  text-grey-darker'
                                                    value={des}
                                                    required
                                                    onChange={(e) =>
                                                        handleDesChange(
                                                            e.target.value
                                                        )
                                                    }

                                                >
                                                    <option
                                                        value=''
                                                        disabled
                                                        hidden
                                                    >
                                                        Select One
                                                    </option>
                                                    <option value='DES'>
                                                        DES
                                                    </option>
                                                    <option value='Not DES'>
                                                        Not DES
                                                    </option>
                                                </select>
                                            </div>
                                            </div>
                                            </div>

                                            <div className='flex items-center justify-between mt-8'>
                                                <button
                                                    className='bg-main duration-300 leading-normal transition opacity-80 hover:opacity-100 text-white font-bold py-2 px-4 rounded'
                                                    type='submit'
                                                >
                                                    Submit
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function extractErrors(errors) {
    const result = [];
    for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
            const errorDetails = errors[key];
            const errorMessage = errorDetails.properties.message;
            result.push(`${key}: ${errorMessage}`);
        }
    }

    return result;
}

export default UmraCreate;
