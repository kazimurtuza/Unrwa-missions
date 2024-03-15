"use client";
import axiosClient from "@/app/axiosClient";
import TableExample from "@/app/example-table/page";
import Link from "next/link";
import { useEffect, useState } from "react";

function Staff() {
    const [staff, setStaffList] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const api_base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

    const fetchData = async () => {
        try {
            const { data } = await axiosClient.get('staff');
            setStaffList(data.result);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    let tableName = "Staff";
    //const headName = ["Si","Image","Name", "Email", "Agency","Mission Classification","Gender","Passport Number Orginal","Passport Number Duplicate","Whatsup Number", "Statelite Phone", "Call Signin", "Action"];
    const headName = ["Si","Image","Name", "Role",,"Status","Mission Classification","Gender", "Action"];

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

    {successMessage && (
        <div
        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
        role="alert"
        >
        <strong className="font-bold">Success!</strong>
        <span className="block sm:inline">
            {successMessage}
        </span>
        </div>
    )}

    const body = (

        <>

            {Array.isArray(staff) && staff.map((item, index) => (

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
                                    {item.staff_photo && (
                                        <img
                                            className="w-8 h-8 rounded-full object-cover"
                                            src={`${api_base_url}/${item.staff_photo}`}
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
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.staff_role}
                        </p>
                        {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                        {/*    USD*/}
                        {/*</p>*/}
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.user.status === 1 ? "Unblocked" : "Blocked"}
                        </p>
                        {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                        {/*    USD*/}
                        {/*</p>*/}
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.classification}
                        </p>
                        {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                        {/*    USD*/}
                        {/*</p>*/}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {item.gender}
                        </p>
                        {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                        {/*    USD*/}
                        {/*</p>*/}
                    </td>

                    <td className="relative px-5 py-5 border-b border-gray-200 bg-white text-sm text-right" style={{whiteSpace: 'nowrap'}}>
                        {/* <ActionDropdown /> */}

                        <button
                                  onClick={async () => {
                                      // Show a confirmation alert
                                      const confirmed = window.confirm("Are you sure you want to update the status?");

                                      if (confirmed) {
                                          // Make a DELETE request to your API to mark the question as deleted
                                          try {
                                            const postData={
                                                status:1
                                            }

                                            const response = await axiosClient.put(`users/status-update/${item.user._id}`, postData);

                                            //   await fetch(`/api/users/status-update/${item.user._id}`, {
                                            //       method: 'PUT',
                                            //       body:'',
                                            //       headers: {
                                            //           'Content-Type': 'application/json',
                                            //       },
                                            //   });

                                            console.log(response);
                                              setSuccessMessage('Status Update successfully');
                                              fetchData();
                                              // Remove the deleted question from the state
                                          } catch (error) {
                                              console.error("Error deleting user:", error);
                                          }
                                      }
                                  }}
                                  className="px-4 py-2 mx-2 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                   {item.user.status === 1 ? "Block" : "Unblock"}
                              </button>

                            <Link
                                href={{
                                    pathname: '/admin/staff/edit',
                                    query: { id: item._id },
                                }}
                                className="px-4 py-2 mx-2 bg-main text-white rounded"
                              > Edit</Link>
                                <Link
                                href={{
                                    pathname: '/admin/staff/edit',
                                    query: { id: item._id },
                                }}
                                className="px-4 py-2 mx-2 bg-red-500 text-white rounded"
                              > Delete</Link>
                                {/*<p className="text-gray-600 whitespace-no-wrap">*/}
                                {/*    000004*/}
                                {/*</p>*/}

                    </td>
                </tr>
            ))}
        </>
    );

    return (
        <TableExample tableName={tableName} tableHead={head} body={body}/>
    );
}

export default Staff;
