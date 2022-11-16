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
import Footer from '../../components/footer/footer';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useWatchListContexts } from "../../hooks/useWatchListContext";

const Coin = ({}) => {
  const [crypto, setCrypto] = useState(null);
  const [search, setSearch] = useState("");
  const [tren, setTren] = useState(null);
  const navigation = useNavigate();
  const [page, setPage] = useState(1);

  const [watchList, setWatchList] = useState({});
  const [error, setError] = useState(null);

  const { watchList: watchListContext, dispatch } = useWatchListContexts()
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
    // console.log(watchListContext)
  }, []);

  const cryptoFilter = () => {
    return crypto?.cryptoList.filter(
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

const items1 = tren && tren.cryptoTrending.map((res) => 
items.push(
    <img src={res.image} onDragStart={handleDragStart} role="presentation" />,
  ));


  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];

  // tren && tren.cryptoTrending.map ((res)=> <div>
  //     <img src={res.image} />
  //     <button className="legend" onClick={() => {
  //   navigation(`/coinDetail/${res.cryptoId}`);
  // }}>{res.symbol}</button>
  // </div>)

// 
  
  const trends =  tren && tren.cryptoTrending.map ((res)=> <div>
      <img src={res.image} />
      <button className="legend" onClick={() => {
    navigation(`/coinDetail/${res.cryptoId}`);
  }}>{res.symbol}</button>
  </div>)

  return (
    <div className="main-page">

      <Navbar /> 
      
      {/* first wrapper*/}
      <div className="carousel-col">
      <AliceCarousel mouseTracking items={items} breakPoints={breakPoints}/>

    </div>

      {/* second wrapper */}
      <div className="sec-wrap">
        <div className="search-col">
          <input
            className="coin-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Coin"
          />
        </div>

        <div className="set-coinList">
        <TableContainer component={Paper}>
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Ranking</TableCell>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Market Cap</TableCell>
              {user && <TableCell>Add to Watchlist</TableCell>}
            </TableRow>
           </TableHead>

        <TableBody>
        {crypto &&
            cryptoFilter()
            .slice((page - 1) * 10, (page - 1) * 10 + 10)
            .map((data) => {
              // const marketCap = data.market_cap_rank > 0;
              return (
                <TableRow key={data.name} style={{cursor:'pointer'}} onClick={() => {
                  navigation(`/coinDetail/${data.cryptoId}`);
                }}>
                    <TableCell>{data.market_cap_rank}</TableCell>
                      <TableCell>
                        <img src={data.image} width='40px'></img>
                      </TableCell>
                    <TableCell>
                        {data.name}
                        </TableCell>
                    <TableCell>${data.current_price}</TableCell>
                    <TableCell>{data.market_cap} </TableCell>
                    {user && <TableCell>
                                <button onClick={async (e) => {e.stopPropagation(); await handleWatchLists(data.cryptoId, data.name, data.image)}}>{data.cryptoId}</button>
                             </TableCell>}
                  {/* </Link> */}
                </TableRow>
                )
            }
            )}
        </TableBody>
      </Table>
    </TableContainer>

      <Pagination
                count={(cryptoFilter()?.length / 10).toFixed(0)}
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
      <Intro />
      <Footer />
    </div>
  );
};

export default Coin;
