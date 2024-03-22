"use client";

import axiosClient from "@/app/axiosClient";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

function DepartmentCreate() {
    const router = useRouter();
    const [departmentName, setDepartmentName] = useState("");
    const [abbrevation, setAbbrevation] = useState("");

    //success message
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const inputFile = useRef(null);

    const handleDepartmentNameChange = (value) => {
        setDepartmentName(value);
    };
    const handleAbbrevation = (value) => {
        setAbbrevation(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        // Prepare data for API request
        const postData = {
            name: departmentName,
            abbrevation: abbrevation,
        };

        try {
            const response = await axiosClient.post("department", postData);
            // Check if the response contains data
            console.log(response);
            if (response && response.data) {
                if (response.data.success == true) {
                    setSuccessMessage("Department Create Successfully");
                    setDepartmentName("");
                    setAbbrevation("");
                    setErrorMessage("");
                    Swal.fire({
                        title: "success",
                        text: "Successfully Created",
                        icon: "success",
                        // confirmButtonText: 'Cool'
                    });
                    router.push("../department", { scroll: false });
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
                                                Department Create
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
                                            <div className='f-row-wrap'>
                                                <div className='f-col'>
                                                    <div className='mb-4'>
                                                        <label
                                                            className='block text-grey-darker text-sm font-bold mb-2'
                                                            htmlFor='questionName'
                                                        >
                                                            Department Name
                                                        </label>
                                                        <input
                                                            className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                            id='categoryName'
                                                            type='text'
                                                            required
                          placeholder='Enter your department name'
                                                            value={
                                                                departmentName
                                                            }

                                                            onChange={(e) =>
                                                                handleDepartmentNameChange(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }

                                                        />
                                                    </div>
                                                </div>

                                                <div className='f-col'>
                                                    <div className='mb-4'>
                                                        <label
                                                            className='block text-grey-darker text-sm font-bold mb-2'
                                                            htmlFor='questionName'
                                                        >
                                                            Department
                                                            Abbreviation
                                                        </label>
                                                        <input
                                                            className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                            id='categoryName'
                                                            type='text'
                                                            required
                          placeholder='Enter your abbrevation'
                                                            value={abbrevation}
                                                            onChange={(e) =>
                                                                handleAbbrevation(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }

                                                        />
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

export default DepartmentCreate;
