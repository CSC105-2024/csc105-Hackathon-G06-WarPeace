import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/login'
import SignUp from './pages/register'
import HomePage from './pages/HomePage';
import AddPost from "./pages/Addpost";
import TopicPage from './pages/TopicPage'; 
import TestLogin from "./pages/login_test"
import RegisterTest from "./pages/register_test"
import Test from "./pages/test"
import PostHistory from "./pages/postHisrtory";
import UserProfile from "./pages/userProfile"

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
        <Route path="/test" element={<Test/>}/>        
        <Route path="/postHistory" element={<PostHistory />} />
        <Route path="/myProfile" element={<UserProfile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
