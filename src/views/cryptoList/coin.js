import React from "react";
import { useEffect, useState } from "react";
import "./coin.css";
import axios from "../../components/axios/axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/navbar/navbar";
import Intro from "../../components/homeBanner/intro";
import Footer from "../../components/footer/footer";
import RollingSection from "./rollingcoin";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useWatchListContexts } from "../../hooks/useWatchListContext";
import { useDialogContext } from "../../hooks/useDialogContext";
import NormalDialog from "../../components/Dialog/normalDialog";

import TrendingTable from "../../components/trending_carousel/trending_carousel";
import MarketingSection from "./marketing/marketingSec";
// import { FaStar } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination as pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { margin } from "@mui/system";
import CoinListTable from "../../components/tables/CoinListTable";

const Coin = ({}) => {
  const [crypto, setCrypto] = useState(null);
  const [search, setSearch] = useState("");
  const [popular, setPopular] = useState("");
  const [tren, setTren] = useState(null);
  const navigation = useNavigate();
  const [page, setPage] = useState(1);

  const [watchList, setWatchList] = useState({});
  const [error, setError] = useState(null);

  const { watchLists: watchListContext, dispatch } = useWatchListContexts();
  const { addToWatchlist: addWatchListDialog, dispatch: dialogContext } =
    useDialogContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWatchLists = async () => {
      const response = await axios("api/favourite/favourite-list", {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      const json = await response.data;

      if (response.status === 200) {
        // setWatchLists(json.favourites);
        dispatch({ type: "SET_WATCHLIST", payload: json.favourites });
      }
    };
    if (user) {
      fetchWatchLists();
    }
  }, [dispatch, user]);

  useEffect(() => {
    const fetchCrypto = async () => {
      const response = await axios("api/crypto/cryptoList");
      const json = await response.data;

      if (response.status === 200) {
        setCrypto(json);
        const takePopular = json.cryptoList.slice(0, 10);
        setPopular(takePopular);
      }
    };

    const fetchCryptoTren = async () => {
      const response = await axios("api/crypto/cryptoTrending");
      const json = await response.data;

      if (response.status === 200) {
        setTren(json);
      }
    };
    fetchCrypto();
    fetchCryptoTren();
    console.log("USER_LIST: ", user)
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
      setError("Please log in to use this feature");
      return;
    }

    const response = await axios.post(
      "api/favourite/favourite-add",
      {
        cryptoId: cryptoId,
        coinName: coinName,
        image_url: image_url,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      }
    );

    const json = await response.data;

    if (response.status === 200) {
      setWatchList((prev) => ({ ...prev, ...json }));
      console.log("ADD: ", json["newFavourite"]);
      dispatch({ type: "ADD_WATCHLIST", payload: json["newFavourite"] });
    }
  };

  const handleWatchLists = async (cryptoId, coinName, image_url) => {
    // e.stopProawaitpagation()
    // console.log(cryptoId)
    try {
      await addToWatchlist(cryptoId, coinName, image_url);
      setError(null);
      // console.log("watch list", watchList)
      dialogContext({ type: "ADD_TO_WATCHLIST" });
      // alert(`${watchList["mssg"]}`)
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
      dialogContext({ type: "ADD_TO_WATCHLIST" });
      // alert(error.response.data.error)
    }
  };

  const SLIDE_INFO = [];
  const items1 =
    tren &&
    tren.cryptoTrending.map((res) => {
      const obj = {
        img: res.image,
        coinName: res.name,
        symbol: res.symbol,
      };
      SLIDE_INFO.push(obj);
    });

  // const POPULAR_LIST = [];
  // const items =

  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  function createSlide(crypto) {
    return (
      <SwiperSlide
        key={crypto.cryptoId}
        onClick={() => {
          navigation(`/coinDetail/${crypto.cryptoId}`);
        }}
      >
        <img className="img" src={crypto.image} width="200px" alt="" />
        <h1
          style={{
            textAlign: "center",
            marginBottom: "50px",
            color: "black",
            fontSize: "1.5rem",
          }}
        >
          {crypto.name}
        </h1>
      </SwiperSlide>
    );
  }

  return (
    <div className="main-page">
      <Navbar />

      <Intro />

      {/* second wrapper */}

      <section id="marketlist">
        <div className="sec-wrap">
          <div className="title-market">
            <div className="t-left">
              <div className="t-name">
                <span>Cryptorrency Prices by Market Cap</span>
                <span>
                  {" "}
                  The indicator that measures the total value of a
                  cryptocurrency
                </span>
              </div>{" "}
            </div>
          </div>
          <div className="search-col">
            <input
              className="coin-input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Market Coin"
            />
            <i className="fa fa-search"></i>
          </div>

          <div className="set-coinList">
            <TableContainer className="overflow-table" component={Paper}>
              <Table aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="table_h">Ranking</TableCell>
                    {/* <TableCell sx={{width: '0px'}}></TableCell> */}
                    <TableCell className="table_h">Name</TableCell>
                    <TableCell className="table_h">Price</TableCell>
                    <TableCell className="table_h">Market Cap</TableCell>
                    <TableCell className="table_h">24 Volume Price</TableCell>

                    {user && (
                      <TableCell className="table_h">
                        Add to Watchlist
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {crypto && search === ""
                    ? crypto.cryptoList
                        .slice((page - 1) * 10, (page - 1) * 10 + 10)
                        .map((crypto) => {
                          return (
                            <CoinListTable key={crypto.cryptoId} crypto={crypto} handleWatchLists={handleWatchLists} formatter={formatter} user={user}/>
                          );
                        })
                    : crypto &&
                      cryptoFilter(crypto.cryptoList).map((crypto) => {
                        return (
                          <CoinListTable key={crypto.cryptoId} crypto={crypto} handleWatchLists={handleWatchLists} formatter={formatter} user={user}/>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>

            {addWatchListDialog ? (
              <NormalDialog
                type="ADD_TO_WATCHLIST"
                dialogTitle="Add to Watchlist"
                dialogMessage={!error ? watchList["mssg"] : error}
              />
            ) : null}

            <Pagination className="pagination-cont"
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
      </section>

      <div className="sec-wrap">
        <div className="title-market">
          <div className="t-left">
            <div className="t-name">
              <span>Popular Coins</span>
              <span> The current top 10 coins in the market</span>
            </div>{" "}
          </div>
        </div>
        {popular ? <TrendingTable popular={popular} /> : null}
      </div>

      <div className="trending-wrap">
        {/* <div className="title-market"> */}
        <div className="t-left">
          <div className="t-name">
            <span style={{ color: "black", marginTop: "4rem" }}>
              Trending Coins
            </span>
            <span>
              {" "}
              Find out what are the trending coins in the market currently
            </span>
          </div>{" "}
        </div>

        {/* </div> */}
        <div className="carousel-2">
          <Swiper
            modules={[Navigation, pagination, Autoplay]}
            slidesPerView={3}
            spaceBetween={180}
            // navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            centeredSlides={false}
            centerInsufficientSlides={true}
            pagination={{ clickable: true }}
          >
            <div className="trend-car">
              {tren &&
                tren["cryptoTrending"].map((crypto) => createSlide(crypto))}
            </div>
          </Swiper>
          <br />
          <br />
          <br />
        </div>
      </div>

      <MarketingSection />
      <Footer />
    </div>
  );
};

export default Coin;
