"use client";

import axiosClient from "@/app/axiosClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

function CountryCreate() {
  const router = useRouter();
  const [countryName, setCountryName] = useState("");
  const [alpha2, setAlpha2] = useState("");
  const [alpha3, setAlpha3] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [iso3166, setIso3166] = useState("");
  const [isoPort, setIsoPort] = useState("");
  const [region, setRegion] = useState("Asia");
  const [countries, setCountries] = useState([]);
  //success message
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage,setErrorMessage]=useState("");

  useEffect(() => {
    // Function to fetch countries from REST Countries API
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
        // Assuming the API response is an array of country objects
        // Log country names to the console
        data.forEach(country => {
          console.log(country.name.common);
        });
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    // Call the function to fetch countries when the component mounts
    fetchCountries();
  }, []); //

// Empty de

  const handleCountryNameChange = (value) => {
    setCountryName(value);
  };
  const handleAhpha2change = (value) => {
    setAlpha2(value);
  };
  const handleAhpha3change = (value) => {
    setAlpha3(value);
  };
  const handleIso_3166 = (value) => {
    setIso3166(value);
  };
  const handleCountryCodeChange = (value) => {
    setCountryCode(value);
  };

  const handleIsoPortChange = (value) => {
    setIsoPort(value);
  };
  const handleRegionChange = (value) => {
    setRegion(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // Prepare data for API request
    const postData = {
      name: countryName,
      alpha2:alpha2,
      alpha3:alpha3,
      country_code:countryCode,
      iso_port:isoPort,
      region:region,
      iso3166:iso3166
    };

    try {
        const response = await axiosClient.post('country', postData);
        // Check if the response contains data
        console.log(response);
        if (response && response.data) {
          if(response.data.success==true) {
            setSuccessMessage("Country Create Successfully");
            setCountryName("");
            setAlpha2("");
            setAlpha3("");
            setCountryCode("");
            setIsoPort("");
            setIso3166("");
            setRegion("");
            setErrorMessage("");
            Swal.fire({
              title: 'success',
              text: 'Successfully Created',
              icon: 'success',
              // confirmButtonText: 'Cool'
            })
            router.push("../country", { scroll: false });
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
                        Country Create
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

                      <div className="f-row-wrap">
                      <div className="f-col">
                      <div className="mb-4">
                      <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="questionName"
                      >
                        Country Name
                      </label>
                      {/* <input
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        id="categoryName"
                        type="text"
                        placeholder="Enter your country name"
                        value={countryName}
                        onChange={(e) => handleCountryNameChange(e.target.value)}
                      /> */}

                      {/* Dropdown for countries */}
                      <select
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker mt-2"
                        id="countryDropdown"
                        required
                        onChange={(e) => handleCountryNameChange(e.target.value)}
                      >
                        <option value="">Select a country</option>
                        {countries && countries.map((country, index) => (
                          <option key={index} value={country.name.common}>
                            {country.name.common}
                          </option>
                        ))}
                      </select>
                    </div>
                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Alpha2
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your alpha2"
                          value={alpha2}
                          onChange={(e) =>
                            handleAhpha2change(e.target.value)
                          }

                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Iso3166-2
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your iso3166-2"
                          value={iso3166}
                          onChange={(e) =>
                            handleIso_3166(e.target.value)
                          }

                        />
                      </div>
                      </div>

                      <div className="f-col">
                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Alpha3
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="slug"
                          type="text"
                          placeholder="Enter your alpha3"
                          value={alpha3}
                          onChange={(e) =>
                            handleAhpha3change(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Country Code
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your country code"
                          value={countryCode}
                          onChange={(e) =>
                            handleCountryCodeChange(e.target.value)
                          }

                        />
                      </div>

                      {/* <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          ISO Port
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your iso port"
                          value={isoPort}
                          onChange={(e) =>
                            handleIsoPortChange(e.target.value)
                          }

                        />
                      </div> */}

                  <div className="mb-4">
                      <label
                        className="block text-grey-darker text-sm font-bold mb-2"
                        htmlFor="questionName"
                      >
                        Region
                      </label>
                      {/* <input
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                        id="categoryName"
                        type="text"
                        placeholder="Enter your country name"
                        value={countryName}
                        onChange={(e) => handleCountryNameChange(e.target.value)}
                      /> */}

                      {/* Dropdown for countries */}
                      <select
                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker mt-2"
                        id="countryDropdown"
                        onChange={(e) => handleRegionChange(e.target.value)}
                      >
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>

                      </select>

                      </div>
                      </div>
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

export default CountryCreate;
