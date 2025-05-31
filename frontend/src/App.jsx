import {BrowserRouter as Router,Routes,Route,Navigate, BrowserRouter, createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './pages/login'
import SignUp from './pages/register'
import HomePage from './pages/HomePage';
import AddPost from "./pages/addPost";
import TopicPage from './pages/TopicPage'; 
import NotFoundPage from "./pages/notFound";
import PostHistory from "./pages/postHisrtory";
import UserProfile from "./pages/userProfile"
import ProtectedLayout from "./pages/protectedLayout";
const router = createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"/register",
    element:<SignUp/>
  },
  {
    path:"/",
    element:<ProtectedLayout/>,
    children:[
      {path:"/homePage", element:<HomePage/>},
      {path:"/addpost", element:<AddPost/>},
      {path:"/topic/:category", element:<TopicPage />},
      {path:"/postHistory", element:<PostHistory />},
      {path:"/myProfile", element:<UserProfile/>},
      {path:"*",element:<NotFoundPage/>}
    ]
  }
])
function App() {
  return (
    <RouterProvider router={router}/> 
    /**
     * 
     * <BrowserRouter>
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
     * 
     * 
     */
    
  )
}

export default App
