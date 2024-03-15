"use client";
import axiosClient from "@/app/axiosClient";
import TableExample from "@/app/example-table/page";
import Link from 'next/link';
import { useEffect, useState } from "react";
function MissionList() {
    const [mission, setMissionList] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get('mission');
            setMissionList(data.result);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {

        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount
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

    let newDateFormat = "DD/MM/YYYY"; // Example new format

    let tableName = "Mission List";
    const headName = ["Si", "Name", "movement_date","purpose","remarks","Status", "Action"];
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
            {mission.map((item, index) => (

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
                            {/*<div className="flex-shrink-0 w-10 h-10">*/}
                            {/*    <img*/}
                            {/*        className="w-full h-full rounded-full"*/}
                            {/*        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"*/}
                            {/*        alt=""*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                              --
                                </p>
                                {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                                {/*    000004*/}
                                {/*</p>*/}
                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {convertDateFormat(item.movement_date, newDateFormat)}
                        </p>
                        {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                        {/*    USD*/}
                        {/*</p>*/}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.purpose}
                        </p>
                        {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                        {/*    USD*/}
                        {/*</p>*/}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.remarks}
                        </p>
                        {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                        {/*    USD*/}
                        {/*</p>*/}
                    </td>
                    {/*<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">*/}
                    {/*    <p className="text-gray-900 whitespace-no-wrap">*/}
                    {/*        Sept 28, 2019*/}
                    {/*    </p>*/}
                    {/*    <p className="text-gray-600 whitespace-no-wrap">*/}
                    {/*        Due in 3 days*/}
                    {/*    </p>*/}
                    {/*</td>*/}
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {item.status?(   <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Completed</span>
                    </span>):(   <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Pending</span>
                    </span>)}

                    </td>
                    <td className="relative px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                        {(item.admin_info_set==1 && item.status==0)?<button  className="px-4 py-2 mx-2 bg-main text-white rounded" onClick={()=>missionStatus(item._id,1)}> Mission Completed</button>:""}
                        {(item.admin_info_set!=1 && item.admin_info_set!=2 && item.status==0)?<button  className="px-4 py-2 mx-2 bg-red-500 text-white rounded" onClick={()=>missionStatus(item._id,2)}> Reject Mission</button>:""}

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
                            className="px-4 py-2 mx-2 bg-main text-white rounded"
                        > Edit </Link>
                    </td>
                </tr>
            ))}
        </>
    );


    return (
        <TableExample tableName={tableName} tableHead={head} body={body}/>
    );
}

export default MissionList;
