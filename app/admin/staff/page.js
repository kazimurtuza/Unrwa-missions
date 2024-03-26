"use client";
import axiosClient from "@/app/axiosClient";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Staff() {
    const [staff, setStaffList] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const api_base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5);

    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get("staff");
            setStaffList(data.result);
        } catch (error) {
            console.error("Error fetching drivers:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems =
        Array.isArray(staff) && staff.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const headName = [
        "Photo",
        "Name",
        "Agency",
        "Role",
        "Status",
        "Classification",
        "Gender",
        "Action",
    ];

    let head = (
        <tr>
            {headName.map((item, index) => (
                <th
                    key={index}
                    className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'
                >
                    {item}
                </th>
            ))}
        </tr>
    );

    {
        successMessage && (
            <div
                className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4'
                role='alert'
            >
                <strong className='font-bold'>Success!</strong>
                <span className='block sm:inline'>{successMessage}</span>
            </div>
        );
    }

    const body = (
        <>
            {Array.isArray(staff) &&
                staff.map((item, index) => (
                    <tr key={index}>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <div className='flex'>
                                <div className='ml-3'>
                                    <p className='text-gray-900 whitespace-no-wrap w-8 h-8 nx-image'>
                                        {item.staff_photo && (
                                            <Image
                                                className='rounded-full'
                                                fill={true}
                                                src={`/${item.staff_photo}`}
                                                alt={`${item.name}'s image`}
                                            />
                                        )}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <div className='flex'>
                                <div className='ml-3'>
                                    <p className='text-gray-900 whitespace-no-wrap'>
                                        {item.name}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <div className='flex'>
                                <div className='ml-3'>
                                    <p className='text-gray-900 whitespace-no-wrap'>
                                        {item.agency && item.agency.name}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                                {item.staff_role}
                            </p>
                        </td>

                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                                {item.user.status === 1
                                    ? "Unblocked"
                                    : "Blocked"}
                            </p>
                        </td>

                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                                {item.classification}
                            </p>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                                {item.gender}
                            </p>
                        </td>

                        <td
                            className='relative px-5 py-5 border-b border-gray-200 bg-white text-sm'
                            style={{ whiteSpace: "nowrap" }}
                        >
                            {/* <ActionDropdown /> */}

                            <Link
                                href={{
                                    pathname: "/admin/staff/log-history",
                                    query: { id: item._id },
                                }}
                                className='px-4 py-2 mx-2 bg-main text-white rounded'
                            >
                                {" "}
                                Log
                            </Link>

                            <Link
                                href={{
                                    pathname: "/admin/staff/details",
                                    query: { id: item._id },
                                }}
                                className='px-4 py-2 mx-2 bg-main text-white rounded'
                            >
                                {" "}
                                Details
                            </Link>

                            <button
                                onClick={async () => {
                                    // Show a confirmation alert
                                    const confirmed = window.confirm(
                                        "Are you sure you want to update the status?"
                                    );

                                    if (confirmed) {
                                        // Make a DELETE request to your API to mark the question as deleted
                                        try {
                                            const postData = {
                                                status: 1,
                                            };

                                            const response =
                                                await axiosClient.put(
                                                    `users/status-update/${item.user._id}`,
                                                    postData
                                                );

                                            //   await fetch(`/api/users/status-update/${item.user._id}`, {
                                            //       method: 'PUT',
                                            //       body:'',
                                            //       headers: {
                                            //           'Content-Type': 'application/json',
                                            //       },
                                            //   });

                                            console.log(response);
                                            setSuccessMessage(
                                                "Status Update successfully"
                                            );
                                            fetchData();
                                            // Remove the deleted question from the state
                                        } catch (error) {
                                            console.error(
                                                "Error deleting user:",
                                                error
                                            );
                                        }
                                    }
                                }}
                                className='px-4 py-2 mx-2 bg-red-500 text-white rounded hover:bg-red-600'
                            >
                                {item.user.status === 1 ? "Block" : "Unblock"}
                            </button>

                            <Link
                                href={{
                                    pathname: "/admin/staff/edit",
                                    query: { id: item._id },
                                }}
                                className='px-4 py-2 mx-2 bg-main text-white rounded'
                            >
                                {" "}
                                Edit
                            </Link>
                            <button
                                onClick={async () => {
                                    // Show a confirmation alert
                                    const confirmed = window.confirm(
                                        "Are you sure you want to delete?"
                                    );

                                    if (confirmed) {
                                        // Make a DELETE request to your API to mark the question as deleted
                                        try {
                                            await axiosClient.delete(
                                                `staff/${item._id}`,
                                                {
                                                    method: "DELETE",
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                    },
                                                }
                                            );
                                            Swal.fire({
                                                title: "success",
                                                text: "Successfully Deleted",
                                                icon: "success",
                                                // confirmButtonText: 'Cool'
                                            });

                                            //setMessage('Delete successfully');
                                            // Remove the deleted question from the state
                                            //setData(data => data.filter(item => item._id !== val._id));
                                            fetchData();
                                        } catch (error) {
                                            console.error(
                                                "Error deleting question:",
                                                error
                                            );
                                        }
                                    }
                                }}
                                className='px-4 py-2 mx-2 bg-red-500 text-white rounded hover:bg-red-600'
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
        </>
    );

    return (
        <div className='flex h-screen overflow-hidden'>
            <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
                <main>
                    <div className='container mx-auto px-4 sm:px-8'>
                        <div className='py-8'>
                            <div className='flex gap-5 flex-wrap items-center justify-between'>
                                <h2 className='text-2xl font-semibold leading-tight'>
                                    Staff
                                </h2>
                            </div>
                            {/* Table */}
                            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                                <div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden border-lite'>
                                    <div className='table-wrap'>
                                        <table className='min-w-full leading-normal'>
                                            <thead>{head}</thead>
                                            <tbody>{body}</tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Staff;
