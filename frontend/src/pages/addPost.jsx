import axios from "axios";
import { useState } from "react";

function AddPost() {
  const [topic, setTopic] = useState("");
  const [userInput, setUserInput] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [transformedText, setTransformedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "", visible: false });
  const showToast = (message, type = "info", duration = 3500) => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast({ ...toast, visible: false });
    }, duration);
  };
  const handleTransform = async () => {
    const text = userInput.trim();
    if (!text) {
      showToast("Please enter a message");
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
        showToast("Message transformed successfully!");
      } else {
        setTransformedText("Could not generate the transformed message");
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

  return (
    /**
     * <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-8">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-3xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pb-2">
            Peaceful Word Wars
          </h1>
          <p className="text-gray-600 text-lg">Transform fiery words into friendly vibes!</p>
        </header>

        <div className="mb-8">
          <label htmlFor="userInput" className="block text-sm font-medium text-gray-700 mb-2">
            Your Message:
          </label>
          <textarea
            id="userInput"
            rows="5"
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 text-gray-700"
            placeholder="Unleash your words (the AI will make them kind)..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={handleTransform}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition duration-150 ease-in-out text-lg"
        >
          {loading ? 'Transforming...' : 'Make it Peaceful!'}
        </button>

        {loading && <div className="loader mt-8"></div>}

        <div className="mt-10 space-y-8">
          <div className="message-card">
            <h2 className="message-title">Original Message:</h2>
            <p className="message-content">{originalText}</p>
          </div>
          <div className="message-card">
            <h2 className="message-title">Peaceful Transformation:</h2>
            <p className="message-content transformed">{transformedText}</p>
          </div>
        </div>
      </div>

      {toast.visible && (
        <div className={`toast ${toast.type} show`}>
          {toast.message}
        </div>
      )}

      
      


      <footer className="text-center text-gray-500 mt-12 pb-6">
        <p>Powered by Generative AI</p>
      </footer>
    </div>
     * 
     * 
     */
    <div className="pageCon min-h-screen">
      <div className="bodyCon">
        <h1>WHAT’S IN YOUR MIND?</h1>
        <select
          className="w-[200px] border-1 md:w-[300px] rounded-[10px] px-2 py-2"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        >
          <option>Politics</option>
          <option>Media</option>
          <option>Relationship</option>
          <option>Other</option>
        </select>
        <textarea
          id="userInput"
          rows="5"
          className="w-full p-4 border border-gray-300 rounded-sm shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 text-gray-700"
          placeholder="Unleash your words..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        ></textarea>
        <button
          onClick={handleTransform}
          disabled={loading}
          className="bg-amber-300"
        >
          {loading ? "Transforming..." : "Make it Peaceful!"}
        </button>
        {loading && <div className="loader mt-8"></div>}
        <div className="resultBox">
          <div className="messageleft">
            <h2>Original text:</h2>
            <p>{originalText}</p>
          </div>
          <div className="messageRight">
            <h2>Peaceful text:</h2>
            <p>{transformedText}</p>
          </div>
        </div>
        {toast.visible && (
          <div className={`toast ${toast.type} show`}>{toast.message}</div>
        )}
        <div className="btn-area flex gap-2">
          <button className="bg-[#D9D9D9]">CANCEL</button>
          <button className="bg-[#FEC232]">POST</button>
        </div>
      </div>
    </div>
  );
}
export default AddPost;
