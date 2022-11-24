import * as React from 'react';
import { useEffect, useState } from "react"
import axios from "../../components/axios/axios";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import '../appList/appList.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';
import ExchangeListHeader from './applistheader/appListheader';
import Counter from './counterSec/counter';
import RollingSection from '../cryptoList/rollingcoin';
import BasicSteps from './steps/basicsteps';
import Footer from '../../components/footer/footer';

  function createData(rank, name, year, score, country, trade_volume) {
    return { rank, name, year, score, country, trade_volume };
  }
  
  const AppList = () => {
    var rows = [];
    var [exchangeList, setExchangeList] = useState(null);

    useEffect(() => {
        const fetchExchangeList = async () => {
            const response = await axios('api/exchange')
            const json = await response.data
    
            if (response.status === 200) {
                setExchangeList(json)
            }
        }
        fetchExchangeList()
      }, []);

      exchangeList && exchangeList.exchange.forEach(res =>
        rows.push(
            createData(res.trust_score_rank, res.image, res.name, res.year_established, res.trust_score, res.country, res.trade_volume_24h_btc)
        ) 
    );

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
      return (
        <div>
        <Navbar />
        <ExchangeListHeader/>
        
        <div className='set-appList'>
            {/* <img src = 
            'https://asset.unsplash.com/photo-1661961112835-ca6f5811d2af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80'>
            </img> */}


             <h3 className="exlistsecheader">List of <span id="colortextnine"> Platform</span></h3> 


             <p id="exlistparagraph">Here are the list of several platform that can help you discover about cryptocurrency more</p>
             <RollingSection/>
             <br></br>

            
            <TableContainer component={Paper}>
      <Table aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Ranking</TableCell>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Established</TableCell>
            <TableCell align="right">Trust Score</TableCell>
            <TableCell align="right">Trade Volume 24h BTC</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exchangeList && exchangeList.exchange.map((row) => (
            <TableRow key={row.name} style={{cursor:'pointer'}}
            onClick = {() => {
                //get the address bar or set the address
                 window.open(row.url, '_blank');

                // document.location = row.url;
                // <a href={row.url} target ="_blank"></a> 
                
                }}>  

            
              {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
                <TableCell>{row.trust_score_rank}</TableCell>
                   <TableCell>
                    <img src={row.image} width='40px'></img>
                   </TableCell>
                <TableCell>
                    {row.name}
                    </TableCell>
                <TableCell>{row.country !== null ? row.country : "N/A"}</TableCell>
                <TableCell>{row.year_established !== null ? row.year_established : "N/A"}</TableCell>
                <TableCell align="right">{row.trust_score !== null ? row.trust_score : "N/A"} / 10</TableCell>
                <TableCell align="right">{row.trade_volume_24h_btc !== null ? row.trade_volume_24h_btc : "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    
    </div>
    <BasicSteps/>
    <Footer/>
    </div>
  );
}
 
export default AppList;

// useHistory Hook