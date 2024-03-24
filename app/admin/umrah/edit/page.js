"use client";

import axiosClient from "@/app/axiosClient";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function UmraCreate() {
  const [name, setName] = useState("");
  const [country, setCountryList] = useState([]);
  const [countryId, setCountryId] = useState([]);
  const [premiseType, setPremiseTypeList] = useState([]);
  const [premiseTypeId, setPremiseTypeId] = useState([]);
  const [locationArea, setLocationArea] = useState("");
  const [subArea, setSubArea] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [buildingCode, setBuildingCode] = useState("");
  const [department, setDepartment] = useState("");
  const [ownership, setOwenership] = useState("");
  const [clsList, setClsList] = useState("");
  const [des, setDes] = useState("");
  const [departmentList,setDepartmentList]=useState("");

  //success message
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage,setErrorMessage]=useState("");

  const router = useRouter();
  const searchParames = useSearchParams();
  const id = searchParames.get("id");

  useEffect(() => {
    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get('department');
            setDepartmentList(data.result);
            console.log(data.result);
        } catch (error) {
            console.error('Error fetching agencies:', error);
        }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

  useEffect(() => {
 const fetchData = async () => {
     try {
         //const objectId = mongoose.Types.ObjectId(id);
         const { data } = await axiosClient.get(`umrah/${id}`);
         console.log(data);
         setName(data.result.installation_name);
         setCountryId(data.result.country);
         setBuildingCode(data.result.building_code);
         setPremiseTypeId(data.result.premise_type);
         setDepartment(data.result.department);
         setClsList(data.result.cls_list);
         setLatitude(data.result.latitude);
         setLongitude(data.result.longitude);
         setDes(data.result.des);
         setOwenership(data.result.ownership);
         setSubArea(data.result.sub_area);
         setLocationArea(data.result.location_area);
     } catch (error) {
         console.error('Error fetching agencies:', error);
     }
 };

 fetchData();
}, [id]); // Empty dependency array means this effect runs only once, similar to componentDidMount

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
            const { data } = await axiosClient.get('country');
            setCountryList(data.result);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    fetchData();
}, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

