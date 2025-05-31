
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setDropdownOpen(false);
    navigate('/myProfile');
  };

  const handleLogoutClick = () => {
    setDropdownOpen(false);
    localStorage.clear();
    navigate("/");
  };

  const handlePostClick = () => {
    navigate("/addpost");
  };

  return (
    <div className="bg-[#24272D] text-white px-4 md:px-8 py-4 flex justify-between items-center relative shadow-md  top-0 z-50">
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => navigate("/homepage")}
      >
        <img
          src="/homepage/WARPEACE_copy.png"
          alt="Logo"
          className="h-[60px] w-auto object-contain"
        />
      </div>

      <div className="flex items-center space-x-4 md:space-x-6">
        <button
          onClick={handlePostClick}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-3 md:px-4 py-1.5 md:py-2 rounded text-xs md:text-sm"
        >
          <span className="md:inline hidden">+ POST</span>
          <span className="md:hidden">+</span>
        </button>

        <div className="relative">
          <div
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full cursor-pointer overflow-hidden"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src="/homepage/user.svg"
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-28 md:w-32 bg-white text-black rounded shadow-lg z-50 text-sm">
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
                onClick={handleProfileClick}
              >
                My Profile
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogoutClick}
              >
                Log Out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default NavBar;

