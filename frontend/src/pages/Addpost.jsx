import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const filterTextWithAI = async (text) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cleaned = text.replace(/badword/gi, 'softword');
      resolve(cleaned);
    }, 1000);
  });
};

const AddPost = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [rawText, setRawText] = useState('');
  const [peacefulText, setPeacefulText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMakePeaceful = async () => {
    if (!rawText.trim()) return;
    setIsProcessing(true);
    const filtered = await filterTextWithAI(rawText);
    setPeacefulText(filtered);
    setIsProcessing(false);
  };

  const handlePost = async () => {
    if (!selectedTopic || !peacefulText.trim()) return;

    const newPost = {
      content: peacefulText,
      category: selectedTopic,
      date: new Date().toLocaleString(),
      comments: [],
    };

    try {
      const res = await fetch('/post/addPost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) throw new Error('Failed to post');

      navigate(`/topic/${selectedTopic}`);
    } catch (err) {
      console.error('Error posting:', err);
      alert('Failed to post. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/HomePage');
  };

  return (
    <div className="min-h-screen bg-[#2D3138] text-white px-4 py-20 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">WHAT’S IN YOUR MIND?</h1>

      <div className="mb-4 w-full max-w-4xl flex items-center gap-4">
        <label className="font-semibold text-lg min-w-[50px]">Topic:</label>
        <select
          className="w-48 p-2 rounded text-black bg-white"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="">Select</option>
          <option value="politics">Politics</option>
          <option value="academics">Academics</option>
          <option value="entertainment">Entertainment</option>
          <option value="relationships">Relationships</option>
          <option value="others">Others</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-4xl gap-6 mb-6">
        {/* Input Text */}
        <textarea
          className="w-full md:w-1/2 h-64 p-4 bg-white text-black rounded resize-none"
          placeholder="Write your thoughts here..."
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
        />

        {/* Mobile: Peaceful Button between textareas */}
        <button
          onClick={handleMakePeaceful}
          disabled={isProcessing || !rawText.trim()}
          className="block md:hidden w-full bg-red-600 text-white py-3 rounded hover:bg-red-500 disabled:opacity-50 font-semibold"
        >
          ✨ Make it peaceful !! ✨
        </button>

        {/* Arrow for desktop */}
        <div className="hidden md:flex items-center justify-center text-3xl">
          <FontAwesomeIcon icon={faArrowRight} style={{ color: '#ffffff' }} />
        </div>

        {/* Peaceful Output */}
        <textarea
          className="w-full md:w-1/2 h-64 p-4 bg-white text-black rounded resize-none"
          value={peacefulText}
          placeholder="Peaceful version will appear here..."
          readOnly
        />
      </div>

      {/* Desktop: Peaceful Button below textareas */}
      <button
        onClick={handleMakePeaceful}
        disabled={isProcessing || !rawText.trim()}
        className="hidden md:block w-full max-w-xs bg-red-600 text-white py-3 rounded mb-8 hover:bg-red-500 disabled:opacity-50 font-semibold"
      >
        ✨ Make it peaceful !! ✨
      </button>

      <div className="flex justify-center w-full max-w-xs gap-4">
        <button
          onClick={handleCancel}
          className="w-1/2 bg-gray-300 text-black font-bold py-2 rounded hover:bg-gray-400"
        >
          CANCEL
        </button>
        <button
          onClick={handlePost}
          disabled={!selectedTopic || !peacefulText.trim()}
          className="w-1/2 bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-300 disabled:opacity-50"
        >
          POST
        </button>
      </div>
    </div>
  );
};

export default AddPost;
