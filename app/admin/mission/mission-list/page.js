"use client";
import axiosClient from "@/app/axiosClient";
import $ from 'jquery';
import Link from 'next/link';
import { useEffect, useState } from "react";
import '../../../../node_modules/datatables/media/css/jquery.dataTables.min.css';
import '../../../../node_modules/datatables/media/js/jquery.dataTables.min';

function MissionList() {
    const [mission, setMissionList] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10);

    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get('mission');
            setMissionList(data.result);
            setTimeout( function(){
                $('table').dataTable();
            }, 300);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = Array.isArray(mission) && mission.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    async function missionStatus(id,status){
       let adminData={
           mission_id:id,
           status:status,
       }

        const response = await axiosClient.post('mission-status-update', adminData);
        if(response.data.success==true){
            fetchData();
            alert('Mission Status change Successfully');
        }
    }

    function convertDateFormat(dateString, newFormat) {
        // Parse the input date string
        let parsedDate = new Date(dateString);

        // Format the date according to the new format
        let formattedDate = parsedDate.toLocaleDateString(undefined, {dateStyle: 'medium'});

        return formattedDate;
    }

    function getStatusString(request_status) {
        return (
            request_status === "request_received" ? "Request Received" :
                request_status === "request_submitted_cla" ? "Request Submitted CLA" :
                    request_status === "mission_completed" ? "Mission Completed" :
                        request_status === "request_cancelled_request" ? "Request Cancelled Request" :
                            request_status === "mission_postponed" ? "Mission Postponed" :
                                request_status === "mission_pending" ? "Mission Pending" :
                                    request_status === "mission_aborted" ? "Mission Aborted" :
                                        "Unknown Status"
        );
    }

    let newDateFormat = "DD/MM/YYYY"; // Example new format

    let tableName = "Mission List";
    const headName = ["Si", "Name", "movement_date","Status","Action"];
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
            {Array.isArray(mission) && mission.map((item, index) => (

                <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {index+1}
                        </p>
                        {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                        {/*    USD*/}
                        {/*</p>*/}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex">

                            <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {item.leader_details[0].name}
                                </p>

                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {convertDateFormat(item.movement_date, newDateFormat)}
                        </p>

                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">

                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">
                            {getStatusString(item.request_status)}

                        </span>
                    </span>

                    </td>
                    <td className="relative px-5 py-5 border-b border-gray-200 bg-white text-sm text-right" style={{whiteSpace: 'nowrap'}}>
                        {/*{(item.admin_info_set==1 && item.status==0)?<button  className="px-4 py-2 mx-1 bg-main text-white rounded" onClick={()=>missionStatus(item._id,1)}>Complete</button>:""}*/}
                        {/*{(item.admin_info_set!=1 && item.admin_info_set!=2 && item.status==0)?<button  className="px-4 py-2 mx-1 bg-red-500 text-white rounded" onClick={()=>missionStatus(item._id,2)}> Reject</button>:""}*/}

                        <Link
                            href={{
                                pathname: '/admin/mission-view',
                                query: { id: item._id },
                            }}
                            className="px-4 py-2 mx-2 bg-main text-white rounded"
                        > Details</Link>
                        <Link
                            href={{
                                pathname: '/admin/mission/mission-edit',
                                query: { id: item._id },
                            }}
                            className="px-4 py-2 mx-1 bg-main text-white rounded"
                        > Edit </Link>
                    </td>
                </tr>
            ))}
        </>
    );

    return (
        <div className="flex h-screen overflow-hidden">

        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <main>
            <div className="container mx-auto px-4 sm:px-8">
              <div className="py-8">
                <div className="flex gap-5 flex-wrap items-center justify-between">
                  <h2 className="text-2xl font-semibold leading-tight">
                  Mission List
                  </h2>
                </div>

                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden border-lite">
                    <table className="min-w-full leading-normal">
                      <thead>
                      {head}
                      </thead>
                      <tbody>
                      {body}

                      </tbody>
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
