"use client";
import { useState } from "react";

import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";

function FormExample() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="font-sans antialiased bg-grey-lightest">
              {/* Content */}
              <form
                action="#"
                className="w-full bg-grey-lightest"
                style={{ paddingTop: "4rem" }}
              >
                <div className="container mx-auto py-8">
                  <div className="w-5/6 mx-auto bg-white rounded shadow">
                    <div className="p-8">
                      <div className="flex mb-4">
                        <div className="w-1/2 mr-1">
                          <label
                            className="block text-grey-darker text-sm font-bold mb-2"
                            for="first_name"
                          >
                            First Name
                          </label>
                          <input
                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            id="first_name"
                            type="text"
                            placeholder="Your first name"
                          />
                        </div>
                        <div className="w-1/2 ml-1">
                          <label
                            className="block text-grey-darker text-sm font-bold mb-2"
                            for="last_name"
                          >
                            Last Name
                          </label>
                          <input
                            className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            id="last_name"
                            type="text"
                            placeholder="Your last name"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          for="email"
                        >
                          Email Address
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="email"
                          type="email"
                          placeholder="Your email address"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          for="password"
                        >
                          Password
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="password"
                          type="password"
                          placeholder="Your secure password"
                        />
                      </div>
                      <div className="flex items-center justify-between mt-8">
                        <button
                          className="bg-indigo-400 duration-300 leading-normal transition opacity-80 hover:opacity-100 text-white font-bold py-2 px-4 rounded"
                          type="submit"
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default FormExample;
