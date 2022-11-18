import { createContext, useReducer } from "react";

export const ForumContext = createContext();

export const forumReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      return {
        forumList: action.payload,
      };
    case "ADD_POST":
      return {
        forumList: [action.payload, ...state.forumList],
      };
    case "ADD_REPLY_POST":
      return {
        forumList: [action.payload, ...state.forumList],
      };
    default:
      return state;
  }
};

export const ForumContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(forumReducer, {
    forumList: null,
  });

  return (
    <ForumContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ForumContext.Provider>
  );
};
