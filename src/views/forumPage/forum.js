import { useEffect, useState } from "react";
import axios from "../../components/axios/axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/navbar/navbar";
import "../forumPage/forum.css";

const ForumPage = () => {
const [postList, setPostList] = useState(null);
const [error, setError] = useState("");
const { user } = useAuthContext();
const [list, setList] = useState(null);
const [newPost, setNewPost] = useState('');
const [isEnable, setIsEnable] = useState(false);

var date = new Date();

console.log(date)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios("api/post/getPosts", {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      const json = await response.data;

      if (response.status === 200) {
        setPostList(json);
        const objKeyArr = Object.keys(json["postsObj"]).map(
          (objKey) => json["postsObj"][objKey]
        );
        console.log(objKeyArr);
        setList(objKeyArr);
      }
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "api/post/addPost",
      {
        post: newPost ,
        dateTime: "2022-11-03T05:38:12.168Z"
      },
      {
        headers: {
          Authorization: `Bearer ${user}`,
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.data;

    if (response.status === 200) {
      alert("What is happening");
      window.location = "/forum";
    }
  };

  return (
    <div className="forum">
      <Navbar />
      <h1>FORUM PAGE</h1>
      <div className="post-col">
      <form className='login' onSubmit={handleSubmit}>
        <input type ='text' placeholder='Post your thought' value={newPost} onChange={(e) => setNewPost(e.target.value)}/><br></br>
      <button disabled={!newPost} >Post</button>
      </form>

        <h1>FORUM FEED</h1>
        {list &&
          list.map((row) => (
            <div className="post-box">
              <p>{row.email}</p>
              <p>{row.post}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ForumPage;
