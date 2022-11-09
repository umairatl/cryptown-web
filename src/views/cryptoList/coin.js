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
import { Carousel } from 'react-responsive-carousel';
import { Pagination } from '@mui/material';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ReactDOM from 'react-dom';
import Navbar from "../../components/navbar/navbar";
import Intro from '../../components/homeBanner/intro';
import Footer from '../../components/footer/footer'


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
    fetchCrypto();
  }, []);

  useEffect(() => {
    const fetchCryptoTren = async () => {
      const response = await axios('api/crypto/cryptoTrending'
      );
      const json = await response.data;

      if (response.status === 200) {
        setTren(json);
      }
    };
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


  return (
    <div>
      <Navbar />       
      {tren &&
        tren.cryptoTrending.map((res) => (
          <div>

               <Carousel>
                <div>
                    <img src={res.image}  />
                    <p className="legend">{res.name}</p>
                    <p className="legend">{res.symbol}</p>
                    
                </div>
               </Carousel>  
            {/* <img src={res.image} onDragStart={handleDragStart} role="presentation" />, */}
            {/* <img src={res.image} /> */}
            {/* <p className="legend">{res.name} </p>
            <p className="legend">{res.symbol} </p>
            <p className="legend">{res.cryptoId} </p> */}
            {/* <AliceCarousel mouseTracking items={items} /> */}
          </div>
        ))}
    <div className="coin-app">
      <div className="coinsearchFilter-search">
        <h1 className="coin-text">Search</h1>

        <div className="search-col">
          <input
            className="coin-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
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
        {/* <h2>
          {crypto &&
            cryptoFilter(search).map((data) => (
              <Link to={`/coinDetail/${data.cryptoId}`}>


              <div className="coin-container">
                <div className="coin-row">
                  <div className="coin">
                    <img src={data.image} alt="" />
                    <h1>{data.name}</h1>
                    <p className="coin-symbol">{data.symbol}</p>
                  </div>
                  <div className="coin-data">
                    <p className="coin-price">${data.current_price}</p>
                    <p className="market-cap-rank">{data.market_cap_rank}</p>
                    <p className="coin-marketcap">
                      Mkt Cap: ${data.market_cap}
                    </p>
                  </div>
                </div>
              </div>
              </Link>
            ))}
        </h2> */}
          </div>
        </div>
      </div>
      <Intro />
      <Footer />
    </div>
  );
};

export default Coin;
