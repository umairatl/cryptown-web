import React from "react";
import { useEffect, useState } from "react";
import "./Coin.css";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import usePagination from "@mui/material/usePagination";

const Coin = ({}) => {
  const [crypto, setCrypto] = useState(null);
  const [tren, setTren] = useState(null);
  const [search, setSearch] = useState("");
  let arr = [];

  useEffect(() => {
    const fetchCrypto = async () => {
      const response = await axios(
        "https://localhost:8443/api/crypto/cryptoList"
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
        "https://localhost:8443/api/crypto/cryptoTrending"
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

  const handleDragStart = (e) => e.preventDefault();

  // const items = [
  //   {tren &&
  //       tren.cryptoTrending.map((res) => (
  //         <img src={res.image}/>
  //     )),
  //   }
  // <img
  //   src={tren.cryptoTrending.image}
  //   onDragStart={handleDragStart}
  //   role="presentation"
  // />,
  // <img src={res.image} onDragStart={handleDragStart} role="presentation" />,
  // <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
  // ];

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
          <h1 className="coin-text">Search</h1>
          <form>
            <input
              className="coin-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
            />
          </form>
          <h2>
            {crypto &&
              cryptoFilter(search).map((data) => (
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
              ))}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Coin;
