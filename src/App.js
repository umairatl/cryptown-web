import React, { useState  } from 'react';
import './App.css';
import { BrowserRouter,Routes, Route} from "react-router-dom";
import Signup from './views/signupPage/signup'
import FavPage from './views/favouritePage/fav';
import CryptoList from './views/cryptoList/coin';
import AppList from './views/appList/appList';
import Forum from './views/forumPage/forum';
import NewsPage from './views/news/news';
import Profile from './views/profilePage/profile';
import CoinDetail from './views/coinDetail/coinDetail';
import Login from './views/loginPage/login';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import NotFound from './components/notFound/notFound';


function App() {
  const { user } = useAuthContext()

  return (
    <BrowserRouter>
      <div className='App'>
          <Routes>
            <Route path="/" element = { <CryptoList />}>
            </Route> 
            <Route path="/coinDetail/:id" element = { <CoinDetail />}>
            </Route> 
            <Route path="/forum" element = { user ? <Forum /> : <Navigate to="/login" />}>
            </Route>
            <Route path="/appList" element = { <AppList />}>
            </Route>
            <Route path="/news" element = { <NewsPage />}>
            </Route>
            <Route path="/profile" element = { <Profile />}>
            </Route>
            <Route path="/signup" element = { <Signup />}>
            </Route>
            <Route path="/login" element = { <Login />}>
            </Route>
            <Route path="/watchlist" element = { user ? <FavPage /> : <Navigate to="/login" />}>
            </Route>
            <Route path='*' element={<NotFound />}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;