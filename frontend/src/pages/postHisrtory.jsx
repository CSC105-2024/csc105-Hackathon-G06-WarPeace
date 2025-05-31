import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const PostHistory = () => {
  const [mypost, setmypost] = useState([]);

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

  return (
    <>
      <Navbar />
      <div className="bg-[#2D3138]  min-h-screen text-white px-8 py-12">
        <h1 className="text-3xl font-bold text-center mb-10">HISTORY POSTS</h1>
        {mypost.map((post, index) => (
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
      </div>
    </>
  );
};

export default PostHistory;
