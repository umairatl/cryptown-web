import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import { AuthContextProvider } from "./context/AuthContext";
import { WatchListContextsProvider } from "./context/WatchListContext";
import { ForumContextProvider } from "./context/ForumContext";
import { UserPostsProvider } from "./context/UserPostContext";
import { ProfileContextProvider } from "./context/ProfileContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WatchListContextsProvider>
        <ForumContextProvider>
          <UserPostsProvider>
            <ProfileContextProvider>
              <App />
            </ProfileContextProvider>
          </UserPostsProvider>
        </ForumContextProvider>
      </WatchListContextsProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
