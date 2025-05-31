import React from "react";
import omgDelete from "/userProfile/omg_deleteAccount.svg"


function DeleteConfirm({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/40  bg-opacity-10 flex items-center justify-center z-50 ">
      <div className="bg-[#202327] border border-stone-700 text-white rounded-[3px] p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <div className="justify-center flex m-5">
        <img src={omgDelete} className="h-50 w-50r"></img></div>
        <p className="mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-[3px]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-[3px]"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;
