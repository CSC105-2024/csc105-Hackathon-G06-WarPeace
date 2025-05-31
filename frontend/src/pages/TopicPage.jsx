//topic.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";

const topicInfo = {
  Politics: {
    title: "Politics",
    description:
      "Discuss government, policies, political events, and global affairs.",
  },
  Academics: {
    title: "Academics",
    description:
      "Talk about studies, exams, school life, and anything educational.",
  },
  Media: {
    title: "Media",
    description: "Discuss movies, music, games, celebrities, and media trends.",
  },
  Relationship: {
    title: "Relationship",
    description:
      "Share and seek advice on friendships, love, family, and more.",
  },
  Other: {
    title: "Other",
    description: "Topics that don’t fit in the main categories.",
  },
};

const POSTS_PER_PAGE = 10;

const TopicPage = () => {
  const { category } = useParams();
  const topic = topicInfo[category] || {
    title: "Unknown Topic",
    description: "This topic does not exist.",
  };

  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchAllPost = async () => {
    try {
      const res = await axios.get("http://localhost:3000/post/all", {
        withCredentials: true,
      });
      console.log(res.data.data);
      setAllPosts(res.data.data);
    } catch (err) {
      console.error("Error fetching my post:", err);
    }
  };
  useEffect(() => {
    fetchAllPost();
  }, []);
  const filteredPosts = allPosts.filter(
    (post) => post.topic?.toLowerCase() === category.toLowerCase()
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
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
      <div className="min-h-screen pt-30 bg-[#2D3138] text-white px-4 py-10 flex flex-col items-center">
        <div className="text-left w-full max-w-4xl mb-6">
          <h1 className="text-3xl font-bold mb-2">{topic.title}</h1>
          <p className="text-gray-300">{topic.description}</p>
        </div>
        <div className="space-y-6 w-full max-w-4xl">
          {currentPosts.map((post) => (
            <PostCard
              key={post.id}
              content={post.text}
              date={formatDate(post.createdAt)}
              postId={post.id}
              comments={post.reply || []}
            />
          ))}

          {currentPosts.length === 0 && (
            <p className="text-gray-400 text-center">
              No posts available in this category.
            </p>
          )}
        </div>
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
              <img className="w-6" src="/film_HomePage/rightarrow.svg" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TopicPage;
