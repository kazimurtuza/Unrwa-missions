"use client";
import axiosClient from "@/app/axiosClient";
import TableExample from "@/app/example-table/page";
import Link from "next/link";
import { useEffect, useState } from "react";

function Driver() {
    const [premiseType, setpremiseType] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosClient.get('premise-type');
                setpremiseType(data.result);
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    let tableName = "Premise Type";
    const headName = ["Si", "Name", "Status","Action"];
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
            {Array.isArray(premiseType) && premiseType.map((item, index) => (

                <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {index+1}
                        </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {item.name}
                                </p>
                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {item.status?(   <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Active</span>
                    </span>):(   <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Inactive</span>
                    </span>)}

                    </td>


                    <td className="relative px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    <div className="ml-3">
                            <Link
                                href={{
                                    pathname: '/admin/premise-type/edit',
                                    query: { id: item._id },
                                }}
                                className="px-4 py-2 mx-2 bg-main text-white rounded"
                              > Edit</Link>
                                <Link
                                href={{
                                    pathname: '/admin/premise-type/edit',
                                    query: { id: item._id },
                                }}
                                className="px-4 py-2 mx-2 bg-red-500 text-white rounded"
                              > Delete</Link>
                                {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                                {/*    000004*/}
                                {/*</p>*/}
                            </div>
                    </td>
                </tr>
            ))}
        </>
    );


    return (
        <TableExample tableName={tableName} tableHead={head} body={body}/>
    );
}

export default Driver;
