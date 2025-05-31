// Comment
import React, { useState } from 'react';

const Comment = ({ existingComments = [], onAddComment }) => {
  const [originalText, setOriginalText] = useState('');
  const [filteredText, setFilteredText] = useState('');
  const [comments, setComments] = useState(existingComments);
  const [loading, setLoading] = useState(false);

  const handlePeacefully = async () => {
    if (!originalText.trim()) return;
    setLoading(true);

//แล้วแต่ว่าจะเอามั้ย
//     const handlePeacefully = async () => {
//   if (!originalText.trim()) return;
//   setLoading(true);

//   const response = await fakeGeminiFilter(originalText);
//   setFilteredText(response);

//   setLoading(false);
// };

  };

  const handlePost = () => {
    if (!filteredText.trim()) return;

    const newComment = {
      text: filteredText,
      date: new Date().toLocaleString(),
    };
    setComments([...comments, newComment]);
    onAddComment && onAddComment(newComment);
    setOriginalText('');
    setFilteredText('');
  };

  return (
    <div className="w-[90%] space-y-4 text-white">
      <div className="bg-[#1E2023] border border-gray-600 p-4 rounded space-y-4">
        <div>
          <textarea
            className="w-full p-2 bg-gray-300 text-black rounded"
            rows={2}
            placeholder="Write something peacefully..."
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              disabled={loading}
              className="bg-red-600 px-4 py-1 rounded text-white text-sm"
              onClick={handlePeacefully}
            >
              {loading ? 'Filtering...' : 'Peacefully'}
            </button>
          </div>
        </div>
        {filteredText && (
          <div>
            <textarea
              className="w-full p-2 bg-yellow-100 text-black rounded"
              rows={2}
              value={filteredText}
              readOnly
            />
            <div className="flex justify-end mt-2">
              <button
                className="bg-yellow-400 px-4 py-1 rounded text-black font-semibold text-sm"
                onClick={handlePost}
              >
                Post
              </button>
            </div>
          </div>
        )}
      </div>

      {comments.length > 0 && (
        <div className="space-y-3">
          {comments.map((c, idx) => (
            <div
              key={idx}
              className="bg-[#2D3138] p-3 rounded text-gray-100 text-sm border border-gray-700"
            >
              <p className="mb-1">{c.text}</p>
              <p className="text-xs text-gray-400 text-right">{c.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;

const fakeGeminiFilter = async (text) => {
  return new Promise((resolve) => {
    setTimeout(() => {

      const cleaned = text.replace(/fuck|shit|bitch/gi, '[สุภาพ]');
      resolve(cleaned);
    }, 1000);
  });
};

