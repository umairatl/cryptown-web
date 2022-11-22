import { useEffect, useState } from "react";
import axios from "../../components/axios/axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/navbar/navbar";
import "../forumPage/forum.css";
import ReplyForum from "../../components/replyForum/replyForum";
import Reply from "../../components/replies/replies";
import { useForumContext } from '../../hooks/useForumContext';
import { useUserPostsContext } from "../../hooks/useUserPostsContext";


const ForumPage = () => {
const [postList, setPostList] = useState(null);
// const [list, setList] = useState(null);
const [newPost, setNewPost] = useState('');
const [replyId, setReplyId] = useState();

const { user } = useAuthContext();
const { forumList, dispatch } = useForumContext();
const { postLists, dispatch: userPostDispatch } = useUserPostsContext()

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
        // const test = objKeyArr.map()
        // console.log(objKeyArr.map)
        // console.log(Object.keys(objKeyArr.replies), "test");
        // console.log("TEST: ",objKeyArr.map((post) => post.replies))
        // console.log("TEST_2: ",objKeyArr)
        // setList(objKeyArr);
        if (response.status === 200 ) {
          dispatch({ type: "SET_POSTS", payload: objKeyArr })
        }

      }
    };

    if (user && forumList === null) {
      fetchPosts();
    }
  }, [dispatch, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "api/post/addPost",
      {
        post: newPost ,
        dateTime: new Date().toISOString()
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
      dispatch({ type: "ADD_POST", payload: json["newPost"] })

      if (postLists !== null) {
        userPostDispatch({ type: "ADD_POST", payload: json["newPost"] })
      }
      setNewPost('')
    }
}


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
        {forumList &&
          forumList.map((row, index) => (
            <div key={index} className="list-forum">
            <div className="post-box">
              <p>{row.email}</p>
              <p>{row.post}</p>
              {/* <p>{JSON.stringify(row.replies)}</p> */}
             <ReplyForum key={row.postid} postId={row.postid}/>
            </div>
              {row.replies.map((reply) => <Reply reply={reply}/>)}
          </div>
          ))}
      </div>
    </div>
  );
};

export default ForumPage;
