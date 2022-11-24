import { useEffect, useState } from "react";
import axios from "../../components/axios/axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/navbar/navbar";
import "../forumPage/forum.css";
import ReplyForum from "../../components/replyForum/replyForum";
import Reply from "../../components/replies/replies";
import { useForumContext } from "../../hooks/useForumContext";
import { useUserPostsContext } from "../../hooks/useUserPostsContext";
import ForumHeaderSection from "./forumHeader/forumhead";

const ForumPage = () => {
  const [postList, setPostList] = useState(null);
  // const [list, setList] = useState(null);
  const [newPost, setNewPost] = useState("");
  const [replyId, setReplyId] = useState();

  const { user } = useAuthContext();
  const { forumList, dispatch } = useForumContext();
  const { postLists, dispatch: userPostDispatch } = useUserPostsContext();

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
        if (response.status === 200) {
          dispatch({ type: "SET_POSTS", payload: objKeyArr });
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
        post: newPost,
        dateTime: new Date().toISOString(),
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
      dispatch({ type: "ADD_POST", payload: json["newPost"] });

      if (postLists !== null) {
        userPostDispatch({ type: "ADD_POST", payload: json["newPost"] });
      }
      setNewPost("");
    }
  };

  return (
    <div className="forum">
      <Navbar />
      <ForumHeaderSection />
      {/* <h1>FORUM PAGE</h1> */}
      <br />
      <br />

      {/* <div className="containerpost"> */}

      {/* </div> */}
      <div className="post-col">
        <form className="login" onSubmit={handleSubmit}>
          <div className="containerforforum">
            <input
              type="text"
              id="contentforum"
              placeholder="Post your thought"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <br></br>
            <button className="bn632-hover bn20" disabled={!newPost}>
              Post
            </button>
          </div>
        </form>
        <br />
        <br />

        {/* Styling for forum feed*/}
        <div className="bg34">
          <h3 className="textfrmheader">
            <span id="colortext16"> Forum</span> Feed
          </h3>

          <br />

          <br />
          {/* <div className="postfbackground"> */}

          {forumList &&
            forumList.map((row, index) => (
              <div className="containerfrm">
                <div key={index} className="list-forum" id="forumboxbg">
                  <div className="post-box">
                    <p className="bolding">User: {row.email}</p> <br />
                    <p className="bolding">Subject: {row.post}</p>
                    {/* <p>{JSON.stringify(row.replies)}</p> */}
                    {row.replies.map((reply) => (
                      <Reply reply={reply} />
                    ))}
                    <ReplyForum key={row.postid} postId={row.postid} />
                  </div>
                  {/* {row.replies.map((reply) => (
                  <Reply reply={reply} />
                ))} */}
                </div>
              </div>
            ))}
        </div>
        {/* <div id="post-bg2"></div> */}
        {/* </div> */}
      </div>
      {/* <div class="blob-wobble1"></div>
      <br />
      <div class="blob-wobble2"></div> */}
    </div>
  );
};

export default ForumPage;
