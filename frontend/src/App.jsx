import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/login'
import SignUp from './pages/register'
import { useState } from 'react';
import HomePage from './pages/HomePage';
import TopicPage from './pages/TopicPage'; 

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/topic/:category" element={<TopicPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
