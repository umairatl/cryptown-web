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
import imground from "../../asset/imageempty.png";
import Footer from "../../components/footer/footer";
const entities = require("entities");

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
  let dayOpt = { weekday: "long" };
  let yearOpt = { year: "numeric", month: "numeric", day: "numeric" };
  let timeOpt = { hour: "numeric", minute: "numeric" };

  return (
    <div classname="tagging">
      <div className="forum">
        <Navbar />
        {/* <ForumHeaderSection /> */}
        <div className="post-col">
          <form
            className="forum-post"
            onSubmit={handleSubmit}
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <div className="containerforforum">
              <textarea
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
            <h3
              className="textfrmheader"
              data-aos="fade-down"
              data-aos-duration="3000"
            >
              Forum<span id="colortext17"> Feed</span>
            </h3>

            <br />

            <br />
            {/* <div className="postfbackground"> */}

            {forumList &&
              forumList.map((row, index) => (
                  <div className="list-forum-2 cont-wrap-forum" key={index}>
                    <div className="flex-d-row space-between-jn post-box__reply">
                      <div className="flex-d-row">
                          {/* <img id="imground" width='100%' src={imground} alt="image" /> */}
                          <p style={{marginLeft: '1rem'}}> {row.username}</p>
                        </div>
                        <div  className="flex-d-row">
                          {/* <p> {row.email}</p> */}
                          <p style={{marginRight: '1rem'}}>
                            {new Date(row.postdatetime)
                              .toLocaleDateString("en-MY", dayOpt)
                              .toString()}
                          </p>

                          <p style={{marginRight: '1rem'}}>
                            {new Date(row.postdatetime)
                              .toLocaleDateString("en-MY", timeOpt)
                              .toString()
                              .substring(12)}
                          </p>

                          <p style={{marginRight: '1rem'}}>
                            {new Date(row.postdatetime)
                              .toLocaleDateString("en-MY", yearOpt)
                              .toString()}
                          </p>
                        
                         
                        </div>
                      {/* </div> */}
                      </div>
                        <div>
                          <p style={{marginLeft: '1rem', textAlign: 'left'}}>
                            {entities.decodeHTML(row.post)}
                          </p>
                        </div>
                      <div className="tab">
                        <input
                          id={"tab-" + index}
                          type="checkbox"
                          key={index}
                        ></input>
                        {/* <label for={"tab-" + index}>View Replies</label> */}
                        {row.replies.map((reply) => ( 
                           <div>
                           {/* <Reply reply={reply} /> */}
                           </div> 
                        ))} 
                      </div>
                      <ReplyForum key={row.postid} postId={row.postid} />
                  </div>
              ))}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ForumPage;