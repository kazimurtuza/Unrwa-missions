"use client";
import axiosClient from "@/app/axiosClient";

import Link from "next/link";
import { useEffect, useState } from "react";
function MissionList() {
    const [mission, setMissionList] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get("mission");
            let resData = [];
            data.result.map((item) => {
                let tDeta = {
                    id: item.mission_id,
                    cluster:
                        item.cluster && item.cluster.length > 0
                            ? item.cluster[0].name
                            : "",
                    leader: item.leader_details[0].name,
                    date: convertDateFormat(item.movement_date, newDateFormat),
                    timeStamp: new Date(convertDateFormat(item.movement_date, newDateFormat)).getTime(),
                    cla:
                        item.cla_decision == "partially_approved"
                            ? "partially approved"
                            : item.cla_decision ? item.cla_decision : '',
                    status: getStatusString(item.request_status),
                    _id: item._id
                };

                resData.push(tDeta);
            });
            setMissionList(resData);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    const handleSort = (key) => {
        if (sortBy === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(key);
            setSortOrder("asc");
        }
    };

    const sortedData = [...mission].sort((a, b) => {
        if (sortBy === null) return 0;

        const comparison = a[sortBy] > b[sortBy] ? 1 : -1;
        return sortOrder === "asc" ? comparison : -comparison;
    });

    async function missionStatus(id, status) {
        let adminData = {
            mission_id: id,
            status: status,
        };

        const response = await axiosClient.post(
            "mission-status-update",
            adminData
        );
        if (response.data.success == true) {
            fetchData();
            alert("Mission Status change Successfully");
        }
    }

    function convertDateFormat(dateString, newFormat) {
        // Parse the input date string
        let parsedDate = new Date(dateString);

        // Format the date according to the new format
        let formattedDate = parsedDate.toLocaleDateString(undefined, {
            dateStyle: "medium",
        });

        return formattedDate;
    }

    function getStatusString(request_status) {
        return request_status === "request_received"
            ? "Request Received"
            : request_status === "request_submitted_cla"
            ? "Request Submitted CLA"
            : request_status === "mission_completed"
            ? "Mission Completed"
            : request_status === "request_cancelled_request"
            ? "Request Cancelled Request"
            : request_status === "mission_postponed"
            ? "Mission Postponed"
            : request_status === "mission_pending"
            ? "Mission Pending"
            : request_status === "mission_aborted"
            ? "Mission Aborted"
            : "Unknown Status";
    }

    let newDateFormat = "DD/MM/YYYY"; // Example new format

    let head = (
        <tr className="has-sorting">
            <th
                onClick={() => handleSort("id")}
                className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'
            >
                MR ID
            </th>
            <th
                onClick={() => handleSort("cluster")}
                className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'
            >
                Cluster
            </th>
            <th
                onClick={() => handleSort("leader")}
                className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'
            >
                Mission Leader
            </th>
            <th
                onClick={() => handleSort("timeStamp")}
                className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'
            >
                Movement Date
            </th>
            <th
                onClick={() => handleSort("cla")}
                className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'
            >
                CLA Decision
            </th>
            <th
                onClick={() => handleSort("status")}
                className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'
            >
                Status
            </th>
            <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                Action
            </th>
        </tr>
    );

    const body = (
        <>
            {sortedData &&
                sortedData.map((item, index) => (
                    <tr key={index}>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                                {item.id}
                            </p>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                                {item.cluster}
                            </p>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <div className='flex'>
                                <div className='ml-3'>
                                    <p className='text-gray-900 whitespace-no-wrap'>
                                        {item.leader}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                                {convertDateFormat(
                                    item.date
                                )}
                            </p>
                        </td>

                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                                {item.cla}
                            </p>
                        </td>

                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                                <span
                                    aria-hidden
                                    className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                                ></span>
                                <span className='relative'>
                                    {getStatusString(item.status)}
                                </span>
                            </span>
                        </td>
                        <td
                            className='relative px-5 py-5 border-b border-gray-200 bg-white text-sm'
                            style={{ whiteSpace: "nowrap" }}
                        >
                            <Link
                                href={{
                                    pathname: "/admin/mission-view",
                                    query: { id: item._id },
                                }}
                                className='px-4 py-2 mx-2 bg-main text-white rounded'
                            >

                                Details
                            </Link>
                            <Link
                                href={{
                                    pathname: "/admin/mission/mission-edit",
                                    query: { id: item._id },
                                }}
                                className='px-4 py-2 mx-1 bg-main text-white rounded'
                            >

                                Edit
                            </Link>
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
                                    Mission List
                                </h2>
                            </div>
                            {/* Table */}
                            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                                <div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden border-lite'>
                                    <table className='min-w-full leading-normal mission-view'>
                                        <thead>{head}</thead>
                                        <tbody>{body}</tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default MissionList;
