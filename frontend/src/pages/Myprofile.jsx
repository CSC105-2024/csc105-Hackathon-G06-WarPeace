import React from 'react';
import Navbar from '../components/Navbar';

const Myprofile = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen text-white px-8 py-12">
        <h1 className="text-3xl font-bold text-center mb-10">HISTORY POSTS</h1>

        <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded border border-gray-600">
          <p className="text-sm leading-relaxed">
            HEY, DEMOCRACY MEANS EVERYONE 
          </p>
          <p className="text-right text-xs text-gray-400 mt-4">05/30/25(FRI)16:36</p>
        </div>
      </div>
    </>
  );
};

export default Myprofile;
