import { createContext, useReducer } from "react";

export const UserPostsContext = createContext();

export const userPostsReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        postLists: action.payload,
      };
    case "ADD_POST":
      return {
        postLists: [action.payload, ...state.postLists],
      };
    case "DELETE_POST":
      return {
        postLists: state.postLists.filter((postList) => postList["postid"] !== action.payload["postid"])
      };
    default:
      return state;
  }
};

export const UserPostsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userPostsReducer, {
    postLists: null,
  });

  return (
    <UserPostsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserPostsContext.Provider>
  );
};
