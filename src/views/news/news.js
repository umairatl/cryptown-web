import * as React from "react";
import { useEffect, useState } from "react";
import axios from "../../components/axios/axios";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";
import "../news/news.css";
// import HeaderHero from "../news/heroimage";
import Navbar from "../../components/navbar/navbar";
import AmbassadorSection from "../news/ambassador";
import NewsGif from "./gifheader";
import SliderSectionNews from "../news/sliderpartner";
import Footer from "../../components/footer/footer";
import HeaderHero from "../news/heroimage";

const NewsPage = () => {
  var [news, setNewsList] = useState(null);

  useEffect(() => {
    const fetchNewsList = async () => {
      const response = await axios("/api/news");
      const json = await response.data;

      if (response.status === 200) {
        setNewsList(json);
      }
    };
    fetchNewsList();
  }, []);

  console.log(news);

  return (
    <div className="news-page">
      <Navbar />
      <NewsGif />
      <SliderSectionNews />
      <div className="bgnews">
        <h3 className="headernews" data-aos="fade-up" data-aos-duration="3000">
          News
          <span id="colortext5"> Feed</span>
        </h3>
        <div
          className="grid-container-news"
          data-aos="fade-up"
          data-aos-duration="3000"
        >
          {news &&
            news.news.map((row, index) => (
              <div key={index} className="grid-item-news">
                <Card className="news-box" sx={{ maxWidth: 345 }}>
                  <CardMedia component="img" height="140" image={row.image} />
                  <CardContent>
                    <div className="title-col-news">
                      <Typography gutterBottom variant="h5" component="div">
                        {row.name}
                      </Typography>
                    </div>
                    <div className="subtitle-text">
                      <Typography variant="body2" color="text.secondary">
                        {row.description}
                      </Typography>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button size="small">
                      <a href={row.url} target="_blank">
                        Read more
                      </a>
                    </Button>
                  </CardActions>
                </Card>
              </div>
            ))}
        </div>
      </div>
      <AmbassadorSection />
      <Footer />
    </div>
  );
};

export default NewsPage;
