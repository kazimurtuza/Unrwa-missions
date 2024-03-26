"use client";
import axiosClient from "@/app/axiosClient";

import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

function AgencyList() {
    const [agency, setAgencyList] = useState([]);
    const api_base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get('agency');
            setAgencyList(data.result);
        } catch (error) {
            console.error('Error fetching agencies:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    let tableName = "Agency";
    const headName = ["Logo", "Name","agency name acronym","agency head", "Action"];
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
                        <div className="flex">

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

                            </div>
                        </div>
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
                        <div className="flex">

                            <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {item.agency_name_acroynm}
                                </p>

                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex">

                            <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {item.agency_head}
                                </p>

                            </div>
                        </div>
                    </td>

                    <td className="relative px-5 py-5 border-b border-gray-200 bg-white text-sm" style={{whiteSpace: 'nowrap'}}>

                            <Link
                                href={{
                                    pathname: '/admin/agency/edit',
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
                                           const res= await axiosClient.delete(`agency/${item._id}`, {
                                                  method: 'DELETE',
                                                  headers: {
                                                      'Content-Type': 'application/json',
                                                  },
                                              });
                                              console.log(res);
                                              Swal.fire({
                                                title: 'success',
                                                text: 'Successfully Deleted',
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
                                  Delete
                              </button>
                                {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                                {/*    000004*/}
                                {/*</p>*/}

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
                  Agency
                  </h2>
                </div>
                {/* Table */}
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden border-lite">
                    <div className="table-wrap">
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

export default AgencyList;
