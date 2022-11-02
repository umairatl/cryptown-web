<<<<<<< HEAD
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [crypto, setCrypto] = useState(null);

  useEffect(() => {
    const fetchCrypto = async () => {
      const response = await axios("http://localhost:6000/cryptown/api");
      const json = await response.data;

      if (response.status === 200) {
        setCrypto(json);
      }
    };
    fetchCrypto();
  }, []);

  return (
    <div>
      <h2> hello {crypto && <div>{crypto.mssg}</div>}</h2>
    </div>
=======
import React, { useState  } from 'react';
import './App.css';
import { BrowserRouter,Routes, Route} from "react-router-dom";
import { Navbar } from './components/navbar/navbar';
// import Login from './views/login/login';
import FavPage from './views/favouritePage/fav';
import CryptoList from './views/cryptoList/crypto';
import AppList from './views/appList/appList';
import Forum from './views/forumPage/forum';
import NewsPage from './views/news/news';
import Profile from './views/profilePage/profile';


function App() {
  // const [token, setToken] =  useState();


  // if(!token){
  //   return <Login setToken={setToken} />
  // }

  return (
    <BrowserRouter>
      <div className='App'>
      <Navbar />       
          <Routes>
            <Route path="/fav" element = { <FavPage />}>
            </Route>
            <Route path="/cryptoList" element = { <CryptoList />}>
            </Route> 
            <Route path="/forum" element = { <Forum />}>
            </Route>
            <Route path="/appList" element = { <AppList />}>
            </Route>
            <Route path="/news" element = { <NewsPage />}>
            </Route>
            <Route path="/profile" element = { <Profile />}>
            </Route>
          </Routes>
      </div>
    </BrowserRouter>
>>>>>>> 02f92008eaa5478486ebd120846ceef27ff4b14e
  );
}

export default App;
