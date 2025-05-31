import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import user from "/homepage/user.svg";
import pencil from "/userProfile/pencil.svg";
import DeleteConfirm from "../components/DeleteConfirm";

function UserProfile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("uwu");
  const [editedUsername, setEditedUsername] = useState(username);
  const [isEditing, setIsEditing] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUsernameClick = () => {
    setIsHidden(false);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setEditedUsername(username);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setUsername(editedUsername);
    setIsEditing(false);
    setIsHidden(true);
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-[#2D3138] flex items-center justify-center px-4 py-12">
        {showDeleteConfirm && (
          <DeleteConfirm
            onCancel={() => setShowDeleteConfirm(false)}
            onConfirm={() => {
              setShowDeleteConfirm(false);
              navigate("/");
            }}
          />
        )}
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-2xl">
          <h1 className="text-white font-bold text-2xl lg:text-5xl mb-4">
            User Profile
          </h1>

          <div className="bg-[#202327] p-6 lg:py-16 sm:p-8 md:p-10 rounded-[3px] shadow-md border-2 border-stone-700">
            <div className="w-full">

              <div className="flex items-start space-x-4 mb-8">

                <img
                  src={user}
                  className="h-24 w-24 rounded-full"

                />

                <div className="flex flex-col">
                  <span className="text-lg text-gray-400 mb-1">Username:</span>

                  {isHidden ? (
                    <span
                      onClick={handleUsernameClick}
                      className="italic cursor-pointer text-white bg-black rounded-[3px] px-4 py-1 min-w-[120px] text-center h-[36px] flex items-center justify-center"
                    >
                      Hidden
                    </span>
                  ) : isEditing ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editedUsername}
                        onChange={(e) => setEditedUsername(e.target.value)}
                        className="text-white bg-black rounded-[3px] px-4 py-1 min-w-[120px] h-[36px]"
                      />
                      <button
                        onClick={handleSaveClick}
                        className="bg-yellow-500 hover:bg-yellow-400 cursor-pointer text-black rounded-[3px] px-2 py-1 min-w-[80px] h-[36px]"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditedUsername(username);
                          setIsEditing(false);
                          setIsHidden(true);
                        }}
                        className="bg-gray-500 hover:bg-gray-400 text-black rounded-[3px] px-2 py-1 min-w-[80px] h-[36px]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="text-white bg-black font-semibold rounded-[3px] px-4 py-1 min-w-[120px] h-[36px] flex items-center justify-center">
                        {username}
                      </span>
                      <button
                        onClick={handleEditClick}
                        className="text-white hover:text-gray-300 cursor-pointer px-2 py-1 h-[36px] flex items-center"
                      >
                        <img src={pencil} className="w-5 h-5  cursor-pointer" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div>
                  <button className="bg-zinc-600 py-3 px-4 w-full font-bold text-white">
                    View my posts
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="bg-[#F04E23] py-3 px-4 w-full font-bold text-white"
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
