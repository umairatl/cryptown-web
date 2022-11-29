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
  let dayOpt = { weekday: "long" };
  let yearOpt = { year: "numeric", month: "numeric", day: "numeric" };
  let timeOpt = { hour: "numeric", minute: "numeric" };

  return (
    <div classname="tagging">
      <div className="forum">
        <Navbar />
        <ForumHeaderSection />
        {/* <h1>FORUM PAGE</h1> */}
        <br />
        <br />

        {/* <div className="containerpost"> */}

        {/* </div> */}
        <div className="post-col">
          <form
            className="login"
            onSubmit={handleSubmit}
            data-aos="fade-up"
            data-aos-duration="3000"
          >
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
                <div
                  className="containerfrm"
                  data-aos="fade-up"
                  data-aos-duration="3000"
                >
                  <div key={index} className="list-forum" id="forumboxbg">
                    <div className="post-box">
                      <div className="containerthree">
                        <div className="divsidebyside">
                          <img id="imground" src={imground} alt="image" />
                        </div>
                        <div className="divbolding1">
                          <p className="bolding1"> {row.username}</p>
                          <p className="bolding2"> {row.email}</p>
                        </div>
                      </div>
                      <hr
                        classname="styleline"
                        style={{
                          border: "0",
                          height: "0",
                          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                        }}
                      />
                      <div className="textalignment">
                        <div className="mainpost">
                          <p className="bolding4">
                            {entities.decodeHTML(row.post)}
                          </p>
                        </div>
                        <div className="datetimes">
                          <p className="bolding7">
                            {new Date(row.postdatetime)
                              .toLocaleDateString("en-MY", yearOpt)
                              .toString()}
                          </p>
                          <p className="bolding8">
                            {new Date(row.postdatetime)
                              .toLocaleDateString("en-MY", timeOpt)
                              .toString()
                              .substring(12)}
                          </p>
                          <p className="bolding9">
                            {new Date(row.postdatetime)
                              .toLocaleDateString("en-MY", dayOpt)
                              .toString()}
                          </p>
                        </div>
                      </div>

                      {/* <p className="bolding3">Date: {row.postdatetime}</p> <br /> */}

                      {/* <div className="datetimes">
                        <p className="bolding7">
                          {new Date(row.postdatetime)
                            .toLocaleDateString("en-MY", yearOpt)
                            .toString()}
                        </p>
                        <p className="bolding8">
                          {new Date(row.postdatetime)
                            .toLocaleDateString("en-MY", timeOpt)
                            .toString()
                            .substring(12)}
                        </p>
                        <p className="bolding9">
                          {new Date(row.postdatetime)
                            .toLocaleDateString("en-MY", dayOpt)
                            .toString()}
                        </p>
                      </div>
                    </div> */}

                      {/* <p>{JSON.stringify(row.replies)}</p> */}
                      <div className="tab">
                        <input
                          id={"tab-" + index}
                          type="checkbox"
                          key={index}
                        ></input>
                        <label for={"tab-" + index}>List of Replies</label>
                        {row.replies.map((reply) => (
                          // <Reply reply={reply} />

                          <div class="contentforumm">
                            <Reply reply={reply} />
                          </div>
                        ))}
                      </div>
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
      <div>
        <Footer />
      </div>
      {/* <div id="post-bg2"></div> */}
      {/* </div> */}
    </div>
  );
};

export default ForumPage;

