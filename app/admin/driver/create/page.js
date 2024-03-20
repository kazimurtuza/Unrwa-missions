"use client";

import axiosClient from "@/app/axiosClient";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

function DriverCreate() {
  const [driverName, setDriverName] = useState("");
  const [driverID, setDriverID] = useState("");
  const [classificationID, setClasificationID] = useState("");
  const [jawwalPhone, setJawwalPhone] = useState("");
  const [ooredoPhone, setOoredoPhone] = useState("");
  const [whatsupNumber, setWhatsupNumber] = useState("");
  const [agency,setAgencyList]=useState("");
  const [vehiclePlateNumber,setVehiclePlateNumber]=useState("");
  const [capacity,setCapacity]=useState("");
  const [color,setColor]=useState("");
  const [brandName,setBrandName]=useState("");
  const [bodyType,setBodyType]=useState("");
  const [armoured,setArmoured]=useState("");
  const [fuelType,setFuelType]=useState("");
  const [agencyID,setAgencyID]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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




  const handleDriverNameChange = (value) => {
    setDriverName(value);
  };
  const handleEmailChange = (value) => {
    setEmail(value);
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
  };
  const handleDriverIDChange = (value) => {
    setDriverID(value);
  };

  const handleJawwalPhoneChange = (value) => {
    setJawwalPhone(value);
  };
  const handleOoredoPhoneChange = (value) => {
    setOoredoPhone(value);
  };
  const handleWhatsupNumberChange = (value) => {
    setWhatsupNumber(value);
  };
  const handleAgencyChange = (value) => {
    setAgencyID(value);
  };
  const handleVehiclePlateNumber = (value) => {
    setVehiclePlateNumber(value);
  };
  const handleCapacity = (value) => {
    setCapacity(value);
  };
  const handleColor = (value) => {
    setColor(value);
  };
  const handleBrandName = (value) => {
    setBrandName(value);
  };
  const handleBodyType = (value) => {
    setBodyType(value);
  };
  const handleArmouredChange= (value) => {
    setArmoured(value);
  };
  const handleFuelTypeChange= (value) => {
    setFuelType(value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // Prepare data for API request
    const postData = {
      name: driverName,
      email:email,
      password:password,
      driver_id:driverID,
      jawwal_phone:jawwalPhone,
      ooredo_phone:ooredoPhone,
      whatsup_number:whatsupNumber,
      agency:agencyID,
      vehicle_plate_number:vehiclePlateNumber,
      capacity:capacity,
      brand_name:brandName,
      fuel_type:fuelType,
      color:color,
      body_type:bodyType,
      armoured:armoured,
      classification:classificationID
    };

    try {

        const response = await axiosClient.post('driver', postData);
        // Check if the response contains data
        console.log(response);
        if (response && response.data) {
          if(response.data.success==true)
          {
            setSuccessMessage("Driver Create Successfully");
            setDriverName("");
            setDriverID("");
            setEmail("");
            setPassword("");
            setJawwalPhone("");
            setOoredoPhone("");
            setAgencyList("");
            setArmoured("");
            setBodyType("");
            setBrandName("");
            setCapacity("");
            setColor("");
            setAgencyID("");
            setVehiclePlateNumber("");
            setFuelType("");
            setWhatsupNumber("");
            setErrorMessage("");
            setClasificationID("");
            Swal.fire({
              title: 'success',
              text: 'Successfully Created',
              icon: 'success',
              // confirmButtonText: 'Cool'
            })
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
                        Driver Create
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
                          Agency
                        </label>
                        <select
                          className="appearance-none border rounded w-full py-2 px-3  text-grey-darker"
                          value={agencyID}
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
                          Driver Name
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your driver name"
                          value={driverName}
                          onChange={(e) =>
                            handleDriverNameChange(e.target.value)
                          }

                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Vehicle Plate Number
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your vehicle plate number"
                          value={vehiclePlateNumber}
                          onChange={(e) =>
                            handleVehiclePlateNumber(e.target.value)
                          }

                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Capacity
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter capacity"
                          value={capacity}
                          onChange={(e) =>
                            handleCapacity(e.target.value)
                          }

                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Colour Name
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your colour"
                          value={color}
                          onChange={(e) =>
                            handleColor(e.target.value)
                          }

                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Brand Name
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your brand name"
                          value={brandName}
                          onChange={(e) =>
                            handleBrandName(e.target.value)
                          }

                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Body Type
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your body type"
                          value={bodyType}
                          onChange={(e) =>
                            handleBodyType(e.target.value)
                          }

                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Armoured
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your armoured"
                          value={armoured}
                          onChange={(e) =>
                            handleArmouredChange(e.target.value)
                          }

                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Fuel Type
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your fuel type"
                          value={fuelType}
                          onChange={(e) =>
                            handleFuelTypeChange(e.target.value)
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
                          type="text"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) =>
                            handleEmailChange(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Password
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="slug"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) =>
                            handlePasswordChange(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Driver ID
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your driver id"
                          value={driverID}
                          onChange={(e) =>
                            handleDriverIDChange(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Jawwal Phone
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your jawwal phone"
                          value={jawwalPhone}
                          onChange={(e) =>
                            handleJawwalPhoneChange(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Ooredo Phone
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your ooredo phone"
                          value={ooredoPhone}
                          onChange={(e) =>
                            handleOoredoPhoneChange(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Whatsapp Number
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your whatsapp number"
                          value={whatsupNumber}
                          onChange={(e) =>
                            handleWhatsupNumberChange(e.target.value)
                          }

                        />
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

export default DriverCreate;

