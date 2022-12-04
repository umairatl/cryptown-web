import "../coinDetail/coinDetail.css";
import axios from "../../components/axios/axios";
import CoinChart from "../../components/coinChart/chart";
import Navbar from "../../components/navbar/navbar";
import DOMPurify from "dompurify";
import Footer from "../../components/footer/footer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ATH_ATL from "../../components/ath/atl/ath_atl";
import NormalDialog from "../../components/Dialog/normalDialog";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useRef } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useWatchListContexts } from "../../hooks/useWatchListContext";
import { useDialogContext } from "../../hooks/useDialogContext";
import ExchangeMarket from "../../components/ex-list-details/ex-list-details";

const CoinDetail = () => {
  const { id, page } = useParams();
  let [detail, setDetail] = useState(null);
  let [error, setError] = useState(null);
  const [watchList, setWatchList] = useState({});
  const scollToRef = useRef();
  const [currency, setCurrency] = useState("10");
  const { watchLists: watchListContext, dispatch } = useWatchListContexts();
  const { addToWatchlist: addWatchListDialog, dispatch: dialogContext } =
    useDialogContext();
  const { user } = useAuthContext();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchCoinDetail = async () => {
      const response = await axios(`api/crypto/cryptoDetail/${id}`);

      const json = await response.data;

      if (response.status === 200) {
        setDetail(json);
      }
    };
    fetchCoinDetail();
  }, []);

  const handleChange = (event) => {
    setCurrency(event.target.value);
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
      dispatch({ type: "ADD_WATCHLIST", payload: json["newFavourite"] });
    }
  };

  const handleWatchLists = async (cryptoId, coinName, image_url) => {
    try {
      await addToWatchlist(cryptoId, coinName, image_url);
      setError(null);
      dialogContext({ type: "ADD_TO_WATCHLIST" });
    } catch (error) {
      setError(error.response.data.error);
      dialogContext({ type: "ADD_TO_WATCHLIST" });
    }
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const formatterMY = new Intl.NumberFormat("ms-MY", {
    style: "currency",
    currency: "MYR",
  });

  return (
    <div>
      <div className="coin-detail">
        <Navbar />
        <div className="top-info">
          <div className="back-col">
            <div className="table-flex">
              <Link
                className="icon_back"
                to={page === "market" ? "/market" : "/watchlist"}>
                <FaArrowLeft /> <span>Back</span>
              </Link>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 120,
                  color: "white",
                  background: "white",
                }}
                size="small">
                <InputLabel></InputLabel>
                <Select
                  value={currency}
                  label="Currency"
                  onChange={handleChange}>
                  <MenuItem value={10}>USD</MenuItem>
                  <MenuItem value={20}>MYR</MenuItem>
                </Select>
              </FormControl>
            </div>
            <img
              alt="logo"
              className="image_logo"
              src={detail && detail.cryptoDetails.image}
            />

            <a href="#about">
              <button
                className="btn-vm"
                id="coinheaderbutton"
                onClick={() => scollToRef.current.scrollIntoView()}>
                More info
              </button>
            </a>
          </div>

          <div className="left-det">
            <div className="d-left" data-aos="fade-up" data-aos-duration="3000">
              <div className="d-name">
                <span>
                  {id} ({detail && detail.cryptoDetails.symbol})
                </span>

                {/* price */}
                {currency === 20 ? (
                  <span>
                    {formatterMY.format(
                      detail && detail.cryptoDetails.current_price_myr
                    )}{" "}
                  </span>
                ) : (
                  <span>
                    {formatter.format(
                      detail && detail.cryptoDetails.current_price_usd
                    )}
                  </span>
                )}
                <span>
                  Rank #{detail && detail.cryptoDetails.market_cap_rank}
                  {user && detail && (
                    <button
                      onClick={() =>
                        handleWatchLists(
                          detail.cryptoDetails.cryptoId,
                          detail.cryptoDetails.name,
                          detail.cryptoDetails.image
                        )
                      }
                      className="btn-coin">
                      Add to Wishlist
                    </button>
                  )}
                  {addWatchListDialog ? (
                    <NormalDialog
                      type="ADD_TO_WATCHLIST"
                      dialogTitle="Add to Watchlist"
                      dialogMessage={!error ? watchList["mssg"] : error}
                    />
                  ) : null}
                </span>
                <div className="table-detail">
                  {/* table */}
                  {currency === 20 ? (
                    <table>
                      <tbody>
                        <tr>
                          <th>Market Cap</th>
                          <td>
                            {formatterMY.format(
                              detail && detail.cryptoDetails.market_cap_myr
                            )}
                          </td>
                          <th>24H Trading Volume</th>
                          <td>
                            {formatterMY.format(
                              detail && detail.cryptoDetails.total_volume_myr
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>Fully Diluted Valuation</th>
                          <td>
                            {formatterMY.format(
                              detail &&
                                detail.cryptoDetails.fully_diluted_valuation_myr
                            )}
                          </td>
                          <th>Circulating Supply</th>
                          {/* <td>RM {detail && detail.cryptoDetails.circulating_myr}</td> */}
                        </tr>
                        <tr>
                          <th>Total Supply</th>
                          <td>{detail && detail.cryptoDetails.total_supply}</td>
                          <th>Max Supply</th>
                          <td>{detail && detail.cryptoDetails.max_supply}</td>
                        </tr>
                        <tr></tr>
                      </tbody>
                    </table>
                  ) : (
                    <table>
                      <tbody>
                        <tr>
                          <th>Market Cap</th>
                          <td>
                            {formatter.format(
                              detail && detail.cryptoDetails.market_cap_usd
                            )}
                          </td>
                          <th>24H Trading Volume</th>
                          <td>
                            {formatter.format(
                              detail && detail.cryptoDetails.total_volume_usd
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>Fully Diluted Valuation</th>
                          <td>
                            {formatter.format(
                              detail &&
                                detail.cryptoDetails.fully_diluted_valuation_usd
                            )}
                          </td>
                          <th>Circulating Supply</th>
                          <td>
                            {formatter.format(
                              detail && detail.cryptoDetails.circulating_supply
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>Total Supply</th>
                          <td>{detail && detail.cryptoDetails.total_supply}</td>
                          <th>Max Supply</th>
                          <td>{detail && detail.cryptoDetails.max_supply}</td>
                        </tr>
                        <tr></tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>{" "}
            </div>

            <h1></h1>
          </div>
          <div className="right-col">
            {currency === 20
              ? detail && <ATH_ATL detail={[detail.cryptoDetails, 20]} />
              : detail && <ATH_ATL detail={[detail.cryptoDetails, 10]} />}
          </div>
        </div>
      </div>

      {/* second */}
      <div className="chart-col">
        <CoinChart cryptoId={id} />
      </div>
      <div className="btm-details">
        <section id="about" data-aos="fade-left" data-aos-duration="3000">
          <div className="coin-info-col2">
            <div className="desc-col">
              <h1>About {id}</h1>
              <div
                className="para"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    detail && detail.cryptoDetails.description
                  ),
                }}></div>
            </div>
          </div>
        </section>

        <div
          className="ex-detail"
          data-aos="fade-left"
          data-aos-duration="3000">
          <h1 className="ex-h1"> EXCHANGE LIST</h1>
          <ExchangeMarket exchange={detail && detail.cryptoDetails.exchange} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CoinDetail;
