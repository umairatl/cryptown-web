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
import Navbar from "../../components/navbar/navbar";
import Intro from '../../components/homeBanner/intro';
import Footer from '../../components/footer/footer';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const Coin = ({}) => {
  const [crypto, setCrypto] = useState(null);
  const [search, setSearch] = useState("");
  const [tren, setTren] = useState(null);
  const navigation = useNavigate();
  const [page, setPage] = useState(1);

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

  const cryptoFilter = () => {
    return crypto?.cryptoList.filter(
      (f) =>
        f.name.toLowerCase().includes(search) ||
        f.symbol.toLowerCase().includes(search) ||
        f.cryptoId.toLowerCase().includes(search)
    );
  };

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
            </TableRow>
           </TableHead>

        <TableBody>
        {crypto &&
            cryptoFilter()
            .slice((page - 1) * 10, (page - 1) * 10 + 10)
            .map((data) => {
              // const marketCap = data.market_cap_rank > 0;
              return (
                <TableRow key={data.name} style={{cursor:'pointer'}} 
                onClick={() => {
                  navigation(`/coinDetail/${data.cryptoId}`);
                }}
                >
                    <TableCell>{data.market_cap_rank}</TableCell>
                      <TableCell>
                        <img src={data.image} width='40px'></img>
                      </TableCell>
                    <TableCell>
                        {data.name}
                        </TableCell>
                    <TableCell>${data.current_price}</TableCell>
                    <TableCell>{data.market_cap} </TableCell>
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
