import React from "react";
import { useEffect, useState } from "react";
import "./coin.css";
import axios from "../../components/axios/axios";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from "react-router-dom";
import { Pagination } from '@mui/material';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useAuthContext } from '../../hooks/useAuthContext';
import Navbar from "../../components/navbar/navbar";
import Intro from '../../components/homeBanner/intro';
import Footer from '../../components/footer/footer'
import RollingSection from "./rollingcoin";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useWatchListContexts } from "../../hooks/useWatchListContext";
import TrendingTable from '../../components/trending_carousel/trending_carousel'
import MarketingSection from "./marketing/marketingSec";
// import { FaStar } from "react-icons/fa";


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination as pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { margin } from "@mui/system";
 

const Coin = ({}) => {

  const [crypto, setCrypto] = useState(null);
  const [search, setSearch] = useState("");
  const [tren, setTren] = useState(null);
  const navigation = useNavigate();
  const [page, setPage] = useState(1);

  const [watchList, setWatchList] = useState({});
  const [error, setError] = useState(null);

  const { watchLists: watchListContext, dispatch } = useWatchListContexts()
  const { user } = useAuthContext()


  useEffect(() => {
    const fetchWatchLists = async () => {
    const response = await axios('api/favourite/favourite-list',
    {
        headers: {
            'Authorization': `Bearer ${user}`,
        }
    })
      const json = await response.data;

      if (response.status === 200) {
        // setWatchLists(json.favourites);
        dispatch({type:"SET_WATCHLIST", payload: json.favourites})

      }
    };

    if (user) {
        fetchWatchLists();
    }
  }, [dispatch, user]);

  useEffect(() => {
    const fetchCrypto = async () => {
      const response = await axios('api/crypto/cryptoList'
      );
      const json = await response.data;

      if (response.status === 200) {
        setCrypto(json);
      }
    };

    const fetchCryptoTren = async () => {
      const response = await axios('api/crypto/cryptoTrending'
      );
      const json = await response.data;

      if (response.status === 200) {
        setTren(json);
      }
    };
    fetchCrypto();
    fetchCryptoTren();
  }, []);

  const cryptoFilter = (cryptoList) => {
    return cryptoList.filter(
      (f) =>
        f.name.toLowerCase().includes(search) ||
        f.symbol.toLowerCase().includes(search) ||
        f.cryptoId.toLowerCase().includes(search)
    );
  };

  const addToWatchlist = async (cryptoId, coinName, image_url) => {

    if (!user) {
      setError("Please log in to use this feature")
      return 
    }

    const response = await axios.post('api/favourite/favourite-add',
    {
      "cryptoId": cryptoId,
      "coinName": coinName,
      "image_url": image_url
    },
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user}`,
        }
    })

    const json = await response.data

    if (response.status === 200){
        setWatchList((prev) => ({ ...prev, ...json }))
        console.log("ADD: ",json["newFavourite"])
        dispatch({type:"ADD_WATCHLIST", payload: json["newFavourite"]})
    }
  }

  const handleWatchLists = async (cryptoId, coinName, image_url) => {
    // e.stopProawaitpagation()
    // console.log(cryptoId)
    try {
      await addToWatchlist(cryptoId, coinName, image_url)
      setError(null)
      // console.log("watch list", watchList)
      alert(`${watchList["mssg"]}`)
    } catch (error) {
      console.log(error)
      setError(error.response.data.error) 
      alert(error.response.data.error)
    }
  }

const handleDragStart = (e) => e.preventDefault();
const items = [];

const SLIDE_INFO = [];
  const items1 = tren && tren.cryptoTrending.map((res) => {
  const obj = {
    img : res.image,
    coinName : res.name,
    symbol: res.symbol
  }
  SLIDE_INFO.push(obj)
});




// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});







  function createSlide(crypto) {
    return (
      <SwiperSlide key={crypto.cryptoId}>
        <img className="img" src={crypto.image} alt="" />
        <h1 style={{textAlign : 'center', marginBottom: '60px'}}>{crypto.name}</h1>
      </SwiperSlide>
    );
  }

  return (
    <div className="main-page">
      <Navbar />

      <Intro />

      {/* second wrapper */}

      <div className="sec-wrap">
        <h1>Cryptocurrency Prices by Market Cap</h1>
        <div className="search-col">
          <input
            className="coin-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Market Coin"
          />
           <i class="fa fa-search"></i>
        </div>

        <div className="set-coinList">
        <TableContainer component={Paper}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Ranking</TableCell>
              {/* <TableCell sx={{width: '0px'}}></TableCell> */}
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Market Cap</TableCell>
              {user && <TableCell align="right">Add to Watchlist</TableCell>}
            </TableRow>
           </TableHead>

        <TableBody>
        {  crypto && search === ''?
            crypto.cryptoList
            .slice((page - 1) * 10, (page - 1) * 10 + 10)
            .map((data) => {
              // const marketCap = data.market_cap_rank > 0;
              return (
                <TableRow key={data.name} style={{cursor:'pointer'}} onClick={() => {
                  navigation(`/coinDetail/${data.cryptoId}`);
                }}>
                    <TableCell sx={{width: '100px', textAlign: 'center'}}>{data.market_cap_rank}</TableCell>
                      {/* <TableCell>
                        <img src={data.image} width='45px'></img>
                      </TableCell> */}
                    <TableCell>
                   <div className="name-col"> <img src={data.image} width='45px'></img> <span> {data.name} </span> </div>
                        </TableCell>
                    <TableCell>{formatter.format(data.current_price)}
                      </TableCell>
                    <TableCell>{formatter.format(data.market_cap)} </TableCell>
                    {user && <TableCell align="right">
                      <button className="btn-coin" onClick={async (e) => {e.stopPropagation(); 
                        await handleWatchLists(data.cryptoId, data.name, data.image)}}>add</button>
                             </TableCell>}
                </TableRow>
                )
            }
            )

            :
            crypto && cryptoFilter(crypto.cryptoList).map((crypto) => {
                return(
                  <TableRow key={crypto.name} style={{cursor:'pointer'}} onClick={() => {
                    navigation(`/coinDetail/${crypto.cryptoId}`);
                  }}>
                      <TableCell sx={{width: '100px', textAlign: 'center'}}> {crypto.market_cap_rank}</TableCell>
                        {/* <TableCell>
                          <img src={crypto.image} width='40px'></img>
                        </TableCell> */}
                      <TableCell>
                      <div className="name-col"> <img src={crypto.image} width='45px'></img> <span> {crypto.name} </span> </div>
                          </TableCell>
                      <TableCell>{formatter.format(crypto.current_price)}</TableCell>
                      <TableCell >{formatter.format(crypto.market_cap)}</TableCell>
                      {user && <TableCell align="right">
                        <button className="btn-coin" onClick={async (e) => {e.stopPropagation(); 
                          await handleWatchLists(crypto.cryptoId, crypto.name, crypto.image)}}>Like</button>
                      </TableCell>}
                    {/* </Link> */}
                  </TableRow>
                )
              })
            }
        </TableBody>
      </Table>
    </TableContainer>

      <Pagination
                count={(crypto?.cryptoList.length / 10).toFixed(0)}
                style={{
                  padding: 20,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
                onChange={(_, value) => {
                  setPage(value);
                  window.scroll(0, 450);
                }}
              />
        </div>

        </div>
      


<div className="sec-wrap">
      {/* <div className="set-coinList"> */}
        <h1> Trending Coins</h1>
        <TrendingTable trending={SLIDE_INFO} />
      {/* <SlideShow trending= {SLIDE_INFO} /> */}
      {/* </div> */}


      </div>
      <div className="carousel-2">

      <Swiper
      modules={[Navigation, pagination, Autoplay]}
      slidesPerView={3}
      spaceBetween={165}
      navigation
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      centeredSlides={false}
      centerInsufficientSlides={true}
      pagination={{ clickable: true }}
    >
    <div className="trend-car">
    {tren && tren["cryptoTrending"].map(crypto => createSlide(crypto))}</div>
    </Swiper>
    </div>

      <MarketingSection/>
      <Footer />
    </div>
  );
};

export default Coin;
