import { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/navbar'
import axios from "../../components/axios/axios";
import '../../views/favouritePage/fav.css'
import { useAuthContext } from '../../hooks/useAuthContext';
import WatchList from '../../components/watchList/watchList'
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useWatchListContexts } from '../../hooks/useWatchListContext';
import { useDialogContext } from '../../hooks/useDialogContext';
import NormalDialog from '../../components/Dialog/normalDialog';

import WatchlistHeaderSection from '../../components/watchList/watchlistheadersec/watchlistheader';
import Footer from '../../components/footer/footer';

const FavPage = () => {

    const { watchLists, dispatch } = useWatchListContexts()
    const { removeWatchlist: removeWatchListDialog } = useDialogContext()
    const { user } = useAuthContext()

    const [username, setUsername] = useState("")

    useEffect(()=>{
        setUsername(localStorage.getItem("username").slice(1, -1))
    }, [])
    
    useEffect(() => {
        const fetchWatchLists = async () => {
        const response = await axios('api/favourite/favourite-list',
        {
            headers: {
                'Authorization': `Bearer ${user}`,
            }
        })
          const json = await response.data;

          if (response.status === 200) {
            dispatch({type:"SET_WATCHLIST", payload: json.favourites})
          }
        };

        if (user && watchLists === null) {
            fetchWatchLists();
        }
      }, [dispatch, user]);

    
    return ( 
        <div className='wrap-aout-fav'>
            <Navbar />
            <WatchlistHeaderSection/>

            <div className='watchlist-cont'>
            <TableContainer component={Paper} sx={{overflow: 'auto'}}>
              <Table aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                  <TableCell sx={{ width: "100px", textAlign: "center" }} className="table_h"><p>No</p></TableCell>
                <TableCell className="table_h"><p>Name</p></TableCell>
                <TableCell className="table_h"><p>ID</p></TableCell>
                <TableCell className="table_h" align="right"><p>Remove from Watchlist</p></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                        { watchLists && watchLists.map((watchList, index) => 
                        <WatchList key={index} index={index} watchlists={watchList}/>)}
                    </TableBody> 
              </Table>
            </TableContainer>

         
          </div>



            <div className='test'>
           {/* <h3 className="textwlheader">Your <span id="colortextsix"> Favourites</span></h3>
            <TableContainer component={Paper} className="shadoweffect">
                <Table aria-label="simple table" stickyHeader>
                    <TableHead>
                        <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>ID</TableCell>
                        <TableCell>Remove from Watchlist</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { watchLists && watchLists.map(watchList => <WatchList key={watchList["favid"]} watchlists={watchList}/>)}
                    </TableBody>
                </Table>    
            </TableContainer> */}
            { watchLists && watchLists.length === 0 && <h1>{username} has no watchlists</h1> }

            
            { removeWatchListDialog ?
                <NormalDialog 
                type="REMOVE_FROM_WATCHLIST"
                dialogTitle="Remove from watchlist" 
                dialogMessage="Remove from watchlist successful"
                /> : null
            }
            
        </div>





        <Footer/>
        </div>
        
     );
}
 
export default FavPage;