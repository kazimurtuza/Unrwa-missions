"use client";
import axiosClient from "@/app/axiosClient";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
function Driver() {
    const [logHistory, setLogHistory] = useState([]);

    const router = useRouter();
    const searchParames = useSearchParams();
    const id = searchParames.get("id");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosClient.get(`log-history/${id}`);
                console.log(data);
                setLogHistory(data.result);
            } catch (error) {
                console.error("Error fetching drivers:", error);
            }
        };

        fetchData();
    }, [id]); // Empty dependency array means this effect runs only once, similar to componentDidMount

    let tableName = "Login History";
    const headName = ["Name", "Email", "Date & Time"];
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
            {Array.isArray(logHistory) &&
                logHistory.map((item, index) => (
                    <tr key={index}>
                        {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {index+1}
                        </p>
                    </td> */}
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <div className='flex'>
                                <div className='ml-3'>
                                    <p className='text-gray-900 whitespace-no-wrap'>
                                        {item.staff.name}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <div className='flex'>
                                <div className='ml-3'>
                                    <p className='text-gray-900 whitespace-no-wrap'>
                                        {item.user.email}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <div className='flex'>
                                <div className='ml-3'>
                                    <p className='text-gray-900 whitespace-no-wrap'>
                                        {item.staff.created_at}
                                    </p>
                                </div>
                            </div>
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
                                    {tableName}
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

export default Driver;
