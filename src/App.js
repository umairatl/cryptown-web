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
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import NotFound from './components/notFound/notFound';
import AuthLayout from './components/authLayout/authLayout';
import MainLandingPage from './views/landingpage/mainlanding-page'
import RedirectBack from './components/utils/redirectBack';

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <div className='App'>
          <Routes>
            <Route path="/" element = { <MainLandingPage />}>
            </Route> 
            <Route path="/market" element = { <CryptoList />}>
            </Route>
            <Route path="/coinDetail/:id" element = { <CoinDetail />}>
            </Route> 
            <Route path="/forum" element = { user ? <Forum /> : <Navigate to="/login?redirect=/forum" />}>
            </Route>
            <Route path="/appList" element = { <AppList />}>
            </Route>
            <Route path="/news" element = { <NewsPage />}>
            </Route>
            <Route path="/profile" element = {user ? <Profile /> : <Navigate to="/login?redirect=/profile" />}>
            </Route>
            {/* <Route path="/signup" element = { !user ? <Signup /> :  <RedirectBack/>}>
            </Route> */}
            <Route path="/login" element = { !user ? <AuthLayout /> : <RedirectBack/>}>
            </Route>
            <Route path="/watchlist" element = { user ? <FavPage /> : <Navigate to="/login?redirect=/watchlist" />}>
            </Route>
            <Route path='*' element={<NotFound />}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;