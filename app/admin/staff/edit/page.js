"use client";

import axiosClient from "@/app/axiosClient";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function StaffCreate() {
    const [countries, setCountries] = useState([]);
    const [staffName, setStaffName] = useState("");
    const [agency, setAgencyList] = useState("");
    const [classification, setClassificationList] = useState("");
    const [agencyID, setAgencyID] = useState("");
    const [phone, setPhone] = useState("");
    const [statelitePhone, setJStatelitePhone] = useState("");
    const [whatsupNumber, setWhatsupNumber] = useState("");
    const [callSignIn, setCallSignin] = useState("");
    const [email, setEmail] = useState("");
    const [departmentList, setDepartmentList] = useState("");
    const [password, setPassword] = useState("");
    const [staffRole, setStaffRole] = useState("");

    const api_base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

    const router = useRouter();
    const searchParames = useSearchParams();
    const id = searchParames.get("id");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosClient.get("department");
                setDepartmentList(data.result);
                console.log(data.result);
            } catch (error) {
                console.error("Error fetching agencies:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    const fetchData = async () => {
        try {
            //const objectId = mongoose.Types.ObjectId(id);
            const { data } = await axiosClient.get(`staff/${id}`);
            console.log(data);
            setStaffName(data.result.name);
            setPhone(data.result.phone);
            setEmail(data.result.user.email);
            setJStatelitePhone(data.result.statelite_phone);
            setWhatsupNumber(data.result.whatsup_number);
            setCallSignin(data.result.call_signin);
            setBloodType(data.result.blood_type);
            setDateOfBirth(data.result.date_of_birth);
            setDepartment(data.result.department.name);
            setEmployeeId(data.result.employee_id);
            setPhoneNumberOne(data.result.phone_number_one);
            setPhoneNumberTwo(data.result.phone_number_two);
            setNationlity(data.result.nationlity);
            setNationalId(data.result.national_id);
            setSignalNumber(data.result.signal_number);
            setGender(data.result.gender);
            setTitle(data.result.title);
            setFamilyName(data.result.family_name);
            setOtherName(data.result.other_name);
            setPassportNumberOrginal(data.result.passport_number_orginal);
            setPassportDuplicate(data.result.passport_number_duplicate);
            setNationlity(data.result.nationlity);
            setStaffRole(data.result.staff_role);
            setAgencyID(data.result.agency);
            setClassificationId(data.result.classification);
            setStaffPhoto2(data.result.staff_photo);
            setNationalityAttachment2(data.result.national_id_attachment);
            setPassportOrginalAttachment2(
                data.result.passport_original_attachment
            );
            setPassportDuplicateAttachment2(
                data.result.passport_duplicate_attachment
            );
        } catch (error) {
            console.error("Error fetching agencies:", error);
        }
    };

    const [familyName, setFamilyName] = useState("");
    const [otherName, setOtherName] = useState("");
    const [title, setTitle] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [classificationId, setClassificationId] = useState("");
    const [nationalId, setNationalId] = useState("");
    const [passportNumberOrginal, setPassportNumberOrginal] = useState("");
    const [passportNumberDuplicate, setPassportDuplicate] = useState("");
    const [gender, setGender] = useState("");
    const [department, setDepartment] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [phoneNumberOne, setPhoneNumberOne] = useState("");
    const [phoneNumberTwo, setPhoneNumberTwo] = useState("");
    const [signalNumber, setSignalNumber] = useState("");
    const [staffPhoto, setStaffPhoto] = useState("");
    const [passportOrginalAttachment, setPassportOrginalAttachment] =
        useState("");
    const [passportDuplicateAttachment, setPassportDuplicateAttachment] =
        useState("");
    const [nationaltyAttachment, setNationalityAttachment] = useState("");
    const [nationlity, setNationlity] = useState("");
    const [staffPhoto2, setStaffPhoto2] = useState("");
    const [passportOrginalAttachment2, setPassportOrginalAttachment2] =
        useState("");
    const [passportDuplicateAttachment2, setPassportDuplicateAttachment2] =
        useState("");
    const [nationaltyAttachment2, setNationalityAttachment2] = useState("");
    //success message
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                //const objectId = mongoose.Types.ObjectId(id);
                const { data } = await axiosClient.get(`staff/${id}`);
                console.log(data);
                setStaffName(data.result.name);
                setPhone(data.result.phone);
                setEmail(data.result.user.email);
                setJStatelitePhone(data.result.statelite_phone);
                setWhatsupNumber(data.result.whatsup_number);
                setCallSignin(data.result.call_signin);
                setBloodType(data.result.blood_type);
                setDateOfBirth(data.result.date_of_birth);
                setDepartment(data.result.department);
                setEmployeeId(data.result.employee_id);
                setPhoneNumberOne(data.result.phone_number_one);
                setPhoneNumberTwo(data.result.phone_number_two);
                setNationlity(data.result.nationlity);
                setNationalId(data.result.national_id);
                setSignalNumber(data.result.signal_number);
                setGender(data.result.gender);
                setTitle(data.result.title);
                setFamilyName(data.result.family_name);
                setOtherName(data.result.other_name);
                setPassportNumberOrginal(data.result.passport_number_orginal);
                setPassportDuplicate(data.result.passport_number_duplicate);
                setNationlity(data.result.nationlity);
                setStaffRole(data.result.staff_role);
                setAgencyID(data.result.agency);
                setClassificationId(data.result.classification);
                setStaffPhoto2(data.result.staff_photo);
                setNationalityAttachment2(data.result.national_id_attachment);
                setPassportOrginalAttachment2(
                    data.result.passport_original_attachment
                );
                setPassportDuplicateAttachment2(
                    data.result.passport_duplicate_attachment
                );
            } catch (error) {
                console.error("Error fetching agencies:", error);
            }
        };

        fetchData();
    }, [id]); // Empty dependency array means this effect runs only once, similar to componentDidMount

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosClient.get("agency");
                setAgencyList(data.result);
                console.log(data.result);
            } catch (error) {
                console.error("Error fetching agencies:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    useEffect(() => {
        // Function to fetch countries from REST Countries API
        const fetchCountries = async () => {
            try {
                const response = await fetch(
                    "https://restcountries.com/v3.1/all"
                );
                const data = await response.json();
                setCountries(data);
                // Assuming the API response is an array of country objects
                // Log country names to the console
                data.forEach((country) => {
                    console.log(country.name.common);
                });
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        // Call the function to fetch countries when the component mounts
        fetchCountries();
    }, []); //

    const inputFile = useRef(null);

    const inputFile2 = useRef(null);

    const inputFile3 = useRef(null);

    const inputFile4 = useRef(null);

    const handleStaffNameChange = (value) => {
        setStaffName(value);
    };
    const handleAgencyChange = (value) => {
        setAgencyID(value);
    };
    const handleEmailChange = (value) => {
        setEmail(value);
    };
    const handlePasswordChange = (value) => {
        setPassword(value);
    };
    const handlePhoneChange = (value) => {
        setPhone(value);
    };

    const handleStatelitePhoneChange = (value) => {
        setJStatelitePhone(value);
    };
    const handleWhatsupNumberChange = (value) => {
        setWhatsupNumber(value);
    };
    const handleCallSignInChange = (value) => {
        setCallSignin(value);
    };
    const handleFamilyName = (value) => {
        setFamilyName(value);
    };
    const handleOtherName = (value) => {
        setOtherName(value);
    };
    const handleTitle = (value) => {
        setTitle(value);
    };
    const handleEmployeeId = (value) => {
        setEmployeeId(value);
    };
    const handleNationalId = (value) => {
        setNationalId(value);
    };
    const handlePassportNumberOrginal = (value) => {
        setPassportNumberOrginal(value);
    };
    const handlePassportNumberDuplicate = (value) => {
        setPassportDuplicate(value);
    };
    const handleGender = (value) => {
        setGender(value);
    };
    const handleClassificationChange = (value) => {
        setClassificationId(value);
    };
    const handleDepartmentChange = (value) => {
        setDepartment(value);
    };
    const handleDateOfBirth = (value) => {
        setDateOfBirth(value);
    };
    const handleBloodTypeChange = (value) => {
        setBloodType(value);
    };
    const handlePhoneNumberOneChange = (value) => {
        setPhoneNumberOne(value);
    };
    const handlePhoneNumberTwoChange = (value) => {
        setPhoneNumberTwo(value);
    };
    const handleSignalNumberChange = (value) => {
        setSignalNumber(value);
    };

    const handleStaffRole = (value) => {
        setStaffRole(value);
    };

    const handleNationality = (value) => {
        setNationlity(value);
    };

    const handleStaffPhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                // Once the FileReader has read the file, set the base64 data
                setStaffPhoto(reader.result);
            };

            // Read the file as a data URL (base64)
            reader.readAsDataURL(file);
        } else {
            setStaffPhoto("");
        }
    };

    const handlePassportOrginalAttachment = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader2 = new FileReader();

            reader2.onloadend = () => {
                // Once the FileReader has read the file, set the base64 data
                setPassportOrginalAttachment(reader2.result);
            };

            // Read the file as a data URL (base64)
            reader2.readAsDataURL(file);
        } else {
            setPassportOrginalAttachment("");
        }
    };

    const handlePassportDuplicateAttachment = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader3 = new FileReader();

            reader3.onloadend = () => {
                // Once the FileReader has read the file, set the base64 data
                setPassportDuplicateAttachment(reader3.result);
            };

            // Read the file as a data URL (base64)
            reader3.readAsDataURL(file);
        } else {
            setPassportDuplicateAttachment("");
        }
    };
    const handleNationalIdAttachment = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader4 = new FileReader();

            reader4.onloadend = () => {
                // Once the FileReader has read the file, set the base64 data
                setNationalityAttachment(reader4.result);
            };

            // Read the file as a data URL (base64)
            reader4.readAsDataURL(file);
        } else {
            setNationalityAttachment("");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosClient.get("agency");
                setAgencyList(data.result);
                console.log(data.result);
            } catch (error) {
                console.error("Error fetching agencies:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosClient.get("misson-classification");
                setClassificationList(data.result);
                console.log(data.result);
            } catch (error) {
                console.error("Error fetching agencies:", error);
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
            name: staffName,
            email: email,
            password: password,
            phone: phone,
            statelite_phone: statelitePhone,
            whatsup_number: whatsupNumber,
            agency: agencyID,
            call_signin: callSignIn,
            family_name: familyName,
            other_name: otherName,
            title: title,
            employee_id: employeeId,
            national_id: nationalId,
            passport_number_orginal: passportNumberOrginal,
            passport_number_duplicate: passportNumberDuplicate,
            gender: gender,
            classification: classificationId,
            department: department,
            date_of_birth: dateOfBirth,
            blood_type: bloodType,
            phone_number_one: phoneNumberOne,
            phone_number_two: phoneNumberTwo,
            signal_number: signalNumber,
            nationlity: nationlity,
            staff_photo: staffPhoto,
            staff_role: staffRole,
            passport_original_attachment: passportOrginalAttachment,
            passport_duplicate_attachment: passportDuplicateAttachment,
            national_id_attachment: nationaltyAttachment,
        };

        try {
            const response = await axiosClient.put(`staff/${id}`, postData);
            // Check if the response contains data
            console.log(response);
            if (response && response.data) {
                if (response.data.success == true) {
                    fetchData();
                    setSuccessMessage("Staff Update Successfully");
                    // setStaffName("");
                    // setPhone("");
                    // setEmail("");
                    // setPassword("");
                    // setJStatelitePhone("");
                    // setWhatsupNumber("");
                    // setCallSignin("");
                    // setErrorMessage("");
                    // setBloodType("");
                    // setDateOfBirth("");
                    // setDepartment("");
                    // setEmployeeId("");
                    // setPhoneNumberOne("");
                    // setPhoneNumberTwo("");
                    // setNationlity("");
                    // setNationalId("");
                    // setSignalNumber("");
                    // setGender("");
                    // setTitle("");
                    // setFamilyName("");
                    // setOtherName("");
                    // setPassportNumberOrginal("");
                    // setPassportDuplicate("");
                    // setNationlity("");
                    // setStaffRole("");
                    // setAgencyID("");
                    // setClassificationId("");
                    // setStaffPhoto(null);
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
            console.error("Error during API call:", error.message);
        }
    };

    return (
        <div className='flex h-screen overflow-hidden'>
            {/* Sidebar */}

            {/* Content area */}
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
                                                Staff Edit
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
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Agency
                                                </label>
                                                <select
                                                    className='appearance-none border rounded w-full py-2 px-3  text-grey-darker'
                                                    value={agencyID}
                                                    disabled
                                                    onChange={(e) =>
                                                        handleAgencyChange(
                                                            e.target.value
                                                        )
                                                    }

                                                >
                                                    <option
                                                        value=''
                                                        disabled
                                                        hidden
                                                    >
                                                        Select Agency
                                                    </option>
                                                    {Array.isArray(agency) &&
                                                        agency.map((val) => (
                                                            <option
                                                                key={val.id}
                                                                value={val._id}
                                                            >
                                                                {val.name}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Classification
                                                </label>
                                                <select
                                                    className='appearance-none border rounded w-full py-2 px-3  text-grey-darker'
                                                    value={classificationId}
                                                    onChange={(e) =>
                                                        handleClassificationChange(
                                                            e.target.value
                                                        )
                                                    }

                                                >
                                                    <option value='National Staff'>
                                                        National Staff
                                                    </option>
                                                    <option value='International Staff'>
                                                        International Staff
                                                    </option>
                                                </select>
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Staff Role
                                                </label>
                                                <select
                                                    className='appearance-none border rounded w-full py-2 px-3  text-grey-darker'
                                                    value={staffRole}
                                                    onChange={(e) =>
                                                        handleStaffRole(
                                                            e.target.value
                                                        )
                                                    }

                                                >
                                                    <option value=''>
                                                        Select One
                                                    </option>
                                                    <option value='Driver'>
                                                        Driver
                                                    </option>
                                                    <option value='Operational Staff'>
                                                        Operational Staff
                                                    </option>
                                                    <option value='Complimentary Staff'>
                                                        Complimentary Staff
                                                    </option>
                                                </select>
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Staff Name
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='text'
                                                    placeholder='Enter your staff name'
                                                    value={staffName}
                                                    onChange={(e) =>
                                                        handleStaffNameChange(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Family Name
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='text'
                                                    placeholder='Enter your family name'
                                                    value={familyName}
                                                    onChange={(e) =>
                                                        handleFamilyName(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Other Name
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='text'
                                                    placeholder='Enter your other name'
                                                    value={otherName}
                                                    onChange={(e) =>
                                                        handleOtherName(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Title
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='text'
                                                    placeholder='Enter your title'
                                                    value={title}
                                                    onChange={(e) =>
                                                        handleTitle(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Employee Id
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='text'
                                                    placeholder='Enter your employee id'
                                                    value={employeeId}
                                                    onChange={(e) =>
                                                        handleEmployeeId(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    National Id
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='text'
                                                    placeholder='Enter your national id'
                                                    value={nationalId}
                                                    onChange={(e) =>
                                                        handleNationalId(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Passport Number Orginal
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='text'
                                                    placeholder='Enter your passport number orginal'
                                                    value={
                                                        passportNumberOrginal
                                                    }

                                                    onChange={(e) =>
                                                        handlePassportNumberOrginal(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Passport Number Duplicate
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='text'
                                                    placeholder='Enter your passport number duplicate'
                                                    value={
                                                        passportNumberDuplicate
                                                    }

                                                    onChange={(e) =>
                                                        handlePassportNumberDuplicate(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='genderSelect'
                                                >
                                                    Gender
                                                </label>
                                                <select
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='genderSelect'
                                                    value={gender}
                                                    onChange={(e) =>
                                                        handleGender(
                                                            e.target.value
                                                        )
                                                    }

                                                >
                                                    <option value='' disabled>
                                                        Select your gender
                                                    </option>
                                                    <option value='Male'>
                                                        Male
                                                    </option>
                                                    <option value='Female'>
                                                        Female
                                                    </option>
                                                    <option value='Other'>
                                                        Other
                                                    </option>
                                                </select>
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Department
                                                </label>
                                                <select
                                                    className='appearance-none border rounded w-full py-2 px-3  text-grey-darker'
                                                    value={department}
                                                    onChange={(e) =>
                                                        handleDepartmentChange(
                                                            e.target.value
                                                        )
                                                    }

                                                >
                                                    <option
                                                        value=''
                                                        disabled
                                                        hidden
                                                    >
                                                        Select Department
                                                    </option>
                                                    {Array.isArray(
                                                        departmentList
                                                    ) &&
                                                        departmentList.map(
                                                            (val) => (
                                                                <option
                                                                    key={val.id}
                                                                    value={
                                                                        val._id
                                                                    }

                                                                >
                                                                    {val.name}
                                                                </option>
                                                            )
                                                        )}
                                                </select>
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Date of Birth
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='date'
                                                    placeholder='Enter your date of birth'
                                                    value={dateOfBirth}
                                                    onChange={(e) =>
                                                        handleDateOfBirth(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='bloodTypeSelect'
                                                >
                                                    Blood Type
                                                </label>
                                                <select
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='bloodTypeSelect'
                                                    value={bloodType}
                                                    onChange={(e) =>
                                                        handleBloodTypeChange(
                                                            e.target.value
                                                        )
                                                    }

                                                >
                                                    <option value='' disabled>
                                                        Select your blood type
                                                    </option>
                                                    <option value='A+'>
                                                        A+
                                                    </option>
                                                    <option value='A-'>
                                                        A-
                                                    </option>
                                                    <option value='B+'>
                                                        B+
                                                    </option>
                                                    <option value='B-'>
                                                        B-
                                                    </option>
                                                    <option value='AB+'>
                                                        AB+
                                                    </option>
                                                    <option value='AB-'>
                                                        AB-
                                                    </option>
                                                    <option value='O+'>
                                                        O+
                                                    </option>
                                                    <option value='O-'>
                                                        O-
                                                    </option>
                                                </select>
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Phone Number One
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='number'
                                                    placeholder='Enter your passport number one'
                                                    value={phoneNumberOne}
                                                    onChange={(e) =>
                                                        handlePhoneNumberOneChange(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Phone Number Two
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='number'
                                                    placeholder='Enter your passport number one'
                                                    value={phoneNumberTwo}
                                                    onChange={(e) =>
                                                        handlePhoneNumberTwoChange(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Signal Number
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='number'
                                                    placeholder='Enter your signal number'
                                                    value={signalNumber}
                                                    onChange={(e) =>
                                                        handleSignalNumberChange(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='text'
                                                    readOnly
                                                    placeholder='Enter your email'
                                                    value={email}
                                                    onChange={(e) =>
                                                        handleEmailChange(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>

                                            {/* <div className="mb-4">
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
                      </div> */}

                                            {/* <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="questionName"
                        >
                          Phone
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="categoryName"
                          type="text"
                          placeholder="Enter your phone"
                          value={phone}
                          onChange={(e) =>
                            handlePhoneChange(e.target.value)
                          }

                        />
                      </div> */}

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Statelite Phone
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='number'
                                                    placeholder='Enter your statelite phone'
                                                    value={statelitePhone}
                                                    onChange={(e) =>
                                                        handleStatelitePhoneChange(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Whatsapp Number
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='number'
                                                    placeholder='Enter your whatsapp number'
                                                    value={whatsupNumber}
                                                    onChange={(e) =>
                                                        handleWhatsupNumberChange(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Call Sign
                                                </label>
                                                <input
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
                                                    id='categoryName'
                                                    type='text'
                                                    placeholder='Enter your call sign in'
                                                    value={callSignIn}
                                                    onChange={(e) =>
                                                        handleCallSignInChange(
                                                            e.target.value
                                                        )
                                                    }

                                                />
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Nationality
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
                                                    className='appearance-none border rounded w-full py-2 px-3 text-grey-darker mt-2'
                                                    id='countryDropdown'
                                                    value={nationlity}
                                                    onChange={(e) =>
                                                        handleNationality(
                                                            e.target.value
                                                        )
                                                    }

                                                >
                                                    <option value=''>
                                                        Select a country
                                                    </option>
                                                    {countries &&
                                                        countries.map(
                                                            (country) => (
                                                                <option
                                                                    key={
                                                                        country.id
                                                                    }

                                                                    value={
                                                                        country
                                                                            .name
                                                                            .common
                                                                    }

                                                                >
                                                                    {
                                                                        country
                                                                            .name
                                                                            .common
                                                                    }
                                                                </option>
                                                            )
                                                        )}
                                                </select>
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Current Staff Photo
                                                </label>
                                                <p className='text-gray-900 whitespace-no-wrap h-8 w-8 nx-image'>
                                                    {staffPhoto2 && (
                                                        <Image
                                                        fill={true}
                                                            src={`/${staffPhoto2}`}
                                                            alt=''
                                                        />
                                                    )}
                                                </p>
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Current Passport Orginal
                                                    Attachment
                                                </label>
                                                <p className='text-gray-900 whitespace-no-wrap w-8 h-8'>
                                                    {passportOrginalAttachment2 && (
                                                        <Image
                                                            alt=""
                                                            fill={true}
                                                            className=' rounded-full object-cover'
                                                            src={`/${passportOrginalAttachment2}`}
                                                        />
                                                    )}
                                                </p>
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Current Passport Duplicate
                                                    Attachment
                                                </label>
                                                {passportDuplicateAttachment2 && (
                                                    <p className='w-8 h-8'>
                                                        <Image
                                                            fill={true}
                                                            src={`/${passportOrginalAttachment2}`}
                                                            alt=''
                                                        />
                                                    </p>
                                                )}
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Current National Id
                                                    Attachment
                                                </label>
                                                <p className='text-gray-900 whitespace-no-wrap'>
                                                    {nationaltyAttachment2 && (
                                                        <img
                                                            className='w-8 h-8 rounded-full object-cover'
                                                            src={`${api_base_url}/${nationaltyAttachment2}`}
                                                        />
                                                    )}
                                                </p>
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Staff Photo
                                                </label>
                                                <input
                                                    type='file'
                                                    className='upload-field'
                                                    ref={inputFile}
                                                    onChange={
                                                        handleStaffPhotoChange
                                                    }

                                                />
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Passport Orginal Attachment
                                                </label>
                                                <input
                                                    type='file'
                                                    className='upload-field'
                                                    ref={inputFile2}
                                                    onChange={
                                                        handlePassportOrginalAttachment
                                                    }

                                                />
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    Passport Duplicate
                                                    Attachment
                                                </label>
                                                <input
                                                    type='file'
                                                    className='upload-field'
                                                    ref={inputFile2}
                                                    onChange={
                                                        handlePassportDuplicateAttachment
                                                    }

                                                />
                                            </div>

                                            <div className='mb-4'>
                                                <label
                                                    className='block text-grey-darker text-sm font-bold mb-2'
                                                    htmlFor='questionName'
                                                >
                                                    National Id Attachment
                                                </label>
                                                <input
                                                    type='file'
                                                    className='upload-field'
                                                    ref={inputFile4}
                                                    onChange={
                                                        handleNationalIdAttachment
                                                    }

                                                />
                                            </div>

                                            <div className='flex items-center justify-between mt-8'>
                                                <button
                                                    className='bg-main duration-300 leading-normal transition opacity-80 hover:opacity-100 text-white font-bold py-2 px-4 rounded'
                                                    type='submit'
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

export default StaffCreate;