{
  /* <form className='login' onSubmit={handleSubmit}>
        <input type ='text' placeholder='Post your thought' value={newPost} onChange={(e) => setNewPost(e.target.value)}/><br></br>
      <button disabled={!newPost} >Post</button>
      </form>
        <h1>FORUM FEED</h1>

        {forumList &&
          forumList.map((row, index) => (
            <div key={index} className="list-forum">
            <div className="post-box">
              <p>{row.email}</p>
              <p>{row.username}</p>
              <p>{new Date(row.postdatetime).toLocaleDateString("en-MY", yearOpt).toString()}</p>
              <p>{new Date(row.postdatetime).toLocaleDateString("en-MY", timeOpt).toString().substring(12)}</p>
              <p>{new Date(row.postdatetime).toLocaleDateString("en-MY", dayOpt).toString()}</p>
              <p>{entities.decodeHTML(row.post)}</p>
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

<div className="frem">
        <div className="logo-name">
            <div className="logo">
                <img src={front} alt=""/>
            </div>
            <p>What do you want share</p>
        </div>
        <div className="text-area" contenteditable data-placeholder="Write here"></div>
        <div className="bottom-cont">
            <a href="#"><img src={photocamera1} alt="" style="margin-right: 9px;"/>Add Photo</a>
            <a href="#"><img src={videocamera1} alt="" style="margin-right: 9px;"/>Add Video</a>
            <a href="#"><img src={smilingface} alt=""/></a>
            <a href="#"><img src={videocamera2} alt=""/></a>
        </div>]
</div>
              {row.replies.map((reply) => <Reply reply={reply}/>)} */
}

{
  /* <div className="tab">
  <input id="tab-1" type="checkbox"></input>
  <label for="tab-1">List of Replies</label>
  <div class="contentforumm">
    <Reply reply={reply} />
  </div>
</div> */
}

// import { useEffect, useState } from "react";
// import axios from "../../components/axios/axios";
// import { useAuthContext } from "../../hooks/useAuthContext";
// import Navbar from "../../components/navbar/navbar";
// import "../forumPage/forum.css";
// import ReplyForum from "../../components/replyForum/replyForum";
// import Reply from "../../components/replies/replies";
// import { useForumContext } from "../../hooks/useForumContext";
// import { useUserPostsContext } from "../../hooks/useUserPostsContext";
// import ForumHeaderSection from "./forumHeader/forumhead";
// import imground from "../../asset/imageempty.png";

// const entities = require("entities");

// const ForumPage = () => {
//   const [postList, setPostList] = useState(null);
//   // const [list, setList] = useState(null);
//   const [newPost, setNewPost] = useState("");
//   const [replyId, setReplyId] = useState();

