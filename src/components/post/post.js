import Reply from "../../components/replies/replies";
import axios from "../../components/axios/axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import { useForumContext } from "../../hooks/useForumContext";
import { useUserPostsContext } from "../../hooks/useUserPostsContext";

const Post = ({ post }) => {
  const [postDelete, setPostDelete] = useState({});
  const [error, setError] = useState(null);

  const { forumList, dispatch } = useForumContext();
  const { postLists, dispatch: userPostsDispatch } = useUserPostsContext();

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
      alert(`${postDelete["mssg"]}`);
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
      alert(error.response.data.error);
    }
  };

  return (
    <div key={post.postId} className="list-forum">
      <div className="post-box">
        <p>{post.email}</p>
        <p>{post.post}</p>
        <button onClick={() => handleDeletePost(post.postid)}>Delete</button>
      </div>
      {post.replies.map((reply) => (
        <Reply reply={reply} />
      ))}
    </div>
  );
};

export default Post;
