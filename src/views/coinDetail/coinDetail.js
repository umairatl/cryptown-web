import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CoinChart from "../../components/coinChart/chart";
import '../coinDetail/coinDetail.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const CoinDetail = () => {
    const { id } = useParams();
    var [ detail, setDetail ]  = useState(null);

    useEffect(() => {
        const fetchCoinDetail = async () => {
            const response = await axios.post( process.env.REACT_APP_URL + 'api/crypto/cryptoDetail',
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

        <div className="list">
            <h1>COIN DETAIL - {id} </h1><br></br>
            <CoinChart cryptoId={id} />


            <div className="col-details">
                <div className="con-1">
                    <div className="con-2">
                        24H Price Change
                    </div>
                    PRICE
                </div>
            {/* <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 300,
          height: 300,
        },
      }}
    >
      <Paper elevation={4} /> <Paper />
      <Paper elevation={3} />
    </Box> */}
                <h1>{detail && detail.cryptoDetails.name}</h1>
                <p>{detail && detail.cryptoDetails.description}</p>
            </div>
{/* 
            <div>{detail && detail.cryptoDetails.symbol}</div>
            <div>{detail && detail.cryptoDetails.name}</div>
            <div>{detail && detail.cryptoDetails.description}</div> */}


        </div>
     );
}
 
export default CoinDetail;