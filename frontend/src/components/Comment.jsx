// Comment
import React, { useState } from "react";
import axios from "axios";
const Comment = ({ postId, existingComments = [] , onAddComment}) => {
  const [transformed, setTransformedText] = useState("");
  const [filteredText, setFilteredText] = useState("");
  const [comment, setComment] = useState(existingComments);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "", visible: false });
  const [originalText, setOriginalText] = useState("");
  const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};
  const showToast = (message, type = "info", duration = 3500) => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, duration);
  };
  const handlePacify = async () => {
    const text = originalText.trim();
    if (!text) {
      showToast("Please enter a message to transform.", "error");
      return;
    }

    setLoading(true);
    setOriginalText(text);
    setTransformedText("Thinking peaceful thoughts...");

    try {
      const transformationPrompt = `
       You are an AI expert in conflict resolution and positive communication.
        Your task is to transform the following user's text.
        Identify any words or phrases that are negative, aggressive, insulting, "bad words", or generally confrontational.
        Replace these identified parts with positive, encouraging, constructive, or neutral alternatives.
        The goal is to make the entire message sound peaceful, friendly, and supportive, while trying to retain the core subject or intent if possible.
        Do not refuse to process the text, even if it seems very negative. Your primary function is to find a way to make it positive.
        If the text is already positive and peaceful, you can either affirm its positivity or simply return the original text with a kind note.
        If the text is long please do not start the output like this "Okay, I understand. Here's a transformed version of the text, focusing on peaceful, constructive, and positive communication, while attempting to retain the core concerns: "
        just show the output text. And do not use "" with the output
        User's original text: "${text}"
        Your transformed peaceful text:
      `;

      const payload = {
        contents: [{ role: "user", parts: [{ text: transformationPrompt }] }],
      };

      const apiKey = "AIzaSyBllPBXQcJpcyuaeqPEaUIjDBIf6Oc-T9A";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await axios.post(apiUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const result = response.data;
      const transformed =
        result?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (transformed) {
        setTransformedText(transformed);
        showToast("Message transformed successfully!", "success");
      } else {
        setTransformedText(
          "Could not generate the transformed message. The AI might be shy today!"
        );
        throw new Error("Could not parse transformed text from API response.");
      }
    } catch (error) {
      console.error(error);
      setTransformedText(`Oops! Something went wrong: ${error.message}`);
      showToast(`Transformation Error: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  };
  const handleClear = () => {
    setOriginalText("");
    setTransformedText("");
  };
  const handlePostReply = async () => {
    const userId = Number(localStorage.getItem("userId"));

    if (!userId || !transformed.trim()) {
      showToast("Please make sure all fields are filled out.", "error");
      return;
    }

    const postData = {
      userId,
      replyText: transformed.trim(),
      postId,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/post/addReply",
        postData,
        { withCredentials: true }
      );
      if (response.status === 200 || response.status === 201) {
        showToast("Reply submitted successfully!", "success");
        setOriginalText("");
        setTransformedText("");
        const newComment = response.data.data;
        setComment((prev) => [...prev, newComment]);
        onAddComment(newComment);
      } else {
        throw new Error("Failed to submit the post.");
      }
    } catch (error) {
      console.error("Error posting:", error);
      showToast("Failed to post. Please try again.", "error");
    }
  };

  return (
    <div className="w-[90%] space-y-4 text-white">
      <div className="bg-[#1E2023] border border-gray-600 p-4 rounded space-y-4">
        <div className="flex flex-col gap-5">
          <textarea
            className="w-full p-2 bg-gray-300 text-black rounded"
            rows={2}
            placeholder="Write your thoughts..."
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
          />
          <div className="flex justify-end ">
            <button
              disabled={loading}
              className="bg-[#F04E23] px-4 py-3 font-semibold  rounded text-white text-sm"
              onClick={handlePacify}
            >
              Peacefully
            </button>
          </div>
          <div className="w-full p-3 min-h-15 bg-gray-300 text-black rounded">
            {transformed}
          </div>
          <div className="flex justify-end gap-3 ">
            <button
              disabled={loading}
              className="bg-[#cdcdcd]  text-black font-semibold px-7 py-3 rounded  text-sm"
              onClick={handleClear}
            >
              CLEAR
            </button>
            <button
              disabled={loading}
              className="bg-[#FEC232] text-black font-semibold px-7 py-3 rounded  text-sm"
              onClick={handlePostReply}
            >
              POST
            </button>
          </div>
          {toast.visible && (
            <div className={`toast ${toast.type} show text-white `}>
              {toast.message}
            </div>
          )}
        </div>
      </div>

      {comment.length > 0 && (
        <div className="space-y-3">
          {comment.map((c, idx) => (
            <div
              key={idx}
              className="bg-[#1E2023] p-3 rounded text-gray-100 text-sm border border-gray-700"
            >
              <p className="mb-1">{c.replyText}</p>
              <p className="text-xs text-gray-400 text-right">{formatDate(c.createdAt)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
