"use client";

import axiosClient from "@/app/axiosClient";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function AgencyCreate() {
  const [agencyName, setAgencyName] = useState("");
  const [agency_name_acroynm, setAgency_name_acroynm] = useState("");
  const [agency_head, setAgency_head] = useState("");
  const [agency_phone, setAgency_phone] = useState("");
  const [agency_email, setAgency_email] = useState("");
  const [agency_physical_address, setAgency_physical_address] = useState("");
  const [agency_cluster, setAgency_cluster] = useState("");
  const [agency_website, setAgency_website] = useState("");
  const [intervision_note, setIntervision_note] = useState("");
  const [agency_logo, setAgency_logo] = useState("");
  const [clusterList, setClusterList] = useState("");
  const [agency_logo2, setAgency_logo2] = useState("");
  const api_base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

  //success message
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage,setErrorMessage]=useState("");

  const router = useRouter();
  const searchParames = useSearchParams();
  const id = searchParames.get("id");

  useEffect(() => {
    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get('mission-cluster');
            setClusterList(data.result);
            console.log(data.result);
        } catch (error) {
            console.error('Error fetching agencies:', error);
        }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

  const fetchData = async () => {
    try {
        //const objectId = mongoose.Types.ObjectId(id);
        const { data } = await axiosClient.get(`agency/${id}`);
        console.log(data);
        setAgencyName(data.result.name);
        setAgency_name_acroynm(data.result.agency_name_acroynm);
        setAgency_email(data.result.agency_email);
        setAgency_head(data.result.agency_head);
        setAgency_phone(data.result.agency_phone);
        setAgency_physical_address(data.result.agency_physical_address);
        setAgency_website(data.result.agency_website);
        setAgency_cluster(data.result.agency_cluster);
        setIntervision_note(data.result.intervision_note);
        setAgency_logo2(data.result.agency_logo);
        setErrorMessage("");
    } catch (error) {
        console.error('Error fetching agencies:', error);
    }
};

  useEffect(() => {
    const fetchData = async () => {
        try {
            //const objectId = mongoose.Types.ObjectId(id);
            const { data } = await axiosClient.get(`agency/${id}`);
            console.log(data);
            setAgencyName(data.result.name);
            setAgency_name_acroynm(data.result.agency_name_acroynm);
            setAgency_email(data.result.agency_email);
            setAgency_head(data.result.agency_head);
            setAgency_phone(data.result.agency_phone);
            setAgency_physical_address(data.result.agency_physical_address);
            setAgency_website(data.result.agency_website);
            setAgency_cluster(data.result.agency_cluster);
            setIntervision_note(data.result.intervision_note);
            setAgency_logo2(data.result.agency_logo);
            setErrorMessage("");
        } catch (error) {
            console.error('Error fetching agencies:', error);
        }
    };

    fetchData();
}, [id]); // Empty dependency array means this effect runs only once, similar to componentDidMount

  const inputFile = useRef(null);

  const handleAgencyNameChange = (value) => {
    setAgencyName(value);
  };
  const handleAgencyNameAcronoym = (value) => {
    setAgency_name_acroynm(value);
  };
  const handleAgencyheadChange = (value) => {
    setAgency_head(value);
  };
  const handleAgencyPhoneChange = (value) => {
    setAgency_phone(value);
  };

  const handleAgencyEmail = (value) => {
    setAgency_email(value);
  };

  const handlePhyAddress = (value) => {
    setAgency_physical_address(value);
  };

  const handleClusterChange = (value) => {
    setAgency_cluster(value);
  };

  const handleWebChange = (value) => {
    setAgency_website(value);
  };

  const handleIntervisionNote = (value) => {
    setIntervision_note (value);
  };

  const handleAgency_logoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Once the FileReader has read the file, set the base64 data
        setAgency_logo(reader.result);
      };

      // Read the file as a data URL (base64)
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // Prepare data for API request
    const postData = {
      name: agencyName,
      agency_name_acroynm:agency_name_acroynm,
      agency_head:agency_head,
      agency_phone:agency_phone,
      agency_email:agency_email,
      agency_physical_address:agency_physical_address,
      agency_cluster:agency_cluster,
      agency_website:agency_website,
      agency_logo:agency_logo,
      intervision_note:intervision_note
    };

    try {
        const response = await axiosClient.put(`agency/${id}`, postData);

        // Check if the response contains data
        console.log(response);
        if (response && response.data) {
          if(response.data.success==true) {
            fetchData();
            setSuccessMessage("Agency update Successfully");
            // setAgencyName("");
            // setAgency_name_acroynm("");
            // setAgency_email("");
            // setAgency_head("");
            // setAgency_phone("");
            // setAgency_physical_address("");
            // setAgency_website("");
            // setAgency_cluster("");
            // setIntervision_note("");
            setErrorMessage("");
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
                        Agency Edit
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
                          Name
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your agency name"
                          value={agencyName}
                          onChange={(e) =>
                            handleAgencyNameChange(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Name Acronym
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your agency acronym name"
                          value={agency_name_acroynm}
                          onChange={(e) =>
                            handleAgencyNameAcronoym(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                         Head
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your agency head name"
                          value={agency_head}
                          onChange={(e) =>
                            handleAgencyheadChange(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Phone
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="number"
                          placeholder="Enter your agency phone"
                          value={agency_phone}
                          onChange={(e) =>
                            handleAgencyPhoneChange(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Email
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="email"
                          required
                          readOnly
                          placeholder="Enter your agency email"
                          value={agency_email}
                          onChange={(e) =>
                            handleAgencyEmail(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Physical Address
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your agency phy address"
                          value={agency_physical_address}
                          onChange={(e) =>
                            handlePhyAddress(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Cluster
                        </label>
                        <select
                          className="appearance-none border rounded w-full py-2 px-3  text-grey-darker"
                          value={agency_cluster}
                          required
                          onChange={(e) => handleClusterChange(e.target.value)}
                        >
                          <option value="" disabled hidden>
                            Select Cluster
                          </option>
                          {Array.isArray(clusterList) && clusterList.map((val) => (
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
                          Website
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your agency website"
                          value={agency_website}
                          onChange={(e) =>
                            handleWebChange(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Intervision Notes
                        </label>
                        <textarea
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your intervision notes"
                          value={intervision_note}
                          onChange={(e) =>
                            handleIntervisionNote(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                            <label
                                className="block text-grey-darker text-sm font-bold mb-2"
                                htmlFor="questionName"
                              >
                              Current Agency Logo
                              </label>
                              <p className="text-gray-900 whitespace-no-wrap nx-image" style={{width: '220px', position: 'relative'}}>
                                    {agency_logo2 && (
                                        <Image
                                        fill={true}
                                            className="w-8 h-8"
                                            src={`/${agency_logo2}`}
                                            alt=""
                                        />
                                    )}
                                </p>
                      </div>

                      <div className="mb-4">
                            <label
                                className="block text-grey-darker text-sm font-bold mb-2"
                                htmlFor="questionName"
                              >
                                Agency New Logo
                              </label>
                              <input
                                type="file"
                                className="upload-field"
                                ref={inputFile}
                                onChange={handleAgency_logoChange}
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

export default AgencyCreate;
