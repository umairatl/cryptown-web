import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import axios from "../axios/axios";
import { useState } from "react";
import { useAuthContext } from '../../hooks/useAuthContext';
import { useWatchListContexts } from '../../hooks/useWatchListContext';
import { useDialogContext } from '../../hooks/useDialogContext';
import WatchlistHeaderSection from '../watchList/watchlistheadersec/watchlistheader';

const WatchList = ({ index, watchlists }) => {
  
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
        dispatch({type:"DELETE_WATCHLIST", payload: json.deletedFavId})
      }
    }
    
    const handleDeleteWatchLists = async (favId) => {
      try {
        await deleteWatchlist(favId)
        setError(null)
        dispatchDialogContext({type: "REMOVE_FROM_WATCHLIST"})
      } catch (error) {
        setError(error.response.data.error) 
      }
    }
            
    return (

      
      <TableRow key={index} style={{cursor:'pointer'}} onClick={() => {
        navigation(`/coinDetail/${watchlists.cryptoid}/watchlist`);
      }}>
  
      <TableCell
      sx={{ width: "100px", textAlign: "center" }}
      >
      {index + 1}
      </TableCell>
      <TableCell className="overflow-table line-height-t row-tbl-coin">
      <div className="flex-d-row">
          <img src={watchlists["image_url"]}  width="45px"></img>
          <p className='coin-name-col'> {watchlists["coinname"]} </p>
      </div>
      </TableCell>
      <TableCell className="row-tbl-coin">
      {watchlists["cryptoid"]}
      </TableCell>
      
      <TableCell className="row-tbl-coin" align="right">
              <button className="btn-coin-watchlist" onClick={async (e) => {e.stopPropagation(); await handleDeleteWatchLists(watchlists['favid'])}}>Remove</button>
            </TableCell>
      
  </TableRow>
      )}

export default WatchList;