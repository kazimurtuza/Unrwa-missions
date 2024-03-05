import React, { useState } from "react";

function Modal({ isModalVisible, setModalVisible }) {
  function modalClose() {
    setModalVisible(false);
  }

  return (
    <>
      {isModalVisible && (
        <div class="fixed z-10 overflow-y-auto top-0 w-full left-0" id="modal">
          <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-cente">
            <div class="fixed inset-0 transition-opacity">
              <div class="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span class="hidden inline-block align-middle h-screen"></span>
            <form
              action="/"
              class="align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-lg w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="px-8 py-10">
                <div className="mb-4">
                  <label
                    className="block text-grey-darker text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                    id="name"
                    type="text"
                    placeholder="Your Name"
                  />
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
              </div>
              <div class="bg-gray-200 px-4 py-3 text-right">
                <button
                  type="reset"
                  class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                  onClick={modalClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="py-2 px-4 text-white rounded font-medium bg-indigo-600 opacity-90 hover:opacity-100 mr-2 transition duration-500"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
