import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";
import "../news/news.css";

// const columns = [{ id: "name", label: "News Title", minWidth: 170 }];

// function createData(name) {
//   return { name };
// }

const NewsPage = () => {
  const [news, setNews] = useState(null);

  // let arr = [];

  useEffect(() => {
    const fetchNews = async () => {
      const response = await axios("https://localhost:8443/api/news");
      const json = await response.data;

      if (response.status === 200) {
        setNews(json);
      }
    };
    fetchNews();
  }, []);

  // news && news.exchange.forEach((res) => rows.push(createData(res.name)));
  // var [data, setData] = useState([]);

  //to call api and list
  //   useEffect(() => {
  //     axios
  //       .get("https://amiiboapi.com/api/amiiboseries/", {})
  //       .then(function (response) {
  //         setData(response.data.amiibo); // array for display data
  //         setDataSearch(response.data.amiibo); //  array for search function
  //       });
  //   }, []);

  return (
    <div className="news-page">
      <h1>NEWS</h1>
      {news &&
        news.news?.map((res) => (
          <div className="grid-container-news">
            <div className="grid-item-news">
              <Card sx={{ maxWidth: 360 }}>
                {" "}
                <CardMedia component="img" height="100" image={res.image} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {res.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {res.description}
                  </Typography>
                </CardContent>
                <Typography variant="body2" color="text.secondary">
                  {res.datePublished}
                </Typography>
                <CardActions>
                  <a href={res.url} target="_blank">
                    <input type="button" value="Learn more" />
                  </a>
                </CardActions>
              </Card>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NewsPage;
