"use client";

import axiosClient from "@/app/axiosClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from 'sweetalert2';

function MissionClassificationCreate() {
  const router = useRouter();
  const [missionClassificationName, setMissionClassificationName] = useState("");
  const [requests_classifications, setRequests_classifications] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  //success message
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage,setErrorMessage]=useState("");

  const handleMissionClassificationChange = (value) => {
    setMissionClassificationName(value);
  };
  const handlerequestClassificationChange = (value) => {
    setRequests_classifications(value);
    // if (value === 'Coordination Request') {
    //   setAbbreviation('CRQ');
    // } else if (value === 'Notification Request') {
    //   setAbbreviation('NRQ');
    // } else {
    //   setAbbreviation(''); // Clear abbreviation if no classification is selected
    //   setIsVisible(false);
    // }
    setIsVisible(true);
  };
  const handleAbbrivationChange = (value) => {
    setAbbreviation(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // Prepare data for API request
    const postData = {
      //name: missionClassificationName,
      requests_classifications:requests_classifications,
      abbreviation:abbreviation
    };

    try {
        const response = await axiosClient.post('misson-classification', postData);
        // Check if the response contains data
        console.log(response);
        if (response && response.data) {
          if(response.data.success==true) {
            setSuccessMessage("Mission Classification Create Successfully");
            setMissionClassificationName("");
            setRequests_classifications("");
            setAbbreviation("");
            setErrorMessage("");
            Swal.fire({
              title: 'success',
              text: 'Successfully Created',
              icon: 'success',
              // confirmButtonText: 'Cool'
            })
            router.push("../mission-classification", { scroll: false });
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
                        Mission Classification Create
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
                      {/* <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Mission Classification Name
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your mission classification name"
                          value={missionClassificationName}
                          onChange={(e) =>
                            handleMissionClassificationChange(e.target.value)
                          }

                        />
                      </div> */}

                      <div className="f-row-wrap">
                      <div className="f-col">
                      <div className="mb-4">
                          <label
                            className="block text-grey-darker text-sm font-bold mb-2"
                            htmlFor="abbreviation"
                          >
                            Request Classification
                          </label>
                          <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter Request Classification"
                          value={requests_classifications}
                          onChange={(e) =>
                            handlerequestClassificationChange(e.target.value)
                          }

                          />
                        </div>
                        </div>
                        {/* Display the select element only when isVisible is true */}
                      {isVisible && (
                        <div className="f-col">
                        <div className="mb-4">
                          <label
                            className="block text-grey-darker text-sm font-bold mb-2"
                            htmlFor="abbreviation"
                          >
                            Abbreviation
                          </label>
                          <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter Abbrevation"
                          value={abbreviation}
                          onChange={(e) =>
                            handleAbbrivationChange(e.target.value)
                          }

                          />
                        </div>
                        </div>
                      )}
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

export default MissionClassificationCreate;
