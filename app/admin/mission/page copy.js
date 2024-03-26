"use client";
import axiosClient from "@/app/axiosClient";

import Link from "next/link";
import { useEffect, useState } from "react";
function MissionList() {
    const [mission, setMissionList] = useState([]);

    const [sortBy, setSortBy] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterData, setFilterData] = useState([]);
    const [missionData, setMissonData] = useState([]);

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
                    timeStamp: new Date(
                        convertDateFormat(item.movement_date, newDateFormat)
                    ).getTime(),
                    cla:
                        item.cla_decision == "partially_approved"
                            ? "partially approved"
                            : item.cla_decision
                            ? item.cla_decision
                            : "",
                    status: getStatusString(item.request_status),
                    _id: item._id,
                };

                resData.push(tDeta);
            });
            setFilterData(resData);
            setMissonData(resData);
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

        const sortedData = [...filterData].sort((a, b) => {
            if (sortBy === null) return 0;

            if (typeof a[sortBy] === "string" && typeof b[sortBy] === "string") {
                return sortOrder === "asc"
                    ? a[sortBy].localeCompare(b[sortBy])
                    : b[sortBy].localeCompare(a[sortBy]);
            } else {
                return sortOrder === "asc"
                    ? a[sortBy] - b[sortBy]
                    : b[sortBy] - a[sortBy];
            }
        });

        setFilterData(sortedData);
    };

    function searchByNameSimilar(array, searchTerm) {
        return array.filter(item => item.id.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        let _filterData = searchByNameSimilar(missionData, searchQuery);
        setFilterData(_filterData);
      };

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

    function setScortActiveClass(key){
        if(key === sortBy){
            return sortOrder;
        }
    }

    let newDateFormat = "DD/MM/YYYY";

    let head = (
        <tr className='has-sorting'>
            <th
                onClick={() => handleSort("id")}
                className={`px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${setScortActiveClass('id')}`}
            >
                MR ID
            </th>
            <th
                onClick={() => handleSort("cluster")}
                className={`px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${setScortActiveClass('cluster')}`}
            >
                Cluster
            </th>
            <th
                onClick={() => handleSort("leader")}
                className={`px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${setScortActiveClass('leader')}`}
            >
                Mission Leader
            </th>
            <th
                onClick={() => handleSort("timeStamp")}
                className={`px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${setScortActiveClass('timeStamp')}`}
            >
                Movement Date
            </th>
            <th
                onClick={() => handleSort("cla")}
                className={`px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${setScortActiveClass('cla')}`}
            >
                CLA Decision
            </th>
            <th
                onClick={() => handleSort("status")}
                className={`px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${setScortActiveClass('status')}`}
            >
                Status
            </th>
            <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider no-sort'>
                Action
            </th>
        </tr>
    );

    const body = (
        <>
            {filterData &&
                filterData.map((item, index) => (
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
                                {convertDateFormat(item.date)}
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
                                <div
                                className="relative w-full sm:w-80 flex items-center h-12 rounded-md focus-within:shadow-lg bg-white overflow-hidden"
                              >
                                <div className="grid place-items-center h-full w-12 text-gray-300 hover:text-indigo-400">
                                  <button type="submit">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        className="transition"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                      />
                                    </svg>
                                  </button>
                                </div>

                                <input
                                  className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                  type="text"
                                  value={searchQuery}
                                  onChange={handleSearch}
                                  placeholder="Search something.."
                                />
                              </div>
                            </div>
                            {/* Table */}
                            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                                <div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden border-lite'>
                                    <div className='table-wrap'>
                                        <table className='min-w-full leading-normal mission-view'>
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

export default MissionList;
