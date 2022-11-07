import React from "react";
import { useEffect, useState } from "react";
import "./coin.css";
import axios from "axios";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from "react-router-dom";


const Coin = ({}) => {
  const [crypto, setCrypto] = useState(null);
  const [search, setSearch] = useState("");
  const [tren, setTren] = useState(null);
    const navigation = useNavigate();
  let arr = [];

  useEffect(() => {
    const fetchCrypto = async () => {
      const response = await axios(
        "http://localhost:5000/api/crypto/cryptoList"
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
      const response = await axios(
        "http://localhost:5000/api/crypto/cryptoTrending"
      );
      const json = await response.data;

      if (response.status === 200) {
        setTren(json);
      }
    };
    fetchCryptoTren();
  }, []);

  const cryptoFilter = (e) => {
    return crypto?.cryptoList.filter(
      (f) =>
        f.name.toLowerCase().includes(e) ||
        f.symbol.toLowerCase().includes(e) ||
        f.cryptoId.toLowerCase().includes(e)
    );
  };

  return (
    <div>
      {tren &&
        tren.cryptoTrending.map((res) => (
          <div>
            <img src={res.image} />
            <p className="legend">{res.name} </p>
            <p className="legend">{res.symbol} </p>
            <p className="legend">{res.cryptoId} </p>
            {/* <AliceCarousel mouseTracking items={items} /> */}
          </div>
        ))}
    <div className="coin-app">
      <div className="coinsearchFilter-search">
        <h1 className="coin-text">Search CI/CD 2</h1>

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
            cryptoFilter(search).map((data) => (
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
                <TableCell>{data.market_cap} / 10</TableCell>
              {/* </Link> */}

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

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
    </div>
  );
};

export default Coin;
