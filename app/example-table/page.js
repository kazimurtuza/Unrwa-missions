"use client";
import { useState } from "react";

const  TableExample=(props)=>{
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {tableName,tableHead,body}=props;

  return (
    <div className="flex h-screen overflow-hidden">

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
              <div className="flex gap-5 flex-wrap items-center justify-between">
                <h2 className="text-2xl font-semibold leading-tight">
                  {tableName}
                </h2>
                <form
                  action="/"
                  className="relative w-full sm:w-80 flex items-center h-12 rounded-md focus-within:shadow-lg bg-white overflow-hidden"
                >
                  <div className="grid place-items-center h-full w-12 text-gray-300 hover:text-indigo-400">
                    <button type="submit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          className="transition"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="text"
                    id="search"
                    placeholder="Search something.."
                  />
                </form>
              </div>
              {/* Table */}
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                    {tableHead}
                    </thead>
                    <tbody>
                    {body}

                    </tbody>
                  </table>
                </div>
              </div>

              {/* pagination */}
             
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TableExample;
