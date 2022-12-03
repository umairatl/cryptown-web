import { useAuthContext } from "./useAuthContext";
import { useWatchListContexts } from "./useWatchListContext";
import { useForumContext } from "./useForumContext";
import axios from "../components/axios/axios";
import { useState } from "react";
import { useProfileContext } from "./useProfileContext";
import { useUserPostsContext } from "./useUserPostsContext";

export const useLogout = () => {
  const [error, setError] = useState(null);

  const { user, dispatch } = useAuthContext();
  const { dispatch: watchListDispatch } = useWatchListContexts();
  const { dispatch: forumListDispatch } = useForumContext();
  const { dispatch: profileDispatch } = useProfileContext();
  const { dispatch: userPostsDispatch } = useUserPostsContext();

  const logout = async () => {
    const logoutAPI = async () => {
      try {
        const response = await axios.delete("api/user/logout", {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        });
        const json = await response.data;
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    await logoutAPI();

    // remove user from storage
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    console.log("its in");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    window.location = "/login";
    // Clearing global state when logging out
    watchListDispatch({ type: "SET_WATCHLIST", payload: null });
    forumListDispatch({ type: "SET_POSTS", payload: null });
    profileDispatch({ type: "SET_PROFILE", payload: null });
    userPostsDispatch({ type: "SET_POSTS", payload: null });
  };

  return { logout };
};
