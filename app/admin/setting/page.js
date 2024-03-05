"use client";

import React, { useState,useRef } from "react";
import axios from "axios";
import axiosClient from "@/app/axiosClient";
import { useEffect } from "react";

function Setting() {
  const [settings, setSettings] = useState([]);
  const [appName, setAppName] = useState([]);
  const [aboutEn, setAboutEn] = useState([]);
  const [aboutAr, setAboutAr] = useState([]);
  const [image, setImage] = useState([]);
  //success message
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage,setErrorMessage]=useState("");
  const api_base_url = process.env.NEXT_PUBLIC_API_BASE_URL;



  const handleAppName = (value) => {
    setAppName(value);
  };

  const handleAboutEn = (value) => {
    setAboutEn(value);
  };

  const handleAboutAr = (value) => {
    setAboutAr(value);
  };

  const handleImage = (e) => {
  
    console.log(e);
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        console.log("hello");
        reader.onloadend = () => {
        // Once the FileReader has read the file, set the base64 data
        setImage(reader.result);
        };

        // Read the file as a data URL (base64)
        reader.readAsDataURL(file);
    }
    
    
  };

  const inputFile = useRef(null);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get('settings');
            console.log(data);
            setAppName(data.app_name);
            setAboutEn(data.about_app_en);
            setAboutAr(data.about_app_ar);
            setSettings(data);
            
        } catch (error) {
            console.error('Error fetching categories:', error);
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
      app_name:appName,
      about_app_en: aboutEn,
      about_app_ar:aboutAr,
    };

    if (Array.isArray(image) && image.length > 0) {
        console.log(image);
        postData.app_logo = image;
    }
    
    try {

        const response = await axiosClient.post('settings', postData);
        // Check if the response contains data
        console.log(response);
        if (response && response.data) {
          if(response.data.success==true)
          {
            setSuccessMessage("Settings Edited Successfully");
          }
          else
          {
            // const allErrors = extractErrors(response.data.error.errors);
            // const errorMessageString = allErrors.join(', '); // Join errors into a single string
            // setErrorMessage(errorMessageString);
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
                        Settings Edit
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
                          App Name
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="appName"
                          type="text"
                          placeholder="Enter your app name"
                          value={appName}
                          onChange={(e) =>
                            handleAppName(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          About App (English)
                        </label>
                        <textarea
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="aboutEn"
                          type="text"
                          placeholder="Details"
                          value={aboutEn}
                          onChange={(e) =>
                            handleAboutEn(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          About App (Arabic)
                        </label>
                        <textarea
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="aboutEn"
                          type="text"
                          placeholder="Details"
                          value={aboutAr}
                          onChange={(e) =>
                            handleAboutAr(e.target.value)
                          }

                        />
                         
                      </div>

                      <div className="mb-4">
                            <label
                            className="block text-grey-darker text-sm font-bold mb-2"
                            htmlFor="questionName"
                            >
                            Current App Logo
                            </label>
                            {settings.app_logo && (
                            <>
                                <img
                                src={api_base_url + "/" + settings.app_logo}
                                alt="Image"
                                // onClick={popupImg}
                                className="cursor-pointer object-cover mx-auto my-5 w-80"
                                style={{ float: "" }}
                                />
                                <br />
                            </>
                            )}
                       </div>
                      <div className="mb-4">
                            <label
                            className="block text-grey-darker text-sm font-bold mb-2"
                            htmlFor="questionName"
                            >
                            New Logo
                            </label>

                      
                            <input
                            type="file"
                            className="upload-field"
                            ref={inputFile}
                            onChange={handleImage}
                            />

                        </div>


                      <div className="flex items-center justify-between mt-8">
                        <button
                          className="bg-black duration-300 leading-normal transition opacity-80 hover:opacity-100 text-white font-bold py-2 px-4 rounded"
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

export default Setting;

