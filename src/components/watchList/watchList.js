import React from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';


// src/asset/Assetlogo.png

const WatchList = ({ watchlists }) => {
    const { user } = useAuthContext()
    const navigation = useNavigate()

    return (
        <TableRow key={watchlists.coinname} style={{cursor:'pointer'}} onClick={() => {
            navigation(`/coinDetail/${watchlists.coinname}`);
          }}>
            <TableCell>{watchlists["favid"]}</TableCell>
            <TableCell>{watchlists["coinname"]}</TableCell>
        </TableRow>
    )
  }

export default WatchList;