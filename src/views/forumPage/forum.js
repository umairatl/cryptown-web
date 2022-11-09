import { useEffect, useState } from "react";
import axios from "../../components/axios/axios";
import {  useAuthContext } from '../../hooks/useAuthContext'
import Navbar from '../../components/navbar/navbar'


const ForumPage = () => {
    const [crypto, setCrypto] = useState(null);
    const [error, setError] = useState('');
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchCrypto = async () => {
            const response = await axios('api/crypto/cryptoList')
            const json = await response.data
    
            if (response.status === 200) {
                setCrypto(json)
            }
        }
        if(user){
          fetchCrypto()
        }

        if(!user){
          setError('You must be logged in')
        }
      }, [user])


  return (
    <div className="forum">
      <Navbar />
      <h1>FORUM PAGE</h1>
      <h1>{error}</h1>
      <h2>{crypto && <div>{crypto.mssg}</div>}</h2>
      {/* {crypto && crypto.cryptoList.map(res => <div>{res.name}</div>)} */}
    </div>
  );
};

export default ForumPage;