//   const { user } = useAuthContext();
//   const { forumList, dispatch } = useForumContext();
//   const { postLists, dispatch: userPostDispatch } = useUserPostsContext();

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await axios("api/post/getPosts", {
//         headers: {
//           Authorization: `Bearer ${user}`,
//         },
//       });
//       const json = await response.data;

//       if (response.status === 200) {
//         setPostList(json);
//         const objKeyArr = Object.keys(json["postsObj"]).map(
//           (objKey) => json["postsObj"][objKey]
//         );
//         // const test = objKeyArr.map()
//         // console.log(objKeyArr.map)
//         // console.log(Object.keys(objKeyArr.replies), "test");
//         // console.log("TEST: ",objKeyArr.map((post) => post.replies))
//         // console.log("TEST_2: ",objKeyArr)
//         // setList(objKeyArr);
//         if (response.status === 200) {
//           dispatch({ type: "SET_POSTS", payload: objKeyArr });
//         }
//       }
//     };

//     if (user && forumList === null) {
//       fetchPosts();
//     }
//   }, [dispatch, user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await axios.post(
//       "api/post/addPost",
//       {
//         post: newPost,
//         dateTime: new Date().toISOString(),
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${user}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const json = await response.data;

//     if (response.status === 200) {
//       dispatch({ type: "ADD_POST", payload: json["newPost"] });

//       if (postLists !== null) {
//         userPostDispatch({ type: "ADD_POST", payload: json["newPost"] });
//       }
//       setNewPost("");
//     }
//   };

//   let dayOpt = { weekday: "long" };
//   let yearOpt = { year: "numeric", month: "numeric", day: "numeric" };
//   let timeOpt = { hour: "numeric", minute: "numeric" };

//   return (
//     <div className="forum">
//       <Navbar />
//       <ForumHeaderSection />
//       {/* <h1>FORUM PAGE</h1> */}
//       <br />
//       <br />

//       {/* <div className="containerpost"> */}

//       {/* </div> */}
//       <div className="post-col">
//         <form className="login" onSubmit={handleSubmit}>
//           <div className="containerforforum">
//             <input
//               type="text"
//               id="contentforum"
//               placeholder="Post your thought"
//               value={newPost}
//               onChange={(e) => setNewPost(e.target.value)}
//             />
//             <br></br>
//             <button className="bn632-hover bn20" disabled={!newPost}>
//               Post
//             </button>
//           </div>
//         </form>
//         <br />
//         <br />

//         {/* Styling for forum feed*/}
//         <div className="bg34">
//           <h3 className="textfrmheader">
//             Forum<span id="colortext17"> Feed</span>
//           </h3>

//           <br />

//           <br />
//           {/* <div className="postfbackground"> */}

//           {forumList &&
//             forumList.map((row, index) => (
//               <div className="containerfrm">
//                 <div key={index} className="list-forum" id="forumboxbg">
//                   <div className="post-box">
//                     <div className="containerthree">
//                       <div className="divsidebyside">
//                         <img id="imground" src={imground} alt="image" />
//                       </div>
//                       <div className="divbolding1">
//                         <p className="bolding1"> {row.username}</p>
//                         <p className="bolding2"> {row.email}</p>
//                       </div>
//                     </div>
//                     <hr
//                       classname="styleline"
//                       style={{
//                         border: "0",
//                         height: "0",
//                         borderTop: "1px solid rgba(0, 0, 0, 0.1)",
//                         borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
//                       }}
//                     />
//                     <div className="textalignment">
//                       <div className="mainpost">
//                         <p className="bolding4">
//                           {entities.decodeHTML(row.post)}
//                         </p>
//                       </div>
//                       <div className="datetimes">
//                         <p className="bolding7">
//                           {new Date(row.postdatetime)
//                             .toLocaleDateString("en-MY", yearOpt)
//                             .toString()}
//                         </p>
//                         <p className="bolding8">
//                           {new Date(row.postdatetime)
//                             .toLocaleDateString("en-MY", timeOpt)
//                             .toString()
//                             .substring(12)}
//                         </p>
//                         <p className="bolding9">
//                           {new Date(row.postdatetime)
//                             .toLocaleDateString("en-MY", dayOpt)
//                             .toString()}
//                         </p>
//                       </div>
//                     </div>

//                     {/* <p className="bolding3">Date: {row.postdatetime}</p> <br /> */}

//                     {/* <div className="datetimes">
//                         <p className="bolding7">
//                           {new Date(row.postdatetime)
//                             .toLocaleDateString("en-MY", yearOpt)
//                             .toString()}
//                         </p>
//                         <p className="bolding8">
//                           {new Date(row.postdatetime)
//                             .toLocaleDateString("en-MY", timeOpt)
//                             .toString()
//                             .substring(12)}
//                         </p>
//                         <p className="bolding9">
//                           {new Date(row.postdatetime)
//                             .toLocaleDateString("en-MY", dayOpt)
//                             .toString()}
//                         </p>
//                       </div>
//                     </div> */}

//                     {/* <p>{JSON.stringify(row.replies)}</p> */}
//                     <div className="tab">
//                       <input
//                         id={"tab-" + index}
//                         type="checkbox"
//                         key={index}
//                       ></input>
//                       <label for={"tab-" + index}>List of Replies</label>
//                       {row.replies.map((reply) => (
//                         // <Reply reply={reply} />

//                         <div class="contentforumm">
//                           <Reply reply={reply} />
//                         </div>
//                       ))}
//                     </div>
//                     <ReplyForum key={row.postid} postId={row.postid} />
//                   </div>
//                   {/* {row.replies.map((reply) => (
//                   <Reply reply={reply} />
//                 ))} */}
//                 </div>
//               </div>
//             ))}
//         </div>
//         {/* <div id="post-bg2"></div> */}
//         {/* </div> */}
//       </div>
//       {/* <div class="blob-wobble1"></div>
//       <br />
//       <div class="blob-wobble2"></div> */}
//     </div>
//   );
// };

// export default ForumPage;
