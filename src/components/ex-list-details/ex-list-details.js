import React, { useState } from "react";
import { useEffect } from "react";
import './ex-list-details.css';
import { FaUserCircle } from "react-icons/fa";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, trend_url) {
  return { name, trend_url};
}

const Exchange_Market = ({exchange}) => {
  const [data, setData] = useState([]);
  var [rows] = []
  
  function createData(name) {
    return { name };
  }

    useEffect(() => {
      exchange && exchange.forEach(res =>
        rows.push(
            createData(res.name, res.trend_url))
        ) 
        console.log(exchange, "243")
    }, []);

    return (
    <div className="exchange-list-col">

<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Exchange Name</TableCell>
            <TableCell align="right">Calories</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exchange && exchange.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.trend_url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        {/* {data && data.map((exchange, index) => (
            <div className="col"
              key={index}>
                <div className="title">{exchange.name} </div>
                <button onClick = {() => {
                 window.open(exchange.url, '_blank');
                }}>{FaUserCircle}Visit Website</button>
            </div>
            
          ))} */}

    </div> );
}
 
export default Exchange_Market;