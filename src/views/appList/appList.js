import * as React from 'react';
import { useEffect, useState } from "react"
import axios from "axios";
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

const columns = [
    { id: 'name', label: 'Exchange Name', minWidth: 170 },
    { id: 'year', label: 'Year Established', minWidth: 100 },
    { id: 'score', label: 'Trust Score', minWidth: 100 },
    {
        id: 'trade_volume',
        label: 'Trade volume 24h btc',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
  ];

  function createData(name, year, score, trade_volume) {
    return { name, year, score, trade_volume };
  }
  
  const AppList = () => {
    var rows = [];
    var [exchangeList, setExchangeList] = useState(null);

    useEffect(() => {
        const fetchExchangeList = async () => {
            const response = await axios('https://localhost:5000/api/exchange')
            const json = await response.data
    
            if (response.status === 200) {
                setExchangeList(json)
            }
        }
        fetchExchangeList()
      }, []);

      exchangeList && exchangeList.exchange.forEach(res =>
        rows.push(
            createData(res.name, res.year_established, res.trust_score, res.trade_volume_24h_btc)
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
        <div className='set-appList'>
            <h1>ECHANGE LIST</h1>

      {/* {exchangeList && exchangeList.exchange.map(res => <div>{res.name}</div>)} */}

     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code} onClick = {() => {
                    <Link to = 'https://www.coinbase.com' ></Link>
                  }}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper> 
    </div>
  );
}
 
export default AppList;