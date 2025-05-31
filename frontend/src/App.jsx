import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/login'
import SignUp from './pages/register'
import { useState } from 'react';
import HomePage from './pages/HomePage';
import AddPost from "./pages/Addpost";
import TopicPage from './pages/TopicPage'; 
import TestLogin from "./pages/login_test"
import RegisterTest from "./pages/register_test"
import Test from "./pages/test"
import MyProfile from './pages/Myprofile';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/loginTest" element={<TestLogin/>} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/topic/:category" element={<TopicPage />} />
        <Route path="/signUpTest" element={<RegisterTest />} />
        <Route path="/addPost" element={<AddPost/>}/>
        <Route path="/test" element={<Test/>}/>
        
        <Route path="/myProfile" element={<MyProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
