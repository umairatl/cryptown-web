import axios from "../../components/axios/axios";
import "../../components/replyForum/replyForum.css";
import React from "react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const ReplyForum = ({ postId }) => {
  const [replyPost, setReplyPost] = useState("");
  const { user } = useAuthContext();
  const [isReply, setIsReply] = useState(false);

  const handleSubmitReply = (postId) => async (e) => {
    console.log(postId, "postId");
    console.log(replyPost, "reply");

    e.preventDefault();
    console.log(postId);
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
      // alert("What is happening");
      window.location = "/forum";
    }
  };

  const updateReply = () => {
    // console.log(id)
    setIsReply(true);
    // setReplyId(id)
  };

  return (
    <div>
      {/* {!isReply ? (
        <button className="bn633-hover bn201" onClick={updateReply}>
          Reply
        </button>
      ) : null} */}
      <div className="sectionforreply">
        <button className="bn633-hover bn201" onClick={updateReply}>
          Reply
        </button>
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
    </div>
  );
};

export default ReplyForum;
