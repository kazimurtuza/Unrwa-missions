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
            <div class="font-sans antialiased bg-grey-lightest">
              {/* Content */}
              <form
                action="#"
                class="w-full bg-grey-lightest"
                style={{ paddingTop: "4rem" }}
              >
                <div class="container mx-auto py-8">
                  <div class="w-5/6 mx-auto bg-white rounded shadow">
                    <div class="p-8">
                      <div class="flex mb-4">
                        <div class="w-1/2 mr-1">
                          <label
                            class="block text-grey-darker text-sm font-bold mb-2"
                            for="first_name"
                          >
                            First Name
                          </label>
                          <input
                            class="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            id="first_name"
                            type="text"
                            placeholder="Your first name"
                          />
                        </div>
                        <div class="w-1/2 ml-1">
                          <label
                            class="block text-grey-darker text-sm font-bold mb-2"
                            for="last_name"
                          >
                            Last Name
                          </label>
                          <input
                            class="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            id="last_name"
                            type="text"
                            placeholder="Your last name"
                          />
                        </div>
                      </div>
                      <div class="mb-4">
                        <label
                          class="block text-grey-darker text-sm font-bold mb-2"
                          for="email"
                        >
                          Email Address
                        </label>
                        <input
                          class="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="email"
                          type="email"
                          placeholder="Your email address"
                        />
                      </div>
                      <div class="mb-4">
                        <label
                          class="block text-grey-darker text-sm font-bold mb-2"
                          for="password"
                        >
                          Password
                        </label>
                        <input
                          class="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="password"
                          type="password"
                          placeholder="Your secure password"
                        />
                      </div>
                      <div class="flex items-center justify-between mt-8">
                        <button
                          class="bg-indigo-400 duration-300 leading-normal transition opacity-80 hover:opacity-100 text-white font-bold py-2 px-4 rounded"
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
