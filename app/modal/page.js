"use client";
import { useState } from "react";

import Modal from "../components/modal";

function Modal2() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  function modalTrigger() {
    setModalVisible(!isModalVisible);
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {/*<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />*/}

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        {/*<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />*/}

        <main>
          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
              {/* Table */}
              <div className="flex items-center justify-center h-screen">
                <button
                  onClick={modalTrigger}
                  className="py-2 px-6 bg-indigo-600 text-white rounded opacity-90 hover:opacity-100 transition font-medium duration-500"
                  onclick="toggleModal()"
                >
                  SHOW MODAL
                </button>
              </div>

              <Modal
                isModalVisible={isModalVisible}
                setModalVisible={setModalVisible}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Modal2;
