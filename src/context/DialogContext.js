import { createContext, useReducer } from "react";

export const DialogContext = createContext();
export const dialogReducer = (state, action) => {
  switch (action.type) {
    case "USER_POST":
      return { user_post: !state.user_post };
    default:
      return state;
  }
};

export const DialogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dialogReducer, {
    user_post: false,
  });

  return (
    <DialogContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DialogContext.Provider>
  );
};
