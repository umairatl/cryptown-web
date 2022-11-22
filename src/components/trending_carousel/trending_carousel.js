import React from "react";
import { useEffect, useState } from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import './trending_carousel.css'
import ProgressBar from "../progressBar/proressBar";
const TrendingTable = ({trending}) => {
    const [val, setVal] = useState('');
    const theme = useTheme();

    console.log(trending, "trending")

//     useEffect(() => {
//         const arr = []
//         const updateVal = trending && trending.map((row) => {
//           const obj = {
//             img : row.img,
//             coinName : row.coinName,
//             symbol: row.symbol
//           }
//           arr.push(obj)
//           setVal(arr)
//         })
// }, [])

    return ( 
        <div>
            {trending ? 


        <div className="test">
          {trending && trending.map((row) => (
            <div className="trending-card">
              <Card sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={row.img}
                alt="Live from space album cover"
              />
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