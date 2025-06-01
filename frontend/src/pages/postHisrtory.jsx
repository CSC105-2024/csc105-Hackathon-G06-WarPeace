import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const POSTS_PER_PAGE = 10;

const PostHistory = () => {
  const [mypost, setmypost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchmyPost = async () => {
    try {
      const res = await axios.get("http://localhost:3000/post", {
        withCredentials: true,
      });
      setmypost(res.data.data);
    } catch (err) {
      console.error("Error fetching my post:", err);
    }
  };

  useEffect(() => {
    fetchmyPost();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const totalPages = Math.ceil(mypost.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = mypost.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#2D3138] pt-30 min-h-screen text-white px-8 py-12">
        <div className="text-box text-center text-3xl px-20 mb-10 flex flex-row items-center gap-2">
          <Link to={"/myProfile"} className="text-gray-200 hover:underline">
            User Profile
          </Link>
          <div>/</div>
          <h1 className="font-bold">HISTORY POSTS</h1>
        </div>

        {currentPosts.map((post, index) => (
          <div
            key={index}
            className="max-w-4xl mx-auto bg-[#1E2023] p-6 rounded border border-gray-600 mb-6"
          >
            <p className="text-sm leading-relaxed">{post.text}</p>
            <p className="text-right text-xs text-gray-400 mt-4">
              {formatDate(post.createdAt)}
            </p>
          </div>
        ))}

        {currentPosts.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No posts available in your history.
          </p>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center space-x-6 text-gray-300">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`text-2xl hover:text-white ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <img
                className="w-6 transform -scale-x-100"
                src="/film_HomePage/rightarrow.svg"
                alt="Previous"
              />
            </button>
            <span className="text-sm">
              PAGE {currentPage} OF {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`text-2xl hover:text-white ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <img
                className="w-6"
                src="/film_HomePage/rightarrow.svg"
                alt="Next"
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PostHistory;
