"use client";
import TableExample from "@/app/example-table/page";
import ActionDropdown from "@/app/components/actionDropdown";
import { useEffect, useState } from "react";
import axiosClient from "@/app/axiosClient";

function AgencyList() {
    const [agency, setAgencyList] = useState([]);
    const api_base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosClient.get('agency');
                setAgencyList(data.result);
            } catch (error) {
                console.error('Error fetching agencies:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    let tableName = "Agency";
    const headName = ["Si","Logo", "Name","agency name acroynm","agency_head","agency phone","agency email","agency physical address","agency cluster","agency website", "Action"];
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
            {Array.isArray(agency) && agency.map((item, index) => (

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
                                    {item.agency_logo && (
                                        <img
                                            className="w-8 h-8 rounded-full object-cover"
                                            src={`${api_base_url}/${item.agency_logo}`}
                                            alt={`${item.name}'s image`}
                                        />
                                    )}
                                </p>
                                {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                                {/*    000004*/}
                                {/*</p>*/}
                            </div>
                        </div>
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
                                    {item.name}
                                </p>
                                {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                                {/*    000004*/}
                                {/*</p>*/}
                            </div>
                        </div>
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
                                    {item.agency_name_acroynm}
                                </p>
                                {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                                {/*    000004*/}
                                {/*</p>*/}
                            </div>
                        </div>
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
                                    {item.agency_head}
                                </p>
                                {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                                {/*    000004*/}
                                {/*</p>*/}
                            </div>
                        </div>
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
                                    {item.agency_phone}
                                </p>
                                {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                                {/*    000004*/}
                                {/*</p>*/}
                            </div>
                        </div>
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
                                    {item.agency_email}
                                </p>
                                {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                                {/*    000004*/}
                                {/*</p>*/}
                            </div>
                        </div>
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
                                    {item.agency_physical_address}
                                </p>
                                {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                                {/*    000004*/}
                                {/*</p>*/}
                            </div>
                        </div>
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
                                    {item.agency_cluster}
                                </p>
                                {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                                {/*    000004*/}
                                {/*</p>*/}
                            </div>
                        </div>
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
                                    {item.agency_website}
                                </p>
                                {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                                {/*    000004*/}
                                {/*</p>*/}
                            </div>
                        </div>
                    </td>
                  
                    <td className="relative px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                        <ActionDropdown />
                    </td>
                </tr>
            ))}
        </>
    );


    return (
        <TableExample tableName={tableName} tableHead={head} body={body}/>
    );
}

export default AgencyList;
