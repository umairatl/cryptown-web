import axios from "../../components/axios/axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from "react";
import { useForumContext } from "../../hooks/useForumContext";
import { useUserPostsContext } from "../../hooks/useUserPostsContext";
import { useDialogContext } from "../../hooks/useDialogContext";
import "../post/post.css";
import ConditionalDialog from "../Dialog/conditionalDialog";
import { FaUserCircle } from "react-icons/fa";

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

    if (response.status === 200) {
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
      setError(error.response.data.error);
    }
  };

  const handlePostClick = (postId) => {
    dialogDispatch({ type: "USER_POST_PROFILE" });
    setPostId(postId);
    setShow(true);
  };

  return (
    <div
      onClick={() => onCustomClick(post.postid)}
      key={post.postId}
      className="list-forum-1">
      <div className="profile-post">
        <div
          onClick={() => {
            handlePostClick(post.postid);
          }}
          className="post-box__user">
          <p>
            <FaUserCircle /> {name}
          </p>

          <ConditionalDialog
            handleSubmit={() => handleDeletePost(post.postid)}
            dialogButton="Delete"
            dialogTitle="Delete Post"
            dialogMessage="Do you want to delete your post."
          />
        </div>
        <h2>{entities.decodeHTML(post.post)}</h2>
      </div>
    </div>
  );
};

export default Post;
