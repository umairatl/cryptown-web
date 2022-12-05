import React from "react";
import videogif3 from "../../../asset/trade.mp4";
import "../watchlistheadersec/watchlistheader.css";

const WatchlistHeaderSection = () => {
  return (
    <div className="allheaderwatchlist">
      <div className="watchlisth">
        <div className="videowatchlist">
          <video autoPlay loop muted id="videowatchlistid">
            <source type="video/mp4" src={videogif3} />
          </video>
        </div>
        <div className="containerwatchlistheader">
          <div className="home_header_info">
            <h1>
              <span className="textwl">Watchlist Page</span>
            </h1>
            <p>
              Watchlist is a page where you could view all the desired crypto
              coins that you have saved. You can always views your added crypto
              at here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchlistHeaderSection;
