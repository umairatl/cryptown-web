import React from "react";
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import './trending_carousel.css'
import ProgressBar from "../progressBar/proressBar";
const TrendingTable = ({popular}) => {
    const [val, setVal] = useState('');
    const theme = useTheme();

    console.log(popular, "popular")

//     useEffect(() => {
//         const arr = []
//         const updateVal = trending && trending.map((row) => {
//           const obj = {
//             img : row.img,
//             coinName : row.coinName,
//           #  symbol: row.symbol
//           }
//           arr.push(obj)
//           setVal(arr)
//         })
// }, [])

    return ( 
        <div>
            {popular ? 


        <div className="test">
          {popular && popular.map((row) => (
            <div className="trending-card">
              <Card className='trending-card__test' sx={{ display: 'flex' }}>
              <CardMedia
               className="image-popular"
                component="img"
                sx={{ width: 100, height:100, marginTop: 1, marginLeft: 1.3 }}
                image={row.image}
                alt="Live from space album cover"
              /> <br></br>
              <p className="coin-name">{row.name}</p>
              <p className="coin-name"></p>

              {/* <p className="coin-name">{row.name}</p> */}

              <Box > 
                {/* <CardContent>
                  <Typography component="div" variant="h5">
                   <div className="coin-name"> {row.symbol} </div>
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                   {row.coinName}
                  </Typography>
                </CardContent> */}
              </Box>
            </Card>
            </div>
          ))}
        </div> : <ProgressBar />}


        </div>
     );
}
 
export default TrendingTable;