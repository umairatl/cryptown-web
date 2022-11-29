import React, { useState } from "react";
import { useEffect } from "react";
import './ex-list-details.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, trade_url) {
  return { name, trade_url};
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
            createData(res.name, res.trade_url))
        ) 
    }, []);

    return (
    <div className="exchange-list-col">

<TableContainer component={Paper}>
      <Table sx={{ maxWidth: 600 }} size="large">
        <TableHead>
          <TableRow>
            <TableCell className="exchange"><b>Exchange Name</b></TableCell>
            <TableCell align="right"><b>Visit Website</b></TableCell>
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
              <TableCell align="right"><button  className="btn-ex-list" onClick = {() => {
                 window.open(row.trade_url, '_blank');
                }}>Website</button></TableCell>
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
 
export default (Exchange_Market);