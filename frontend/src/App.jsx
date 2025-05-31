import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/login'
import SignUp from './pages/register'
import UserProfile from "./pages/userProfile"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/myProfile" element={<UserProfile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
