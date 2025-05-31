import React from "react";
import omgDelete from "/userProfile/omg_deleteAccount.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeleteConfirm({ onCancel }) {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      const res = await axios.delete("http://localhost:3000/auth/deleteAccount", {
        withCredentials: true,
      });

      if (res.data.success) {
        localStorage.removeItem("userId");
        alert("Account deleted successfully.");
        navigate("/"); 
      } else {
        alert(res.data.msg || "Failed to delete account.");
      }
    } catch (err) {
      console.error("Account deletion error:", err);
      alert("Something went wrong while deleting the account.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-10 flex items-center justify-center z-50">
      <div className="bg-[#202327] border border-stone-700 text-white rounded-[3px] p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <div className="justify-center flex m-5">
          <img src={omgDelete} alt="Delete Confirm" className="h-50 w-50" />
        </div>
        <p className="mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="bg-[#F04E23] hover:bg-[#f03823] cursor-pointer px-4 py-2 rounded-[3px]"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteAccount}
            className="bg-[#FEC232] hover:bg-[#fea232] cursor-pointer px-4 py-2 rounded-[3px]"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;
