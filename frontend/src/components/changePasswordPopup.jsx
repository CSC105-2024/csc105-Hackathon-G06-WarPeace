import React, { useState } from "react";
import axios from "axios";

const ChangePasswordPopup = ({ onCancel, onSuccess }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
  setError("");

  if (newPassword !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  const userId = localStorage.getItem("userId");

  try {
    setLoading(true);
    
    const res = await axios.patch(
      "http://localhost:3000/auth/update-password",
      {
        userId,
        password: newPassword,
      },
      {
        withCredentials: true, 
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.data.success) {
      throw new Error(res.data.msg || "Failed to update password.");
    }

    onSuccess(); 
  } catch (err) {
    setError(err.message || "An error occurred.");
    console.error("Password update failed:", err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/40 k bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#202327] border border-stone-700 text-white rounded-[3px] p-6 w-full max-w-sm shadow-lg space-y-4">
        <h2 className="text-xl font-bold">Change Password</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border rounded p-2"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#FEC232] hover:bg-[#fea232] text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;
