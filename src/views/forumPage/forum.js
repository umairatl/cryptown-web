import { useEffect, useState } from "react";
import axios from "../../components/axios/axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/navbar/navbar";
import "../forumPage/forum.css";
import ReplyForum from "../../components/replyForum/replyForum";
import Reply from "../../components/replies/replies";
import { useForumContext } from "../../hooks/useForumContext";
import { useUserPostsContext } from "../../hooks/useUserPostsContext";
import Footer from "../../components/footer/footer";
import { FaUserCircle } from "react-icons/fa";
import { Pagination } from "@mui/material";
import { useDialogContext } from "../../hooks/useDialogContext";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NormalDialog from "../../components/Dialog/normalDialog";
import { FaArrowRight } from "react-icons/fa";
import ForumHeaderSection from "../../components/forumHeader/forumHeader";

const entities = require("entities");

const ForumPage = () => {
  const [postList, setPostList] = useState(null);
  const [newPost, setNewPost] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuthContext();
  const { forumList, dispatch } = useForumContext();
  const { postLists, dispatch: userPostDispatch } = useUserPostsContext();
  const { replyError, dispatch: dialogDispatch } = useDialogContext();
  const { postSuccessful, dispatch: dialogSuccessDispatch } =
    useDialogContext();
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    if (user && forumList === null) {
      fetchPosts();
    }
  }, [dispatch, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
        dialogSuccessDispatch({ type: "POST_SUCCESSFUL" });

        if (postLists !== null) {
          userPostDispatch({ type: "ADD_POST", payload: json["newPost"] });
        }
        setNewPost("");
      }
    } catch (error) {
      dialogDispatch({ type: "REPLY_ERROR" });
      setError(error.response.data.error);
    }
  };
  let dayOpt = { weekday: "long" };
  let yearOpt = { month: "short", day: "numeric" };
  let timeOpt = { hour: "numeric", minute: "numeric" };

  return (
    <div className="tagging">
      <div className="forum">
        <Navbar />
        <ForumHeaderSection />
        <div className="post-col">
          <div className="cont-top-forum-1">
            <h3
              className="textfrmheader"
              data-aos="fade-down"
              data-aos-duration="3000">
              Join our communities and
              <span id="colortext17"> share your thoughts</span>
            </h3>
            <form
              className="forum-post"
              onSubmit={handleSubmit}
              data-aos="fade-up"
              data-aos-duration="3000">
              <div className="containerforforum">
                <textarea
                  id="contentforum"
                  placeholder="Post your thought"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <p>* Note: The post box are stretchable *</p>
                <br></br>
                <button className="bn632-hover bn20" disabled={!newPost}>
                  Post
                </button>
              </div>
            </form>
          </div>

          {replyError && error ? (
            <NormalDialog
              type="REPLY_ERROR"
              dialogTitle="Failed to Add Post"
              dialogMessage={error}
            />
          ) : null}

          {/* Forum feeds*/}
          <div data-aos="fade-down" data-aos-duration="3000">
            <h3
              className="exlistsecheader"
              data-aos="fade-down"
              data-aos-duration="3000">
              Cryptown <span id="colortextnine">Forum Feed</span>
            </h3>

            {forumList?.length ? (
              <Pagination
                className="pagination-cont"
                count={Math.ceil(forumList.length / 10)}
                style={{
                  padding: 20,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
                onChange={(_, value) => {
                  setPage(value);
                }}
              />
            ) : null}

            {forumList &&
              forumList
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row, index) => (
                  <div className="list-forum-2 cont-wrap-forum" key={index}>
                    <div className="flex-d-row space-between-jn post-box__reply">
                      <div className="flex-d-row">
                        <p style={{ marginLeft: "1rem" }}>
                          <FaUserCircle /> {row.username}
                        </p>
                      </div>
                      <div className="flex-d-row">
                        <p style={{ marginRight: "1rem" }}>
                          {new Date(row.postdatetime)
                            .toLocaleDateString("en-MY", dayOpt)
                            .toString()}
                        </p>

                        <p style={{ marginRight: "1rem" }}>
                          {new Date(row.postdatetime)
                            .toLocaleDateString("en-MY", timeOpt)
                            .toString()
                            .substring(12)}
                        </p>

                        <p style={{ marginRight: "1rem" }}>
                          {new Date(row.postdatetime)
                            .toLocaleDateString("en-MY", yearOpt)
                            .toString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h2
                        style={{
                          marginLeft: "2rem",
                          marginRight: "2rem",
                          textAlign: "left",
                          fontFamily: "Roleway",
                        }}>
                        {entities.decodeHTML(row.post)}
                      </h2>
                    </div>

                    {row.replies.length !== 0 ? (
                      <div className="replies-section">
                        <Accordion
                          sx={{ background: "#0D1550", color: "white" }}>
                          <AccordionSummary
                            expandIcon={
                              <ExpandMoreIcon sx={{ color: "white" }} />
                            }
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography>
                              <FaArrowRight className="arrow-reply" />
                              View Replies
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography component={"span"}>
                              {row.replies.map((reply, index) => (
                                <Reply key={index} reply={reply} />
                              ))}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    ) : null}
                    <ReplyForum
                      forumList={forumList}
                      setForumList={(payload) =>
                        dispatch({
                          type: "SET_POSTS",
                          payload,
                        })
                      }
                      key={row.postid}
                      postId={row.postid}
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForumPage;
