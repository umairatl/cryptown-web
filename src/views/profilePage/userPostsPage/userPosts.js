import { useAuthContext } from "../../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "../../../components/axios/axios";
import Post from "../../../components/post/post";
import { useUserPostsContext } from "../../../hooks/useUserPostsContext";
import NormalDialog from "../../../components/Dialog/normalDialog";
import { useDialogContext } from "../../../hooks/useDialogContext";
import { FaUserCircle } from "react-icons/fa";

import "../../../components/post/post.css";

const entities = require("entities");

const UserPosts = () => {
  const [error, setError] = useState("");
  const [postId, setPostId] = useState("");

  const { user } = useAuthContext();
  const { postLists, dispatch } = useUserPostsContext();
  const { userPost, userPostProfile } = useDialogContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios("api/post/getUserPosts", {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        });
        const json = await response.data;

        if (response.status === 200) {
          const objKeyArr = Object.keys(json["postsObj"]).map(
            (objKey) => json["postsObj"][objKey]
          );
          dispatch({ type: "SET_POSTS", payload: objKeyArr });
        }
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    if (user && postLists === null) {
      fetchPosts();
    }
  }, [dispatch, user]);

  const onCustomClick = (_postId) => {
    setPostId(_postId);
  };

  let yearOpt = { year: "numeric", month: "numeric", day: "numeric" };
  let timeOpt = { hour: "numeric", minute: "numeric" };

  return (
    <div className="post-col">
      <h1>My Forum Post</h1>
      <div>
        <div className="post-cont">
          {postLists &&
            postLists.map((post, index) => (
              <Post onCustomClick={onCustomClick} key={index} post={post} />
            ))}

          {error && (
            <div className="error-post">
              <p>{error}</p>
            </div>
          )}

          {userPostProfile ? (
            <NormalDialog
              type="USER_POST_PROFILE"
              dialogTitle={
                <div className="wrap-outer-column">
                  <div className="top-cont-view">
                    <p>Post Details</p>
                    <p>
                      {new Date(
                        postLists.filter(
                          (post) => post["postid"] === postId
                        )[0]["postdatetime"]
                      )
                        .toLocaleDateString("en-MY", timeOpt)
                        .toString()
                        .substring(12)}
                      <span style={{ marginLeft: "1rem" }}>
                        {new Date(
                          postLists.filter(
                            (post) => post["postid"] === postId
                          )[0]["postdatetime"]
                        )
                          .toLocaleDateString("en-MY", yearOpt)
                          .toString()}
                      </span>
                    </p>
                  </div>
                  <h3>
                    {
                      postLists.filter((post) => post["postid"] === postId)[0][
                        "post"
                      ]
                    }
                  </h3>
                  <p>Replies</p>
                </div>
              }
              dialogMessage={
                postLists &&
                postId &&
                postLists
                  .filter((post) => post["postid"] === postId)[0]
                  ["replies"].map((reply, index) => (
                    <div key={index} className="list-forum-2">
                      <div className="flex-d-row space-between-jn post-box__reply">
                        <div className="flex-d-row">
                          <p style={{ marginLeft: "1rem" }}>
                            <FaUserCircle />
                          </p>
                          <p style={{ marginLeft: "1rem" }}> {reply.email} </p>
                        </div>
                        <p style={{ marginRight: "1rem" }}>
                          {new Date(reply.subpostdatetime)
                            .toLocaleDateString("en-MY", yearOpt)
                            .toString()}
                        </p>
                      </div>
                      <p style={{ marginLeft: "1rem" }}>
                        {entities.decodeHTML(reply.subpost)}
                      </p>
                    </div>
                  ))
              }
            />
          ) : null}

          {userPost ? (
            <NormalDialog
              type="USER_POST"
              dialogTitle="Delete Post"
              dialogMessage="Delete Successful"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserPosts;
