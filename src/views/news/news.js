import * as React from 'react';
import { Box, Card, CardContent, Typography, CardActions, Button, CardMedia } from '@mui/material';
import '../news/news.css';

const NewsPge = () => {
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
        <div className='news-page'>
        <h1>NEWS</h1>
        <div className='grid-container-news'>
            <div className='grid-item-news'>
        <Card sx={{ maxWidth: 345 }}> 
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>

    <div className='grid-item-news'>
        <Card sx={{ maxWidth: 345 }}> 
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
    </div>
    </div>
     );
}
 
export default NewsPge;