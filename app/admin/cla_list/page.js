"use client";

import axiosClient from "@/app/axiosClient";
import TableExample from "@/app/example-table/page";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

function CLU() {
    const [claList, setClaList] = useState([]);

    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get('cla_list');
            setClaList(data.result);
        } catch (error) {
            console.error('Error fetching CLA list:', error);
            // You might want to display an error message to the user here
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const tableName = "Missions CLA List";
    const headName = ["Name", "Action"];

    const head = (
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
            {Array.isArray(claList) && claList.map((item, index) => (
                <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                                {item.name}
                            </p>
                        </div>
                    </td>
                    <td className="relative px-5 py-5 border-b border-gray-200 bg-white text-sm text-right" style={{ whiteSpace: 'nowrap' }}>
                    <Link
                                href={{
                                    pathname: '/admin/cla_list/edit',
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
                                            await axiosClient.delete(`cla_list/${item._id}`, {
                                                  method: 'DELETE',
                                                  headers: {
                                                      'Content-Type': 'application/json',
                                                  },
                                              });
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
                    </td>
                </tr>
            ))}
        </>
    );

    return (
        <TableExample tableName={tableName} tableHead={head} body={body}/>
    );
}

export default CLU;
