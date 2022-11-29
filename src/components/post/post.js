import Reply from "../../components/replies/replies";
import axios from "../../components/axios/axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from "react";
import { useForumContext } from "../../hooks/useForumContext";
import { useUserPostsContext } from "../../hooks/useUserPostsContext";
import { useDialogContext } from "../../hooks/useDialogContext";
import "../post/post.css";
import ConditionalDialog from "../Dialog/conditionalDialog";
import NormalDialog from "../Dialog/normalDialog";
import { FaUserCircle } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

const entities = require("entities");

const Post = ({ onCustomClick, post }) => {
  const [postId, setPostId] = useState("");
  const [postDelete, setPostDelete] = useState({});
  const [error, setError] = useState(null);
  const { forumList, dispatch } = useForumContext();
  const { dispatch: userPostsDispatch } = useUserPostsContext();
  const {
    userPost,
    userPostProfile,
    dispatch: dialogDispatch,
  } = useDialogContext();
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);

  const { user } = useAuthContext();

  const deletePost = async (postId) => {
    if (!user) {
      return;
    }

    const response = await axios.delete("api/post/post-delete", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
      data: {
        postId: postId,
      },
    });

    const json = await response.data;

    if (response.status === 200 && forumList !== null) {
      setPostDelete(json);
      dispatch({ type: "DELETE_POST", payload: json.deletedPostId });
      userPostsDispatch({ type: "DELETE_POST", payload: json.deletedPostId });
    }
  };

  useEffect(() => {
    const updateName = localStorage.getItem("username");
    if (updateName) {
      setName(updateName.slice(1, -1));
    }
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setError(null);
      dialogDispatch({ type: "USER_POST" });
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };
  let dayOpt = { weekday: "long" };
  let yearOpt = { year: "numeric", month: "numeric", day: "numeric" };
  let timeOpt = { hour: "numeric", minute: "numeric" };

  // return (
  //   <div key={post.postId} className="list-forum">
  //     <div className="post-box">
  //       <p>{post.email}</p>
  //       <p>{post.username}</p>
  //       <p className="bolding3">
  //         {new Date(post.postdatetime)
  //           .toLocaleDateString("en-MY", yearOpt)
  //           .toString()}
  //       </p>
  //       <p className="bolding3">
  //         {new Date(post.postdatetime)
  //           .toLocaleDateString("en-MY", timeOpt)
  //           .toString()
  //           .substring(12)}
  //       </p>
  //       <p className="bolding3">
  //         {new Date(post.postdatetime)
  //           .toLocaleDateString("en-MY", dayOpt)
  //           .toString()}
  //       </p>
  //       <p>{entities.decodeHTML(post.post)}</p>
  //       {/* <button onClick={() => handleDeletePost(post.postid)}>Delete</button> */}
  //       <ConditionalDialog
  //         handleSubmit={() => handleDeletePost(post.postid)}
  //         dialogButton="Delete"
  //         dialogTitle="Delete Post"
  //         dialogMessage="Do you want to delete your post."
  //       />
  // let dayOpt = { weekday: 'long' }
  // let yearOpt = { year: 'numeric', month: 'numeric', day: 'numeric' }
  // let timeOpt = { hour: 'numeric', minute: 'numeric' }

  // // post.email

  // const handlePostClick = (postId) => {
  //   dialogDispatch({type: "USER_POST_PROFILE"})
  //   setPostId(postId)
  //   setShow(true)
  // }

  return (
    <div
      onClick={() => onCustomClick(post.postid)}
      key={post.postId}
      className="list-forum-1"
    >
      {/* <div className="wrap-post-user"> */}
      <div className="profile-post">
        <div
          onClick={() => {
            handlePostClick(post.postid);
          }}
          className="post-box"
        >
          <p>
            <FaUserCircle /> {name}
          </p>
          {/* <p>{new Date(post.postdatetime).toLocaleDateString("en-MY", yearOpt).toString()}</p>
              <p>{new Date(post.postdatetime).toLocaleDateString("en-MY", timeOpt).toString().substring(12)}</p>
              <p>{new Date(post.postdatetime).toLocaleDateString("en-MY", dayOpt).toString()}</p> */}
          {/* <button onClick={() => handleDeletePost(post.postid)}>Delete</button> */}

          <ConditionalDialog
            handleSubmit={() => handleDeletePost(post.postid)}
            dialogButton="Delete"
            dialogTitle="Delete Post"
            dialogMessage="Do you want to delete your post."
          />
        </div>
        <h2>{entities.decodeHTML(post.post)}</h2>
      </div>

      {/* { userPostProfile && show === true ? <div>
        
        <NormalDialog type="USER_POST_PROFILE"
        dialogTitle= {(
        <div className="top-cont-view"> 
          <p>View post</p>
          <p>{new Date(post.postdatetime).toLocaleDateString("en-MY", timeOpt).toString().substring(12)} {new Date(post.postdatetime).toLocaleDateString("en-MY", yearOpt).toString()}</p>
        </div>)} 
        
        dialogMessage={(
          <div className="view-post-cont">
           <h1>{post.post}</h1>
           {post.replies.map((res) => {(
            <div>
      <p>{ entities.decodeHTML(res.subpost)}</p>
              </div>
           )})}
            </div> )}
        /></div> : null } */}
    </div>
  );
};

export default Post;
