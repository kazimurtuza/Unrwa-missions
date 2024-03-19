"use client";
import axiosClient from "@/app/axiosClient";
import TableExample from "@/app/example-table/page";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

function Cargo() {
    const [cargo, setCargo] = useState([]);

    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get('cargo');
            setCargo(data.result);
            console.log(data.result);
        } catch (error) {
            console.error('Error fetching agencies:', error);
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
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                    {item}
                </th>
            ))}
        </tr>
    );

    const body = (
        <>
            {Array.isArray(cargo) && cargo.map((item, index) => (
                <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {item.what_is_being_carried_out}
                                </p>
                            </div>
                        </div>
                    </td>
                    <td className="relative px-5 py-5 border-b border-gray-200 bg-white text-sm text-right" style={{whiteSpace: 'nowrap'}}>
                    <a
                        href={`/admin/cargo/edit?id=${item._id}`}
                        className="px-4 py-2 mx-2 bg-main text-white rounded"
                    >
                        Edit
                    </a>
                        <button
                            onClick={async () => {
                                const confirmed = window.confirm("Are you sure you want to delete?");

                                if (confirmed) {
                                    try {
                                        await axiosClient.delete(`cargo/${item._id}`, {
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                        });
                                        Swal.fire({
                                            title: 'success',
                                            text: 'Successfully Deleted',
                                            icon: 'success',
                                        })
                                        fetchData();
                                    } catch (error) {
                                        console.error("Error deleting question:", error);
                                    }
                                }
                            }}
                            className="px-4 py-2 mx-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );

    return (
        <TableExample tableName={tableName} tableHead={head} body={body}/>
    );
}

export default Cargo;
