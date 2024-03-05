"use client";
import { useState } from "react";

function ForgotPass() {
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
                <div className="container max-w-[650px] px-2 sm:px-4 mx-auto">
                  <div className="mx-auto bg-white rounded-xl shadow">
                    <div className="px-8 py-10">
                      <a
                        href="/"
                        className="max-w-[120px] mx-auto mb-2.5 block"
                      >
                        <img src="/logo.webp" className="max-w-full" alt="" />
                      </a>
                      <h2 className="text-[24px] sm:text-[28px] text-grey-darker text-center mb-10">
                        Change Password
                      </h2>
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
                          htmlFor="new-password"
                        >
                          New Password
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="new-password"
                          type="password"
                          placeholder="Your secure password"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-grey-darker text-sm font-bold mb-2"
                          htmlFor="confirm-password"
                        >
                          Confirm Password
                        </label>
                        <input
                          className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                        />
                      </div>
                      <div className="flex items-center justify-between mt-8">
                        <button
                          className="bg-indigo-600 duration-300 leading-normal transition opacity-90 hover:opacity-100 text-white font-bold py-2 px-4 rounded"
                          type="submit"
                        >
                          Submit
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

export default ForgotPass;
