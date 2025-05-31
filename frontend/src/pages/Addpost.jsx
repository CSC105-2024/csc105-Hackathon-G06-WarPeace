import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddPost = () => {
  const [userInput, setUserInput] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [transformedText, setTransformedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("Politics");
  const [toast, setToast] = useState({ message: "", type: "", visible: false });
  const nav = useNavigate();

  const showToast = (message, type = "info", duration = 3500) => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast({ ...toast, visible: false });
    }, duration);
  };

  const handlePacify = async () => {
    const text = userInput.trim();
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
  const handlePost = async () => {
    const userId = Number(localStorage.getItem("userId"));

    if (!userId || !transformedText.trim() || !topic) {
      showToast("Please make sure all fields are filled out.", "error");
      return;
    }

    const postData = {
      userId,
      text: transformedText.trim(),
      topic,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/post/addPost",
        postData,
        { withCredentials: true }
      );
      if (response.status === 200 || response.status === 201) {
        showToast("Post submitted successfully!", "success");
        nav(`/topic/${encodeURIComponent(topic)}`);
      } else {
        throw new Error("Failed to submit the post.");
      }
    } catch (error) {
      console.error("Error posting:", error);
      showToast("Failed to post. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#2D3138] flex-col items-center justify-center p-4 pt-8">
      <div className=" p-8 md:p-12 rounded-sm w-full max-w-3xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white ">
            WHAT’S IN YOUR MIND?
          </h1>
        </header>

        <div className="mb-8">
          <label className="w-1/2 font-semibold text-white ">Topic: </label>
          <select
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
            }}
            className="w-full md:m-3 md:w-1/2 border-1 bg-white rounded-[10px] px-2 py-2"
          >
            <option>Politics</option>
            <option>Academics</option>
            <option>Media</option>
            <option>Relationship</option>
            <option>Other</option>
          </select>
          <label
            htmlFor="userInput"
            className="block text-sm font-medium text-white mb-2"
          >
            Your Message:
          </label>
          <textarea
            id="userInput"
            rows="5"
            className="w-full p-4 border bg-white border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 text-gray-700"
            placeholder="Unleash your words..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={handlePacify}
          disabled={loading}
          className="w-full bg-[#F04E23] hover:bg-[#f02323] cursor-pointer text-lg font-bold text-white p-3 rounded-sm"
        >
          {loading ? "Transforming..." : "Make it Peaceful!!"}
        </button>

        {loading && <div className="loader mt-8"></div>}

        <div className="result-box mt-10 w-full flex flex-col md:flex-row gap-6">
          <div className="message-card flex-1 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              Original Message:
            </h2>
            <div className="border rounded-md p-3 bg-gray-100 min-h-[150px] text-gray-700 whitespace-pre-wrap">
              {originalText || "Your original message will appear here..."}
            </div>
          </div>

          <div className="message-card flex-1 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              Peaceful Transformation:
            </h2>
            <div className="border rounded-md p-3 bg-gray-100 min-h-[150px] text-gray-700 whitespace-pre-wrap">
              {transformedText ||
                "Transformed peaceful version will appear here..."}
            </div>
          </div>
        </div>
      </div>

      {toast.visible && (
        <div className={`toast ${toast.type} show text-white `}>
          {toast.message}
        </div>
      )}

      <div className="button-box flex gap-5 mt-3 ">
        <button onClick={() => nav("/homepage")} 
        className="bg-[#D9D9D9] hover:bg-gray-400 py-5 px-7 rounded-sm font-bold cursor-pointer">
          CANCEL
        </button>
        <button
          onClick={handlePost}
          className="bg-[#FEC232] hover:bg-[#fe8a32] py-5 px-7 rounded-sm font-bold cursor-pointer"
        >
          POST
        </button>
      </div>
      <footer className="text-center text-gray-500 mt-12 pb-6">
        <p>Powered by gemini-2.0-flash</p>
      </footer>
    </div>
  );
};

export default AddPost;
