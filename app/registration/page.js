"use client";
import { useState } from "react";

function Registration() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main>
          <div className="px-4 sm:px-6 lg:px-8 w-full">
            <div className="font-sans antialiased bg-grey-lightest">
              {/* Content */}
              <form
                action="#"
                className="w-full bg-grey-lightest min-h-screen flex items-center justify-center py-16"
                // style={{ paddingTop: "4rem" }}
              >
                <div className="container max-w-[900px] px-2 sm:px-4 mx-auto">
                  <div className="mx-auto bg-white rounded-xl shadow">
                    <div className="px-8 py-10">
                      <a
                        href="/"
                        className="max-w-[120px] mx-auto mb-2.5 block"
                      >
                        <img src="/logo.webp" className="max-w-full" alt="" />
                      </a>
                      <h2 className="text-[24px] sm:text-[28px] text-grey-darker text-center mb-10">
                        Create an Account
                      </h2>
                      <div className="flex mb-4 flex-wrap sm:flex-nowrap gap-2">
                        <div className="sm:w-1/2 w-full flex-[100%] sm:flex-[50%]">
                          <label
                            className="block text-grey-darker text-sm font-bold mb-2"
                            htmlFor="first_name"
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
                        <div className="sm:w-1/2 w-full flex-[100%] sm:flex-[50%]">
                          <label
                            className="block text-grey-darker text-sm font-bold mb-2"
                            htmlFor="last_name"
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
                          htmlFor="email"
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
                          htmlFor="password"
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
                          className="bg-indigo-600 duration-300 leading-normal transition opacity-90 hover:opacity-100 text-white font-bold py-2 px-4 rounded"
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

export default Registration;
