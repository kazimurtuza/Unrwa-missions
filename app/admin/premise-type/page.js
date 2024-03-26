"use client";
import axiosClient from "@/app/axiosClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
function Driver() {
    const [premiseType, setpremiseType] = useState([]);

    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get('premise-type-all');
            setpremiseType(data.result);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    let tableName = "Premise Type";
    const headName = ["Name", "Status","Action"];
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
                    {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {index+1}
                        </p>
                    </td> */}
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
                        {item.is_delete?(   <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Inative</span>
                    </span>):(   <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Active</span>
                    </span>)}

                    </td>

                    <td className="relative px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="ml-3">
                            <Link
                                href={{
                                    pathname: '/admin/premise-type/edit',
                                    query: { id: item._id },
                                }}
                                className="px-4 py-2 mx-2 bg-main text-white rounded"
                              > Edit</Link>
                                <button
                                  onClick={async () => {
                                      // Show a confirmation alert
                                      const confirmed = window.confirm("Are you sure you want to delete?");

                                      if (confirmed) {
                                          // Make a DELETE request to your API to mark the question as deleted
                                          try {
                                            await axiosClient.delete(`premise-type/${item._id}`, {
                                                  method: 'DELETE',
                                                  headers: {
                                                      'Content-Type': 'application/json',
                                                  },
                                              });
                                              Swal.fire({
                                                title: 'success',
                                                text: 'Successfully Change the Status',
                                                icon: 'success',
                                                // confirmButtonText: 'Cool'
                                            })

                                              //setMessage('Delete successfully');
                                              // Remove the deleted question from the state
                                              //setData(data => data.filter(item => item._id !== val._id));
                                              fetchData();
                                          } catch (error) {
                                              console.error("Error deleting question:", error);
                                          }
                                      }
                                  }}
                                  className="px-4 py-2 mx-2 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                   {item.is_delete ? "Active": "Delete" }
                              </button>
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
        <div className="flex h-screen overflow-hidden">

        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <main>
            <div className="container mx-auto px-4 sm:px-8">
              <div className="py-8">
                <div className="flex gap-5 flex-wrap items-center justify-between">
                  <h2 className="text-2xl font-semibold leading-tight">
                  Premise Type

                  </h2>
                </div>
                {/* Table */}
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden border-lite">
                  <div className='table-wrap'>
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
            </div>
          </main>
        </div>
      </div>
    );
}

export default Driver;
