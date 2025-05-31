import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const categories = [
    "Politics",
    "Academics",
    "Media",
    "Relationship",
    "Other",
  ];

  const handleCategoryClick = (category) => {
    navigate(`/topic?category=${encodeURIComponent(category)}`);
  };

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-[#2D3138] text-white flex flex-col items-center py-10 px-4">
        <div className="bg-[#1E2023] w-full max-w-xl rounded px-6 py-4 mb-10 flex space-x-4 items-start shadow-md">
          <div className="text-sm md:text-base">
            <p className="font-semibold">Rules of Use</p>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-gray-200">
              <li>Do not refer to or mention any specific individuals.</li>
              <li>Do not post links or any form of spam.</li>
              <li>Please express yourself respectfully.</li>
            </ul>
          </div>
        </div>

        <div className="space-y-4 w-full max-w-md">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/topic/${cat}`}
              className="w-full flex justify-between items-center bg-gray-600 hover:bg-gray-500 text-white font-semibold px-5 py-3 rounded transition"
            >
              <span>{cat}</span>

              <img src="/homepage/right.svg" alt="arrow" className="w-4 h-4" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
