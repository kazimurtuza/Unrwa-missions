import React, { useState } from "react";

function ActionDropdown() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  function actionTrigger() {
    setDropdownVisible(!isDropdownVisible);
  }

  return (
    <>
      <button
        type="button"
        onClick={actionTrigger}
        className="inline-block text-gray-500 hover:text-gray-700"
      >
        <svg className="inline-block h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
        </svg>
      </button>

      {isDropdownVisible && (
        <div className="absolute  shadow-lg z-10  right-0 top-3/4 actiondropdown bg-white divide-y divide-slate-200 rounded p-3">
          <button className="button  px-3 py-2 w-full text-gray-500 hover:text-indigo-400">
            Edit
          </button>
          <button className="button px-3 py-2 w-full text-gray-500 hover:text-indigo-400">
            Delete
          </button>
        </div>
      )}
    </>
  );
}

export default ActionDropdown;
