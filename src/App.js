import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/navbar";
import Signup from "./views/signupPage/signup";
// import Login from './views/login/login';
import FavPage from "./views/favouritePage/fav";
import CryptoList from "./views/cryptoList/coin";
import AppList from "./views/appList/appList";
import Forum from "./views/forumPage/forum";
import NewsPage from "./views/news/news";
import Profile from "./views/profilePage/profile";
import CoinDetail from "./views/coinDetail/coinDetail";
import Footer from "./components/footer/footer";

function App() {
  // const [token, setToken] =  useState();

  // if(!token){
  //   return <Login setToken={setToken} />
  // }

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/fav" element={<FavPage />}></Route>
          <Route path="/" element={<CryptoList />}></Route>
          <Route path="/coinDetail/:id" element={<CoinDetail />}></Route>
          <Route path="/forum" element={<Forum />}></Route>
          <Route path="/appList" element={<AppList />}></Route>
          <Route path="/news" element={<NewsPage />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </div>
       <Footer /> 
    </BrowserRouter>
  );
}

export default App;
