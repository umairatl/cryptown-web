import React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import "./trending_carousel.css";
import ProgressBar from "../progressBar/proressBar";

const TrendingTable = ({ popular }) => {
  return (
    <div>
      {popular ? (
        <div className="test" data-aos="fade-up-left" data-aos-duration="3000">
          {popular &&
            popular.map((row, index) => (
              <div className="trending-card" key={index}>
                <Card className="trending-card__test" sx={{ display: "flex" }}>
                  <CardMedia
                    className="image-popular"
                    component="img"
                    sx={{
                      width: 100,
                      height: 100,
                      marginTop: 1,
                      marginLeft: 1.3,
                    }}
                    image={row.image}
                    alt="Live from space album cover"
                  />{" "}
                  <br></br>
                  <p className="coin-name">{row.name}</p>
                  <p className="coin-name"></p>
                  <Box></Box>
                </Card>
              </div>
            ))}
        </div>
      ) : (
        <ProgressBar />
      )}
    </div>
  );
};

export default TrendingTable;
