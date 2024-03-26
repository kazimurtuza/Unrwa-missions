"use client";
import axiosClient from "@/app/axiosClient";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
function Cargo() {
    const [cargo, setCargo] = useState([]);

    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get("cargo");
            setCargo(data.result);
        } catch (error) {
            console.error("Error fetching agencies:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    let tableName = "Missions Vehicle Cargo";
    const headName = ["What is being carried", "Action"];
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

    const body = (
        <>
            {Array.isArray(cargo) &&
                cargo.map((item, index) => (
                    <tr key={index}>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <div className='flex'>
                                <div className='ml-3'>
                                    <p className='text-gray-900 whitespace-no-wrap'>
                                        {item.what_is_being_carried_out}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td
                            className='relative px-5 py-5 border-b border-gray-200 bg-white text-sm'
                            style={{ whiteSpace: "nowrap" }}
                        >
                            <a
                                href={`/admin/cargo/edit?id=${item._id}`}
                                className='px-4 py-2 mx-2 bg-main text-white rounded'
                            >
                                Edit
                            </a>
                            <button
                                onClick={async () => {
                                    const confirmed = window.confirm(
                                        "Are you sure you want to delete?"
                                    );

                                    if (confirmed) {
                                        try {
                                            await axiosClient.delete(
                                                `cargo/${item._id}`,
                                                {
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
                                            });
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
                                    Missions Vehicle Cargo
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

export default Cargo;
