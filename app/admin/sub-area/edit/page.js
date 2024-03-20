"use client";

import axiosClient from "@/app/axiosClient";
import { useRef, useState,useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AreaCreate() {
  const [areaName, setAreaName] = useState("");
  const [areaId, setAreaId] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();
  const searchParames = useSearchParams();
  const id = searchParames.get("id");

  useEffect(() => {
    const fetchData = async () => {
        try {
            //const objectId = mongoose.Types.ObjectId(id);
            const { data } = await axiosClient.get(`sub_area/${id}`);
            console.log(data);
            setName(data.result.name);
            setAreaId(data.result.area);
        } catch (error) {
            console.error('Error fetching agencies:', error);
        }
    };

    fetchData();
}, [id]); // Empty dependency array means this effect runs only once, similar to componentDidMount


  //success message
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage,setErrorMessage]=useState("");


  const inputFile = useRef(null);

  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get('area');
            setAreaName(data.result);
            console.log(data.result);
        } catch (error) {
            console.error('Error fetching agencies:', error);
        }
    };

    fetchData();
}, []); // Empty dependency array means this effect runs only once, similar to componentDidMount




  const handleNameChange = (value) => {
    setName(value);
  };

  const handleAreaChange = (value) => {
    setAreaId(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // Prepare data for API request
    const postData = {
      name: name,
      area:areaId

    };

    try {

        const response = await axiosClient.put(`sub_area/${id}`, postData);
        // Check if the response contains data
        console.log(response);
        if (response && response.data) {
          if(response.data.success==true)
          {
            setSuccessMessage("Sub Area Update Successfully");
            // setName("");
            // setAreaId("");
            setErrorMessage("");
          }
          else
          {
            if(response.data.msg)
            {
              setErrorMessage(response.data.msg);
            }
            else
            {
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
                        Emergency Response Gaza Sub Area Edit
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
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                        Area
                        </label>
                        <select
                            className="appearance-none border rounded w-full py-2 px-3  text-grey-darker"
                            value={areaId}
                            onChange={(e) => handleAreaChange(e.target.value)}
                            required
                        >
                            <option value="" disabled hidden>
                            Select Area
                            </option>
                            {Array.isArray(areaName) && areaName.map((val) => (
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
                        Name
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your area name"
                          value={name}
                          onChange={(e) =>
                            handleNameChange(e.target.value)
                          }

                        />
                      </div>

                    


                      <div className="flex items-center justify-between mt-8">
                        <button
                          className="bg-main duration-300 leading-normal transition opacity-80 hover:opacity-100 text-white font-bold py-2 px-4 rounded"
                          type="submit"
                        >
                          Update
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

export default AreaCreate;

