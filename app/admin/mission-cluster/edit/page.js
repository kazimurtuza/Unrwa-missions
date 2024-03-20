"use client";

import axiosClient from "@/app/axiosClient";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function MissionClusterEdit() {

   const router = useRouter();
   const searchParames = useSearchParams();
   const id = searchParames.get("id");
   const [missionClusterName, setMissionClusterName] = useState("");
  const [leadOfficeName, setOfficeName] = useState("");
  const [leadOfficePhone, setOfficePhone] = useState("");
  const [leadOfficeEmail, setOfficeEmail] = useState("");
  const [agency,setAgencyList]=useState("");
  const [agencyID,setAgencyID]=useState("");




  useEffect(() => {
    const fetchData = async () => {
        try {
            //const objectId = mongoose.Types.ObjectId(id);
            const { data } = await axiosClient.get(`mission-cluster/${id}`);
            console.log(data);
            setMissionClusterName(data.result.name);
            setAgencyID(data.result.agency);
            setOfficeEmail(data.result.lead_office_email);
            setOfficeName(data.result.lead_office_name);
            setOfficePhone(data.result.lead_office_phone);
        } catch (error) {
            console.error('Error fetching agencies:', error);
        }
    };

    fetchData();
}, [id]); // Empty dependency array means this effect runs only once, similar to componentDidMount



  //success message
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage,setErrorMessage]=useState("");


  useEffect(() => {
    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get('agency');
            setAgencyList(data.result);

            console.log(data.result);
        } catch (error) {
            console.error('Error fetching agencies:', error);
        }
    };

    fetchData();
}, []); // Empty dependency array means this effect runs only once, similar to componentDidMount


const handleAgencyChange = (value) => {
  setAgencyID(value);
};


  const handleMissionClusterChange = (value) => {
    setMissionClusterName(value);
  };

  const handleLeadOfficePhone = (value) => {
    setOfficePhone(value);
  };

  const handleLeadOfficeEmail = (value) => {
    setOfficeEmail(value);
  };

  const handleLeadOfficeName = (value) => {
    setOfficeName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // Prepare data for API request
    const postData = {
      name: missionClusterName,
      lead_office_name:leadOfficeName,
      lead_office_email:leadOfficeEmail,
      lead_office_phone:leadOfficePhone,
      agency:agencyID,
    };

    try {
        console.log(id);
        const response = await axiosClient.put(`mission-cluster/${id}`, postData);
        // Check if the response contains data
        console.log(response);
        if (response && response.data) {
          if(response.data.success==true)
          {
            setSuccessMessage("Mission Cluster Updated Successfully");
            // setMissionClassificationName("");
            // setAgencyID("");
            // setOfficeEmail("");
            // setOfficeName("");
            // setOfficePhone("");
            // setErrorMessage("");
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
                        Mission Cluster Edit
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
                          Cluster Lead Agency
                        </label>
                        <select
                            className="appearance-none border rounded w-full py-2 px-3  text-grey-darker"
                            value={agencyID}
                            disabled
                            onChange={(e) => handleAgencyChange(e.target.value)}
                            >
                          <option value="" disabled hidden>
                            Select Agency
                          </option>
                          {Array.isArray(agency) && agency.map((val) => (
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
                          Cluster Name
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your mission cluster name"
                          value={missionClusterName}
                          onChange={(e) =>
                            handleMissionClusterChange(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Lead Official Name
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your lead official name"
                          value={leadOfficeName}
                          onChange={(e) =>
                            handleLeadOfficeName(e.target.value)
                          }

                        />
                      </div>


                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Lead Official Phone
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your lead official phone"
                          value={leadOfficePhone}
                          onChange={(e) =>
                            handleLeadOfficePhone(e.target.value)
                          }

                        />
                      </div>


                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Lead Official Email
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="email"
                          placeholder="Enter your lead official email"
                          value={leadOfficeEmail}
                          onChange={(e) =>
                            handleLeadOfficeEmail(e.target.value)
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

export default MissionClusterEdit;

