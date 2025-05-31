import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import user from "/homepage/user.svg";
import DeleteConfirm from "../components/DeleteConfirm";
import ChangePasswordPopup from "../components/changePasswordPopup";

function UserProfile() {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [username, setUsername] = useState("Loading...");

useEffect(() => {
  const userId = localStorage.getItem("userId");

  if (userId) {
    axios
      .get(`http://localhost:3000/auth/getUserData/${userId}`, {
        withCredentials: true, 
      })
      .then((res) => {
        console.log("Fetched user data:", res.data);
        if (res.data?.success && res.data.data?.username) {
          setUsername(res.data.data.username);
        } else {
          setUsername("Unknown");
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
        setUsername("Error");
      });
  } else {
    setUsername("Not logged in");
  }
}, []);

  const handleUsernameClick = () => {
    setIsHidden((prev) => !prev);
  };

  const handleDeleteAccount = async () => {
  try {
    const res = await axios.delete("http://localhost:3000/auth/deleteAccount", {
      withCredentials: true,
    });

    if (res.data.success) {
      localStorage.clear();
      alert("Account deleted successfully.");
      navigate("/");
    } else {
      alert(res.data.msg || "Failed to delete account.");
    }
  } catch (err) {
    console.error("Error deleting account:", err);
    alert("Something went wrong while deleting the account.");
  }
};
  

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#2D3138] flex items-center justify-center px-4 py-12">
        {showDeleteConfirm && (
          <DeleteConfirm
            onCancel={() => setShowDeleteConfirm(false)}
            onConfirm={async () => {
              handleDeleteAccount();
              localStorage.clear();
              setShowDeleteConfirm(false);
              navigate("/");
            }}
          />
        )}
        <div className="w-full mt-20 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-2xl">
          <h1 className="text-white font-bold text-2xl lg:text-5xl mb-4">
            User Profile
          </h1>

          <div className="bg-[#202327] p-6 lg:py-16 sm:p-8 md:p-10 rounded-[3px] shadow-md border-2 border-stone-700">
            <div className="w-full">
              <div className="flex items-start space-x-4 mb-8">
                <img src={user} className="h-24 w-24 rounded-full" />
                <div className="flex flex-col">
                  <span className="text-lg text-gray-400 mb-1">Username:</span>
                  <span
                    onClick={handleUsernameClick}
                    className={`cursor-pointer rounded-[3px] px-4 py-1 min-w-[120px] h-[36px] flex items-center justify-center ${isHidden
                      ? "italic text-white bg-black"
                      : "font-semibold text-black bg-white"
                      }`}
                  >
                    {isHidden ? "Hidden" : username}
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div>
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="bg-yellow-500 hover:bg-amber-500 text-black cursor-pointer font-bold px-4 py-2 w-full"
                  >
                    Change Password
                  </button>{" "}
                  {showChangePassword && (
                    <ChangePasswordPopup
                      onCancel={() => setShowChangePassword(false)}
                      onSuccess={() => {
                        setShowChangePassword(false);
                        alert("Password changed!");
                      }}
                    />
                  )}
                </div>
                <div>
                  <button
                    onClick={() => navigate("/postHistory")}
                    className="bg-zinc-600 hover:bg-zinc-700 py-3 px-4 w-full cursor-pointer font-bold text-white"
                  >
                    View my posts
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="bg-[#F04E23] hover:bg-[#f02d23] py-3 px-4 w-full cursor-pointer font-bold text-white"
                  >
                    Delete my account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
