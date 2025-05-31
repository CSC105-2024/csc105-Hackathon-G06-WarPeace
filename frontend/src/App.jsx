import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/login'
import SignUp from './pages/register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