useEffect(() => {
    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get('premise-type');
            setPremiseTypeList(data.result);
        } catch (error) {
            console.error('Error fetching countries:', error);
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
        location_area:locationArea,
        sub_area:subArea,
        longitude:latitude,
        latitude:longitude,
        installation_name:name,
        building_code:buildingCode,
        department:department,
        ownership:ownership,
        cls_list:clsList,
        des:des
    };

    try {
        const response = await axiosClient.put(`umrah/${id}`, postData);
        // Check if the response contains data
        console.log(response);
        if (response && response.data) {
          if(response.data.success==true) {
            setSuccessMessage("Umra Update Successfully");
            // setName("");
            // setCountryId("");
            // setPremiseTypeId("");
            // setDepartment("");
            // setClsList("");
            // setLatitude("");
            // setLongitude("");
            // setDes("");
            // setErrorMessage("");
            // setOwenership("");
            // setSubArea("");
            // setLocationArea("");
          } else {
            if(response.data.msg) {
              setErrorMessage(response.data.msg);
            } else {
            //   const allErrors = extractErrors(response.data.error.errors);
            //   const errorMessageString = allErrors.join(', '); // Join errors into a single string
              setErrorMessage(response.data.error);
            }
          }
        } else {
          console.error('Response does not contain data:', response);
        }
      } catch (error) {
        console.error('Error during API call:', error);
      }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="font-sans antialiased bg-grey-lightest">
              {/* Content */}

              <form
                action="#"
                className="w-full bg-grey-lightest"
                style={{ paddingTop: "4rem" }}
                onSubmit={handleSubmit}
              >
                <div className="container mx-auto py-8">
                  <div className="w-5/6 mx-auto bg-white rounded shadow">
                    <div className="p-8">
                      <p className="text-2xl text-black font-bold">
                        Facilities Edit
                      </p>
                      <br></br>
                      {successMessage && (
                        <div
                          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
                          role="alert"
                        >
                          <strong className="font-bold">Success!</strong>
                          <span className="block sm:inline">
                            {successMessage}
                          </span>
                        </div>
                      )}
                       {errorMessage && (
                                                <div
                                                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
                                                role="alert"
                                                >
                                                <strong className="font-bold">Error!</strong>
                                                <span className="block sm:inline">
                                                    {errorMessage}
                                                </span>
                                                </div>
                                            )}

                      <div className="mb-4">
                        <label className="block text-grey-darker text-sm font-bold mb-2">
                            Country
                        </label>
                        <select
                          className="appearance-none border rounded w-full py-2 px-3  text-grey-darker"
                          value={countryId}
                          onChange={(e) => handleCountryIdChange(e.target.value)}
                        >
                          <option value="" disabled hidden>
                            Select Country
                          </option>
                          {Array.isArray(country) && country.map((val) => (
                            <option key={val.id} value={val._id}>
                              {val.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label className="block text-grey-darker text-sm font-bold mb-2">
                            Premise Type
                        </label>
                        <select
                          className="appearance-none border rounded w-full py-2 px-3  text-grey-darker"
                          value={premiseTypeId}
                          onChange={(e) => handlePremiseTypeIdChange(e.target.value)}
                        >
                          <option value="" disabled hidden>
                            Select Premise Type
                          </option>
                          {Array.isArray(premiseType) && premiseType.map((val) => (
                            <option key={val.id} value={val._id}>
                              {val.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Installation Name
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your installation name"
                          value={name}
                          onChange={(e) =>
                            handleNameChange(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Location Area
                        </label>
                        <select
                          className="appearance-none border rounded w-full py-2 px-3  text-grey-darker"
                          value={locationArea}
                          onChange={(e) => handleLocaltionAreaChange(e.target.value)}
                        >
                          <option value="" disabled hidden>
                            Select Area
                          </option>
                          <option value="Gaza">
                            Gaza
                          </option>
                          <option value="Khan Younis">
                            Khan Younis
                          </option>
                          <option value="Rafah">
                            Rafah
                          </option>

                        </select>
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Sub Area
                        </label>
                        <select
                          className="appearance-none border rounded w-full py-2 px-3  text-grey-darker"
                          value={subArea}
                          onChange={(e) => handleSubAreaChange(e.target.value)}
                        >
                          <option value="" disabled hidden>
                            Select Sub Area
                          </option>
                          <option value="Abasan">
                            Abasan
                          </option>
                          <option value="Abu Tue’ma">
                            Abu Tue’ma
                          </option>
                          <option value="Al Naser Area">
                            Al Naser Area
                          </option>
                          <option value="Al Salam Area">
                            Al Salam Area
                          </option>
                          <option value="Bani Suhaila">
                            Bani Suhaila
                          </option>
                          <option value="Beach Camp">
                          Beach Camp
                          </option>
                          <option value="El Shouka Area">
                          El Shouka Area
                          </option>
                          <option value="Fukhari">
                          Fukhari
                          </option>

                          <option value="Gaza Town">
                          Gaza Town
                          </option>

                          <option value="Karni">
                          Karni
                          </option>

                          <option value="Khan Younis Camp">
                          Khan Younis Camp
                          </option>

                          <option value="Khuza'a">
                          {"Khuza'a"}
                          </option>

                          <option value="Ma'en">
                          {"Ma'en"}
                          </option>

                          <option value="Mawasi">
                          Mawasi
                          </option>

                          <option value="Qarara">
                          Qarara
                          </option>

                          <option value="Rafah">
                          Rafah
                          </option>

                          <option value="Rafah Camp">
                          Rafah Camp
                          </option>

                          <option value="Rafah Town">
                          Rafah Town
                          </option>

                          <option value="Shajaiya">
                          Shajaiya
                          </option>

                          <option value="Tal El Sultan">
                          Tal El Sultan
                          </option>

                        </select>
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Latitude
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your latitude"
                          value={latitude}
                          onChange={(e) =>
                            handleLatitudeChange(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Longitude
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your longitude"
                          value={longitude}
                          onChange={(e) =>
                            handleLongitudeChange(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Building Code
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your building code"
                          value={buildingCode}
                          onChange={(e) =>
                            handleBuildingCodeChange(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Department
                        </label>
                        <select
                          className="appearance-none border rounded w-full py-2 px-3  text-grey-darker"
                          value={department}
                          onChange={(e) => handleDepartmentChange(e.target.value)}
                        >
                          <option value="" disabled hidden>
                            Select Department
                          </option>
                          {Array.isArray(departmentList) && departmentList.map((val) => (
                            <option key={val.id} value={val._id}>
                              {val.name}
                            </option>
                          ))}
                        </select>
                        </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Ownership
                        </label>
                        <select
                          className="appearance-none border rounded w-full py-2 px-3  text-grey-darker"
                          value={ownership}
                          onChange={(e) => handleOwnershipChange(e.target.value)}
                        >
                          <option value="" disabled hidden>
                            Select One
                          </option>
                          <option value=" Education">
                              Deir balah
                          </option>
                          <option value="Rented">
                            Rented
                          </option>
                          <option value="Rented-Gov">
                            Rented-Gov
                          </option>
                          <option value="UNRWA Owned">
                            UNRWA Owned
                          </option>

                        </select>
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          CLS List
                        </label>
                        <select
                          className="appearance-none border rounded w-full py-2 px-3  text-grey-darker"
                          value={clsList}
                          onChange={(e) => handleClsListChange(e.target.value)}
                        >
                          <option value="" disabled hidden>
                            Select One
                          </option>
                          <option value="Yes">
                              Yes
                          </option>
                          <option value="No">
                            No
                          </option>

                        </select>
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          DES List
                        </label>
                        <select
                          className="appearance-none border rounded w-full py-2 px-3  text-grey-darker"
                          value={des}
                          onChange={(e) => handleDesChange(e.target.value)}
                        >
                          <option value="" disabled hidden>
                            Select One
                          </option>
                          <option value="DES">
                            DES

                          </option>
                          <option value="Not DES">
                            Not DES
                          </option>

                        </select>
                      </div>

                      <div className="flex items-center justify-between mt-8">
                        <button
                          className="bg-main duration-300 leading-normal transition opacity-80 hover:opacity-100 text-white font-bold py-2 px-4 rounded"
                          type="submit"
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
