"use client";
import axiosClient from "@/app/axiosClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL + "/";

function UmrahList() {
    const [umrah, setUmrahList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(10);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const fetchData = async () => {
        try {
            const {data} = await axiosClient.get('facility');
            if (data.success == true) {
                setUmrahList(data.result);
            }
        } catch (error) {
            //setProductList([]);
            // console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    const currentItems = umrah.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    let tableName = "Facilities List";
    const headName = [

        "installation name",
        "premise type",
        // "country",
        "location area",
        "sub area",
        // "longitude",
        // "latitude",
        // "building_code",
        "department",
        "ownership",
        // "cls_list",
        // "des",
        "status",
        "Action"
    ];
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
            {Array.isArray(umrah) ? umrah.map((item, index) => (

                <tr key={index}>
                    {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {index + 1}
                        </p>

                    </td> */}
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                    {item.installation_name}
                                </p>
                            </div>
                        </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.premise_type?item.premise_type.name:'-'}
                        </p>
                    </td>
                    {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.country?item.country.name:'-'}
                        </p>
                    </td> */}
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.location_area && item.location_area.name}
                        </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.sub_area && item.sub_area.name}
                        </p>
                    </td>
                    {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.longitude}
                        </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.latitude}
                        </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.building_code}
                        </p>
                    </td> */}
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.department && item.department.name}
                        </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.ownership}
                        </p>
                    </td>
                    {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.cls_list}
                        </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.des}
                        </p>
                    </td> */}

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {item.is_delete ? (<span
                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Inactive</span>
                    </span>) : (<span
                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Active</span>
                    </span>)}

                    </td>
                    <td className="relative px-5 py-5 border-b border-gray-200 bg-white text-sm" style={{whiteSpace: 'nowrap'}}>

                            <Link
                                href={{
                                    pathname: '/admin/facilities/edit',
                                    query: { id: item._id },
                                }}
                                className="px-4 py-2 mx-2 bg-main text-white rounded"
                              > Edit</Link>
                                <button
                                  onClick={async () => {
                                      // Show a confirmation alert
                                      const confirmed = window.confirm("Are you sure you want to change the state?");

                                      if (confirmed) {
                                          // Make a DELETE request to your API to mark the question as deleted
                                          try {
                                            const res= await axiosClient.delete(`umrah/${item._id}`, {
                                                  method: 'DELETE',
                                                  headers: {
                                                      'Content-Type': 'application/json',
                                                  },
                                              });
                                              console.log(res);
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

                    </td>
                </tr>
            )) : ''}

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
                  Facilities List

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

export default UmrahList;
