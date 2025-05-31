import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/login'
import SignUp from './pages/register'
import TestLogin from "./pages/login_test"
import RegisterTest from "./pages/register_test"
import AddPost from "./pages/addPost"
import Test from "./pages/test"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/loginTest" element={<TestLogin/>} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signUpTest" element={<RegisterTest />} />
        <Route path="/addPost" element={<AddPost/>}/>
        <Route path="/test" element={<Test/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
