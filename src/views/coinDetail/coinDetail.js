import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../components/axios/axios";
import CoinChart from "../../components/coinChart/chart";
import "../coinDetail/coinDetail.css";
import Navbar from "../../components/navbar/navbar";
import DOMPurify from "dompurify";
import Footer from "../../components/footer/footer";
import {Link} from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Exchange_Market from "../../components/ex-list-details/ex-list-details";
import {useRef} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ATH_ATL from "../../components/ath/atl/ath_atl";

const CoinDetail = () => {
  const { id } = useParams();
  var [detail, setDetail] = useState(null);
  const scollToRef = useRef();  const [currency, setCurrency] = useState('10');

  useEffect(() => {
    const fetchCoinDetail = async () => {
      const response = await axios.post(
        "api/crypto/cryptoDetail",
        {
          cryptoId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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

  // var updateATH_ATL = () => {
  //   console.log(currency, 'fka')
  //      return (detail && <ATH_ATL detail = {[ detail.cryptoDetails, currency]} />)
  //   }

  // useEffect(() => {
  //   updateATH_ATL()
  //   console.log(currency)
  // }, [currency])

  // Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const formatterMY = new Intl.NumberFormat('ms-MY', {
  style: 'currency',
  currency: 'MYR',
});

  return (
    <div>
      <div className="coin-detail">
        <Navbar />
    
        <div className="top-info">

        <div className="back-col">
          <div className="table-flex">
          <Link className="icon_back" to='/market'><FaArrowLeft /> <span>Back</span></Link>
        <FormControl sx={{ m: 1, minWidth: 120, color: 'white', background: 'white' }} size="small">
      <InputLabel id="demo-select-small"></InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={currency}
        label="Currency"
        onChange={handleChange}>
        <MenuItem value={10}>USD</MenuItem>
        <MenuItem value={20}>MYR</MenuItem>
      </Select>
    </FormControl>
    </div>
    <img className="image_logo" src={detail && detail.cryptoDetails.image} />

    <a href="#about">
                    <button className="btn-vm" id='coinheaderbutton' onClick={() => scollToRef.current.scrollIntoView()}>
                      More info
                    </button></a>
        </div>



          {/* <Link to = '/market'><FaArrowLeft /> Back</Link> */}


          <div className="left-det">
            <div className="d-left">
              <div className="d-name">
                <span>{id} ({detail && detail.cryptoDetails.symbol})</span>

                
                {/* price */}
                  { currency === 20 ?  <span> 
                  {formatterMY.format(detail && detail.cryptoDetails.current_price_myr)} </span> :  
                  <span> 
                  {formatter.format(detail && detail.cryptoDetails.current_price_usd)}</span>}
                <span>Rank #{detail && detail.cryptoDetails.market_cap_rank}</span>
                <div className="table-detail">

                  {/* table */}
                  {currency === 20 ? 
                  <table>
                    <tr>
                      <th>Market Cap</th>
                      <td>{formatterMY.format(detail && detail.cryptoDetails.market_cap_myr)}</td>
                      <th>24H Trading Volume</th>
                      <td>{formatterMY.format(detail && detail.cryptoDetails.total_volume_myr)}</td>
                    </tr>
                    <tr>
                      <th>Fully Diluted Valuation</th>
                      <td>{formatterMY.format(detail && detail.cryptoDetails.fully_diluted_valuation_myr)}</td>
                      <th>Circulating Supply</th>
                      {/* <td>RM {detail && detail.cryptoDetails.circulating_myr}</td> */}
                    </tr>
                    <tr>
                      <th>Total Supply</th>
                      <td>{detail && detail.cryptoDetails.total_supply}</td>
                      <th>Max Supply</th>
                      <td>{detail && detail.cryptoDetails.max_supply}</td>
                    </tr>
                    <tr>
                    </tr>
                  </table>
                  :  <table>
                  <tr>
                    <th>Market Cap</th>
                    <td>{formatter.format(detail && detail.cryptoDetails.market_cap_usd)}</td>
                    <th>24H Trading Volume</th>
                    <td>{formatter.format(detail && detail.cryptoDetails.total_volume_usd)}</td>
                  </tr>
                  <tr>
                    <th>Fully Diluted Valuation</th>
                    <td>{formatter.format(detail && detail.cryptoDetails.fully_diluted_valuation_usd)}</td>
                    <th>Circulating Supply</th>
                    <td>{formatter.format(detail && detail.cryptoDetails.circulating_supply)}</td>
                  </tr>
                  <tr>
                    <th>Total Supply</th>
                    <td>{detail && detail.cryptoDetails.total_supply}</td>
                    <th>Max Supply</th>
                    <td>{detail && detail.cryptoDetails.max_supply}</td>
                  </tr>
                  <tr>
                  </tr>
                </table> }
                
                </div>
              </div> </div>

            <h1></h1>
          </div>
          <div className="right-col">

        
        { currency === 20 ? 
           detail && <ATH_ATL detail = {[ detail.cryptoDetails, 20]} />
           : detail && <ATH_ATL detail = {[ detail.cryptoDetails, 10]} />
        }



  {/* {
    useEffect(()=> {
     return (detail && <ATH_ATL detail = {[ detail.cryptoDetails, currency]} />)
    }, [currency])
 } */}

            {/* <img src={detail && detail.cryptoDetails.image} width="350px" /> */}



          </div>
        </div>
      </div>


      {/* second */}
      <div className="chart-col">
        <CoinChart cryptoId={id} />
      










      </div>
<div className="btm-details">
      <section id='about'>
        <div className="coin-info-col2">
          <div className="desc-col">
            <h1>About {id}</h1>
            <div
              className="para"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  detail && detail.cryptoDetails.description
                ),
              }}
            ></div>
          </div>

        </div>
      </section>
      







      <div className="ex-detail">
   <h1 className="ex-h1"> EXCHANGE LIST</h1>
   <Exchange_Market exchange={detail && detail.cryptoDetails.exchange} /><Footer /> 
      </div>
   </div>
   </div>
  
  );
};

export default CoinDetail;