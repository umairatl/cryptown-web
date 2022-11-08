import { useEffect, useState } from "react";
import axios from "../../components/axios/axios";


const ForumPage = () => {
    const [crypto, setCrypto] = useState(null)
    useEffect(() => {
        const fetchCrypto = async () => {
            const response = await axios('api/crypto/cryptoList')
            const json = await response.data
    
            if (response.status === 200) {
                setCrypto(json)
            }
        }
        fetchCrypto()
      }, [])
  // const [crypto, setCrypto] = useState(null);
  // useEffect(() => {
  //   const fetchCrypto = async () => {
  //     const response = await axios(
  //       process.env.REACT_APP_URL + "api/crypto/cryptoList"
  //     );
  //     const json = await response.data;

  //     if (response.status === 200) {
  //       setCrypto(json);
  //     }
  //   };
  //   fetchCrypto();
  // }, []);

  return (
    <div className="forum">
      <h1>FORUM PAGE</h1>
      <h2>{crypto && <div>{crypto.mssg}</div>}</h2>
      {/* {crypto && crypto.cryptoList.map(res => <div>{res.name}</div>)} */}
    </div>
  );
};

export default ForumPage;
