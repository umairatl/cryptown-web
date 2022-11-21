import React, { useState } from "react";
import { Card, makeStyles } from '@material-ui/core';
import './trending_carousel.css'

const TrendingSlide = ({content}) => {
    // console.log(content, "cont")
    // console.
  const { img, coinName } = content;

    return (
        <div className="wrap-slide">
             <Card className='carousel-col'>
            <h1>{coinName}</h1>
        </Card>
        </div>
  );
}
 
export default TrendingSlide;