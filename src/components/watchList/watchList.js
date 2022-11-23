import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import axios from "../../components/axios/axios";
import { useState } from "react";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useWatchListContexts } from '../../hooks/useWatchListContext';
import { useDialogContext } from '../../hooks/useDialogContext';


// src/asset/Assetlogo.png

const WatchList = ({ watchlists }) => {
    const [deleteWatchList, setDeleteWatchList] = useState({})
    const [error, setError] = useState(null)
    const navigation = useNavigate()

    const { removeWatchlist: removeWatchListDialog, dispatch: dispatchDialogContext } = useDialogContext()
    const { dispatch } = useWatchListContexts()
    const { user } = useAuthContext()

    const deleteWatchlist = async (favId) => {

      if (!user) {
        return
      }
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
        console.log(deleteWatchList)
        dispatch({type:"DELETE_WATCHLIST", payload: json.deletedFavId})
      }
    }
    
    const handleDeleteWatchLists = async (favId) => {
      try {
        await deleteWatchlist(favId)
        setError(null)
        dispatchDialogContext({type: "REMOVE_FROM_WATCHLIST"})
        // alert(`${deleteWatchList["mssg"]}`)
      } catch (error) {
        console.log(error)
        setError(error.response.data.error) 
        // alert(error.response.data.error)
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