import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import axios from "../../components/axios/axios";
import { useState } from "react";
import { useAuthContext } from '../../hooks/useAuthContext';


// src/asset/Assetlogo.png

const WatchList = ({ watchlists }) => {
    const [deleteWatchList, setDeleteWatchList] = useState({});
    const [error, setError] = useState(null);
    const navigation = useNavigate()

    const { user } = useAuthContext()

    const deleteWatchlist = async (favId) => {
      const response = await axios.delete('api/favourite/favourite-delete',
      {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user}`,
          },
          data: {
            "favId": favId,
          }
      })
      
      const json = await response.data
    
      if (response.status === 200){
        setDeleteWatchList(json)
      }
    }
    
    const handleDeleteWatchLists = async (cryptoId, coinName, image_url) => {
      try {
        await deleteWatchlist(cryptoId, coinName, image_url)
        setError(null)
        alert(`${deleteWatchList["mssg"]}`)
      } catch (error) {
        console.log(error)
        setError(error.response.data.error) 
        alert(error.response.data.error)
      }
    }

    return (
        <TableRow key={watchlists.cryptoid} style={{cursor:'pointer'}} onClick={() => {
            navigation(`/coinDetail/${watchlists.cryptoid}`);
          }}>
            <TableCell>
              <img src={watchlists["image_url"]} width='40px'></img>
            </TableCell>
            <TableCell>{watchlists["coinname"]}</TableCell>
            <TableCell>{watchlists["cryptoid"]}</TableCell>
            <TableCell>
              <button onClick={async (e) => {e.stopPropagation(); await handleDeleteWatchLists(watchlists['favid'])}}>Remove</button>
            </TableCell>
        </TableRow>
    )
  }

export default WatchList;