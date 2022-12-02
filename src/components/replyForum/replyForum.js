import axios from "../../components/axios/axios";
import "../../components/replyForum/replyForum.css";
import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDialogContext } from "../../hooks/useDialogContext";
import NormalDialog from "../Dialog/normalDialog";
import { useForumContext } from "../../hooks/useForumContext";


const ReplyForum = ({ forumList, setForumList, onSubmitReply, postId }) => {
  const [replyPost, setReplyPost] = useState("");
  const { user } = useAuthContext();
  const [isReply, setIsReply] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState('');
  const {
    postSuccessful,
    replyError,
    dispatch: dialogDispatch,
  } = useDialogContext();

  useEffect(()  => {
    const updateName = localStorage.getItem('username');
    if (updateName){
      setName(updateName.slice(1, -1));
    }
  }, [])

  const handleSubmitReply = (postId) => async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "api/post/addSubPost",
        {
          postId: postId,
          post: replyPost,
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
        setError("");
        const payload = forumList.map(forum => {
          if (forum.postid === postId) {
            const newReply = {
              postid: postId,
              subpost: replyPost,
              subpostdatetime: new Date().toISOString(),
              username: name
            }
            return {
              ...forum,
              replies: [...forum.replies, newReply] 
            }
          }
          return forum
        })
        setForumList(payload);
        dialogDispatch({ type: "POST_SUCCESSFUL" });
        setIsReply(false)
        onSubmitReply();
      }
    }
    
    catch (error) {
      dialogDispatch({ type: "REPLY_ERROR" });
      setError(error.response.data.error);
    }
  };


  const updateReply = () => {
    setIsReply(true);
  };

  return (
    <div>
      <div>
        { !isReply ?
        <button className="bn633-hover bn201" onClick={updateReply}>
          Reply
        </button> : null
        }
      </div>
      {isReply ? (
        <form className="login" onSubmit={handleSubmitReply(postId)}>
          <input
            id="replyforumid"
            type="text"
            placeholder="Post your thought"
            value={replyPost}
            onChange={(e) => setReplyPost(e.target.value)}
          />
          <br></br>
          <div className="spacing29">
            <button id="posting">Post</button>&nbsp;
            <button id="cancelling" onClick={() => setIsReply(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : null}

       {replyError && error ? (
         <NormalDialog
           type="REPLY_ERROR"
           dialogTitle="Failed to Add Post"
           dialogMessage={error}
         />
       ) : null}


          {postSuccessful ? (
            <NormalDialog
              type="POST_SUCCESSFUL"
              dialogTitle="Post Successful"
              dialogMessage="Thank you for joining the talk"
            />
          ) : null}

    </div>
  );
};

export default ReplyForum;
