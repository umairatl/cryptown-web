import Reply from "../../components/replies/replies";
import axios from "../../components/axios/axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import { useForumContext } from "../../hooks/useForumContext";
import { useUserPostsContext } from "../../hooks/useUserPostsContext";
import { useDialogContext } from "../../hooks/useDialogContext";
import '../post/post.css';


const entities = require("entities");

const Post = ({ post }) => {
  const [postDelete, setPostDelete] = useState({});
  const [error, setError] = useState(null);

  const { forumList, dispatch } = useForumContext();
  const { dispatch: userPostsDispatch } = useUserPostsContext();
  const { userPost, dispatch: dialogDispatch } = useDialogContext();

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

  // console.log(post, "posttt")

  return (
    <div key={post.postId} className="list-forum-1">
      <div className="wrap-post-user">
      <div className="profile-post">

        <p>{post.email}</p>
        {/* <ConditionalDialog
          handleSubmit={() => handleDeletePost(post.postid)}
          dialogButton="Delete"
          dialogTitle="Delete Post"
          dialogMessage="Do you want to delete your post."
        /> */}
        <p>{entities.decodeHTML(post.postdatetime)}</p>
      <p>delet</p>
      </div>
      <p>{entities.decodeHTML(post.post)}</p>
      {/* {post.replies.map((reply) => (
        <Reply reply={reply} />
        ))} */}
    </div>
    </div>
  );
};

export default Post;
