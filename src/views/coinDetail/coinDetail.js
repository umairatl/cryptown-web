import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../components/axios/axios";
import CoinChart from "../../components/coinChart/chart";
import '../coinDetail/coinDetail.css';
import Navbar from '../../components/navbar/navbar'
import img from '../../asset/progressBar.png';
import DOMPurify from "dompurify";

const CoinDetail = () => {
    const { id } = useParams();
    var [ detail, setDetail ]  = useState(null);

    useEffect(() => {
        const fetchCoinDetail = async () => {
            const response = await axios.post('api/crypto/cryptoDetail',
            {
                'cryptoId': id
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            
            const json = await response.data

            if (response.status === 200){
                setDetail(json)
            }
        }
        fetchCoinDetail()
    }, []);
    

    return ( 
        <div>
            <Navbar />
            <div className="top-info">
                    <p>Crypto</p>
          <p>
            Current Price USD : <span>{detail && detail.cryptoDetails.current_price_usd}</span>
          </p>
          <p>
            Markets : <span>test</span>
          </p>
          <p>
            Markets : <span>test</span>
          </p>
            </div>

            <div class="details-col">
            <br></br>
            <div className="coin-content">
                
            <div className="outer">
                <div className="wrap-out">
               
                <div className="coin-info-col">
                    <img src={img} width='120px'/>
                    <h1>{id}</h1>
                    </div>
                  
                    <h1 className="price">${detail && detail.cryptoDetails. current_price_usd} USD</h1>
                    <div class="rank">
                    <p>Rank #{detail && detail.cryptoDetails.market_cap_rank}</p>
                </div>
                <div className="details-market">
                    <p>Market Cap</p>
                    <p>24H Trading Volume</p>
                    <p>Fully Diluted Valuation</p>
                    <p>Circulating Supply</p>
                    <p>Total Supply</p>
                    <p>Max Supply</p>
                    </div>
                </div>

                </div>
               


                <div className="chart-col">
                    <h1>About {id}</h1>
                <div
              className="desc-col"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                    detail && detail.cryptoDetails.description
                ),
              }}
            ></div>
                {/* <p>{detail && detail.cryptoDetails.description}</p> */}

                </div>

            </div><br></br>

            <CoinChart cryptoId={id} />

           
        </div>
        </div>
     );
}
 
export default CoinDetail;