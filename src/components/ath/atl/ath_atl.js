import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ATH_ATL = (detail) => {
console.log(detail.detail.ath.change_percentage_myr,  "detail")



    return ( 
        <div>
<Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          All Time Low (ATL)
        </Typography>
        <Typography variant="h5" component="div">
          {detail.detail.ath.change_percentage_myr}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      
    </Card>
        </div>
     );
}
 
export default ATH_ATL;