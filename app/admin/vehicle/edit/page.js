"use client";

import axiosClient from "@/app/axiosClient";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function VehicleEdit() {
  const [vehicleName, setVehicleName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicle_plate_number, setVehicle_Plate_number] = useState("");
  const [capacity, setCapacity] = useState("");
  const [brand_name, setBrand_name] = useState("");
  const [brand_type, setBrandType] = useState("");
  const [armouted, setArmoured] = useState("");
  const [fuel_type, setFuelType] = useState("");
  const [carryOut, setCarryOut] = useState("");
  const [agency,setAgencyList]=useState("");
  const [agencyID,setAgencyID]=useState("");
  const [color, setColor] = useState("");
  const [vehicle_id,setVehicle_id]=useState("");

  const [description, setDescription] = useState("");
  //success message
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage,setErrorMessage]=useState("");

  const router = useRouter();
  const searchParames = useSearchParams();
  const id = searchParames.get("id");

  useEffect(() => {
    const fetchData = async () => {
        try {
            //const objectId = mongoose.Types.ObjectId(id);
            const { data } = await axiosClient.get(`vehicle/${id}`);
            console.log(data);
            setAgencyID(data.result.agency);
            setVehicleName(data.result.name);
            setRegNumber(data.result.registration_number);
            setVehicleType(data.result.vehicle_type);
            setDescription(data.result.description);
            setVehicle_Plate_number(data.result.vehicle_plate_number);
            setBrandType(data.result.brand_type);
            setBrand_name(data.result.brand_name);
            setArmoured(data.result.armouted);
            setFuelType(data.result.fuel_type);
            setColor(data.result.color);
            setCarryOut(data.result);
            setVehicle_id(data.result.vehicle_id);
            setCapacity(data.result.capacity);
        } catch (error) {
            console.error('Error fetching agencies:', error);
        }
    };

    fetchData();
}, [id]); // Empty dependency array means this effect runs only once, similar to componentDidMount






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



  const handleVehicleNameChange = (value) => {
    setVehicleName(value);
  };
  const handleRegNumberchange = (value) => {
    setRegNumber(value);

  };
  const handleAgencyChange = (value) => {
    setAgencyID(value);
  };
  const handleVehicleTypechange = (value) => {
    setVehicleType(value);
  };
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };
  const handleVehicleID = (value) => {
    setVehicle_id(value);
  };
  const handleVehiclePlateChange = (value) => {
    setVehicle_Plate_number(value);
  };
  const handleCapacityChange = (value) => {
    setCapacity(value);
  };
  const handleBrandNameChange = (value) => {
    setBrand_name(value);
  };
  const handleBrandTypeChange = (value) => {
    setBrandType(value);
  };
  const handleArmouted = (value) => {
    setArmoured(value);
  };
  const handleFuelTypeChange = (value) => {
    setFuelType(value);
  };
  const handleColorChange = (value) => {
    setColor(value);
  };
  const handleCarryOut = (value) => {
    setCarryOut(value);
  };
  const handleCapacity = (value) => {
    setCapacity(value);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // Prepare data for API request
    const postData = {
      name: vehicleName,
      registration_number:vehicle_plate_number,
      vehicle_type:brand_name,
      description:brand_type,
      vehicle_plate_number:vehicle_plate_number,
      brand_name:brand_name,
      brand_type:brand_type,
      armouted:armouted,
      fuel_type:fuel_type,
      color:color,
      agency:agencyID,
      carry_out:carryOut,
      capacity:capacity,
      vehicle_id:vehicle_id
    };

    try {

        const response = await axiosClient.put(`vehicle/${id}`, postData);
        // Check if the response contains data
        console.log(response);
        if (response && response.data) {
          if(response.data.success==true)
          {
            setSuccessMessage("Vehicle update Successfully");
            // setVehicleName("");
            // setRegNumber("");
            // setVehicleType("");
            // setDescription("");
            // setVehicle_Plate_number("");
            // setBrandType("");
            // setBrand_name("");
            // setArmoured("");
            // setFuelType("");
            // setColor("");
            // setCarryOut("");
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
                        Vehicle Edit
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
                      {/* <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Vehicle Name
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your vehicle name"
                          value={vehicleName}
                          onChange={(e) =>
                            handleVehicleNameChange(e.target.value)
                          }

                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Reg Number
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your reg number"
                          value={regNumber}
                          onChange={(e) =>
                            handleRegNumberchange(e.target.value)
                          }

                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Vehicle Type
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="slug"
                          type="text"
                          placeholder="Enter your vehicle type"
                          value={vehicleType}
                          onChange={(e) =>
                            handleVehicleTypechange(e.target.value)
                          }

                        />
                      </div> */}

<div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Vehicle ID
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="slug"
                          type="text"
                          placeholder="Enter your vehicle ID"
                          value={vehicle_id}
                          onChange={(e) =>
                            handleVehicleID(e.target.value)
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
                          id="slug"
                          type="text"
                          placeholder="Enter your vehicle plate number"
                          value={vehicle_plate_number}
                          onChange={(e) =>
                            handleVehiclePlateChange(e.target.value)
                          }

                        />
                      </div>

                      {/* <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          What is being carried out?
                        </label>
                        <select
                          className="appearance-none border rounded w-full py-2 px-3  text-grey-darker"
                          value={carryOut}
                          onChange={(e) => handleCarryOut(e.target.value)}
                        >
                          <option value="Passengers">
                            Passengers
                          </option>

                          <option value="Fuel">
                            Fuel
                          </option>

                          <option value="Medicine">
                            Medicine
                          </option>

                          <option value="Food">
                            Food
                          </option>

                          <option value="Mixed Emergency Response Items">
                            Mixed Emergency Response Items
                          </option>

                        </select>
                      </div> */}


                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Capacity
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="slug"
                          type="text"
                          placeholder="Enter your vehicle capacity"
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
                         Brand Name
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="slug"
                          type="text"
                          placeholder="Enter your brand name"
                          value={brand_name}
                          onChange={(e) =>
                            handleBrandNameChange(e.target.value)
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
                          id="slug"
                          type="text"
                          placeholder="Enter your body type"
                          value={brand_type}
                          onChange={(e) =>
                            handleBrandTypeChange(e.target.value)
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
                                        <select
                                          className="appearance-none border rounded w-full py-2 px-3  text-grey-darker"
                                          value={armouted}
                                          onChange={(e) => handleArmouted(e.target.value)}
                                        >
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
                                          Fuel Type
                                        </label>
                                        <select
                                          className="appearance-none border rounded w-full py-2 px-3  text-grey-darker"
                                          value={fuel_type}
                                          onChange={(e) => handleFuelTypeChange(e.target.value)}
                                        >
                                          <option value="Petrol">
                                          Petrol
                                          </option>
                                          <option value="Diesel">
                                          Diesel
                                          </option>

                                        </select>
                        </div>



                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                         Color
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="slug"
                          type="text"
                          placeholder="Enter your color"
                          value={color}
                          onChange={(e) =>
                            handleColorChange(e.target.value)
                          }

                        />
                      </div>


                      {/* <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Description
                        </label>
                        <textarea
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your description"
                          value={description}
                          onChange={(e) =>
                            handleDescriptionChange(e.target.value)
                          }

                        />
                      </div> */}



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

export default VehicleEdit;

