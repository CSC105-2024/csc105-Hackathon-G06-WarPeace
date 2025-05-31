import axios from "axios";
import { useEffect, useState } from "react";

function Test() {
  const [mypost, setmypost] = useState([]);
  const [allpost, setAllPost] = useState([]);
  const [username, setUsername] = useState([]);
  const userId = parseInt(localStorage.getItem("userId"));
  const fetchmyPost = async () => {
    try {
      const res = await axios.get("http://localhost:3000/post", {
        withCredentials: true,
      });
      console.log(res.data.data);
      setmypost(res.data.data);
    } catch (err) {
      console.error("Error fetching my post:", err);
    }
  };
  const fetchAllPost = async () => {
    try {
      const res = await axios.get("http://localhost:3000/post/all", {
        withCredentials: true,
      });
      console.log(res.data.data);
      setAllPost(res.data.data);
    } catch (err) {
      console.error("Error fetching my post:", err);
    }
  };
  const fetchUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/auth/getUserData/${userId}`, {
        withCredentials: true,
      });
      console.log(res.data.data);
      setUsername(res.data.data.username);
    } catch (err) {
      console.error("Error fetching my post:", err);
    }
  };
  useEffect(() => {
    fetchmyPost();
    fetchAllPost();
    fetchUserData();
  }, []);
  return (
    <div>
      <div className="myPost">
        <h1 className="p-2 text-4xl">Profile</h1>
        <p>{username}</p>
        <h1 className="p-2 text-2xl">My post</h1>
        {mypost.map((post, index) => {
          return (
            <div key={index} className="p-5 border-1 m-2">
              {post.text}
              <br/>
              {post.createdAt}
            </div>
          );
        })}
      </div>

      <div className="AllPost">
        <h1 className="p-2 text-4xl">Allpost</h1>
        {allpost.map((post, index) => {
          return (
            <div key={index} className="p-5 border-1 m-2">
              {post.text}
              <br />
              {post.createdAt}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Test;
